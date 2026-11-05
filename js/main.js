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

  // ---------- 列表页卡片 ----------
  function teamCard(t) {
    return `
      <a class="card" href="detail.html?type=teams&id=${t.id}" style="--accent:${t.color}">
        <span class="badge">${esc(t.country)}</span>
        <h3>${esc(t.name)}</h3>
        <p class="sub">${esc(t.firstSeason)} 年参赛 · ${esc(t.engine)}</p>
        <p class="row"><b>车队冠军：</b>${esc(t.constructorTitles)}</p>
        <p class="row"><b>2025 车手：</b>${esc(t.drivers2025)}</p>
      </a>`;
  }

  function driverCard(d) {
    return `
      <a class="card" href="detail.html?type=drivers&id=${d.id}" style="--accent:var(--accent)">
        <span class="driver-number">#${esc(d.number)}</span>
        <h3>${esc(d.name)}</h3>
        <p class="sub">${esc(d.country)} · ${esc(d.birthYear)} 年生</p>
        <p class="row"><b>2025 车队：</b>${esc(d.team2025)}</p>
        <p class="row"><b>世界冠军：</b>${esc(d.championships)}</p>
      </a>`;
  }

  function retiredCard(r) {
    return `
      <a class="card" href="detail.html?type=retired&id=${r.id}" style="--accent:var(--accent)">
        <span class="badge">${esc(r.country)}</span>
        <h3>${esc(r.name)}</h3>
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
          <h1>${esc(t.name)}</h1>
          <div class="hero-sub">${esc(t.fullName)} · ${esc(t.country)}</div>
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
            <div class="item"><div class="k">2025 车手</div><div class="v">${esc(t.drivers2025)}</div></div>
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
          <h1>#${esc(d.number)} ${esc(d.name)}</h1>
          <div class="hero-sub">${esc(d.country)} · ${esc(d.birthYear)} 年生</div>
        </div>
        <div class="detail-body">
          <p>${esc(d.bio)}</p>
          <div class="section-title">基本资料</div>
          <div class="kv">
            <div class="item"><div class="k">车号</div><div class="v">#${esc(d.number)}</div></div>
            <div class="item"><div class="k">国籍</div><div class="v">${esc(d.country)}</div></div>
            <div class="item"><div class="k">出生年份</div><div class="v">${esc(d.birthYear)}</div></div>
            <div class="item"><div class="k">2025 车队</div><div class="v">${esc(d.team2025)}</div></div>
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
          <h1>${esc(r.name)}</h1>
          <div class="hero-sub">${esc(r.country)} · ${esc(r.birthYear)} 年生</div>
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
