// ============================================================
// F1 档案库 —— 固定资讯数据（车队 / 车手 / 退役车手 / 历史名场面）
// 说明：历史类资讯直接写死在此文件，不需要数据库。
// ============================================================

window.F1_DATA = {
  // ---------------- 车队历史 ----------------
  teams: [
    {
      id: "red-bull",
      name: "Red Bull Racing",
      fullName: "Oracle Red Bull Racing",
      country: "奥地利",
      base: "英国 米尔顿凯恩斯 (Milton Keynes)",
      firstSeason: 2005,
      engine: "Honda RBPT",
      drivers2025: "Max Verstappen、Liam Lawson（赛季中由 Yuki Tsunoda 顶替）",
      constructorTitles: "6 次（2010–2013、2022–2023）",
      bio: "2004 年底红牛收购 Jaguar 车队，2005 年以 Red Bull Racing 之名正式参赛。2010–2013 年 Sebastian Vettel 完成史无前例的四连冠，2021–2024 年 Max Verstappen 再夺四连冠，期间车队六度问鼎车队冠军，是 21 世纪最成功的车队之一。",
      notable: ["Sebastian Vettel", "Max Verstappen", "Daniel Ricciardo", "Mark Webber"],
      color: "#3671C6"
    },
    {
      id: "ferrari",
      name: "Ferrari",
      fullName: "Scuderia Ferrari HP",
      country: "意大利",
      base: "意大利 马拉内罗 (Maranello)",
      firstSeason: 1950,
      engine: "Ferrari",
      drivers2025: "Charles Leclerc、Lewis Hamilton",
      constructorTitles: "16 次（历史最多）",
      bio: "F1 历史上唯一自 1950 年元年参赛至今从未缺席的车队，也是最具传奇色彩的品牌。共赢得 16 次车队冠军、15 次车手冠军，Fangio、Lauda、Schumacher 等传奇先后在此写下辉煌。",
      notable: ["Michael Schumacher", "Niki Lauda", "Kimi Räikkönen", "Alberto Ascari"],
      color: "#E8002D"
    },
    {
      id: "mclaren",
      name: "McLaren",
      fullName: "McLaren Formula 1 Team",
      country: "英国",
      base: "英国 沃金 (Woking)",
      firstSeason: 1966,
      engine: "Mercedes",
      drivers2025: "Lando Norris、Oscar Piastri",
      constructorTitles: "9 次（最近一次 2024）",
      bio: "1963 年由新西兰车手 Bruce McLaren 创立，1966 年进军 F1。曾与 Senna、Prost、Häkkinen、Hamilton 等巨星合作，9 次车队冠军、12 次车手冠军。2024 年击败红牛重返车队冠军。",
      notable: ["Ayrton Senna", "Alain Prost", "Lewis Hamilton", "Mika Häkkinen", "Lando Norris"],
      color: "#FF8000"
    },
    {
      id: "mercedes",
      name: "Mercedes",
      fullName: "Mercedes-AMG Petronas Formula One Team",
      country: "德国",
      base: "英国 布拉克利 (Brackley)",
      firstSeason: 1954,
      engine: "Mercedes",
      drivers2025: "George Russell、Kimi Antonelli",
      constructorTitles: "8 次（2014–2021 八连霸）",
      bio: "1954 年首度参赛，2010 年以厂队身份重返 F1。2014 年混合动力时代开启后建立王朝，2014–2021 连续八年包揽车队冠军，Lewis Hamilton 在此期间六度封王。2022 年规则大改后进入重建期。",
      notable: ["Lewis Hamilton", "Nico Rosberg", "Michael Schumacher", "George Russell"],
      color: "#27F4D2"
    },
    {
      id: "aston-martin",
      name: "Aston Martin",
      fullName: "Aston Martin Aramco Formula One Team",
      country: "英国",
      base: "英国 银石 (Silverstone)",
      firstSeason: 2021,
      engine: "Mercedes",
      drivers2025: "Fernando Alonso、Lance Stroll",
      constructorTitles: "0 次（尚未夺冠）",
      bio: "前身为 Jordan（1991）→ Force India（2008）→ Racing Point（2018），2021 年以 Aston Martin 之名回归围场。2023 年 Fernando Alonso 多次登台创下近年最佳战绩，车队正朝争冠之路持续投入。",
      notable: ["Fernando Alonso", "Sebastian Vettel", "Lance Stroll"],
      color: "#229971"
    },
    {
      id: "alpine",
      name: "Alpine",
      fullName: "BWT Alpine F1 Team",
      country: "法国",
      base: "英国 恩斯通 (Enstone)",
      firstSeason: 2021,
      engine: "Renault",
      drivers2025: "Pierre Gasly、Jack Doohan（赛季中由 Franco Colapinto 顶替）",
      constructorTitles: "0 次（前身 Renault 曾于 2005–2006 夺冠）",
      bio: "Renault 厂队的后续形态，2021 年更名为 Alpine。以 Renault 之名曾在 2005–2006 年与 Fernando Alonso 连夺双冠。目前正处于重建与年轻化阶段，旗下还有 F2 培育体系。",
      notable: ["Fernando Alonso", "Pierre Gasly", "Esteban Ocon"],
      color: "#0093CC"
    },
    {
      id: "williams",
      name: "Williams",
      fullName: "Williams Racing",
      country: "英国",
      base: "英国 格罗夫 (Grove)",
      firstSeason: 1977,
      engine: "Mercedes",
      drivers2025: "Alexander Albon、Carlos Sainz",
      constructorTitles: "9 次",
      bio: "1977 年由 Frank Williams 创立的老牌豪门，1980–1990 年代是围场绝对霸主之一，共 9 次车队冠军、7 次车手冠军。经历长期低谷后近年正逐步复苏。",
      notable: ["Nigel Mansell", "Ayrton Senna", "Damon Hill", "Alain Prost"],
      color: "#64C4FF"
    },
    {
      id: "racing-bulls",
      name: "Racing Bulls",
      fullName: "Visa Cash App Racing Bulls F1 Team",
      country: "意大利",
      base: "意大利 法恩扎 (Faenza)",
      firstSeason: 2006,
      engine: "Honda RBPT",
      drivers2025: "Yuki Tsunoda、Isack Hadjar",
      constructorTitles: "0 次（尚未夺冠）",
      bio: "红牛青年队，前身为 Minardi（1985），2006 年成为 Toro Rosso，2020 年更名 AlphaTauri，2024 年再更名为 RB。Sebastian Vettel 2008 年在这里赢下队史首胜，为红牛输送了众多青年才俊。",
      notable: ["Sebastian Vettel", "Max Verstappen", "Daniel Ricciardo", "Yuki Tsunoda"],
      color: "#6692FF"
    },
    {
      id: "haas",
      name: "Haas",
      fullName: "MoneyGram Haas F1 Team",
      country: "美国",
      base: "美国 卡纳波利斯 (Kannapolis)",
      firstSeason: 2016,
      engine: "Ferrari",
      drivers2025: "Esteban Ocon、Oliver Bearman",
      constructorTitles: "0 次（尚未夺冠）",
      bio: "2016 年由美国商人 Gene Haas 创立的美国车队，总部位于北卡罗来纳州。与法拉利深度技术合作，是美国在 F1 的代表力量，以务实的小团队模式立足围场。",
      notable: ["Kevin Magnussen", "Romain Grosjean", "Esteban Ocon"],
      color: "#B6BABD"
    },
    {
      id: "sauber",
      name: "Sauber",
      fullName: "Stake F1 Team Kick Sauber",
      country: "瑞士",
      base: "瑞士 欣维尔 (Hinwil)",
      firstSeason: 1993,
      engine: "Ferrari",
      drivers2025: "Nico Hülkenberg、Gabriel Bortoleto",
      constructorTitles: "0 次（尚未夺冠）",
      bio: "1993 年由 Peter Sauber 创立的瑞士车队，2006–2009 年曾以 BMW Sauber 之名出战并接近冠军。2026 年将成为奥迪 (Audi) 厂队，目前处于转型过渡期。",
      notable: ["Kimi Räikkönen", "Sergio Pérez", "Nico Hülkenberg"],
      color: "#52E252"
    }
  ],

  // ---------------- 现役车手历史 ----------------
  drivers: [
    {
      id: "max-verstappen",
      name: "Max Verstappen",
      number: 1,
      country: "荷兰",
      birthYear: 1997,
      team2025: "Red Bull Racing",
      championships: "4 次世界冠军（2021–2024）",
      bio: "2015 年以 17 岁之龄成为 F1 史上最年轻参赛车手，2016 年加盟红牛首战即夺冠。凭借惊人的稳定与速度，2021 年击败 Hamilton 首度封王，此后完成四连冠。"
    },
    {
      id: "liam-lawson",
      name: "Liam Lawson",
      number: 30,
      country: "新西兰",
      birthYear: 2002,
      team2025: "Red Bull Racing",
      championships: "暂无",
      bio: "红牛青训出身，2023 年起多次替补上阵表现亮眼。2025 年升任红牛正赛车手，赛季中段与 Tsunoda 互换席位。"
    },
    {
      id: "yuki-tsunoda",
      name: "Yuki Tsunoda",
      number: 22,
      country: "日本",
      birthYear: 2000,
      team2025: "Red Bull Racing",
      championships: "暂无",
      bio: "红牛青训首位日本车手，2021 年在 AlphaTauri（现 RB）出道。2025 年赛季中段被提拔至红牛一队，是日本现役最受关注的车手。"
    },
    {
      id: "charles-leclerc",
      name: "Charles Leclerc",
      number: 16,
      country: "摩纳哥",
      birthYear: 1997,
      team2025: "Ferrari",
      championships: "暂无",
      bio: "法拉利青训代表人物，2019 年起为法拉利效力。排位速度极快，2022 年一度领跑积分榜，是法拉利争冠的核心。"
    },
    {
      id: "lewis-hamilton",
      name: "Lewis Hamilton",
      number: 44,
      country: "英国",
      birthYear: 1985,
      team2025: "Ferrari",
      championships: "7 次世界冠军（2008、2014–2015、2017–2020）",
      bio: "F1 史上最伟大车手之一，与 Schumacher 并列 7 次世界冠军，105 场分站冠军为历史之最（截至 2024 赛季）。2025 年加盟法拉利开启生涯新篇章。"
    },
    {
      id: "lando-norris",
      name: "Lando Norris",
      number: 4,
      country: "英国",
      birthYear: 1999,
      team2025: "McLaren",
      championships: "暂无",
      bio: "迈凯伦青训出身的英国新星，2024 年多次与 Verstappen 争冠，并帮助迈凯伦夺得车队冠军，是现役最快的车手之一。"
    },
    {
      id: "oscar-piastri",
      name: "Oscar Piastri",
      number: 81,
      country: "澳大利亚",
      birthYear: 2001,
      team2025: "McLaren",
      championships: "暂无",
      bio: "2021 年 F2 冠军，2023 年在迈凯伦出道。冷静成熟的风格让他迅速跻身一线，2024 年两夺分站冠军。"
    },
    {
      id: "george-russell",
      name: "George Russell",
      number: 63,
      country: "英国",
      birthYear: 1998,
      team2025: "Mercedes",
      championships: "暂无",
      bio: "2022 年加盟梅赛德斯，2024 年两夺分站冠军。被视为梅赛德斯后 Hamilton 时代的领军人物。"
    },
    {
      id: "kimi-antonelli",
      name: "Kimi Antonelli",
      number: 12,
      country: "意大利",
      birthYear: 2006,
      team2025: "Mercedes",
      championships: "暂无",
      bio: "意大利超级新星，2025 年以 18 岁之龄直接升入梅赛德斯，被视为未来世界冠军候选人。"
    },
    {
      id: "fernando-alonso",
      name: "Fernando Alonso",
      number: 14,
      country: "西班牙",
      birthYear: 1981,
      team2025: "Aston Martin",
      championships: "2 次世界冠军（2005–2006）",
      bio: "两届世界冠军，F1 常青树。曾效力雷诺、法拉利、迈凯伦等队，2023 年加盟阿斯顿马丁后屡次登台，是现役经验最丰富的车手。"
    },
    {
      id: "lance-stroll",
      name: "Lance Stroll",
      number: 18,
      country: "加拿大",
      birthYear: 1998,
      team2025: "Aston Martin",
      championships: "暂无",
      bio: "2017 年出道即登台，长期效力于阿斯顿马丁体系，是围场中经验丰富的中坚车手。"
    },
    {
      id: "pierre-gasly",
      name: "Pierre Gasly",
      number: 10,
      country: "法国",
      birthYear: 1996,
      team2025: "Alpine",
      championships: "暂无",
      bio: "2020 年在意大利蒙扎为 AlphaTauri 夺得队史级胜利，此后成为法国品牌 Alpine 的领军车手。"
    },
    {
      id: "jack-doohan",
      name: "Jack Doohan",
      number: 7,
      country: "澳大利亚",
      birthYear: 2003,
      team2025: "Alpine",
      championships: "暂无",
      bio: "传奇摩托车王 Mick Doohan 之子，2025 年在 Alpine 开启 F1 生涯，赛季中段被 Franco Colapinto 顶替。"
    },
    {
      id: "alexander-albon",
      name: "Alexander Albon",
      number: 23,
      country: "泰国",
      birthYear: 1996,
      team2025: "Williams",
      championships: "暂无",
      bio: "2022 年加盟威廉姆斯后成为车队核心，稳定且全面的表现帮助老牌豪门逐步复苏。"
    },
    {
      id: "carlos-sainz",
      name: "Carlos Sainz",
      number: 55,
      country: "西班牙",
      birthYear: 1994,
      team2025: "Williams",
      championships: "暂无",
      bio: "曾效力雷诺、迈凯伦、法拉利，多次登台并夺过分站冠军。2025 年加盟威廉姆斯，是围场最全面的车手之一。"
    },
    {
      id: "isack-hadjar",
      name: "Isack Hadjar",
      number: 6,
      country: "法国",
      birthYear: 2004,
      team2025: "Racing Bulls",
      championships: "暂无",
      bio: "红牛青训新秀，2024 年 F2 年度亚军，2025 年在 Racing Bulls 开启 F1 生涯。"
    },
    {
      id: "esteban-ocon",
      name: "Esteban Ocon",
      number: 31,
      country: "法国",
      birthYear: 1996,
      team2025: "Haas",
      championships: "暂无",
      bio: "2021 年匈牙利站夺下生涯首胜，此后效力 Alpine 多年，2025 年转会 Haas 开启新篇章。"
    },
    {
      id: "oliver-bearman",
      name: "Oliver Bearman",
      number: 87,
      country: "英国",
      birthYear: 2005,
      team2025: "Haas",
      championships: "暂无",
      bio: "2024 年临时代班法拉利在沙特首秀即得分，2025 年正式加盟 Haas，是备受期待的英国新星。"
    },
    {
      id: "nico-hulkenberg",
      name: "Nico Hülkenberg",
      number: 27,
      country: "德国",
      birthYear: 1987,
      team2025: "Sauber",
      championships: "暂无",
      bio: "经验丰富的德国车手，2010 年出道至今征战多个车队。2025 年加盟 Sauber，为 2026 年奥迪厂队时代铺路。"
    },
    {
      id: "gabriel-bortoleto",
      name: "Gabriel Bortoleto",
      number: 5,
      country: "巴西",
      birthYear: 2004,
      team2025: "Sauber",
      championships: "暂无",
      bio: "2024 年 F2 年度冠军，巴西新一代希望之星，2025 年在 Sauber 开启 F1 生涯。"
    }
  ],

  // ---------------- 退役车手 ----------------
  retired: [
    {
      id: "michael-schumacher",
      name: "Michael Schumacher",
      country: "德国",
      birthYear: 1969,
      championships: "7 次世界冠军（1994–1995、2000–2004）",
      wins: "91 场分站冠军",
      bio: "被普遍视为 F1 史上最伟大车手之一。1994–1995 年代表 Benetton 两连冠，2000–2004 年带领法拉利建立王朝完成五连冠，生涯 91 胜。2013 年滑雪事故后长期休养。"
    },
    {
      id: "ayrton-senna",
      name: "Ayrton Senna",
      country: "巴西",
      birthYear: 1960,
      championships: "3 次世界冠军（1988、1990–1991）",
      wins: "41 场分站冠军",
      bio: "巴西传奇，雨战之神。与 Prost 的宿敌对决是 F1 最经典篇章。1994 年圣马力诺大奖赛伊莫拉赛道事故中不幸离世，推动了 F1 安全标准的全面改革。"
    },
    {
      id: "alain-prost",
      name: "Alain Prost",
      country: "法国",
      birthYear: 1955,
      championships: "4 次世界冠军（1985–1986、1989、1993）",
      wins: "51 场分站冠军",
      bio: "绰号「教授」，以精准计算与战术智慧著称，与 Senna 的长期竞争定义了 1980 年代末的 F1。"
    },
    {
      id: "juan-manuel-fangio",
      name: "Juan Manuel Fangio",
      country: "阿根廷",
      birthYear: 1911,
      championships: "5 次世界冠军（1951、1954–1957）",
      wins: "24 场分站冠军",
      bio: "F1 早期无可争议的王者，1950 年代以 40 多岁高龄五夺世界冠军，胜率至今仍是历史最高之一。"
    },
    {
      id: "niki-lauda",
      name: "Niki Lauda",
      country: "奥地利",
      birthYear: 1949,
      championships: "3 次世界冠军（1975、1977、1984）",
      wins: "25 场分站冠军",
      bio: "1976 年纽伯格林严重烧伤后仅六周即复出，堪称 F1 史上最伟大的勇气故事，后亦成为成功的航空企业家。"
    },
    {
      id: "sebastian-vettel",
      name: "Sebastian Vettel",
      country: "德国",
      birthYear: 1987,
      championships: "4 次世界冠军（2010–2013）",
      wins: "53 场分站冠军",
      bio: "红牛时代的最年轻四连冠王者，2015 年起效力法拉利，2022 年底退役。以思辨与社会关怀著称。"
    },
    {
      id: "kimi-raikkonen",
      name: "Kimi Räikkönen",
      country: "芬兰",
      birthYear: 1979,
      championships: "1 次世界冠军（2007）",
      wins: "21 场分站冠军",
      bio: "绰号「冰人」，2007 年在法拉利以 1 分优势逆转夺冠。2021 年退役前共征战 19 个赛季，是 F1 出场场次最多的车手之一。"
    },
    {
      id: "jenson-button",
      name: "Jenson Button",
      country: "英国",
      birthYear: 1980,
      championships: "1 次世界冠军（2009）",
      wins: "15 场分站冠军",
      bio: "2009 年带领 Brawn GP 上演黑马奇迹夺冠，是雨战大师与最具亲和力的世界冠军之一。"
    },
    {
      id: "nico-rosberg",
      name: "Nico Rosberg",
      country: "德国",
      birthYear: 1985,
      championships: "1 次世界冠军（2016）",
      wins: "23 场分站冠军",
      bio: "2016 年与队友 Hamilton 鏖战整季最终夺冠，随后立即宣布退役，成为罕见激流勇退的世界冠军。"
    },
    {
      id: "mika-hakkinen",
      name: "Mika Häkkinen",
      country: "芬兰",
      birthYear: 1968,
      championships: "2 次世界冠军（1998–1999）",
      wins: "20 场分站冠军",
      bio: "绰号「飞人芬兰」，1998–1999 年为迈凯伦完成两连冠，与 Schumacher 的攻防是世纪之交最精彩的对决。"
    },
    {
      id: "nigel-mansell",
      name: "Nigel Mansell",
      country: "英国",
      birthYear: 1953,
      championships: "1 次世界冠军（1992）",
      wins: "31 场分站冠军",
      bio: "英国车迷心中的英雄，1992 年以统治级表现夺冠，以无畏的超车风格著称。"
    },
    {
      id: "daniel-ricciardo",
      name: "Daniel Ricciardo",
      country: "澳大利亚",
      birthYear: 1989,
      championships: "未夺冠（最佳年度第三）",
      wins: "8 场分站冠军",
      bio: "以灿烂笑容与「最后一刻刹车」的超车闻名，曾效力红牛、雷诺、迈凯伦，2024 年结束 F1 生涯。"
    }
  ],

  // ---------------- 历史名场面 ----------------
  moments: [
    {
      id: "1976-japan",
      title: "1976 日本大奖赛：Lauda 退赛，Hunt 一分夺冠",
      year: 1976,
      event: "日本 富士赛道",
      summary: "雨中决战，已从火灾中奇迹复出的 Niki Lauda 以安全为由主动退赛，James Hunt 冲线夺得年度冠军，1 分之差终结了 F1 史上最戏剧性的赛季之一。",
      significance: "Lauda 的勇气与 Hunt 的坚持，成为电影《极速风流》(Rush) 的蓝本。"
    },
    {
      id: "1984-monaco",
      title: "1984 摩纳哥：Senna 的雨中封神之战",
      year: 1984,
      event: "摩纳哥 蒙特卡洛",
      summary: "初出茅庐的 Ayrton Senna 驾驶并非顶级赛车的 Toleman，在滂沱大雨中从第 13 位一路狂追至第二，若不是比赛提前终止，几乎上演惊天逆袭夺冠。",
      significance: "这场比赛让世界第一次真正记住 Senna 这个名字。"
    },
    {
      id: "1989-japan",
      title: "1989 日本站：Senna 与 Prost 的宿命碰撞",
      year: 1989,
      event: "日本 铃鹿赛道",
      summary: "队友兼宿敌的 Senna 与 Prost 在争夺年度冠军时发生碰撞，Senna 虽重返赛道夺魁却被取消成绩，Prost 提前夺冠。",
      significance: "两人关系彻底决裂，F1 史上最著名的队内战争就此白热化。"
    },
    {
      id: "1990-japan",
      title: "1990 日本站：首弯复仇",
      year: 1990,
      event: "日本 铃鹿赛道",
      summary: "一年后同一赛道，Senna 在第一个弯角直接撞向 Prost，双双退赛，Senna 就此锁定年度冠军，完成复仇。",
      significance: "这场争议碰撞成为 F1 道德与规则讨论的永恒话题。"
    },
    {
      id: "1994-imola",
      title: "1994 圣马力诺：伊莫拉的黑色周末",
      year: 1994,
      event: "意大利 伊莫拉赛道",
      summary: "Roland Ratzenberger 与三届世界冠军 Ayrton Senna 在同一个周末先后因事故离世，F1 史上最沉痛的一页。",
      significance: "悲剧推动 F1 全面改革安全标准，此后 30 年未再出现比赛周末死亡事故。"
    },
    {
      id: "1996-monaco",
      title: "1996 摩纳哥：仅三人的雨中完赛",
      year: 1996,
      event: "摩纳哥 蒙特卡洛",
      summary: "大雨让退赛接连不断，Olivier Panis 最终夺冠，全场仅 3 辆赛车完赛，创下 F1 完赛数最少的纪录之一。",
      significance: "Panis 与 Ligier 车队书写了最大黑马童话。"
    },
    {
      id: "2005-japan",
      title: "2005 日本站：Kimi 第 17 位发车封王",
      year: 2005,
      event: "日本 铃鹿赛道",
      summary: "Kimi Räikkönen 从第 17 位起跑，一路超越最终在最后一圈完成对 Fisichella 的绝杀，赢得 F1 史上最伟大的逆转之一。",
      significance: "被誉为 21 世纪最精彩的单场驾驶表现。"
    },
    {
      id: "2008-brazil",
      title: "2008 巴西站：最后一弯的绝杀",
      year: 2008,
      event: "巴西 因特拉格斯赛道",
      summary: "Lewis Hamilton 在最后一圈最后一弯超越 Timo Glock，以 1 分之差从 Felipe Massa 手中夺走年度冠军，Massa 主场夺冠却与总冠军擦肩而过。",
      significance: "F1 史上最戏剧性的收官之战。"
    },
    {
      id: "2011-canada",
      title: "2011 加拿大站：Button 的最后一圈奇迹",
      year: 2011,
      event: "加拿大 蒙特利尔",
      summary: "一场持续超过 4 小时的雨战，Jenson Button 从末尾一路追至最后一圈超越 Vettel 夺冠。",
      significance: "F1 最长比赛纪录之一，Button 的生涯最佳代表作。"
    },
    {
      id: "2021-abu-dhabi",
      title: "2021 阿布扎比：安全车后的最后一圈",
      year: 2021,
      event: "阿联酋 亚斯码头赛道",
      summary: "赛季最后一圈，安全车撤离后 Max Verstappen 在全新软胎上超越 Hamilton，首度夺得世界冠军，终结 Hamilton 的七冠王朝。",
      significance: "充满争议的结局，彻底改变了 F1 的历史走向。"
    }
  ]
};
