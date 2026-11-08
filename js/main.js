// ============================================================
// F1 檔案庫 —— 渲染邏輯
// 讀取 js/data.js 中的 F1_DATA，渲染列表與詳情。
// ============================================================

(function () {
  "use strict";

  const DATA = window.F1_DATA;
  const TYPE_NAMES = {
    teams: "車隊歷史",
    drivers: "車手歷史",
    retired: "退役車手",
    moments: "歷史名場面"
  };

  // ---------- 工具 ----------
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // 名稱 + 官方中文譯名，例如「Max Verstappen（馬克斯・維斯塔潘）」
  function withZh(name, dict) {
    const zh = dict && dict[name];
    return zh
      ? esc(name) + ' <span class="zh">（' + esc(zh) + '）</span>'
      : esc(name);
  }
  function teamName(t) { return withZh(t.name, window.F1_ZH && window.F1_ZH.teams); }
  function driverName(d) { return withZh(d.name, window.F1_ZH && window.F1_ZH.drivers); }

  // 車隊三字縮寫（用於無圖標時的佔位圖）
  const TEAM_CODE = {
    "red-bull": "RBR",
    "ferrari": "FER",
    "mclaren": "MCL",
    "mercedes": "MER",
    "aston-martin": "AMR",
    "alpine": "ALP",
    "williams": "WIL",
    "racing-bulls": "RBF",
    "haas": "HAS",
    "audi": "AUD",
    "cadillac": "CAD"
  };

  // 車隊名稱 -> 隊色（讓車手佔位圖也顯示所屬車隊顏色）
  const TEAM_COLOR = {
    "Red Bull": "#3671C6",
    "Ferrari": "#E8002D",
    "McLaren": "#FF8000",
    "Mercedes": "#27F4D2",
    "Aston Martin": "#229971",
    "Alpine": "#0093CC",
    "Williams": "#64C4FF",
    "RB F1 Team": "#6692FF",
    "Haas": "#B6BABD",
    "Audi": "#BB0A30",
    "Cadillac": "#C5B47D"
  };

  // 車隊名稱 -> 車隊 id（用於詳情頁互鏈）
  const TEAM_ID_BY_NAME = {
    "Red Bull": "red-bull",
    "Ferrari": "ferrari",
    "McLaren": "mclaren",
    "Mercedes": "mercedes",
    "Aston Martin": "aston-martin",
    "Alpine": "alpine",
    "Williams": "williams",
    "RB F1 Team": "racing-bulls",
    "Haas": "haas",
    "Audi": "audi",
    "Cadillac": "cadillac"
  };

  // 根據車隊 id 找出當前陣容（用於車隊詳情頁顯示車手鍊接）
  function driversOfTeam(teamId) {
    return DATA.drivers.filter(function (d) {
      return TEAM_ID_BY_NAME[d.team] === teamId;
    });
  }

  function driverLink(d) {
    return '<a class="detail-link" href="detail.html?type=drivers&id=' + d.id + '">' + esc(d.name) + '</a>';
  }

  // 車隊圖標：有 img/teams/{id}.png 則顯示圖片，否則顯示「隊色 + 縮寫」佔位圓標
  function teamLogo(t, size) {
    const code = TEAM_CODE[t.id] || t.name.slice(0, 3).toUpperCase();
    return `
      <span class="logo-wrap ${size}">
        <span class="logo-badge" style="--accent:${t.color}">${esc(code)}</span>
        <img class="logo-img contain-img" src="img/teams/${t.id}.png" alt="${esc(t.name)}" loading="lazy" onerror="this.style.display='none'">
      </span>`;
  }

  // 現役車手照片：有 img/drivers/{id}.jpg 則顯示，否則顯示「隊色 + 車號」佔位
  function driverPhoto(d, size) {
    const color = TEAM_COLOR[d.team] || "#3a3e4e";
    return `
      <span class="logo-wrap ${size}">
        <span class="logo-badge" style="--accent:${color}">#${esc(d.number)}</span>
        <img class="logo-img cover-img" src="img/drivers/${d.id}.jpg" alt="${esc(d.name)}" loading="lazy" onerror="this.style.display='none'">
      </span>`;
  }

  // 退役車手照片：無圖片時顯示「金色 + 姓名首字母」佔位
  function retiredPhoto(r, size) {
    const initials = r.name.split(" ").map(function (w) { return w.charAt(0); }).join("").slice(0, 2).toUpperCase();
    return `
      <span class="logo-wrap ${size}">
        <span class="logo-badge" style="--accent:#C9A227">${esc(initials)}</span>
        <img class="logo-img cover-img" src="img/drivers/${r.id}.jpg" alt="${esc(r.name)}" loading="lazy" onerror="this.style.display='none'">
      </span>`;
  }

  // ---------- 列表頁卡片 ----------
  function teamCard(t) {
    return `
      <a class="card" href="detail.html?type=teams&id=${t.id}" style="--accent:${t.color}">
        <div class="card-head">
          ${teamLogo(t, "sm")}
          <div class="card-head-text">
            <h3>${teamName(t)}</h3>
            <span class="badge">${esc(t.country)}</span>
          </div>
        </div>
        <p class="sub">${esc(t.firstSeason)} 年參賽 · ${esc(t.engine)}</p>
        <p class="row"><b>車隊冠軍：</b>${esc(t.constructorTitles)}</p>
        <p class="row"><b>當前車手：</b>${esc(t.drivers)}</p>
      </a>`;
  }

  function driverCard(d) {
    return `
      <a class="card" href="detail.html?type=drivers&id=${d.id}" style="--accent:var(--accent)">
        <div class="card-head">
          ${driverPhoto(d, "sm")}
          <div class="card-head-text">
            <h3>${driverName(d)}</h3>
            <span class="driver-number">#${esc(d.number)} · ${esc(d.country)}</span>
          </div>
        </div>
        <p class="sub">${esc(d.birthDate.substring(0, 4))} 年生 · 出道於 ${esc(d.debutYear)}</p>
        <p class="row"><b>當前車隊：</b>${esc(d.team)}</p>
        <p class="row"><b>世界冠軍：</b>${esc(d.championships)}</p>
      </a>`;
  }

  function retiredCard(r) {
    return `
      <a class="card" href="detail.html?type=retired&id=${r.id}" style="--accent:var(--accent)">
        <div class="card-head">
          ${retiredPhoto(r, "sm")}
          <div class="card-head-text">
            <h3>${driverName(r)}</h3>
            <span class="badge">${esc(r.country)}</span>
          </div>
        </div>
        <p class="sub">${esc(r.birthYear)} 年生</p>
        <p class="row"><b>世界冠軍：</b>${esc(r.championships)}</p>
        <p class="row"><b>分站冠軍：</b>${esc(r.wins)}</p>
      </a>`;
  }

  function renderGrid() {
    const page = document.body.dataset.page;
    if (!page || !DATA[page]) return;
    const grid = document.getElementById("grid");
    if (!grid) return;

    let html = "";
    if (page === "teams") DATA.teams.forEach(function (t) { html += teamCard(t); });
    else if (page === "drivers") DATA.drivers.forEach(function (d) { html += driverCard(d); });
    else if (page === "retired") DATA.retired.forEach(function (r) { html += retiredCard(r); });
    else if (page === "moments") DATA.moments.forEach(function (m) { html += momentCard(m); });

    grid.innerHTML = html;
  }

  // ---------- 名場面（列表頁直接展示全文） ----------
  function momentCard(m) {
    return `
      <article class="moment-card">
        <div class="year">${esc(m.year)}</div>
        <h2>${esc(m.title)}</h2>
        <div class="event">📍 ${esc(m.event)}</div>
        <p class="summary">${esc(m.summary)}</p>
        <div class="significance"><b>歷史意義：</b>${esc(m.significance)}</div>
      </article>`;
  }

  // ---------- 詳情頁 ----------
  function renderDetail() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const id = params.get("id");
    const root = document.getElementById("detail-root");
    if (!root) return;

    const list = DATA[type] || [];
    const item = list.find(function (i) { return i.id === id; });
    if (!item) {
      root.innerHTML = `<div class="container"><p>找不到該條目。</p><a class="back-link" href="index.html">← 返回首頁</a></div>`;
      return;
    }

    document.title = item.name || item.title || "F1 檔案庫";
    const crumbs = `<a href="index.html">首頁</a> / <a href="${type}.html">${TYPE_NAMES[type] || ""}</a> / ${esc(item.name || item.title)}`;
    document.getElementById("breadcrumb").innerHTML = crumbs;

    if (type === "teams") root.innerHTML = teamDetail(item);
    else if (type === "drivers") root.innerHTML = driverDetail(item);
    else if (type === "retired") root.innerHTML = retiredDetail(item);
    else if (type === "moments") root.innerHTML = momentDetail(item);
  }

  function teamDetail(t) {
    return `
      <a class="back-link" href="teams.html">← 返回車隊列表</a>
      <div class="detail-card">
        <div class="detail-hero" style="background:linear-gradient(135deg, ${t.color}22, transparent 55%), var(--bg-soft)">
          <div class="hero-flex">
            ${teamLogo(t, "lg")}
            <div>
              <h1>${teamName(t)}</h1>
              <div class="hero-sub">${esc(t.fullName)} · ${esc(t.country)}</div>
            </div>
          </div>
        </div>
        <div class="detail-body">
          <p>${esc(t.bio)}</p>
          <div class="section-title">基本資料</div>
          <div class="kv">
            <div class="item"><div class="k">國家</div><div class="v">${esc(t.country)}</div></div>
            <div class="item"><div class="k">基地</div><div class="v">${esc(t.base)}</div></div>
            <div class="item"><div class="k">首次參賽</div><div class="v">${esc(t.firstSeason)}</div></div>
            <div class="item"><div class="k">動力單元</div><div class="v">${esc(t.engine)}</div></div>
            <div class="item"><div class="k">車隊冠軍</div><div class="v">${esc(t.constructorTitles)}</div></div>
            <div class="item"><div class="k">當前車手</div><div class="v">${driversOfTeam(t.id).map(driverLink).join("、") || esc(t.drivers)}</div></div>
          </div>
          <div class="section-title">代表性車手</div>
          <div class="chip-list">
            ${t.notable.map(function (n) { return `<span class="chip">${esc(n)}</span>`; }).join("")}
          </div>
        </div>
      </div>`;
  }

  function driverDetail(d) {
    return `
      <a class="back-link" href="drivers.html">← 返回車手列表</a>
      <div class="detail-card">
        <div class="detail-hero">
          <div class="hero-flex">
            ${driverPhoto(d, "lg")}
            <div>
              <h1>#${esc(d.number)} ${driverName(d)}</h1>
              <div class="hero-sub">${esc(d.country)} · ${esc(d.birthPlace)} · ${esc(d.debutYear)} 年出道</div>
            </div>
          </div>
        </div>
        <div class="detail-body">
          <p>${esc(d.bio)}</p>
          <div class="section-title">基本資料</div>
          <div class="kv">
            <div class="item"><div class="k">車號</div><div class="v">#${esc(d.number)}</div></div>
            <div class="item"><div class="k">國籍</div><div class="v">${esc(d.country)}</div></div>
            <div class="item"><div class="k">出生日期</div><div class="v">${esc(d.birthDate)}</div></div>
            <div class="item"><div class="k">出生地</div><div class="v">${esc(d.birthPlace)}</div></div>
            <div class="item"><div class="k">當前車隊</div><div class="v">${TEAM_ID_BY_NAME[d.team] ? '<a class="detail-link" href="detail.html?type=teams&id=' + TEAM_ID_BY_NAME[d.team] + '">' + esc(d.team) + '</a>' : esc(d.team)}</div></div>
            <div class="item"><div class="k">F1 出道</div><div class="v">${esc(d.debutYear)} 年</div></div>
            <div class="item"><div class="k">世界冠軍</div><div class="v">${esc(d.championships)}</div></div>
          </div>
        </div>
      </div>`;
  }

  function retiredDetail(r) {
    return `
      <a class="back-link" href="retired.html">← 返回退役車手列表</a>
      <div class="detail-card">
        <div class="detail-hero">
          <div class="hero-flex">
            ${retiredPhoto(r, "lg")}
            <div>
              <h1>${driverName(r)}</h1>
              <div class="hero-sub">${esc(r.country)} · ${esc(r.birthYear)} 年生</div>
            </div>
          </div>
        </div>
        <div class="detail-body">
          <p>${esc(r.bio)}</p>
          <div class="section-title">生涯成就</div>
          <div class="kv">
            <div class="item"><div class="k">世界冠軍</div><div class="v">${esc(r.championships)}</div></div>
            <div class="item"><div class="k">分站冠軍</div><div class="v">${esc(r.wins)}</div></div>
          </div>
        </div>
      </div>`;
  }

  function momentDetail(m) {
    return `
      <a class="back-link" href="moments.html">← 返回名場面列表</a>
      <div class="detail-card">
        <div class="detail-hero">
          <h1>${esc(m.title)}</h1>
          <div class="hero-sub">${esc(m.year)} · ${esc(m.event)}</div>
        </div>
        <div class="detail-body">
          <p>${esc(m.summary)}</p>
          <div class="significance"><b>歷史意義：</b>${esc(m.significance)}</div>
        </div>
      </div>`;
  }

  // ---------- 列表頁搜索過濾 ----------
  function initSearch() {
    const input = document.getElementById("search");
    if (!input) return;
    const grid = document.getElementById("grid");
    input.addEventListener("input", function () {
      const q = this.value.trim().toLowerCase();
      Array.prototype.forEach.call(grid.children, function (el) {
        el.style.display = (q === "" || el.textContent.toLowerCase().indexOf(q) !== -1) ? "" : "none";
      });
    });
  }

  // ---------- 入口 ----------
  if (document.body.dataset.page === "detail") {
    renderDetail();
  } else {
    renderGrid();
    initSearch();
  }
})();
