// ============================================================
// F1 档案库 —— 赛程与比赛结果（Jolpica F1 API）
// 合并「赛程表」与「比赛结果」：已完赛显示前三名，未开始显示日期。
// ============================================================

(function () {
  "use strict";

  var API_BASE = "https://api.jolpi.ca/ergast/f1/current";

  var NAT = {
    British: "英国", German: "德国", Italian: "意大利", Austrian: "奥地利",
    French: "法国", American: "美国", Swiss: "瑞士", Japanese: "日本",
    Australian: "澳大利亚", Dutch: "荷兰", Spanish: "西班牙", Monegasque: "摩纳哥",
    Canadian: "加拿大", Thai: "泰国", Brazilian: "巴西", Finnish: "芬兰",
    Mexican: "墨西哥", Danish: "丹麦", "New Zealander": "新西兰", Chinese: "中国",
    Argentine: "阿根廷", Belgian: "比利时", Swedish: "瑞典", Russian: "俄罗斯",
    Hungarian: "匈牙利", Singaporean: "新加坡", Azerbaijani: "阿塞拜疆",
    Bahraini: "巴林", Malaysian: "马来西亚", Qatari: "卡塔尔",
    "United Arab Emirates": "阿联酋"
  };

  function $(sel) { return document.querySelector(sel); }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
        var resultsByRound = {};
        (res[1].MRData.RaceTable.Races || []).forEach(function (r) {
          resultsByRound[r.round] = r.Results || [];
        });

        $("#season-info").textContent = res[0].MRData.RaceTable.season + " 赛季 · 共 " + races.length + " 站";
        $("#updated").textContent =
          "最后更新：" + new Date().toLocaleTimeString("zh-TW", { hour12: false });

        var today = new Date().toISOString().slice(0, 10);
        $("#tbody").innerHTML = races.map(function (r) {
          return raceRow(r, resultsByRound[r.round], today);
        }).join("");
      })
      .catch(function (e) {
        $("#tbody").innerHTML = "";
        $("#error").hidden = false;
        $("#error").textContent = "加载失败：" + e.message + "（请检查网络后点击刷新重试）";
        $("#updated").textContent = "";
      });
  }

  function raceRow(r, results, today) {
    var circuit = r.Circuit ? r.Circuit.circuitName : "—";
    var country = r.Circuit && r.Circuit.Location ? natText(r.Circuit.Location.country) : "";

    var resultHtml;
    if (results && results.length) {
      var top3 = results.slice(0, 3).map(function (x) {
        return '<span class="p' + esc(x.position) + '">' + esc(x.position) + '. ' +
          esc(x.Driver.givenName) + " " + esc(x.Driver.familyName) + '</span>';
      }).join(" ");
      resultHtml = '<span class="results-line">' + top3 + '</span>';
    } else if (r.date && r.date > today) {
      resultHtml = '<span class="upcoming">' + fmtMonthDay(r.date) + " 开赛</span>";
    } else {
      resultHtml = '<span class="upcoming">结果待公布</span>';
    }

    var highlight = "";

    return (
      '<tr' + (r.date === today ? ' class="race-today"' : "") + '>' +
      '<td class="pos">R' + esc(r.round) + '</td>' +
      '<td>' + esc(fmtDate(r.date)) + '</td>' +
      '<td><b class="race-name">' + esc(r.raceName) + '</b></td>' +
      '<td>' + esc(circuit) + (country ? ' · ' + esc(country) : '') + '</td>' +
      '<td>' + resultHtml + '</td>' +
      '</tr>'
    );
  }

  function natText(n) { return NAT[n] || n || ""; }

  $("#refresh").addEventListener("click", load);
  load();
})();
