// ============================================================
// F1 档案库 —— 首页：下一站比赛倒计时（Jolpica F1 API）
// ============================================================

(function () {
  "use strict";

  var box = document.getElementById("countdown");
  if (!box) return;

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

  fetch("https://api.jolpi.ca/ergast/f1/current.json?limit=30")
    .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(function (data) {
      var races = data.MRData.RaceTable.Races || [];
      var today = new Date().toISOString().slice(0, 10);

      // 找到下一场未开始的比赛（今天或之后）
      var next = races.find(function (r) { return r.date && r.date >= today; });
      if (!next) {
        box.innerHTML = '<span class="cd-label">本赛季赛程已结束</span><span class="cd-race">' +
          (races.length ? data.MRData.RaceTable.season + " 赛季 · 共 " + races.length + " 站" : "等待新赛季") + '</span>';
        return;
      }

      var diff = dayDiff(next.date);
      var diffText;
      if (diff === 0) diffText = "今天开赛！";
      else if (diff === 1) diffText = "明天开赛";
      else diffText = "还有 <b>" + diff + "</b> 天";

      box.innerHTML =
        '<span class="cd-label">下一站</span>' +
        '<span class="cd-race">R' + next.round + " · " + next.raceName + '</span>' +
        '<span class="cd-days">' + diffText + '</span>' +
        '<span class="cd-date">' + fmtMonthDay(next.date) + " · " +
        (next.Circuit ? next.Circuit.circuitName : "") + '</span>';
    })
    .catch(function () {
      box.innerHTML = '<span class="cd-label">赛程加载失败，请稍后刷新</span>';
    });
})();
