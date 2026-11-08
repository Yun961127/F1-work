// ============================================================
// F1 檔案庫 —— 首頁：比賽狀態與倒計時（Jolpica F1 API）
// 顯示三行：
//   1. 上一站何時完賽
//   2. 本站（即將開賽）：< 24 小時顯示「還有 HH:MM:SS」即時倒數，否則顯示「還有 X 天」
//   3. 下一站：距離 X 天 X 小時
// 使用 localStorage 緩存賽程，減少 API 請求。
// ============================================================

(function () {
  "use strict";

  var box = document.getElementById("countdown");
  if (!box) return;

  var CACHE_KEY = "f1_countdown_v2";
  var CACHE_TTL = 60 * 60 * 1000; // 1 小時

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function zh(map, key, fallback) {
    if (window.F1_ZH && map && map[key]) return map[key];
    return fallback;
  }
  function zhRace(name) {
    return zh(window.F1_ZH.races, name, name);
  }
  function fmtMonthDay(iso) {
    var p = iso.split("-");
    return p.length === 3 ? parseInt(p[1], 10) + "月" + parseInt(p[2], 10) + "日" : iso;
  }
  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  // 解析 UTC 開賽時間 -> Date
  function raceStart(r) {
    // r.time 格式 "04:00:00Z"，r.date 格式 "2026-03-08"
    var t = (r.time || "12:00:00Z").replace("Z", "");
    return new Date(r.date + "T" + t + "Z");
  }

  var races = [];
  var timer = null;

  function render() {
    if (!races.length) return;

    var now = new Date();
    var todayStr = now.toISOString().slice(0, 10);

    // 上一站：最近一場已完賽（date < today）
    var prev = null;
    var upcoming = [];
    races.forEach(function (r) {
      if (r.date < todayStr) {
        if (!prev || r.date > prev.date) prev = r;
      } else {
        upcoming.push(r);
      }
    });
    upcoming.sort(function (a, b) { return a.date < b.date ? -1 : 1; });

    var cur = upcoming.length ? upcoming[0] : null;   // 本站
    var next = upcoming.length > 1 ? upcoming[1] : null; // 下一站

    var lines = [];

    // 上一站
    if (prev) {
      lines.push(
        '<div class="cd-row"><span class="cd-row-label">上一站</span>' +
        '<span class="cd-row-main">' + esc(zhRace(prev.raceName)) + '</span>' +
        '<span class="cd-row-sub">於 ' + fmtMonthDay(prev.date) + ' 完賽</span></div>'
      );
    }

    // 本站
    if (cur) {
      var start = raceStart(cur);
      var diff = start - now;
      var main, sub;
      if (diff <= 0) {
        main = "正在進行中！";
        sub = fmtMonthDay(cur.date) + " · " + esc(zh(window.F1_ZH.circuits, cur.circuitName, cur.circuitName));
      } else if (diff < 24 * 3600 * 1000) {
        var h = Math.floor(diff / 3600000);
        var m = Math.floor((diff % 3600000) / 60000);
        var s = Math.floor((diff % 60000) / 1000);
        main = '<span class="cd-countdown">' + pad(h) + ":" + pad(m) + ":" + pad(s) + '</span>';
        sub = "距離開賽 · " + fmtMonthDay(cur.date);
      } else {
        var days = Math.floor(diff / 86400000);
        main = "還有 " + days + " 天";
        sub = fmtMonthDay(cur.date) + " 開賽";
      }
      lines.push(
        '<div class="cd-row cd-row-cur"><span class="cd-row-label">本站</span>' +
        '<span class="cd-row-main">' + esc(zhRace(cur.raceName)) + '</span>' +
        '<span class="cd-row-sub">' + main + " · " + sub + '</span></div>'
      );
    }

    // 下一站
    if (next) {
      var start2 = raceStart(next);
      var diff2 = start2 - now;
      var days2 = Math.floor(diff2 / 86400000);
      var hours2 = Math.floor((diff2 % 86400000) / 3600000);
      lines.push(
        '<div class="cd-row"><span class="cd-row-label">下一站</span>' +
        '<span class="cd-row-main">' + esc(zhRace(next.raceName)) + '</span>' +
        '<span class="cd-row-sub">距離 ' + days2 + " 天 " + hours2 + ' 小時</span></div>'
      );
    }

    box.innerHTML = lines.join("");
  }

  function startTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(render, 1000); // 每秒刷新（本站倒數需要）
  }

  function load() {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        var c = JSON.parse(raw);
        if (c && c.races && c.races.length && Date.now() - c.savedAt < CACHE_TTL) {
          races = c.races;
          render();
          startTimer();
        }
      }
    } catch (e) { /* ignore */ }

    fetch("https://api.jolpi.ca/ergast/f1/current.json?limit=30")
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (data) {
        var list = data.MRData.RaceTable.Races || [];
        races = list.map(function (r) {
          return {
            date: r.date, time: r.time, raceName: r.raceName, round: r.round,
            circuitName: r.Circuit ? r.Circuit.circuitName : ""
          };
        });
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ races: races, savedAt: Date.now() }));
        } catch (e) { /* ignore */ }
        render();
        startTimer();
      })
      .catch(function () {
        if (box.innerHTML.indexOf("cd-row") === -1) {
          box.innerHTML = '<div class="cd-row"><span class="cd-row-label">賽程載入失敗，請稍後刷新</span></div>';
        }
      });
  }

  load();
})();
