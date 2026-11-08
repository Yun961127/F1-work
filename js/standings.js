// ============================================================
// F1 檔案庫 —— 排行榜 / 積分（Jolpica F1 API）
// 說明：純前端 fetch，每 60 秒自動刷新，也可手動刷新。
// ============================================================

(function () {
  "use strict";

  var API_BASE = "https://api.jolpi.ca/ergast/f1/current";
  var currentType = "drivers";

  // 國籍中文化映射
  var NAT = {
    British: "英國", German: "德國", Italian: "義大利", Austrian: "奧地利",
    French: "法國", American: "美國", Swiss: "瑞士", Japanese: "日本",
    Australian: "澳大利亞", Dutch: "荷蘭", Spanish: "西班牙", Monegasque: "摩納哥",
    Canadian: "加拿大", Thai: "泰國", Brazilian: "巴西", Finnish: "芬蘭",
    Mexican: "墨西哥", Danish: "丹麥", "New Zealander": "紐西蘭", Chinese: "中國",
    Argentine: "阿根廷", Belgian: "比利時", Swedish: "瑞典", Russian: "俄羅斯"
  };

  function $(sel) { return document.querySelector(sel); }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function nat(n) { return NAT[n] || n || "—"; }

  // 車手 / 車隊名稱 + 中文譯名
  function zhDriver(d) {
    const full = d.givenName + " " + d.familyName;
    const zh = window.F1_ZH && window.F1_ZH.drivers ? window.F1_ZH.drivers[full] : null;
    return zh ? esc(full) + ' <span class="zh">（' + esc(zh) + '）</span>' : esc(full);
  }
  function zhTeam(n) {
    const zh = window.F1_ZH && window.F1_ZH.teams ? window.F1_ZH.teams[n] : null;
    return zh ? esc(n) + ' <span class="zh">（' + esc(zh) + '）</span>' : esc(n);
  }

  function load(type) {
    currentType = type;
    document.querySelectorAll(".tab").forEach(function (b) {
      b.classList.toggle("active", b.dataset.type === type);
    });
    $("#error").hidden = true;
    $("#tbody").innerHTML = '<tr><td colspan="5" class="loading">載入中…</td></tr>';

    var url = type === "drivers"
      ? API_BASE + "/driverstandings.json"
      : API_BASE + "/constructorstandings.json";

    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        var table = data.MRData.StandingsTable;
        var list = table.StandingsLists && table.StandingsLists[0];
        if (!list) throw new Error("本賽季暫無積分數據");

        var season = list.season;
        var round = parseInt(list.round, 10);
        var rows = type === "drivers"
          ? (list.DriverStandings || [])
          : (list.ConstructorStandings || []);

        $("#season-info").textContent = season + " 賽季 · 第 " + round + " 輪後";
        $("#updated").textContent =
          "最後更新：" + new Date().toLocaleTimeString("zh-TW", { hour12: false });

        // 再取上一輪積分，計算名次變化（↑↓）
        if (round > 1) {
          fetch(url + "?round=" + (round - 1))
            .then(function (r2) { return r2.json(); })
            .then(function (d2) {
              var l2 = d2.MRData.StandingsTable.StandingsLists[0];
              var prev = l2
                ? (type === "drivers" ? l2.DriverStandings : l2.ConstructorStandings)
                : null;
              renderStandings(type, rows, prev);
            })
            .catch(function () { renderStandings(type, rows, null); });
        } else {
          renderStandings(type, rows, null);
        }
      })
      .catch(function (e) {
        $("#tbody").innerHTML = "";
        $("#error").hidden = false;
        $("#error").textContent = "載入失敗：" + e.message + "（請檢查網路後點擊刷新重試）";
        $("#updated").textContent = "";
      });
  }

  function renderStandings(type, rows, prev) {
    // prev: 上一輪的行，用於計算名次變化
    var prevMap = {};
    if (prev) {
      prev.forEach(function (p) {
        var id = type === "drivers" ? p.Driver.driverId : p.Constructor.constructorId;
        prevMap[id] = parseInt(p.position, 10);
      });
    }
    if (type === "drivers") renderDrivers(rows, prevMap);
    else renderConstructors(rows, prevMap);
  }

  // 名次變化標記：之前名次 > 現在名次 = 上升
  function arrowCell(curPos, prevPos) {
    if (prevPos == null || prevPos === curPos) {
      return '<span class="arrow flat">–</span>';
    }
    if (prevPos > curPos) return '<span class="arrow up">▲ ' + (prevPos - curPos) + '</span>';
    return '<span class="arrow down">▼ ' + (curPos - prevPos) + '</span>';
  }

  function renderDrivers(rows, prevMap) {
    var lead = rows.length ? parseInt(rows[0].points, 10) : 0;
    $("#thead").innerHTML =
      '<tr><th>排名</th><th>車手</th><th>車隊</th><th class="num">積分</th><th class="num">勝場</th></tr>';
    $("#tbody").innerHTML = rows.map(function (r) {
      var team = (r.Constructors && r.Constructors[0] && r.Constructors[0].name) || "—";
      var num = r.Driver.permanentNumber || "—";
      var cur = parseInt(r.position, 10);
      var gap = lead - parseInt(r.points, 10);
      var gapText = cur === 1
        ? '<span class="gap lead">領跑</span>'
        : '<span class="gap">−' + gap + '</span>';
      return (
        '<tr>' +
        '<td class="pos pos-' + esc(r.position) + '">' + esc(r.position) + ' ' +
        arrowCell(cur, prevMap[r.Driver.driverId]) + '</td>' +
        '<td><b>' + zhDriver(r.Driver) + '</b>' +
        '<span class="num-badge">#' + esc(num) + '</span></td>' +
        '<td>' + zhTeam(team) + '</td>' +
        '<td class="num pts">' + esc(r.points) + ' ' + gapText + '</td>' +
        '<td class="num">' + esc(r.wins) + '</td>' +
        '</tr>'
      );
    }).join("");
  }

  function renderConstructors(rows, prevMap) {
    var lead = rows.length ? parseInt(rows[0].points, 10) : 0;
    $("#thead").innerHTML =
      '<tr><th>排名</th><th>車隊</th><th>國籍</th><th class="num">積分</th><th class="num">勝場</th></tr>';
    $("#tbody").innerHTML = rows.map(function (r) {
      var cur = parseInt(r.position, 10);
      var gap = lead - parseInt(r.points, 10);
      var gapText = cur === 1
        ? '<span class="gap lead">領跑</span>'
        : '<span class="gap">−' + gap + '</span>';
      return (
        '<tr>' +
        '<td class="pos pos-' + esc(r.position) + '">' + esc(r.position) + ' ' +
        arrowCell(cur, prevMap[r.Constructor.constructorId]) + '</td>' +
        '<td><b>' + zhTeam(r.Constructor.name) + '</b></td>' +
        '<td>' + esc(nat(r.Constructor.nationality)) + '</td>' +
        '<td class="num pts">' + esc(r.points) + ' ' + gapText + '</td>' +
        '<td class="num">' + esc(r.wins) + '</td>' +
        '</tr>'
      );
    }).join("");
  }

  // 事件綁定
  document.querySelectorAll(".tab").forEach(function (b) {
    b.addEventListener("click", function () { load(b.dataset.type); });
  });
  $("#refresh").addEventListener("click", function () { load(currentType); });

  // 初始載入 + 每 60 秒自動刷新
  load("drivers");
  setInterval(function () { load(currentType); }, 60000);
})();
