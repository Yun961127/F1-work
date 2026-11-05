// ============================================================
// F1 档案库 —— 固定资讯数据（车队 / 车手 / 退役车手 / 历史名场面）
// 说明：历史类资讯直接写死在此文件，不需要数据库。
// 阵容以 2026 赛季为准，与排行榜 API 数据一致。
// ============================================================

window.F1_DATA = {
  // ---------------- 车队历史（2026 赛季 11 支） ----------------
  teams: [
    {
      id: "red-bull",
      name: "Red Bull Racing",
      fullName: "Oracle Red Bull Racing",
      country: "奥地利",
      base: "英国 米尔顿凯恩斯 (Milton Keynes)",
      firstSeason: 2005,
      engine: "Honda RBPT",
      drivers: "Max Verstappen、Isack Hadjar",
      constructorTitles: "6 次（2010–2013、2022–2023）",
      bio: "2004 年底红牛收购 Jaguar 车队，2005 年以 Red Bull Racing 之名正式参赛。2010–2013 年 Sebastian Vettel 完成四连冠，2021–2024 年 Max Verstappen 再夺四连冠，是 21 世纪最成功的车队之一。",
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
      drivers: "Charles Leclerc、Lewis Hamilton",
      constructorTitles: "16 次（历史最多）",
      bio: "F1 历史上唯一自 1950 年元年参赛至今从未缺席的车队，也是最具传奇色彩的品牌。共赢得 16 次车队冠军，Fangio、Lauda、Schumacher 等传奇先后在此写下辉煌。",
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
      drivers: "Lando Norris、Oscar Piastri",
      constructorTitles: "9 次（最近一次 2024）",
      bio: "1963 年由新西兰车手 Bruce McLaren 创立，1966 年进军 F1。曾与 Senna、Prost、Häkkinen、Hamilton 等巨星合作，2024 年击败红牛重返车队冠军，2025 年 Norris 更进一步摘下车手冠军。",
      notable: ["Ayrton Senna", "Alain Prost", "Lewis Hamilton", "Lando Norris"],
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
      drivers: "George Russell、Kimi Antonelli",
      constructorTitles: "8 次（2014–2021 八连霸）",
      bio: "1954 年首度参赛，2010 年以厂队身份重返 F1。2014–2021 年连续八年包揽车队冠军，Hamilton 在此期间六度封王。2026 年凭借全新动力单元重回争冠行列，Antonelli 领跑积分榜。",
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
      drivers: "Fernando Alonso、Lance Stroll",
      constructorTitles: "0 次（尚未夺冠）",
      bio: "前身为 Jordan（1991）→ Force India（2008）→ Racing Point（2018），2021 年以 Aston Martin 之名回归围场。2023 年 Alonso 多次登台创下近年最佳战绩，车队持续为争冠投入。",
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
      drivers: "Pierre Gasly、Franco Colapinto",
      constructorTitles: "0 次（前身 Renault 曾于 2005–2006 夺冠）",
      bio: "Renault 厂队的后续形态，2021 年更名为 Alpine。以 Renault 之名曾在 2005–2006 年与 Alonso 连夺双冠，目前处于重建与年轻化阶段。",
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
      drivers: "Alexander Albon、Carlos Sainz",
      constructorTitles: "9 次",
      bio: "1977 年由 Frank Williams 创立的老牌豪门，1980–1990 年代是围场绝对霸主之一，共 9 次车队冠军、7 次车手冠军。经历长期低谷后近年正逐步复苏。",
      notable: ["Nigel Mansell", "Ayrton Senna", "Damon Hill", "Alain Prost"],
      color: "#64C4FF"
    },
    {
      id: "racing-bulls",
      name: "RB F1 Team",
      fullName: "Visa Cash App Racing Bulls F1 Team",
      country: "意大利",
      base: "意大利 法恩扎 (Faenza)",
      firstSeason: 2006,
      engine: "Honda RBPT",
      drivers: "Yuki Tsunoda、Liam Lawson、Arvid Lindblad",
      constructorTitles: "0 次（尚未夺冠）",
      bio: "红牛青年队，前身为 Minardi（1985），2006 年成为 Toro Rosso，2020 年更名 AlphaTauri，2024 年再更名为 RB。Vettel 2008 年在这里赢下队史首胜，持续为红牛输送青年才俊。",
      notable: ["Sebastian Vettel", "Max Verstappen", "Yuki Tsunoda", "Arvid Lindblad"],
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
      drivers: "Esteban Ocon、Oliver Bearman、Ryo Hirakawa",
      constructorTitles: "0 次（尚未夺冠）",
      bio: "2016 年由美国商人 Gene Haas 创立的美国车队，总部位于北卡罗来纳州。与法拉利深度技术合作，是美国在 F1 的代表力量，以务实的小团队模式立足围场。",
      notable: ["Kevin Magnussen", "Romain Grosjean", "Esteban Ocon"],
      color: "#B6BABD"
    },
    {
      id: "audi",
      name: "Audi",
      fullName: "Audi F1 Team",
      country: "德国",
      base: "瑞士 欣维尔 (Hinwil)",
      firstSeason: 2026,
      engine: "Audi",
      drivers: "Nico Hülkenberg、Gabriel Bortoleto",
      constructorTitles: "0 次（前身 Sauber 亦未夺冠）",
      bio: "德国汽车品牌 Audi 于 2026 年以厂队身份正式进军 F1，收购 1993 年创立的瑞士 Sauber 车队改造而成。运营基地位于欣维尔，引擎部门位于德国诺伊堡，肩负德国制造商的荣耀重返顶级赛场。",
      notable: ["Nico Hülkenberg", "Gabriel Bortoleto", "Kimi Räikkönen"],
      color: "#BB0A30"
    },
    {
      id: "cadillac",
      name: "Cadillac",
      fullName: "Cadillac F1 Team",
      country: "美国",
      base: "美国",
      firstSeason: 2026,
      engine: "Ferrari",
      drivers: "Valtteri Bottas、Sergio Pérez",
      constructorTitles: "0 次（新军）",
      bio: "通用汽车旗下 Cadillac 品牌于 2026 年正式加入 F1，成为围场第 11 支车队。由 TWG Motorsports 运营，使用法拉利客户引擎，目标是让美国品牌在 F1 站稳脚跟并逐步成长。",
      notable: ["Valtteri Bottas", "Sergio Pérez"],
      color: "#C5B47D"
    }
  ],

  // ---------------- 现役车手（2026 赛季 24 位） ----------------
  drivers: [
    {
      id: "kimi-antonelli",
      name: "Kimi Antonelli",
      number: 12,
      country: "意大利",
      birthDate: "2006-08-25",
      birthPlace: "博洛尼亚",
      team: "Mercedes",
      debutYear: 2025,
      championships: "暂无",
      bio: "被梅赛德斯寄予厚望的意大利天才，从卡丁车时代起就被媒体冠以「下一个 Verstappen」的名号。他跳过 F2 直接空降 F1 的大胆路线，让他在 2025 年一登场就成为围场焦点。2026 赛季他迅速兑现天赋，多次夺冠并长期领跑积分榜，冷静的头脑与犀利的单圈速度让对手望而生畏。如今他正朝着自己的第一座世界冠军全速前进。"
    },
    {
      id: "max-verstappen",
      name: "Max Verstappen",
      number: 3,
      country: "荷兰",
      birthDate: "1997-09-30",
      birthPlace: "哈瑟尔特（比利时）",
      team: "Red Bull",
      debutYear: 2015,
      championships: "4 次世界冠军（2021–2024）",
      bio: "出生于赛车世家，父亲 Jos 曾是 F1 车手，Max 几乎是为速度而生。2015 年他以 17 岁之龄打破最年轻参赛纪录，2016 年升入红牛首战即在西班牙夺冠，震惊世界。2021 年他在阿布扎比最后一圈击败 Hamilton 首度封王，此后完成四连冠。侵略性十足又极度稳定的驾驶风格，让他成为这个时代最具统治力的车手。"
    },
    {
      id: "lewis-hamilton",
      name: "Lewis Hamilton",
      number: 44,
      country: "英国",
      birthDate: "1985-01-07",
      birthPlace: "斯蒂文尼奇",
      team: "Ferrari",
      debutYear: 2007,
      championships: "7 次世界冠军（2008、2014–2015、2017–2020）",
      bio: "出身工薪家庭的英国车手，2007 年以新秀身份险些夺冠，2008 年最后一弯的绝杀让他成为史上最年轻的世界冠军之一。他在梅赛德斯写下七冠神话，并推动 F1 在多元、平等议题上的改变。2025 年他加盟儿时偶像法拉利，圆了少年时代的梦想。如今他仍在追逐史无前例的第八座世界冠军。"
    },
    {
      id: "george-russell",
      name: "George Russell",
      number: 63,
      country: "英国",
      birthDate: "1998-02-15",
      birthPlace: "国王林恩",
      team: "Mercedes",
      debutYear: 2019,
      championships: "暂无",
      bio: "英国车手，以排位赛的极限单圈闻名，曾在威廉姆斯时期多次把弱势赛车开进 Q2、Q3。2022 年加盟梅赛德斯后逐渐成长为车队核心，2024 年两夺分站冠军。他口才出众、思维清晰，被普遍视为梅赛德斯后 Hamilton 时代的领军人物。2026 年他与新秀 Antonelli 联手，向车队冠军发起冲击。"
    },
    {
      id: "charles-leclerc",
      name: "Charles Leclerc",
      number: 16,
      country: "摩纳哥",
      birthDate: "1997-10-16",
      birthPlace: "蒙特卡洛",
      team: "Ferrari",
      debutYear: 2018,
      championships: "暂无",
      bio: "摩纳哥车手，法拉利青训体系的骄傲，自幼在蒙特卡洛的街道间长大。2019 年加盟法拉利后迅速成为车队核心，以排位赛的极限单圈著称。他曾在 2020 年疫情后的特殊赛季为法拉利扛起大旗，也多次在家门口蒙地卡洛留下动人瞬间。对胜利的渴望与真挚的性情，让他成为全球车迷最喜爱的车手之一。"
    },
    {
      id: "lando-norris",
      name: "Lando Norris",
      number: 1,
      country: "英国",
      birthDate: "1999-11-13",
      birthPlace: "布里斯托",
      team: "McLaren",
      debutYear: 2019,
      championships: "1 次世界冠军（2025）",
      bio: "迈凯伦青训出身的英国新星，2019 年出道后以幽默的个性与极快的速度迅速圈粉。2024 年他与 Verstappen 展开了激烈的冠军争夺，虽败犹荣；2025 年他终于修成正果，夺得生涯首座世界冠军。2026 年他背负 1 号车号继续为迈凯伦卫冕，是现役最快的车手之一。"
    },
    {
      id: "oscar-piastri",
      name: "Oscar Piastri",
      number: 81,
      country: "澳大利亚",
      birthDate: "2001-04-06",
      birthPlace: "墨尔本",
      team: "McLaren",
      debutYear: 2023,
      championships: "暂无",
      bio: "澳大利亚车手，2021 年以新人身份横扫 F2 冠军，堪称青训体系的天才样板。2023 年在迈凯伦出道后，他以冷静、精准、抗压的驾驶风格迅速跻身一线。2025 年他与 Norris 联手为迈凯伦夺回车队冠军，是车队最可靠的得分机器。低调沉稳的个性下，藏着不容小觑的争冠野心。"
    },
    {
      id: "isack-hadjar",
      name: "Isack Hadjar",
      number: 6,
      country: "法国",
      birthDate: "2004-09-28",
      birthPlace: "巴黎",
      team: "Red Bull",
      debutYear: 2025,
      championships: "暂无",
      bio: "红牛青训出身的法国新星，2024 年 F2 年度亚军让他拿到 F1 门票。2025 年在 RB 完成首秀后，2026 年升入红牛一队与 Verstappen 搭档。他速度出众、斗志旺盛，虽然偶有情绪化，但那股不服输的劲头正是红牛看重的品质。"
    },
    {
      id: "liam-lawson",
      name: "Liam Lawson",
      number: 30,
      country: "新西兰",
      birthDate: "2002-02-11",
      birthPlace: "黑斯廷斯",
      team: "RB F1 Team",
      debutYear: 2023,
      championships: "暂无",
      bio: "新西兰车手，红牛青训出身，以多次临时代班时的亮眼表现赢得尊重——2023 年他替补受伤的 Ricciardo，首秀即抢分。2025 年他短暂效力红牛一队，2026 年回到 RB 继续磨砺。他韧劲十足、适应力强，被视为红牛体系最可靠的替补王牌。"
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
      championships: "暂无",
      bio: "红牛青训首位日本车手，2021 年在 AlphaTauri（现 RB）出道。他以火爆的脾气和直率的个性闻名，也以逐渐成熟的驾驶风格证明了自己的实力。作为日本现役最受关注的车手，他承载着日本车迷重返领奖台的期待。2026 年他继续为 RB 而战。"
    },
    {
      id: "arvid-lindblad",
      name: "Arvid Lindblad",
      number: 41,
      country: "英国",
      birthDate: "2007-08-08",
      birthPlace: "伦敦",
      team: "RB F1 Team",
      debutYear: 2026,
      championships: "暂无",
      bio: "红牛青训最新力作，2025 年 F2 表现抢眼后于 2026 年直升 RB。他被红牛视为下一代的核心培养对象，F1 处子赛季即多次抢分，展现出远超年龄的成熟。年轻、快速、敢于挑战，他的成长轨迹备受期待。"
    },
    {
      id: "pierre-gasly",
      name: "Pierre Gasly",
      number: 10,
      country: "法国",
      birthDate: "1996-02-07",
      birthPlace: "鲁昂",
      team: "Alpine",
      debutYear: 2017,
      championships: "暂无",
      bio: "法国车手，2020 年意大利站为 AlphaTauri 拿下队史级胜利，是近年来最动人的逆袭故事之一——从红牛失意降级到加冕分站冠军，他用实力完成了自我救赎。此后他成为 Alpine 的领军人物，2026 年继续代表法国品牌车队出战。坚韧不拔的性格，让他成为围场最受尊敬的车手之一。"
    },
    {
      id: "franco-colapinto",
      name: "Franco Colapinto",
      number: 43,
      country: "阿根廷",
      birthDate: "2003-05-27",
      birthPlace: "布宜诺斯艾利斯",
      team: "Alpine",
      debutYear: 2024,
      championships: "暂无",
      bio: "阿根廷车手，2024 年顶替上阵威廉姆斯便迅速走红，凭借大胆的超车与亲和的个性收获大量粉丝。他的出现让沉寂多年的阿根廷重新沸腾，也为南美车手正名。2026 年他转投 Alpine，为自己的 F1 生涯开启全新篇章。"
    },
    {
      id: "esteban-ocon",
      name: "Esteban Ocon",
      number: 31,
      country: "法国",
      birthDate: "1996-09-17",
      birthPlace: "埃夫勒",
      team: "Haas",
      debutYear: 2016,
      championships: "暂无",
      bio: "法国车手，出身平凡，靠奖学金与坚持一路打进 F1。2021 年匈牙利站他抓住机会夺得生涯首胜，是对多年努力的最好回报。他曾长期效力 Alpine，2026 年转投 Haas，以稳定的全面性成为车队拿分的关键。低调务实，是他最鲜明的标签。"
    },
    {
      id: "oliver-bearman",
      name: "Oliver Bearman",
      number: 87,
      country: "英国",
      birthDate: "2005-05-08",
      birthPlace: "切姆斯福德",
      team: "Haas",
      debutYear: 2024,
      championships: "暂无",
      bio: "英国新星，2024 年代班法拉利在沙特首秀即得分，一鸣惊人，成为近年最惊艳的 F1 首秀之一。此后他正式加盟 Haas，被视为英国年轻一代的领军人物。冷静的头脑与出色的学习能力，让他的未来充满想象空间。"
    },
    {
      id: "ryo-hirakawa",
      name: "Ryo Hirakawa",
      number: 50,
      country: "日本",
      birthDate: "1994-03-07",
      birthPlace: "横滨",
      team: "Haas",
      debutYear: 2026,
      championships: "暂无",
      bio: "日本车手，耐力赛领域的顶级名将，曾多次夺得勒芒冠军与 WEC 年度冠军。2026 年他以 31 岁之龄在 Haas 迎来 F1 正式赛季，是围场中经历最丰富的「新秀」之一。丰富的赛车经验与沉稳的心态，是他立足 F1 的最大本钱。"
    },
    {
      id: "nico-hulkenberg",
      name: "Nico Hülkenberg",
      number: 27,
      country: "德国",
      birthDate: "1987-08-19",
      birthPlace: "埃默里希",
      team: "Audi",
      debutYear: 2010,
      championships: "暂无",
      bio: "德国车手，2010 年出道，是围场公认的排位赛大师，却始终与领奖台擦肩而过。他辗转多支车队，经验丰富、稳定可靠。2026 年他代表奥迪厂队出战，为奥迪 F1 时代开疆拓土。无冠无领奖台却依旧被车队争相聘用，本身就是对他实力的最好证明。"
    },
    {
      id: "gabriel-bortoleto",
      name: "Gabriel Bortoleto",
      number: 5,
      country: "巴西",
      birthDate: "2004-10-14",
      birthPlace: "圣保罗",
      team: "Audi",
      debutYear: 2025,
      championships: "暂无",
      bio: "巴西车手，2024 年 F2 冠军，被视为巴西新一代希望之星。2025 年出道后随车队转投奥迪厂队，肩负着巴西车迷重返领奖台的期待。他沉稳、聪明、学习能力强，是南美赛车的新旗帜。"
    },
    {
      id: "alexander-albon",
      name: "Alexander Albon",
      number: 23,
      country: "泰国",
      birthDate: "1996-03-23",
      birthPlace: "伦敦",
      team: "Williams",
      debutYear: 2019,
      championships: "暂无",
      bio: "泰国车手，2019 年出道，曾短暂效力红牛，后于 2022 年加盟威廉姆斯。他以稳定全面的表现成为这支老牌豪门的核心支柱，多次把中游赛车开进积分区。谦逊随和的性格，让他成为围场最受欢迎的队友之一。"
    },
    {
      id: "carlos-sainz",
      name: "Carlos Sainz",
      number: 55,
      country: "西班牙",
      birthDate: "1994-09-01",
      birthPlace: "马德里",
      team: "Williams",
      debutYear: 2015,
      championships: "暂无",
      bio: "出身赛车世家，父亲是两届 WRC 世界冠军，Carlos 自幼便以进入 F1 为目标。2015 年出道后，他先后效力雷诺、迈凯伦、法拉利，多次登台并夺过分站冠军。2025 年加盟威廉姆斯，以全面的实力和团队精神成为车队领军者。他是围场公认最被低估的车手之一。"
    },
    {
      id: "fernando-alonso",
      name: "Fernando Alonso",
      number: 14,
      country: "西班牙",
      birthDate: "1981-07-29",
      birthPlace: "奥维耶多",
      team: "Aston Martin",
      debutYear: 2001,
      championships: "2 次世界冠军（2005–2006）",
      bio: "两届世界冠军，F1 常青树，2001 年出道至今征战超过 20 个赛季。他 2005–2006 年终结了 Schumacher 王朝，以无与伦比的比赛智慧与斗志著称。即便年过四十，他仍在 2023 年为阿斯顿马丁多次登台。他对胜利的渴望从未熄灭，仍在追逐第三座世界冠军。"
    },
    {
      id: "lance-stroll",
      name: "Lance Stroll",
      number: 18,
      country: "加拿大",
      birthDate: "1998-10-29",
      birthPlace: "蒙特利尔",
      team: "Aston Martin",
      debutYear: 2017,
      championships: "暂无",
      bio: "加拿大车手，2017 年出道即登上领奖台，是围场中成名最早的新秀之一。他长期效力阿斯顿马丁体系，2026 年继续为车队出战。虽然常被外界低估，但他多次证明自己能在关键时刻交出稳定表现。"
    },
    {
      id: "valtteri-bottas",
      name: "Valtteri Bottas",
      number: 77,
      country: "芬兰",
      birthDate: "1989-08-28",
      birthPlace: "纳斯塔拉",
      team: "Cadillac",
      debutYear: 2013,
      championships: "暂无",
      bio: "芬兰车手，曾效力威廉姆斯与梅赛德斯，在梅赛德斯时期拿下 10 场分站胜利，是 Hamilton 时代最可靠的搭档。他以排位赛的出色单圈和稳定的正赛节奏著称。2026 年加盟新军 Cadillac 再出发，用丰富经验帮助美国品牌起步。"
    },
    {
      id: "sergio-perez",
      name: "Sergio Pérez",
      number: 11,
      country: "墨西哥",
      birthDate: "1990-01-26",
      birthPlace: "瓜达拉哈拉",
      team: "Cadillac",
      debutYear: 2011,
      championships: "暂无",
      bio: "墨西哥车手，2011 年出道，以保胎与防守大师的名号著称，是围场公认的「轮胎管理专家」。他曾在红牛拿下 6 场胜利，2021 年阿布扎比更以顽强的防守为 Verstappen 夺冠立下奇功。2026 年他转投 Cadillac 延续生涯，是墨西哥赛车的精神领袖。"
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
      bio: "被普遍视为 F1 史上最伟大车手之一。1994–1995 年代表 Benetton 两连冠后，他转投处于低谷的法拉利，用数年时间将红色军团打造成为无敌王朝，2000–2004 年完成史无前例的五连冠。他共赢得 91 场分站冠军，多项纪录保持多年。2013 年滑雪事故后，他长期休养，牵动着全球车迷的心。"
    },
    {
      id: "ayrton-senna",
      name: "Ayrton Senna",
      country: "巴西",
      birthYear: 1960,
      championships: "3 次世界冠军（1988、1990–1991）",
      wins: "41 场分站冠军",
      bio: "巴西传奇，雨战之神。1988 年加盟迈凯伦后开启巅峰，与队友 Prost 的宿敌对决是 F1 最经典的篇章。他三夺世界冠军，以近乎偏执的信念与无与伦比的速度征服了全世界。1994 年圣马力诺大奖赛伊莫拉赛道事故中不幸离世，他的离去推动了 F1 安全标准的全面改革，也让「车神」之名永载史册。"
    },
    {
      id: "alain-prost",
      name: "Alain Prost",
      country: "法国",
      birthYear: 1955,
      championships: "4 次世界冠军（1985–1986、1989、1993）",
      wins: "51 场分站冠军",
      bio: "绰号「教授」的法国车手，以精准计算与战术智慧著称，与 Senna 的长期竞争定义了 1980 年代末的 F1。他四夺世界冠军，是那个时代最理性的赢家。退役后他还以车队老板身份重返围场，继续影响这项运动。"
    },
    {
      id: "juan-manuel-fangio",
      name: "Juan Manuel Fangio",
      country: "阿根廷",
      birthYear: 1911,
      championships: "5 次世界冠军（1951、1954–1957）",
      wins: "24 场分站冠军",
      bio: "F1 早期无可争议的王者，1950 年代以 40 多岁高龄五夺世界冠军，其中多次是代表不同车队。他的胜率至今仍是历史最高之一，被后世车手公认为「大师中的大师」。在那个没有安全带与防护的时代，他的每一场胜利都是勇气与技艺的极致。"
    },
    {
      id: "niki-lauda",
      name: "Niki Lauda",
      country: "奥地利",
      birthYear: 1949,
      championships: "3 次世界冠军（1975、1977、1984）",
      wins: "25 场分站冠军",
      bio: "奥地利车手，三届世界冠军。1976 年他在纽伯格林遭遇严重事故，重度烧伤后仅六周便奇迹复出，堪称 F1 史上最伟大的勇气故事。那一年他与 James Hunt 的世纪对决成为电影《极速风流》的蓝本。退役后他成为成功的航空企业家，并帮助梅赛德斯车队走向辉煌。"
    },
    {
      id: "sebastian-vettel",
      name: "Sebastian Vettel",
      country: "德国",
      birthYear: 1987,
      championships: "4 次世界冠军（2010–2013）",
      wins: "53 场分站冠军",
      bio: "红牛时代的最年轻四连冠王者，2010–2013 年连续四年称霸，创下多项最年轻纪录。2015 年起效力法拉利，为红色军团征战多年，2022 年底退役。他以思辨与社会关怀著称，关注环保与平权议题，是围场最具思想深度的车手之一。"
    },
    {
      id: "kimi-raikkonen",
      name: "Kimi Räikkönen",
      country: "芬兰",
      birthYear: 1979,
      championships: "1 次世界冠军（2007）",
      wins: "21 场分站冠军",
      bio: "绰号「冰人」的芬兰车手，以惜字如金和超凡的速度闻名。2007 年他在法拉利以 1 分优势逆转夺冠，成为法拉利迄今最近的车手世界冠军。2021 年退役前他共征战 19 个赛季，是 F1 出场场次最多的车手之一。他的冷幽默与真性情，让他成为车迷心中独一无二的存在。"
    },
    {
      id: "jenson-button",
      name: "Jenson Button",
      country: "英国",
      birthYear: 1980,
      championships: "1 次世界冠军（2009）",
      wins: "15 场分站冠军",
      bio: "英国车手，2009 年带领 Brawn GP 上演黑马奇迹——车队在赛季前才勉强凑齐资金，却一举夺下车队与车手双料冠军。他是雨战大师，在复杂条件下总能做出正确的轮胎选择。亲和力十足的性格，也让他成为围场最受欢迎的世界冠军之一。"
    },
    {
      id: "nico-rosberg",
      name: "Nico Rosberg",
      country: "德国",
      birthYear: 1985,
      championships: "1 次世界冠军（2016）",
      wins: "23 场分站冠军",
      bio: "德国车手，2016 年与队友 Hamilton 鏖战整季，在最后一刻以 5 分之差夺冠，随后立即宣布退役。他成为罕见激流勇退的世界冠军，用完美的方式结束了自己的 F1 生涯。退役后他转型为企业家与媒体人，继续活跃在赛车世界。"
    },
    {
      id: "mika-hakkinen",
      name: "Mika Häkkinen",
      country: "芬兰",
      birthYear: 1968,
      championships: "2 次世界冠军（1998–1999）",
      wins: "20 场分站冠军",
      bio: "绰号「飞人芬兰」，1998–1999 年为迈凯伦完成两连冠，与 Schumacher 的攻防是世纪之交最精彩的对决。他曾在 1995 年经历严重事故后奇迹康复并重返巅峰，这段经历让他更加坚韧。退役后他依然活跃于赛车圈。"
    },
    {
      id: "nigel-mansell",
      name: "Nigel Mansell",
      country: "英国",
      birthYear: 1953,
      championships: "1 次世界冠军（1992）",
      wins: "31 场分站冠军",
      bio: "英国车迷心中的英雄，1992 年以统治级表现夺冠，单赛季 9 胜的纪录保持了多年。他以无畏的超车风格和直率的个性著称，从普通家庭一路打拼成为世界冠军，是无数英国车迷的偶像。"
    },
    {
      id: "daniel-ricciardo",
      name: "Daniel Ricciardo",
      country: "澳大利亚",
      birthYear: 1989,
      championships: "未夺冠（最佳年度第三）",
      wins: "8 场分站冠军",
      bio: "澳大利亚车手，以灿烂笑容与「最后一刻刹车」的超车闻名。他曾在红牛拿下 7 场胜利，是那个时代最具观赏性的车手之一。辗转雷诺、迈凯伦后，他于 2024 年结束 F1 生涯。他的乐观与真诚，让他成为围场最受欢迎的「开心果」。"
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
