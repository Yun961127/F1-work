// ============================================================
// F1 档案库 —— 排行榜 / 积分（Jolpica F1 API）
// 说明：纯前端 fetch，每 60 秒自动刷新，也可手动刷新。
// ============================================================

(function () {
  "use strict";

  var API_BASE = "https://api.jolpi.ca/ergast/f1/current";
  var currentType = "drivers";

  // 国籍中文化映射
  var NAT = {
    British: "英国", German: "德国", Italian: "意大利", Austrian: "奥地利",
    French: "法国", American: "美国", Swiss: "瑞士", Japanese: "日本",
    Australian: "澳大利亚", Dutch: "荷兰", Spanish: "西班牙", Monegasque: "摩纳哥",
    Canadian: "加拿大", Thai: "泰国", Brazilian: "巴西", Finnish: "芬兰",
    Mexican: "墨西哥", Danish: "丹麦", "New Zealander": "新西兰", Chinese: "中国",
    Argentine: "阿根廷", Belgian: "比利时", Swedish: "瑞典", Russian: "俄罗斯"
  };

  function $(sel) { return document.querySelector(sel); }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function nat(n) { return NAT[n] || n || "—"; }

  // 车手 / 车队名称 + 中文译名
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
    $("#tbody").innerHTML = '<tr><td colspan="5" class="loading">加载中…</td></tr>';

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
        if (!list) throw new Error("本赛季暂无积分数据");

        var season = list.season;
        var round = parseInt(list.round, 10);
        var rows = type === "drivers"
          ? (list.DriverStandings || [])
          : (list.ConstructorStandings || []);

        $("#season-info").textContent = season + " 赛季 · 第 " + round + " 轮后";
        $("#updated").textContent =
          "最后更新：" + new Date().toLocaleTimeString("zh-TW", { hour12: false });

        // 再取上一轮积分，计算名次变化（↑↓）
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
        $("#error").textContent = "加载失败：" + e.message + "（请检查网络后点击刷新重试）";
        $("#updated").textContent = "";
      });
  }

  function renderStandings(type, rows, prev) {
    // prev: 上一轮的行，用于计算名次变化
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

  // 名次变化标记：之前名次 > 现在名次 = 上升
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
      '<tr><th>排名</th><th>车手</th><th>车队</th><th class="num">积分</th><th class="num">胜场</th></tr>';
    $("#tbody").innerHTML = rows.map(function (r) {
      var team = (r.Constructors && r.Constructors[0] && r.Constructors[0].name) || "—";
      var num = r.Driver.permanentNumber || "—";
      var cur = parseInt(r.position, 10);
      var gap = lead - parseInt(r.points, 10);
      var gapText = cur === 1
        ? '<span class="gap lead">领跑</span>'
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
      '<tr><th>排名</th><th>车队</th><th>国籍</th><th class="num">积分</th><th class="num">胜场</th></tr>';
    $("#tbody").innerHTML = rows.map(function (r) {
      var cur = parseInt(r.position, 10);
      var gap = lead - parseInt(r.points, 10);
      var gapText = cur === 1
        ? '<span class="gap lead">领跑</span>'
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

  // 事件绑定
  document.querySelectorAll(".tab").forEach(function (b) {
    b.addEventListener("click", function () { load(b.dataset.type); });
  });
  $("#refresh").addEventListener("click", function () { load(currentType); });

  // 初始加载 + 每 60 秒自动刷新
  load("drivers");
  setInterval(function () { load(currentType); }, 60000);
})();
