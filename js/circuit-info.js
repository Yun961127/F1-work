// ============================================================
// F1 檔案庫 —— 賽道基本資訊（靜態資料，來源：維基百科公開資訊）
// 以 circuitId 為索引（而非輪次），這樣賽道換到其他分站時資料仍能正確對應；
// 若某站換成新賽道、找不到資料，則只顯示 API 提供的名稱/地點，長度圈數留空。
// ============================================================

window.CIRCUIT_INFO = {
  albert_park:    { km: "5.278", laps: "58" },
  shanghai:       { km: "5.451", laps: "56" },
  suzuka:         { km: "5.807", laps: "53" },
  miami:          { km: "5.412", laps: "57" },
  villeneuve:     { km: "4.361", laps: "68" },
  monaco:         { km: "3.337", laps: "78" },
  catalunya:      { km: "4.657", laps: "66" },
  red_bull_ring:  { km: "4.326", laps: "71" },
  silverstone:    { km: "5.891", laps: "52" },
  spa:            { km: "7.004", laps: "44" },
  hungaroring:    { km: "4.381", laps: "70" },
  zandvoort:      { km: "4.259", laps: "72" },
  monza:          { km: "5.793", laps: "53" },
  madring:        { km: "5.414", laps: "57" },
  baku:           { km: "6.003", laps: "51" },
  sepang:         { km: "5.543", laps: "56" },
  marina_bay:     { km: "4.927", laps: "62" },
  americas:       { km: "5.513", laps: "56" },
  rodriguez:      { km: "4.304", laps: "71" },
  interlagos:     { km: "4.309", laps: "71" },
  vegas:          { km: "6.201", laps: "50" },
  losail:         { km: "5.419", laps: "57" },
  yas_marina:     { km: "5.281", laps: "58" }
};
