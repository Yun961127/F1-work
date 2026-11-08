// ============================================================
// F1 檔案庫 —— 通用元件：回到頂部按鈕
// 所有頁面共用。
// ============================================================

(function () {
  "use strict";

  var btn = document.createElement("button");
  btn.className = "back-top";
  btn.setAttribute("aria-label", "回到頂部");
  btn.innerHTML = "&#8593;";
  btn.title = "回到頂部";
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
