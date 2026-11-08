// ============================================================
// F1 档案库 —— 通用元件：回到顶部按钮
// 所有页面共用。
// ============================================================

(function () {
  "use strict";

  var btn = document.createElement("button");
  btn.className = "back-top";
  btn.setAttribute("aria-label", "回到顶部");
  btn.innerHTML = "&#8593;";
  btn.title = "回到顶部";
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(btn);

  function onScroll() {
    if (window.scrollY > 400) btn.classList.add("show");
    else btn.classList.remove("show");
  }
  window.addEventListener("scroll", onScroll);
  onScroll();
})();
