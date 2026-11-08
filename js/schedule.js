// ============================================================
// F1 檔案庫 —— 賽程與比賽結果（重構版）
// 每一站大獎賽一個分頁（tab），按分站順序排列。
// 每個分頁顯示：賽道資訊 + 衝刺排位賽 / 衝刺賽 / 排位賽 / 正賽排名。
// 車手姓名可點擊跳轉至車手資訊頁。
// 資料來源：Jolpica F1 API（正賽/排位賽/衝刺賽）、靜態資料（衝刺排位賽、賽道資訊）。
// 結果採懶載入 + localStorage 緩存。
// ============================================================

(function () {
  "use strict";

  var API_BASE = "https://api.jolpi.ca/ergast/f1/current";
  var CACHE_PREFIX = "f1_round_v2_";

  function $(sel) { return document.querySelector(sel); }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function zh(map, key, fallback) {
    if (window.F1_ZH && map && map[key]) return map[key];
    return fallback;
  }

  // Jolpica driverId -> data.js 車手 id（用於跳轉）
  var DRIVER_ID = {
    antonelli: "kimi-antonelli", verstappen: "max-verstappen", hamilton: "lewis-hamilton",
    russell: "george-russell", leclerc: "charles-leclerc", norris: "lando-norris",
    piastri: "oscar-piastri", hadjar: "isack-hadjar", lawson: "liam-lawson",
    tsunoda: "yuki-tsunoda", lindblad: "arvid-lindblad", gasly: "pierre-gasly",
    colapinto: "franco-colapinto", ocon: "esteban-ocon", bearman: "oliver-bearman",
    hirakawa: "ryo-hirakawa", hulkenberg: "nico-hulkenberg", bortoleto: "gabriel-bortoleto",
    albon: "alexander-albon", sainz: "carlos-sainz", alonso: "fernando-alonso",
    stroll: "lance-stroll", bottas: "valtteri-bottas", perez: "sergio-perez",
    doohan: "jack-doohan"
  };

  var races = [];        // 全部賽站（含 session 時間）
  var activeRound = null;
  var season = null;     // 賽季年份（從 API 取得）

  // ---------- 緩存 ----------
  function cacheKey(r) { return CACHE_PREFIX + r; }
  function readCache(r) {
    try {
      var raw = localStorage.getItem(cacheKey(r));
      if (!raw) return null;
      var c = JSON.parse(raw);
      if (c && c.round) return c;
    } catch (e) { /* ignore */ }
    return null;
  }
  function writeCache(r, data) {
    try { localStorage.setItem(cacheKey(r), JSON.stringify(data)); } catch (e) { /* ignore */ }
  }

  function fetchJSON(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });
  }

  // ---------- 載入賽程列表 ----------
  function loadSchedule() {
    fetchJSON(API_BASE + ".json?limit=30")
      .then(function (data) {
        season = data.MRData.RaceTable.season;
        races = (data.MRData.RaceTable.Races || []).map(function (r) {
          return {
            round: r.round, date: r.date, time: r.time, raceName: r.raceName,
            circuitName: r.Circuit ? r.Circuit.circuitName : "",
            circuitId: r.Circuit ? r.Circuit.circuitId : "",
            locality: r.Circuit && r.Circuit.Location ? r.Circuit.Location.locality : "",
            country: r.Circuit && r.Circuit.Location ? r.Circuit.Location.country : "",
            Qualifying: r.Qualifying || null,
            Sprint: r.Sprint || null,
            SprintQualifying: r.SprintQualifying || null
          };
        });
        renderTabs();
        // 預設選中：最近一場已完賽，否則第一場
        var today = new Date().toISOString().slice(0, 10);
        var pick = races.filter(function (r) { return r.date < today; }).pop() || races[0];
        selectRound(pick ? pick.round : null);
      })
      .catch(function (e) {
        $("#error").hidden = false;
        $("#error").textContent = "賽程載入失敗：" + e.message + "（請檢查網路後重新整理）";
      });
  }

  function renderTabs() {
    var html = races.map(function (r) {
      return '<button class="round-tab" data-round="' + esc(r.round) + '">R' + esc(r.round) +
        '<span class="round-tab-name">' + esc(zh(window.F1_ZH.races, r.raceName, r.raceName)) + '</span></button>';
    }).join("");
    $("#round-tabs").innerHTML = html;
    $("#round-tabs").querySelectorAll(".round-tab").forEach(function (btn) {
      btn.addEventListener("click", function () { selectRound(btn.dataset.round); });
    });
  }

  function selectRound(round) {
    if (!round) return;
    activeRound = round;
    $("#round-tabs").querySelectorAll(".round-tab").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.round === String(round));
    });
    var race = races.find(function (r) { return String(r.round) === String(round); });
    if (!race) return;

    var cache = readCache(round);
    if (cache) {
      renderRoundDetail(race, cache);
    } else {
      renderRoundLoading(race);
      fetchRoundData(race).then(function (data) {
        if (activeRound === String(round)) {
          writeCache(round, data);
          renderRoundDetail(race, data);
        }
      }).catch(function () {
        if (activeRound === String(round)) {
          renderRoundError(race);
        }
      });
    }
  }

  function fetchRoundData(race) {
    var round = race.round;
    var base = "https://api.jolpi.ca/ergast/f1/" + (season || "2026");
    var jobs = {
      race: fetchJSON(base + "/" + round + "/results.json")
        .then(function (d) { return d.MRData.RaceTable.Races[0]; })
        .catch(function () { return null; }),
      qualifying: fetchJSON(base + "/" + round + "/qualifying.json")
        .then(function (d) { return d.MRData.RaceTable.Races[0]; })
        .catch(function () { return null; }),
      sprint: fetchJSON(base + "/" + round + "/sprint.json")
        .then(function (d) { return d.MRData.RaceTable.Races[0]; })
        .catch(function () { return null; })
    };
    return Promise.all([jobs.race, jobs.qualifying, jobs.sprint]).then(function (res) {
      return {
        round: round,
        race: res[0] ? (res[0].Results || []) : [],
        qualifying: res[1] ? (res[1].QualifyingResults || []) : [],
        sprint: res[2] ? (res[2].SprintResults || []) : []
      };
    });
  }

  // ---------- 渲染 ----------
  function renderRoundLoading(race) {
    $("#round-detail").innerHTML =
      '<div class="round-loading">載入 R' + esc(race.round) + " · " +
      esc(zh(window.F1_ZH.races, race.raceName, race.raceName)) + ' 資料中…</div>';
  }

  function renderRoundError(race) {
    $("#round-detail").innerHTML =
      '<div class="round-loading">R' + esc(race.round) + " 資料載入失敗，請重新整理重試。</div>";
  }

  function renderRoundDetail(race, data) {
    var html = "";

    // 賽道資訊
    html += circuitCard(race);

    // 衝刺排位賽（靜態資料，僅當資料屬於本賽季時才顯示）
    var sqAll = window.SPRINT_QUALIFYING || {};
    var sq = (sqAll.season === Number(season) && sqAll.data) ? (sqAll.data[race.round] || []) : [];
    if (sq.length) {
      html += sessionCard(
        "衝刺排位賽", "決定衝刺賽發車順序",
        race.SprintQualifying,
        sqTable(sq)
      );
    }

    // 衝刺賽
    if (data.sprint && data.sprint.length) {
      html += sessionCard(
        "衝刺賽", "短距離賽事",
        race.Sprint,
        sprintTable(data.sprint)
      );
    }

    // 排位賽
    if (data.qualifying && data.qualifying.length) {
      html += sessionCard(
        "排位賽", "決定正賽發車順序",
        race.Qualifying,
        qualifyingTable(data.qualifying)
      );
    }

    // 正賽
    if (data.race && data.race.length) {
      html += sessionCard(
        "正賽", "大獎賽正賽",
        { date: race.date, time: race.time },
        raceTable(data.race)
      );
    }

    // 若全部無資料
    if (html.indexOf("session-card") === -1) {
      html += '<div class="round-loading">本站結果尚未公佈，敬請期待。</div>';
    }

    $("#round-detail").innerHTML = html;
  }

  // 賽道資訊卡片
  function circuitCard(race) {
    var info = (window.CIRCUIT_INFO && window.CIRCUIT_INFO[race.circuitId]) || {};
    var cName = zh(window.F1_ZH.circuits, race.circuitName, race.circuitName);
    var cCountry = zh(window.F1_ZH.nations, race.country, race.country);
    var locality = race.locality ? zh(window.F1_ZH.nations, race.locality, race.locality) : "";

    var rows = "";
    if (locality) rows += '<div class="item"><div class="k">地點</div><div class="v">' + esc(locality) + "、 " + esc(cCountry) + '</div></div>';
    else if (cCountry) rows += '<div class="item"><div class="k">地點</div><div class="v">' + esc(cCountry) + '</div></div>';
    if (info.km) rows += '<div class="item"><div class="k">賽道長度</div><div class="v">' + esc(info.km) + ' 公里</div></div>';
    if (info.laps) rows += '<div class="item"><div class="k">比賽圈數</div><div class="v">' + esc(info.laps) + ' 圈</div></div>';

    return (
      '<div class="detail-card round-circuit">' +
      '<div class="detail-hero">' +
      '<h1>R' + esc(race.round) + " · " + esc(zh(window.F1_ZH.races, race.raceName, race.raceName)) + '</h1>' +
      '<div class="hero-sub">' + esc(cName) + (cCountry ? ' · ' + esc(cCountry) : '') + '</div>' +
      '</div>' +
      (rows ? '<div class="detail-body"><div class="section-title">賽道資訊</div><div class="kv">' + rows + '</div></div>' : '') +
      '</div>'
    );
  }

  // session 卡片
  function sessionCard(title, subtitle, when, tableHtml) {
    var timeText = "";
    if (when && when.date) {
      timeText = fmtMonthDay(when.date) + (when.time ? " " + when.time.replace("Z", "") + " UTC" : "");
    }
    return (
      '<div class="detail-card session-card">' +
      '<div class="session-head">' +
      '<div class="session-title">' + esc(title) + '</div>' +
      '<div class="session-sub">' + esc(subtitle) + (timeText ? ' · ' + esc(timeText) : '') + '</div>' +
      '</div>' +
      '<div class="table-wrap">' + tableHtml + '</div>' +
      '</div>'
    );
  }

  function fmtMonthDay(iso) {
    var p = iso.split("-");
    return p.length === 3 ? parseInt(p[1], 10) + "月" + parseInt(p[2], 10) + "日" : iso;
  }

  // 車手連結（全名 + 譯名）
  function driverCell(d) {
    var full = d.givenName + " " + d.familyName;
    var id = DRIVER_ID[d.driverId] || "";
    var zhName = zh(window.F1_ZH.drivers, full, "");
    var label = esc(full) + (zhName ? ' <span class="zh">（' + esc(zhName) + '）</span>' : '');
    if (id) {
      return '<a class="detail-link" href="detail.html?type=drivers&id=' + id + '">' + label + '</a>';
    }
    return label;
  }

  function driverCellByNames(given, family, driverId) {
    return driverCell({ givenName: given, familyName: family, driverId: driverId });
  }

  // 正賽表
  function raceTable(rows) {
    var thead = '<tr><th>排名</th><th>車手</th><th>車隊</th><th class="num">積分</th><th>狀態</th></tr>';
    var body = rows.map(function (r) {
      var team = r.Constructor ? zh(window.F1_ZH.teams, r.Constructor.name, r.Constructor.name) : "—";
      var status = r.status === "Finished" ? "完賽" : esc(r.status);
      return (
        '<tr>' +
        '<td class="pos pos-' + esc(r.position) + '">' + esc(r.position) + '</td>' +
        '<td>' + driverCell(r.Driver) + '</td>' +
        '<td>' + esc(team) + '</td>' +
        '<td class="num pts">' + esc(r.points) + '</td>' +
        '<td>' + status + '</td>' +
        '</tr>'
      );
    }).join("");
    return '<table><thead>' + thead + '</thead><tbody>' + body + '</tbody></table>';
  }

  // 排位賽表（含 Q1/Q2/Q3）
  function qualifyingTable(rows) {
    var thead = '<tr><th>排名</th><th>車手</th><th>車隊</th><th class="num">Q1</th><th class="num">Q2</th><th class="num">Q3</th></tr>';
    var body = rows.map(function (r) {
      var team = r.Constructor ? zh(window.F1_ZH.teams, r.Constructor.name, r.Constructor.name) : "—";
      return (
        '<tr>' +
        '<td class="pos pos-' + esc(r.position) + '">' + esc(r.position) + '</td>' +
        '<td>' + driverCell(r.Driver) + '</td>' +
        '<td>' + esc(team) + '</td>' +
        '<td class="num">' + (r.Q1 ? esc(r.Q1) : "—") + '</td>' +
        '<td class="num">' + (r.Q2 ? esc(r.Q2) : "—") + '</td>' +
        '<td class="num">' + (r.Q3 ? esc(r.Q3) : "—") + '</td>' +
        '</tr>'
      );
    }).join("");
    return '<table><thead>' + thead + '</thead><tbody>' + body + '</tbody></table>';
  }

  // 衝刺賽表
  function sprintTable(rows) {
    var thead = '<tr><th>排名</th><th>車手</th><th>車隊</th><th class="num">積分</th><th>狀態</th></tr>';
    var body = rows.map(function (r) {
      var team = r.Constructor ? zh(window.F1_ZH.teams, r.Constructor.name, r.Constructor.name) : "—";
      var status = r.status === "Finished" ? "完賽" : esc(r.status);
      return (
        '<tr>' +
        '<td class="pos pos-' + esc(r.position) + '">' + esc(r.position) + '</td>' +
        '<td>' + driverCell(r.Driver) + '</td>' +
        '<td>' + esc(team) + '</td>' +
        '<td class="num pts">' + esc(r.points) + '</td>' +
        '<td>' + status + '</td>' +
        '</tr>'
      );
    }).join("");
    return '<table><thead>' + thead + '</thead><tbody>' + body + '</tbody></table>';
  }

  // 衝刺排位賽表（靜態資料）
  function sqTable(rows) {
    var thead = '<tr><th>排名</th><th>車手</th></tr>';
    var body = rows.map(function (r) {
      var zhName = zh(window.F1_ZH.drivers, r.name, "");
      var label = esc(r.name) + (zhName ? ' <span class="zh">（' + esc(zhName) + '）</span>' : '');
      var cell = r.id
        ? '<a class="detail-link" href="detail.html?type=drivers&id=' + r.id + '">' + label + '</a>'
        : label;
      return (
        '<tr>' +
        '<td class="pos pos-' + r.pos + '">' + r.pos + '</td>' +
        '<td>' + cell + '</td>' +
        '</tr>'
      );
    }).join("");
    return '<table><thead>' + thead + '</thead><tbody>' + body + '</tbody></table>';
  }

  // 啟動
  loadSchedule();
})();
