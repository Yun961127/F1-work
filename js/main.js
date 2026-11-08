// ============================================================
// F1 档案库 —— 渲染逻辑
// 读取 js/data.js 中的 F1_DATA，渲染列表与详情。
// ============================================================

(function () {
  "use strict";

  const DATA = window.F1_DATA;
  const TYPE_NAMES = {
    teams: "车队历史",
    drivers: "车手历史",
    retired: "退役车手",
    moments: "历史名场面"
  };

  // ---------- 工具 ----------
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // 车队三字缩写（用于无图标时的占位图）
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

  // 车队名称 -> 队色（让车手占位图也显示所属车队颜色）
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

  // 车队图标：有 img/teams/{id}.png 则显示图片，否则显示「队色 + 缩写」占位圆标
  function teamLogo(t, size) {
    const code = TEAM_CODE[t.id] || t.name.slice(0, 3).toUpperCase();
    return `
      <span class="logo-wrap ${size}">
        <span class="logo-badge" style="--accent:${t.color}">${esc(code)}</span>
        <img class="logo-img contain-img" src="img/teams/${t.id}.png" alt="${esc(t.name)}" loading="lazy" onerror="this.style.display='none'">
      </span>`;
  }

  // 现役车手照片：有 img/drivers/{id}.jpg 则显示，否则显示「队色 + 车号」占位
  function driverPhoto(d, size) {
    const color = TEAM_COLOR[d.team] || "#3a3e4e";
    return `
      <span class="logo-wrap ${size}">
        <span class="logo-badge" style="--accent:${color}">#${esc(d.number)}</span>
        <img class="logo-img cover-img" src="img/drivers/${d.id}.jpg" alt="${esc(d.name)}" loading="lazy" onerror="this.style.display='none'">
      </span>`;
  }

  // 退役车手照片：无图片时显示「金色 + 姓名首字母」占位
  function retiredPhoto(r, size) {
    const initials = r.name.split(" ").map(function (w) { return w.charAt(0); }).join("").slice(0, 2).toUpperCase();
    return `
      <span class="logo-wrap ${size}">
        <span class="logo-badge" style="--accent:#C9A227">${esc(initials)}</span>
        <img class="logo-img cover-img" src="img/drivers/${r.id}.jpg" alt="${esc(r.name)}" loading="lazy" onerror="this.style.display='none'">
      </span>`;
  }

  // ---------- 列表页卡片 ----------
  function teamCard(t) {
    return `
      <a class="card" href="detail.html?type=teams&id=${t.id}" style="--accent:${t.color}">
        <div class="card-head">
          ${teamLogo(t, "sm")}
          <div class="card-head-text">
            <h3>${esc(t.name)}</h3>
            <span class="badge">${esc(t.country)}</span>
          </div>
        </div>
        <p class="sub">${esc(t.firstSeason)} 年参赛 · ${esc(t.engine)}</p>
        <p class="row"><b>车队冠军：</b>${esc(t.constructorTitles)}</p>
        <p class="row"><b>当前车手：</b>${esc(t.drivers)}</p>
      </a>`;
  }

  function driverCard(d) {
    return `
      <a class="card" href="detail.html?type=drivers&id=${d.id}" style="--accent:var(--accent)">
        <div class="card-head">
          ${driverPhoto(d, "sm")}
          <div class="card-head-text">
            <h3>${esc(d.name)}</h3>
            <span class="driver-number">#${esc(d.number)} · ${esc(d.country)}</span>
          </div>
        </div>
        <p class="sub">${esc(d.birthDate.substring(0, 4))} 年生 · 出道于 ${esc(d.debutYear)}</p>
        <p class="row"><b>当前车队：</b>${esc(d.team)}</p>
        <p class="row"><b>世界冠军：</b>${esc(d.championships)}</p>
      </a>`;
  }

  function retiredCard(r) {
    return `
      <a class="card" href="detail.html?type=retired&id=${r.id}" style="--accent:var(--accent)">
        <div class="card-head">
          ${retiredPhoto(r, "sm")}
          <div class="card-head-text">
            <h3>${esc(r.name)}</h3>
            <span class="badge">${esc(r.country)}</span>
          </div>
        </div>
        <p class="sub">${esc(r.birthYear)} 年生</p>
        <p class="row"><b>世界冠军：</b>${esc(r.championships)}</p>
        <p class="row"><b>分站冠军：</b>${esc(r.wins)}</p>
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

  // ---------- 名场面（列表页直接展示全文） ----------
  function momentCard(m) {
    return `
      <article class="moment-card">
        <div class="year">${esc(m.year)}</div>
        <h2>${esc(m.title)}</h2>
        <div class="event">📍 ${esc(m.event)}</div>
        <p class="summary">${esc(m.summary)}</p>
        <div class="significance"><b>历史意义：</b>${esc(m.significance)}</div>
      </article>`;
  }

  // ---------- 详情页 ----------
  function renderDetail() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const id = params.get("id");
    const root = document.getElementById("detail-root");
    if (!root) return;

    const list = DATA[type] || [];
    const item = list.find(function (i) { return i.id === id; });
    if (!item) {
      root.innerHTML = `<div class="container"><p>找不到该条目。</p><a class="back-link" href="index.html">← 返回首页</a></div>`;
      return;
    }

    document.title = item.name || item.title || "F1 档案库";
    const crumbs = `<a href="index.html">首页</a> / <a href="${type}.html">${TYPE_NAMES[type] || ""}</a> / ${esc(item.name || item.title)}`;
    document.getElementById("breadcrumb").innerHTML = crumbs;

    if (type === "teams") root.innerHTML = teamDetail(item);
    else if (type === "drivers") root.innerHTML = driverDetail(item);
    else if (type === "retired") root.innerHTML = retiredDetail(item);
    else if (type === "moments") root.innerHTML = momentDetail(item);
  }

  function teamDetail(t) {
    return `
      <a class="back-link" href="teams.html">← 返回车队列表</a>
      <div class="detail-card">
        <div class="detail-hero" style="background:linear-gradient(135deg, ${t.color}22, transparent 55%), var(--bg-soft)">
          <div class="hero-flex">
            ${teamLogo(t, "lg")}
            <div>
              <h1>${esc(t.name)}</h1>
              <div class="hero-sub">${esc(t.fullName)} · ${esc(t.country)}</div>
            </div>
          </div>
        </div>
        <div class="detail-body">
          <p>${esc(t.bio)}</p>
          <div class="section-title">基本资料</div>
          <div class="kv">
            <div class="item"><div class="k">国家</div><div class="v">${esc(t.country)}</div></div>
            <div class="item"><div class="k">基地</div><div class="v">${esc(t.base)}</div></div>
            <div class="item"><div class="k">首次参赛</div><div class="v">${esc(t.firstSeason)}</div></div>
            <div class="item"><div class="k">动力单元</div><div class="v">${esc(t.engine)}</div></div>
            <div class="item"><div class="k">车队冠军</div><div class="v">${esc(t.constructorTitles)}</div></div>
            <div class="item"><div class="k">当前车手</div><div class="v">${esc(t.drivers)}</div></div>
          </div>
          <div class="section-title">代表性车手</div>
          <div class="chip-list">
            ${t.notable.map(function (n) { return `<span class="chip">${esc(n)}</span>`; }).join("")}
          </div>
        </div>
      </div>`;
  }

  function driverDetail(d) {
    return `
      <a class="back-link" href="drivers.html">← 返回车手列表</a>
      <div class="detail-card">
        <div class="detail-hero">
          <div class="hero-flex">
            ${driverPhoto(d, "lg")}
            <div>
              <h1>#${esc(d.number)} ${esc(d.name)}</h1>
              <div class="hero-sub">${esc(d.country)} · ${esc(d.birthPlace)} · ${esc(d.debutYear)} 年出道</div>
            </div>
          </div>
        </div>
        <div class="detail-body">
          <p>${esc(d.bio)}</p>
          <div class="section-title">基本资料</div>
          <div class="kv">
            <div class="item"><div class="k">车号</div><div class="v">#${esc(d.number)}</div></div>
            <div class="item"><div class="k">国籍</div><div class="v">${esc(d.country)}</div></div>
            <div class="item"><div class="k">出生日期</div><div class="v">${esc(d.birthDate)}</div></div>
            <div class="item"><div class="k">出生地</div><div class="v">${esc(d.birthPlace)}</div></div>
            <div class="item"><div class="k">当前车队</div><div class="v">${esc(d.team)}</div></div>
            <div class="item"><div class="k">F1 出道</div><div class="v">${esc(d.debutYear)} 年</div></div>
            <div class="item"><div class="k">世界冠军</div><div class="v">${esc(d.championships)}</div></div>
          </div>
        </div>
      </div>`;
  }

  function retiredDetail(r) {
    return `
      <a class="back-link" href="retired.html">← 返回退役车手列表</a>
      <div class="detail-card">
        <div class="detail-hero">
          <div class="hero-flex">
            ${retiredPhoto(r, "lg")}
            <div>
              <h1>${esc(r.name)}</h1>
              <div class="hero-sub">${esc(r.country)} · ${esc(r.birthYear)} 年生</div>
            </div>
          </div>
        </div>
        <div class="detail-body">
          <p>${esc(r.bio)}</p>
          <div class="section-title">生涯成就</div>
          <div class="kv">
            <div class="item"><div class="k">世界冠军</div><div class="v">${esc(r.championships)}</div></div>
            <div class="item"><div class="k">分站冠军</div><div class="v">${esc(r.wins)}</div></div>
          </div>
        </div>
      </div>`;
  }

  function momentDetail(m) {
    return `
      <a class="back-link" href="moments.html">← 返回名场面列表</a>
      <div class="detail-card">
        <div class="detail-hero">
          <h1>${esc(m.title)}</h1>
          <div class="hero-sub">${esc(m.year)} · ${esc(m.event)}</div>
        </div>
        <div class="detail-body">
          <p>${esc(m.summary)}</p>
          <div class="significance"><b>历史意义：</b>${esc(m.significance)}</div>
        </div>
      </div>`;
  }

  // ---------- 入口 ----------
  if (document.body.dataset.page === "detail") {
    renderDetail();
  } else {
    renderGrid();
  }
})();
