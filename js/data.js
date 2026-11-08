// ============================================================
// F1 檔案庫 —— 固定資訊數據（車隊 / 車手 / 退役車手 / 歷史名場面）
// 說明：歷史類資訊直接寫死在此文件，不需要數據庫。
// 陣容以 2026 賽季為準，與排行榜 API 數據一致。
// ============================================================

window.F1_DATA = {
  // ---------------- 車隊歷史（2026 賽季 11 支） ----------------
  teams: [
    {
      id: "red-bull",
      name: "Red Bull Racing",
      fullName: "Oracle Red Bull Racing",
      country: "奧地利",
      base: "英國 米爾頓凱恩斯 (Milton Keynes)",
      firstSeason: 2005,
      engine: "Honda RBPT",
      drivers: "Max Verstappen、Isack Hadjar",
      constructorTitles: "6 次（2010–2013、2022–2023）",
      bio: "2004 年底紅牛收購 Jaguar 車隊，2005 年以 Red Bull Racing 之名正式參賽。2010–2013 年 Sebastian Vettel 完成四連冠，2021–2024 年 Max Verstappen 再奪四連冠，是 21 世紀最成功的車隊之一。",
      notable: ["Sebastian Vettel", "Max Verstappen", "Daniel Ricciardo", "Mark Webber"],
      color: "#3671C6"
    },
    {
      id: "ferrari",
      name: "Ferrari",
      fullName: "Scuderia Ferrari HP",
      country: "義大利",
      base: "義大利 馬拉內羅 (Maranello)",
      firstSeason: 1950,
      engine: "Ferrari",
      drivers: "Charles Leclerc、Lewis Hamilton",
      constructorTitles: "16 次（歷史最多）",
      bio: "F1 歷史上唯一自 1950 年元年參賽至今從未缺席的車隊，也是最具傳奇色彩的品牌。共贏得 16 次車隊冠軍，Fangio、Lauda、Schumacher 等傳奇先後在此寫下輝煌。",
      notable: ["Michael Schumacher", "Niki Lauda", "Kimi Räikkönen", "Alberto Ascari"],
      color: "#E8002D"
    },
    {
      id: "mclaren",
      name: "McLaren",
      fullName: "McLaren Formula 1 Team",
      country: "英國",
      base: "英國 沃金 (Woking)",
      firstSeason: 1966,
      engine: "Mercedes",
      drivers: "Lando Norris、Oscar Piastri",
      constructorTitles: "9 次（最近一次 2024）",
      bio: "1963 年由紐西蘭車手 Bruce McLaren 創立，1966 年進軍 F1。曾與 Senna、Prost、Häkkinen、Hamilton 等巨星合作，2024 年擊敗紅牛重返車隊冠軍，2025 年 Norris 更進一步摘下車手冠軍。",
      notable: ["Ayrton Senna", "Alain Prost", "Lewis Hamilton", "Lando Norris"],
      color: "#FF8000"
    },
    {
      id: "mercedes",
      name: "Mercedes",
      fullName: "Mercedes-AMG Petronas Formula One Team",
      country: "德國",
      base: "英國 布拉克利 (Brackley)",
      firstSeason: 1954,
      engine: "Mercedes",
      drivers: "George Russell、Kimi Antonelli",
      constructorTitles: "8 次（2014–2021 八連霸）",
      bio: "1954 年首度參賽，2010 年以廠隊身份重返 F1。2014–2021 年連續八年包攬車隊冠軍，Hamilton 在此期間六度封王。2026 年憑藉全新動力單元重回爭冠行列，Antonelli 領跑積分榜。",
      notable: ["Lewis Hamilton", "Nico Rosberg", "Michael Schumacher", "George Russell"],
      color: "#27F4D2"
    },
    {
      id: "aston-martin",
      name: "Aston Martin",
      fullName: "Aston Martin Aramco Formula One Team",
      country: "英國",
      base: "英國 銀石 (Silverstone)",
      firstSeason: 2021,
      engine: "Mercedes",
      drivers: "Fernando Alonso、Lance Stroll",
      constructorTitles: "0 次（尚未奪冠）",
      bio: "前身為 Jordan（1991）→ Force India（2008）→ Racing Point（2018），2021 年以 Aston Martin 之名回歸圍場。2023 年 Alonso 多次登台創下近年最佳戰績，車隊持續為爭冠投入。",
      notable: ["Fernando Alonso", "Sebastian Vettel", "Lance Stroll"],
      color: "#229971"
    },
    {
      id: "alpine",
      name: "Alpine",
      fullName: "BWT Alpine F1 Team",
      country: "法國",
      base: "英國 恩斯通 (Enstone)",
      firstSeason: 2021,
      engine: "Renault",
      drivers: "Pierre Gasly、Franco Colapinto",
      constructorTitles: "0 次（前身 Renault 曾於 2005–2006 奪冠）",
      bio: "Renault 廠隊的後續形態，2021 年更名為 Alpine。以 Renault 之名曾在 2005–2006 年與 Alonso 連奪雙冠，目前處於重建與年輕化階段。",
      notable: ["Fernando Alonso", "Pierre Gasly", "Esteban Ocon"],
      color: "#0093CC"
    },
    {
      id: "williams",
      name: "Williams",
      fullName: "Williams Racing",
      country: "英國",
      base: "英國 格羅夫 (Grove)",
      firstSeason: 1977,
      engine: "Mercedes",
      drivers: "Alexander Albon、Carlos Sainz",
      constructorTitles: "9 次",
      bio: "1977 年由 Frank Williams 創立的老牌豪門，1980–1990 年代是圍場絕對霸主之一，共 9 次車隊冠軍、7 次車手冠軍。經歷長期低谷後近年正逐步復甦。",
      notable: ["Nigel Mansell", "Ayrton Senna", "Damon Hill", "Alain Prost"],
      color: "#64C4FF"
    },
    {
      id: "racing-bulls",
      name: "RB F1 Team",
      fullName: "Visa Cash App Racing Bulls F1 Team",
      country: "義大利",
      base: "義大利 法恩扎 (Faenza)",
      firstSeason: 2006,
      engine: "Honda RBPT",
      drivers: "Yuki Tsunoda、Liam Lawson、Arvid Lindblad",
      constructorTitles: "0 次（尚未奪冠）",
      bio: "紅牛青年隊，前身為 Minardi（1985），2006 年成為 Toro Rosso，2020 年更名 AlphaTauri，2024 年再更名為 RB。Vettel 2008 年在這裡贏下隊史首勝，持續為紅牛輸送青年才俊。",
      notable: ["Sebastian Vettel", "Max Verstappen", "Yuki Tsunoda", "Arvid Lindblad"],
      color: "#6692FF"
    },
    {
      id: "haas",
      name: "Haas",
      fullName: "MoneyGram Haas F1 Team",
      country: "美國",
      base: "美國 卡納波利斯 (Kannapolis)",
      firstSeason: 2016,
      engine: "Ferrari",
      drivers: "Esteban Ocon、Oliver Bearman、Ryo Hirakawa",
      constructorTitles: "0 次（尚未奪冠）",
      bio: "2016 年由美國商人 Gene Haas 創立的美國車隊，總部位於北卡羅來納州。與法拉利深度技術合作，是美國在 F1 的代表力量，以務實的小團隊模式立足圍場。",
      notable: ["Kevin Magnussen", "Romain Grosjean", "Esteban Ocon"],
      color: "#B6BABD"
    },
    {
      id: "audi",
      name: "Audi",
      fullName: "Audi F1 Team",
      country: "德國",
      base: "瑞士 欣維爾 (Hinwil)",
      firstSeason: 2026,
      engine: "Audi",
      drivers: "Nico Hülkenberg、Gabriel Bortoleto",
      constructorTitles: "0 次（前身 Sauber 亦未奪冠）",
      bio: "德國汽車品牌 Audi 於 2026 年以廠隊身份正式進軍 F1，收購 1993 年創立的瑞士 Sauber 車隊改造而成。運營基地位於欣維爾，引擎部門位於德國諾伊堡，肩負德國製造商的榮耀重返頂級賽場。",
      notable: ["Nico Hülkenberg", "Gabriel Bortoleto", "Kimi Räikkönen"],
      color: "#BB0A30"
    },
    {
      id: "cadillac",
      name: "Cadillac",
      fullName: "Cadillac F1 Team",
      country: "美國",
      base: "美國",
      firstSeason: 2026,
      engine: "Ferrari",
      drivers: "Valtteri Bottas、Sergio Pérez",
      constructorTitles: "0 次（新軍）",
      bio: "通用汽車旗下 Cadillac 品牌於 2026 年正式加入 F1，成為圍場第 11 支車隊。由 TWG Motorsports 運營，使用法拉利客戶引擎，目標是讓美國品牌在 F1 站穩腳跟並逐步成長。",
      notable: ["Valtteri Bottas", "Sergio Pérez"],
      color: "#C5B47D"
    }
  ],

  // ---------------- 現役車手（2026 賽季 24 位） ----------------
  drivers: [
    {
      id: "kimi-antonelli",
      name: "Kimi Antonelli",
      number: 12,
      country: "義大利",
      birthDate: "2006-08-25",
      birthPlace: "博洛尼亞",
      team: "Mercedes",
      debutYear: 2025,
      championships: "暫無",
      bio: "被梅賽德斯寄予厚望的義大利天才，從卡丁車時代起就被媒體冠以「下一個 Verstappen」的名號。他跳過 F2 直接空降 F1 的大膽路線，讓他在 2025 年一登場就成為圍場焦點。2026 賽季他迅速兌現天賦，多次奪冠並長期領跑積分榜，冷靜的頭腦與犀利的單圈速度讓對手望而生畏。如今他正朝著自己的第一座世界冠軍全速前進。"
    },
    {
      id: "max-verstappen",
      name: "Max Verstappen",
      number: 3,
      country: "荷蘭",
      birthDate: "1997-09-30",
      birthPlace: "哈瑟爾特（比利時）",
      team: "Red Bull",
      debutYear: 2015,
      championships: "4 次世界冠軍（2021–2024）",
      bio: "出生於賽車世家，父親 Jos 曾是 F1 車手，Max 幾乎是為速度而生。2015 年他以 17 歲之齡打破最年輕參賽紀錄，2016 年升入紅牛首戰即在西班牙奪冠，震驚世界。2021 年他在阿布扎比最後一圈擊敗 Hamilton 首度封王，此後完成四連冠。侵略性十足又極度穩定的駕駛風格，讓他成為這個時代最具統治力的車手。"
    },
    {
      id: "lewis-hamilton",
      name: "Lewis Hamilton",
      number: 44,
      country: "英國",
      birthDate: "1985-01-07",
      birthPlace: "斯蒂文尼奇",
      team: "Ferrari",
      debutYear: 2007,
      championships: "7 次世界冠軍（2008、2014–2015、2017–2020）",
      bio: "出身工薪家庭的英國車手，2007 年以新秀身份險些奪冠，2008 年最後一彎的絕殺讓他成為史上最年輕的世界冠軍之一。他在梅賽德斯寫下七冠神話，並推動 F1 在多元、平等議題上的改變。2025 年他加盟兒時偶像法拉利，圓了少年時代的夢想。如今他仍在追逐史無前例的第八座世界冠軍。"
    },
    {
      id: "george-russell",
      name: "George Russell",
      number: 63,
      country: "英國",
      birthDate: "1998-02-15",
      birthPlace: "國王林恩",
      team: "Mercedes",
      debutYear: 2019,
      championships: "暫無",
      bio: "英國車手，以排位賽的極限單圈聞名，曾在威廉姆斯時期多次把弱勢賽車開進 Q2、Q3。2022 年加盟梅賽德斯後逐漸成長為車隊核心，2024 年兩奪分站冠軍。他口才出眾、思維清晰，被普遍視為梅賽德斯後 Hamilton 時代的領軍人物。2026 年他與新秀 Antonelli 聯手，向車隊冠軍發起衝擊。"
    },
    {
      id: "charles-leclerc",
      name: "Charles Leclerc",
      number: 16,
      country: "摩納哥",
      birthDate: "1997-10-16",
      birthPlace: "蒙特卡洛",
      team: "Ferrari",
      debutYear: 2018,
      championships: "暫無",
      bio: "摩納哥車手，法拉利青訓體系的驕傲，自幼在蒙特卡洛的街道間長大。2019 年加盟法拉利後迅速成為車隊核心，以排位賽的極限單圈著稱。他曾在 2020 年疫情後的特殊賽季為法拉利扛起大旗，也多次在家門口蒙地卡洛留下動人瞬間。對勝利的渴望與真摯的性情，讓他成為全球車迷最喜愛的車手之一。"
    },
    {
      id: "lando-norris",
      name: "Lando Norris",
      number: 1,
      country: "英國",
      birthDate: "1999-11-13",
      birthPlace: "布里斯托",
      team: "McLaren",
      debutYear: 2019,
      championships: "1 次世界冠軍（2025）",
      bio: "邁凱倫青訓出身的英國新星，2019 年出道後以幽默的個性與極快的速度迅速圈粉。2024 年他與 Verstappen 展開了激烈的冠軍爭奪，雖敗猶榮；2025 年他終於修成正果，奪得生涯首座世界冠軍。2026 年他背負 1 號車號繼續為邁凱倫衛冕，是現役最快的車手之一。"
    },
    {
      id: "oscar-piastri",
      name: "Oscar Piastri",
      number: 81,
      country: "澳大利亞",
      birthDate: "2001-04-06",
      birthPlace: "墨爾本",
      team: "McLaren",
      debutYear: 2023,
      championships: "暫無",
      bio: "澳大利亞車手，2021 年以新人身份橫掃 F2 冠軍，堪稱青訓體系的天才樣板。2023 年在邁凱倫出道後，他以冷靜、精準、抗壓的駕駛風格迅速躋身一線。2025 年他與 Norris 聯手為邁凱倫奪回車隊冠軍，是車隊最可靠的得分機器。低調沉穩的個性下，藏著不容小覷的爭冠野心。"
    },
    {
      id: "isack-hadjar",
      name: "Isack Hadjar",
      number: 6,
      country: "法國",
      birthDate: "2004-09-28",
      birthPlace: "巴黎",
      team: "Red Bull",
      debutYear: 2025,
      championships: "暫無",
      bio: "紅牛青訓出身的法國新星，2024 年 F2 年度亞軍讓他拿到 F1 門票。2025 年在 RB 完成首秀後，2026 年升入紅牛一隊與 Verstappen 搭檔。他速度出眾、鬥志旺盛，雖然偶有情緒化，但那股不服輸的勁頭正是紅牛看重的品質。"
    },
    {
      id: "liam-lawson",
      name: "Liam Lawson",
      number: 30,
      country: "紐西蘭",
      birthDate: "2002-02-11",
      birthPlace: "黑斯廷斯",
      team: "RB F1 Team",
      debutYear: 2023,
      championships: "暫無",
      bio: "紐西蘭車手，紅牛青訓出身，以多次臨時代班時的亮眼表現贏得尊重——2023 年他替補受傷的 Ricciardo，首秀即搶分。2025 年他短暫效力紅牛一隊，2026 年回到 RB 繼續磨礪。他韌勁十足、適應力強，被視為紅牛體系最可靠的替補王牌。"
    },
    {
      id: "yuki-tsunoda",
      name: "Yuki Tsunoda",
      number: 22,
      country: "日本",
      birthDate: "2000-05-11",
      birthPlace: "相模原",
      team: "RB F1 Team",
      debutYear: 2021,
      championships: "暫無",
      bio: "紅牛青訓首位日本車手，2021 年在 AlphaTauri（現 RB）出道。他以火爆的脾氣和直率的個性聞名，也以逐漸成熟的駕駛風格證明了自己的實力。作為日本現役最受關注的車手，他承載著日本車迷重返領獎台的期待。2026 年他繼續為 RB 而戰。"
    },
    {
      id: "arvid-lindblad",
      name: "Arvid Lindblad",
      number: 41,
      country: "英國",
      birthDate: "2007-08-08",
      birthPlace: "倫敦",
      team: "RB F1 Team",
      debutYear: 2026,
      championships: "暫無",
      bio: "紅牛青訓最新力作，2025 年 F2 表現搶眼後於 2026 年直升 RB。他被紅牛視為下一代的核心培養對象，F1 處子賽季即多次搶分，展現出遠超年齡的成熟。年輕、快速、敢於挑戰，他的成長軌跡備受期待。"
    },
    {
      id: "pierre-gasly",
      name: "Pierre Gasly",
      number: 10,
      country: "法國",
      birthDate: "1996-02-07",
      birthPlace: "魯昂",
      team: "Alpine",
      debutYear: 2017,
      championships: "暫無",
      bio: "法國車手，2020 年義大利站為 AlphaTauri 拿下隊史級勝利，是近年來最動人的逆襲故事之一——從紅牛失意降級到加冕分站冠軍，他用實力完成了自我救贖。此後他成為 Alpine 的領軍人物，2026 年繼續代表法國品牌車隊出戰。堅韌不拔的性格，讓他成為圍場最受尊敬的車手之一。"
    },
    {
      id: "franco-colapinto",
      name: "Franco Colapinto",
      number: 43,
      country: "阿根廷",
      birthDate: "2003-05-27",
      birthPlace: "布宜諾斯艾利斯",
      team: "Alpine",
      debutYear: 2024,
      championships: "暫無",
      bio: "阿根廷車手，2024 年頂替上陣威廉姆斯便迅速走紅，憑藉大膽的超車與親和的個性收穫大量粉絲。他的出現讓沉寂多年的阿根廷重新沸騰，也為南美車手正名。2026 年他轉投 Alpine，為自己的 F1 生涯開啟全新篇章。"
    },
    {
      id: "esteban-ocon",
      name: "Esteban Ocon",
      number: 31,
      country: "法國",
      birthDate: "1996-09-17",
      birthPlace: "埃夫勒",
      team: "Haas",
      debutYear: 2016,
      championships: "暫無",
      bio: "法國車手，出身平凡，靠獎學金與堅持一路打進 F1。2021 年匈牙利站他抓住機會奪得生涯首勝，是對多年努力的最好回報。他曾長期效力 Alpine，2026 年轉投 Haas，以穩定的全面性成為車隊拿分的關鍵。低調務實，是他最鮮明的標籤。"
    },
    {
      id: "oliver-bearman",
      name: "Oliver Bearman",
      number: 87,
      country: "英國",
      birthDate: "2005-05-08",
      birthPlace: "切姆斯福德",
      team: "Haas",
      debutYear: 2024,
      championships: "暫無",
      bio: "英國新星，2024 年代班法拉利在沙烏地首秀即得分，一鳴驚人，成為近年最驚豔的 F1 首秀之一。此後他正式加盟 Haas，被視為英國年輕一代的領軍人物。冷靜的頭腦與出色的學習能力，讓他的未來充滿想像空間。"
    },
    {
      id: "ryo-hirakawa",
      name: "Ryo Hirakawa",
      number: 50,
      country: "日本",
      birthDate: "1994-03-07",
      birthPlace: "橫濱",
      team: "Haas",
      debutYear: 2026,
      championships: "暫無",
      bio: "日本車手，耐力賽領域的頂級名將，曾多次奪得勒芒冠軍與 WEC 年度冠軍。2026 年他以 31 歲之齡在 Haas 迎來 F1 正式賽季，是圍場中經歷最豐富的「新秀」之一。豐富的賽車經驗與沉穩的心態，是他立足 F1 的最大本錢。"
    },
    {
      id: "nico-hulkenberg",
      name: "Nico Hülkenberg",
      number: 27,
      country: "德國",
      birthDate: "1987-08-19",
      birthPlace: "埃默裡希",
      team: "Audi",
      debutYear: 2010,
      championships: "暫無",
      bio: "德國車手，2010 年出道，是圍場公認的排位賽大師，卻始終與領獎台擦肩而過。他輾轉多支車隊，經驗豐富、穩定可靠。2026 年他代表奧迪廠隊出戰，為奧迪 F1 時代開疆拓土。無冠無領獎台卻依舊被車隊爭相聘用，本身就是對他實力的最好證明。"
    },
    {
      id: "gabriel-bortoleto",
      name: "Gabriel Bortoleto",
      number: 5,
      country: "巴西",
      birthDate: "2004-10-14",
      birthPlace: "聖保羅",
      team: "Audi",
      debutYear: 2025,
      championships: "暫無",
      bio: "巴西車手，2024 年 F2 冠軍，被視為巴西新一代希望之星。2025 年出道後隨車隊轉投奧迪廠隊，肩負著巴西車迷重返領獎台的期待。他沉穩、聰明、學習能力強，是南美賽車的新旗幟。"
    },
    {
      id: "alexander-albon",
      name: "Alexander Albon",
      number: 23,
      country: "泰國",
      birthDate: "1996-03-23",
      birthPlace: "倫敦",
      team: "Williams",
      debutYear: 2019,
      championships: "暫無",
      bio: "泰國車手，2019 年出道，曾短暫效力紅牛，後於 2022 年加盟威廉姆斯。他以穩定全面的表現成為這支老牌豪門的核心支柱，多次把中遊賽車開進積分區。謙遜隨和的性格，讓他成為圍場最受歡迎的隊友之一。"
    },
    {
      id: "carlos-sainz",
      name: "Carlos Sainz",
      number: 55,
      country: "西班牙",
      birthDate: "1994-09-01",
      birthPlace: "馬德裡",
      team: "Williams",
      debutYear: 2015,
      championships: "暫無",
      bio: "出身賽車世家，父親是兩屆 WRC 世界冠軍，Carlos 自幼便以進入 F1 為目標。2015 年出道後，他先後效力雷諾、邁凱倫、法拉利，多次登台並奪過分站冠軍。2025 年加盟威廉姆斯，以全面的實力和團隊精神成為車隊領軍者。他是圍場公認最被低估的車手之一。"
    },
    {
      id: "fernando-alonso",
      name: "Fernando Alonso",
      number: 14,
      country: "西班牙",
      birthDate: "1981-07-29",
      birthPlace: "奧維耶多",
      team: "Aston Martin",
      debutYear: 2001,
      championships: "2 次世界冠軍（2005–2006）",
      bio: "兩屆世界冠軍，F1 常青樹，2001 年出道至今征戰超過 20 個賽季。他 2005–2006 年終結了 Schumacher 王朝，以無與倫比的比賽智慧與鬥志著稱。即便年過四十，他仍在 2023 年為阿斯頓馬丁多次登台。他對勝利的渴望從未熄滅，仍在追逐第三座世界冠軍。"
    },
    {
      id: "lance-stroll",
      name: "Lance Stroll",
      number: 18,
      country: "加拿大",
      birthDate: "1998-10-29",
      birthPlace: "蒙特利爾",
      team: "Aston Martin",
      debutYear: 2017,
      championships: "暫無",
      bio: "加拿大車手，2017 年出道即登上領獎台，是圍場中成名最早的新秀之一。他長期效力阿斯頓馬丁體系，2026 年繼續為車隊出戰。雖然常被外界低估，但他多次證明自己能在關鍵時刻交出穩定表現。"
    },
    {
      id: "valtteri-bottas",
      name: "Valtteri Bottas",
      number: 77,
      country: "芬蘭",
      birthDate: "1989-08-28",
      birthPlace: "納斯塔拉",
      team: "Cadillac",
      debutYear: 2013,
      championships: "暫無",
      bio: "芬蘭車手，曾效力威廉姆斯與梅賽德斯，在梅賽德斯時期拿下 10 場分站勝利，是 Hamilton 時代最可靠的搭檔。他以排位賽的出色單圈和穩定的正賽節奏著稱。2026 年加盟新軍 Cadillac 再出發，用豐富經驗幫助美國品牌起步。"
    },
    {
      id: "sergio-perez",
      name: "Sergio Pérez",
      number: 11,
      country: "墨西哥",
      birthDate: "1990-01-26",
      birthPlace: "瓜達拉哈拉",
      team: "Cadillac",
      debutYear: 2011,
      championships: "暫無",
      bio: "墨西哥車手，2011 年出道，以保胎與防守大師的名號著稱，是圍場公認的「輪胎管理專家」。他曾在紅牛拿下 6 場勝利，2021 年阿布扎比更以頑強的防守為 Verstappen 奪冠立下奇功。2026 年他轉投 Cadillac 延續生涯，是墨西哥賽車的精神領袖。"
    }
  ],

  // ---------------- 退役車手 ----------------
  retired: [
    {
      id: "michael-schumacher",
      name: "Michael Schumacher",
      country: "德國",
      birthYear: 1969,
      championships: "7 次世界冠軍（1994–1995、2000–2004）",
      wins: "91 場分站冠軍",
      bio: "被普遍視為 F1 史上最偉大車手之一。1994–1995 年代表 Benetton 兩連冠後，他轉投處於低谷的法拉利，用數年時間將紅色軍團打造成為無敵王朝，2000–2004 年完成史無前例的五連冠。他共贏得 91 場分站冠軍，多項紀錄保持多年。2013 年滑雪事故後，他長期休養，牽動著全球車迷的心。"
    },
    {
      id: "ayrton-senna",
      name: "Ayrton Senna",
      country: "巴西",
      birthYear: 1960,
      championships: "3 次世界冠軍（1988、1990–1991）",
      wins: "41 場分站冠軍",
      bio: "巴西傳奇，雨戰之神。1988 年加盟邁凱倫後開啟巔峰，與隊友 Prost 的宿敵對決是 F1 最經典的篇章。他三奪世界冠軍，以近乎偏執的信念與無與倫比的速度征服了全世界。1994 年聖馬力諾大獎賽伊莫拉賽道事故中不幸離世，他的離去推動了 F1 安全標準的全面改革，也讓「車神」之名永載史冊。"
    },
    {
      id: "alain-prost",
      name: "Alain Prost",
      country: "法國",
      birthYear: 1955,
      championships: "4 次世界冠軍（1985–1986、1989、1993）",
      wins: "51 場分站冠軍",
      bio: "綽號「教授」的法國車手，以精準計算與戰術智慧著稱，與 Senna 的長期競爭定義了 1980 年代末的 F1。他四奪世界冠軍，是那個時代最理性的贏家。退役後他還以車隊老闆身份重返圍場，繼續影響這項運動。"
    },
    {
      id: "juan-manuel-fangio",
      name: "Juan Manuel Fangio",
      country: "阿根廷",
      birthYear: 1911,
      championships: "5 次世界冠軍（1951、1954–1957）",
      wins: "24 場分站冠軍",
      bio: "F1 早期無可爭議的王者，1950 年代以 40 多歲高齡五奪世界冠軍，其中多次是代表不同車隊。他的勝率至今仍是歷史最高之一，被後世車手公認為「大師中的大師」。在那個沒有安全帶與防護的時代，他的每一場勝利都是勇氣與技藝的極致。"
    },
    {
      id: "niki-lauda",
      name: "Niki Lauda",
      country: "奧地利",
      birthYear: 1949,
      championships: "3 次世界冠軍（1975、1977、1984）",
      wins: "25 場分站冠軍",
      bio: "奧地利車手，三屆世界冠軍。1976 年他在紐伯格林遭遇嚴重事故，重度燒傷後僅六週便奇蹟復出，堪稱 F1 史上最偉大的勇氣故事。那一年他與 James Hunt 的世紀對決成為電影《極速風流》的藍本。退役後他成為成功的航空企業家，並幫助梅賽德斯車隊走向輝煌。"
    },
    {
      id: "sebastian-vettel",
      name: "Sebastian Vettel",
      country: "德國",
      birthYear: 1987,
      championships: "4 次世界冠軍（2010–2013）",
      wins: "53 場分站冠軍",
      bio: "紅牛時代的最年輕四連冠王者，2010–2013 年連續四年稱霸，創下多項最年輕紀錄。2015 年起效力法拉利，為紅色軍團征戰多年，2022 年底退役。他以思辨與社會關懷著稱，關注環保與平權議題，是圍場最具思想深度的車手之一。"
    },
    {
      id: "kimi-raikkonen",
      name: "Kimi Räikkönen",
      country: "芬蘭",
      birthYear: 1979,
      championships: "1 次世界冠軍（2007）",
      wins: "21 場分站冠軍",
      bio: "綽號「冰人」的芬蘭車手，以惜字如金和超凡的速度聞名。2007 年他在法拉利以 1 分優勢逆轉奪冠，成為法拉利迄今最近的車手世界冠軍。2021 年退役前他共征戰 19 個賽季，是 F1 出場場次最多的車手之一。他的冷幽默與真性情，讓他成為車迷心中獨一無二的存在。"
    },
    {
      id: "jenson-button",
      name: "Jenson Button",
      country: "英國",
      birthYear: 1980,
      championships: "1 次世界冠軍（2009）",
      wins: "15 場分站冠軍",
      bio: "英國車手，2009 年帶領 Brawn GP 上演黑馬奇蹟——車隊在賽季前才勉強湊齊資金，卻一舉奪下車隊與車手雙料冠軍。他是雨戰大師，在複雜條件下總能做出正確的輪胎選擇。親和力十足的性格，也讓他成為圍場最受歡迎的世界冠軍之一。"
    },
    {
      id: "nico-rosberg",
      name: "Nico Rosberg",
      country: "德國",
      birthYear: 1985,
      championships: "1 次世界冠軍（2016）",
      wins: "23 場分站冠軍",
      bio: "德國車手，2016 年與隊友 Hamilton 鏖戰整季，在最後一刻以 5 分之差奪冠，隨後立即宣佈退役。他成為罕見激流勇退的世界冠軍，用完美的方式結束了自己的 F1 生涯。退役後他轉型為企業家與媒體人，繼續活躍在賽車世界。"
    },
    {
      id: "mika-hakkinen",
      name: "Mika Häkkinen",
      country: "芬蘭",
      birthYear: 1968,
      championships: "2 次世界冠軍（1998–1999）",
      wins: "20 場分站冠軍",
      bio: "綽號「飛人芬蘭」，1998–1999 年為邁凱倫完成兩連冠，與 Schumacher 的攻防是世紀之交最精彩的對決。他曾在 1995 年經歷嚴重事故後奇蹟康復並重返巔峰，這段經歷讓他更加堅韌。退役後他依然活躍於賽車圈。"
    },
    {
      id: "nigel-mansell",
      name: "Nigel Mansell",
      country: "英國",
      birthYear: 1953,
      championships: "1 次世界冠軍（1992）",
      wins: "31 場分站冠軍",
      bio: "英國車迷心中的英雄，1992 年以統治級表現奪冠，單賽季 9 勝的紀錄保持了多年。他以無畏的超車風格和直率的個性著稱，從普通家庭一路打拼成為世界冠軍，是無數英國車迷的偶像。"
    },
    {
      id: "daniel-ricciardo",
      name: "Daniel Ricciardo",
      country: "澳大利亞",
      birthYear: 1989,
      championships: "未奪冠（最佳年度第三）",
      wins: "8 場分站冠軍",
      bio: "澳大利亞車手，以燦爛笑容與「最後一刻剎車」的超車聞名。他曾在紅牛拿下 7 場勝利，是那個時代最具觀賞性的車手之一。輾轉雷諾、邁凱倫後，他於 2024 年結束 F1 生涯。他的樂觀與真誠，讓他成為圍場最受歡迎的「開心果」。"
    }
  ],

  // ---------------- 歷史名場面 ----------------
  moments: [
    {
      id: "1976-japan",
      title: "1976 日本大獎賽：Lauda 退賽，Hunt 一分奪冠",
      year: 1976,
      event: "日本 富士賽道",
      summary: "雨中決戰，已從火災中奇蹟復出的 Niki Lauda 以安全為由主動退賽，James Hunt 衝線奪得年度冠軍，1 分之差終結了 F1 史上最戲劇性的賽季之一。",
      significance: "Lauda 的勇氣與 Hunt 的堅持，成為電影《極速風流》(Rush) 的藍本。"
    },
    {
      id: "1984-monaco",
      title: "1984 摩納哥：Senna 的雨中封神之戰",
      year: 1984,
      event: "摩納哥 蒙特卡洛",
      summary: "初出茅廬的 Ayrton Senna 駕駛並非頂級賽車的 Toleman，在滂沱大雨中從第 13 位一路狂追至第二，若不是比賽提前終止，幾乎上演驚天逆襲奪冠。",
      significance: "這場比賽讓世界第一次真正記住 Senna 這個名字。"
    },
    {
      id: "1989-japan",
      title: "1989 日本站：Senna 與 Prost 的宿命碰撞",
      year: 1989,
      event: "日本 鈴鹿賽道",
      summary: "隊友兼宿敵的 Senna 與 Prost 在爭奪年度冠軍時發生碰撞，Senna 雖重返賽道奪魁卻被取消成績，Prost 提前奪冠。",
      significance: "兩人關係徹底決裂，F1 史上最著名的隊內戰爭就此白熱化。"
    },
    {
      id: "1990-japan",
      title: "1990 日本站：首彎復仇",
      year: 1990,
      event: "日本 鈴鹿賽道",
      summary: "一年後同一賽道，Senna 在第一個彎角直接撞向 Prost，雙雙退賽，Senna 就此鎖定年度冠軍，完成復仇。",
      significance: "這場爭議碰撞成為 F1 道德與規則討論的永恆話題。"
    },
    {
      id: "1994-imola",
      title: "1994 聖馬力諾：伊莫拉的黑色週末",
      year: 1994,
      event: "義大利 伊莫拉賽道",
      summary: "Roland Ratzenberger 與三屆世界冠軍 Ayrton Senna 在同一個週末先後因事故離世，F1 史上最沉痛的一頁。",
      significance: "悲劇推動 F1 全面改革安全標準，此後 30 年未再出現比賽週末死亡事故。"
    },
    {
      id: "1996-monaco",
      title: "1996 摩納哥：僅三人的雨中完賽",
      year: 1996,
      event: "摩納哥 蒙特卡洛",
      summary: "大雨讓退賽接連不斷，Olivier Panis 最終奪冠，全場僅 3 輛賽車完賽，創下 F1 完賽數最少的紀錄之一。",
      significance: "Panis 與 Ligier 車隊書寫了最大黑馬童話。"
    },
    {
      id: "2005-japan",
      title: "2005 日本站：Kimi 第 17 位發車封王",
      year: 2005,
      event: "日本 鈴鹿賽道",
      summary: "Kimi Räikkönen 從第 17 位起跑，一路超越最終在最後一圈完成對 Fisichella 的絕殺，贏得 F1 史上最偉大的逆轉之一。",
      significance: "被譽為 21 世紀最精彩的單場駕駛表現。"
    },
    {
      id: "2008-brazil",
      title: "2008 巴西站：最後一彎的絕殺",
      year: 2008,
      event: "巴西 因特拉格斯賽道",
      summary: "Lewis Hamilton 在最後一圈最後一彎超越 Timo Glock，以 1 分之差從 Felipe Massa 手中奪走年度冠軍，Massa 主場奪冠卻與總冠軍擦肩而過。",
      significance: "F1 史上最戲劇性的收官之戰。"
    },
    {
      id: "2011-canada",
      title: "2011 加拿大站：Button 的最後一圈奇蹟",
      year: 2011,
      event: "加拿大 蒙特利爾",
      summary: "一場持續超過 4 小時的雨戰，Jenson Button 從末尾一路追至最後一圈超越 Vettel 奪冠。",
      significance: "F1 最長比賽紀錄之一，Button 的生涯最佳代表作。"
    },
    {
      id: "2021-abu-dhabi",
      title: "2021 阿布扎比：安全車後的最後一圈",
      year: 2021,
      event: "阿聯酋 亞斯碼頭賽道",
      summary: "賽季最後一圈，安全車撤離後 Max Verstappen 在全新軟胎上超越 Hamilton，首度奪得世界冠軍，終結 Hamilton 的七冠王朝。",
      significance: "充滿爭議的結局，徹底改變了 F1 的歷史走向。"
    }
  ]
};
