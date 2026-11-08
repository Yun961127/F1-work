// ============================================================
// F1 檔案庫 —— 賽程與比賽結果（Jolpica F1 API）
// 說明：
// 1. 站名、賽道、國家直接顯示中文譯名（映射見 js/i18n.js）。
// 2. 已完賽顯示前三名（中文譯名），未來比賽顯示開賽日期。
// 3. current/results 端點數據不全時，逐輪補查缺失輪次的結果。
// 4. 使用 localStorage 緩存：先顯示緩存，再後台更新，減少 API 請求。
// ============================================================

(function () {
  "use strict";

  var API_BASE = "https://api.jolpi.ca/ergast/f1/current";
  var CACHE_KEY = "f1_schedule_cache_v1";
  var CACHE_TTL = 60 * 60 * 1000; // 1 小時

  function $(sel) { return document.querySelector(sel); }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function zh(map, key, fallback) {
    if (window.F1_ZH && map && map[key]) return map[key];
    return fallback;
  }

  // 車手譯名只取「姓氏」部分，例如 馬克斯・維斯塔潘 -> 維斯塔潘
  function driverShortZh(given, family) {
    var full = given + " " + family;
    var t = zh(window.F1_ZH.drivers, full, null);
    if (t) return t.split(/[・·]/).pop();
    return family;
  }

  function fmtDate(iso) {
    if (!iso) return "—";
    var p = iso.split("-");
    return p.length === 3 ? p[0] + "-" + p[1] + "-" + p[2] : iso;
  }
  function fmtMonthDay(iso) {
    if (!iso) return "—";
    var p = iso.split("-");
    return p.length === 3 ? parseInt(p[1], 10) + "月" + parseInt(p[2], 10) + "日" : iso;
  }

  // ---------- 緩存 ----------
  function readCache() {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var c = JSON.parse(raw);
      if (c && c.races && c.races.length) return c;
    } catch (e) { /* ignore */ }
    return null;
  }
  function writeCache(season, races) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        season: season, savedAt: Date.now(), races: races
      }));
    } catch (e) { /* ignore */ }
  }

  function fetchJSON(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });
  }

  // ---------- 渲染 ----------
  function render(season, races) {
    var today = new Date().toISOString().slice(0, 10);
    $("#season-info").textContent = season + " 賽季 · 共 " + races.length + " 站";
    $("#updated").textContent =
      "最後更新：" + new Date().toLocaleTimeString("zh-TW", { hour12: false });
    $("#tbody").innerHTML = races.map(function (r) {
      return raceRow(r, today);
    }).join("");
  }

  function raceRow(r, today) {
    var raceName = zh(window.F1_ZH.races, r.raceName, r.raceName);
    var circuit = zh(window.F1_ZH.circuits, r.circuitName, r.circuitName);
    var country = zh(window.F1_ZH.nations, r.country, r.country);

    var resultHtml;
    if (r.results && r.results.length) {
      var top3 = r.results.slice(0, 3).map(function (x) {
        return '<span class="p' + esc(x.position) + '">' + esc(x.position) + '. ' +
          esc(driverShortZh(x.given, x.family)) + '</span>';
      }).join(" ");
      resultHtml = '<span class="results-line">' + top3 + '</span>';
    } else if (r.date && r.date > today) {
      resultHtml = '<span class="upcoming">' + fmtMonthDay(r.date) + " 開賽</span>";
    } else {
      resultHtml = '<span class="upcoming">結果待公佈</span>';
    }

    return (
      '<tr' + (r.date === today ? ' class="race-today"' : "") + '>' +
      '<td class="pos">R' + esc(r.round) + '</td>' +
      '<td>' + esc(fmtDate(r.date)) + '</td>' +
      '<td><b class="race-name">' + esc(raceName) + '</b></td>' +
      '<td>' + esc(circuit) + (country ? ' · ' + esc(country) : '') + '</td>' +
      '<td>' + resultHtml + '</td>' +
      '</tr>'
    );
  }

  // ---------- 載入 ----------
  function load(force) {
    $("#error").hidden = true;

    // 先顯示緩存（若有）
    var cache = readCache();
    if (cache && !force) {
      render(cache.season, cache.races);
      if (Date.now() - cache.savedAt < CACHE_TTL) return; // 緩存仍新鮮，不必重新請求
    }

    if (!cache && !force) $("#tbody").innerHTML = '<tr><td colspan="5" class="loading">載入中…</td></tr>';

    // 後台更新
    Promise.all([
      fetchJSON(API_BASE + ".json?limit=30"),
      fetchJSON(API_BASE + "/results.json?limit=100")
    ])
      .then(function (res) {
        var season = res[0].MRData.RaceTable.season;
        var races = (res[0].MRData.RaceTable.Races || []).map(function (r) {
          return {
            round: r.round, date: r.date, raceName: r.raceName,
            circuitName: r.Circuit ? r.Circuit.circuitName : "",
            country: r.Circuit && r.Circuit.Location ? r.Circuit.Location.country : "",
            results: []
          };
        });
        var byRound = {};
        races.forEach(function (r) { byRound[r.round] = r; });
        (res[1].MRData.RaceTable.Races || []).forEach(function (r) {
          if (byRound[r.round]) {
            byRound[r.round].results = (r.Results || []).map(function (x) {
              return { position: x.position, given: x.Driver.givenName, family: x.Driver.familyName };
            });
          }
        });

        var today = new Date().toISOString().slice(0, 10);
        var missing = races
          .filter(function (r) { return !r.results.length && r.date && r.date <= today; })
          .map(function (r) { return r.round; });

        var finish = function () {
          writeCache(season, races);
          render(season, races);
        };
        if (!missing.length) { finish(); return; }

        // 逐輪補查，限制並發、失敗不影響整體
        var chain = Promise.resolve();
        missing.forEach(function (round) {
          chain = chain.then(function () {
            return fetchJSON("https://api.jolpi.ca/ergast/f1/" + season + "/" + round + "/results.json")
              .then(function (d) {
                var rr = d.MRData && d.MRData.RaceTable && d.MRData.RaceTable.Races;
                if (rr && rr.length && rr[0].Results && byRound[round]) {
                  byRound[round].results = rr[0].Results.map(function (x) {
                    return { position: x.position, given: x.Driver.givenName, family: x.Driver.familyName };
                  });
                }
              })
              .catch(function () { /* skip */ });
          });
        });
        chain.then(finish);
      })
      .catch(function (e) {
        if (cache) { render(cache.season, cache.races); return; } // 用緩存兜底
        $("#tbody").innerHTML = "";
        $("#error").hidden = false;
        $("#error").textContent = "載入失敗：" + e.message + "（請檢查網路後點擊刷新重試）";
        $("#updated").textContent = "";
      });
  }

  $("#refresh").addEventListener("click", function () { load(true); });
  load(false);
})();
