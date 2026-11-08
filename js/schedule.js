// ============================================================
// F1 档案库 —— 赛程与比赛结果（Jolpica F1 API）
// 说明：
// 1. 站名、赛道、国家直接显示中文译名（映射见 js/i18n.js）。
// 2. 已完赛显示前三名（中文译名），未来比赛显示开赛日期。
// 3. current/results 端点数据不全时，逐轮补查缺失轮次的结果。
// ============================================================

(function () {
  "use strict";

  var API_BASE = "https://api.jolpi.ca/ergast/f1/current";

  function $(sel) { return document.querySelector(sel); }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function zh(map, key, fallback) {
    if (window.F1_ZH && map && map[key]) return map[key];
    return fallback;
  }

  // 车手译名只取「姓氏」部分，例如 馬克斯・維斯塔潘 -> 維斯塔潘
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

  function load() {
    $("#error").hidden = true;
    $("#tbody").innerHTML = '<tr><td colspan="5" class="loading">加载中…</td></tr>';

    Promise.all([
      fetch(API_BASE + ".json?limit=30").then(function (r) { return r.json(); }),
      fetch(API_BASE + "/results.json?limit=100").then(function (r) { return r.json(); })
    ])
      .then(function (res) {
        var races = res[0].MRData.RaceTable.Races || [];
        var season = res[0].MRData.RaceTable.season;
        var resultsByRound = {};
        (res[1].MRData.RaceTable.Races || []).forEach(function (r) {
          resultsByRound[r.round] = r.Results || [];
        });

        var today = new Date().toISOString().slice(0, 10);
        // 找出「已过日期但结果缺失」的轮次，逐轮补查
        var missing = races
          .filter(function (r) { return !resultsByRound[r.round] && r.date && r.date <= today; })
          .map(function (r) { return r.round; });

        var finish = function () { renderAll(races, resultsByRound, today, season); };

        if (!missing.length) { finish(); return; }

        Promise.all(missing.map(function (round) {
          return fetch("https://api.jolpi.ca/ergast/f1/" + season + "/" + round + "/results.json")
            .then(function (x) { return x.json(); })
            .catch(function () { return null; });
        }))
          .then(function (extra) {
            extra.forEach(function (d) {
              if (!d) return;
              var rr = d.MRData && d.MRData.RaceTable && d.MRData.RaceTable.Races;
              if (rr && rr.length && rr[0].Results) resultsByRound[rr[0].round] = rr[0].Results;
            });
            finish();
          });
      })
      .catch(function (e) {
        $("#tbody").innerHTML = "";
        $("#error").hidden = false;
        $("#error").textContent = "加载失败：" + e.message + "（请检查网络后点击刷新重试）";
        $("#updated").textContent = "";
      });
  }

  function renderAll(races, resultsByRound, today, season) {
    $("#season-info").textContent = season + " 赛季 · 共 " + races.length + " 站";
    $("#updated").textContent =
      "最后更新：" + new Date().toLocaleTimeString("zh-TW", { hour12: false });
    $("#tbody").innerHTML = races.map(function (r) {
      return raceRow(r, resultsByRound[r.round], today);
    }).join("");
  }

  function raceRow(r, results, today) {
    var raceName = zh(window.F1_ZH.races, r.raceName, r.raceName);
    var circuit = r.Circuit ? zh(window.F1_ZH.circuits, r.Circuit.circuitName, r.Circuit.circuitName) : "—";
    var country = r.Circuit && r.Circuit.Location
      ? zh(window.F1_ZH.nations, r.Circuit.Location.country, r.Circuit.Location.country)
      : "";

    var resultHtml;
    if (results && results.length) {
      var top3 = results.slice(0, 3).map(function (x) {
        return '<span class="p' + esc(x.position) + '">' + esc(x.position) + '. ' +
          esc(driverShortZh(x.Driver.givenName, x.Driver.familyName)) + '</span>';
      }).join(" ");
      resultHtml = '<span class="results-line">' + top3 + '</span>';
    } else if (r.date && r.date > today) {
      resultHtml = '<span class="upcoming">' + fmtMonthDay(r.date) + " 开赛</span>";
    } else {
      resultHtml = '<span class="upcoming">结果待公布</span>';
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

  $("#refresh").addEventListener("click", load);
  load();
})();
