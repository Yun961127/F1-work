// ============================================================
// F1 檔案庫 —— 首頁：下一站比賽倒計時（Jolpica F1 API）
// 使用 localStorage 緩存賽程，減少 API 請求。
// ============================================================

(function () {
  "use strict";

  var box = document.getElementById("countdown");
  if (!box) return;

  var CACHE_KEY = "f1_countdown_cache_v1";
  var CACHE_TTL = 60 * 60 * 1000; // 1 小時

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function zh(map, key, fallback) {
    if (window.F1_ZH && map && map[key]) return map[key];
    return fallback;
  }

  function fmtMonthDay(iso) {
    var p = iso.split("-");
    return p.length === 3 ? parseInt(p[1], 10) + "月" + parseInt(p[2], 10) + "日" : iso;
  }

  function dayDiff(target) {
    var t = new Date(target + "T00:00:00");
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    return Math.round((t - now) / 86400000);
  }

  function render(season, next) {
    if (!next) {
      box.innerHTML = '<span class="cd-label">本賽季賽程已結束</span>' +
        '<span class="cd-race">' + season + ' 賽季已圓滿落幕</span>';
      return;
    }
    var diff = dayDiff(next.date);
    var diffText;
    if (diff === 0) diffText = "今天開賽！";
    else if (diff === 1) diffText = "明天開賽";
    else diffText = "還有 <b>" + diff + "</b> 天";

    box.innerHTML =
      '<span class="cd-label">下一站</span>' +
      '<span class="cd-race">R' + next.round + " · " +
      esc(zh(window.F1_ZH.races, next.raceName, next.raceName)) + '</span>' +
      '<span class="cd-days">' + diffText + '</span>' +
      '<span class="cd-date">' + fmtMonthDay(next.date) + " · " +
      esc(zh(window.F1_ZH.circuits, next.circuitName, next.circuitName)) + '</span>';
  }

  // 先顯示緩存
  try {
    var raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      var c = JSON.parse(raw);
      if (c && Date.now() - c.savedAt < CACHE_TTL) render(c.season, c.next);
    }
  } catch (e) { /* ignore */ }

  fetch("https://api.jolpi.ca/ergast/f1/current.json?limit=30")
    .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(function (data) {
      var races = data.MRData.RaceTable.Races || [];
      var season = data.MRData.RaceTable.season;
      var today = new Date().toISOString().slice(0, 10);

      // 找到下一場未開始的比賽（今天或之後）
      var next = races.find(function (r) { return r.date && r.date >= today; }) || null;
      var simplified = next ? {
        round: next.round, raceName: next.raceName, date: next.date,
        circuitName: next.Circuit ? next.Circuit.circuitName : ""
      } : null;

      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ season: season, next: simplified, savedAt: Date.now() }));
      } catch (e) { /* ignore */ }

      render(season, simplified);
    })
    .catch(function () {
      // 沒有緩存時才顯示錯誤
      if (box.innerHTML.indexOf("下一站") === -1) {
        box.innerHTML = '<span class="cd-label">賽程載入失敗，請稍後刷新</span>';
      }
    });
})();

