"use strict";

const traits = ["drama", "logic", "warmth", "hustle", "chaos", "stage"];
const traitLabels = {
  drama: "情绪张力",
  logic: "拆解逻辑",
  warmth: "人情温度",
  hustle: "行动压强",
  chaos: "抽象浓度",
  stage: "舞台表达",
};

const questions = [
  {
    kicker: "群聊突袭",
    title: "朋友突然在群里发了一句「这事你怎么看？」你第一反应是？",
    options: [
      ["先别急，我把正反两边摆出来。", { logic: 3, warmth: 1 }],
      ["我直接开麦，先把气势打出来。", { drama: 2, stage: 3 }],
      ["看谁快冷场，立刻补一个好笑的。", { chaos: 3, warmth: 1 }],
      ["先问一句：这跟赚钱/升学/上分有关吗？", { hustle: 3, logic: 1 }],
    ],
  },
  {
    kicker: "饭局选择",
    title: "一桌人纠结吃什么，你会怎么结束这场内耗？",
    options: [
      ["列预算、距离、排队时间，三秒出结论。", { logic: 3, hustle: 1 }],
      ["我请客，但菜必须按我的节奏来。", { stage: 2, warmth: 2 }],
      ["随机进一家，命运会给答案。", { chaos: 3, drama: 1 }],
      ["照顾最饿的人，先让大家坐下。", { warmth: 3 }],
    ],
  },
  {
    kicker: "逆风时刻",
    title: "项目/比赛进入逆风局，你最像哪种队友？",
    options: [
      ["复盘每个节点，找到翻盘口。", { logic: 3, hustle: 1 }],
      ["嘴上很急，但手上操作不停。", { drama: 2, hustle: 2 }],
      ["先整点节目效果，让士气别掉光。", { chaos: 2, stage: 2 }],
      ["安抚大家：先把下一步做好。", { warmth: 3, logic: 1 }],
    ],
  },
  {
    kicker: "表达习惯",
    title: "你解释一个复杂问题时，最常出现的画风是？",
    options: [
      ["画框架、分层级、最后给一句结论。", { logic: 3 }],
      ["举例子举到对面突然懂了。", { warmth: 2, stage: 1 }],
      ["越讲越兴奋，像在直播间打连招。", { stage: 3, drama: 1 }],
      ["说着说着冒出一个离谱但准确的比喻。", { chaos: 3, logic: 1 }],
    ],
  },
  {
    kicker: "压力按钮",
    title: "下面哪件事最容易让你血压上来？",
    options: [
      ["逻辑漏洞还被硬说成格局。", { logic: 2, drama: 2 }],
      ["明明能立刻做，却一直开会。", { hustle: 3, drama: 1 }],
      ["大家都不说真话，空气像没熟的面。", { warmth: 1, chaos: 2 }],
      ["气氛已经到这了，竟然没人接梗。", { stage: 2, chaos: 2 }],
    ],
  },
  {
    kicker: "社交充电",
    title: "最适合你的快乐恢复方式是？",
    options: [
      ["一个人整理计划，把脑子擦干净。", { logic: 2, hustle: 1 }],
      ["跟熟人吃饭，把话说开。", { warmth: 3 }],
      ["看点高密度名场面，笑到重启。", { chaos: 3 }],
      ["站到人群中心，开始控场。", { stage: 3, drama: 1 }],
    ],
  },
  {
    kicker: "名场面生成",
    title: "如果给你一分钟制造一个名场面，你会选？",
    options: [
      ["精准吐槽，句句有证据。", { logic: 2, drama: 2 }],
      ["突然热血，把大家情绪拉满。", { stage: 2, drama: 3 }],
      ["一本正经地说非常抽象的话。", { chaos: 3, stage: 1 }],
      ["给所有人安排任务，场面立刻动起来。", { hustle: 3, stage: 1 }],
    ],
  },
  {
    kicker: "人生攻略",
    title: "你更相信哪种人生攻略？",
    options: [
      ["选赛道比努力姿势更重要。", { logic: 2, hustle: 2 }],
      ["先做起来，边撞墙边进化。", { hustle: 3, chaos: 1 }],
      ["关系要真诚，路才走得长。", { warmth: 3 }],
      ["人活着要有点戏剧感。", { drama: 2, stage: 2 }],
    ],
  },
  {
    kicker: "被误解后",
    title: "别人误会你了，你会怎么处理？",
    options: [
      ["拿事实链条一条条对齐。", { logic: 3 }],
      ["当场澄清，声音可以大但理要稳。", { drama: 2, stage: 1 }],
      ["算了，等对方冷静再聊。", { warmth: 3 }],
      ["把误会变成梗，先让场子松下来。", { chaos: 2, warmth: 1 }],
    ],
  },
  {
    kicker: "消费冲动",
    title: "看到一个很想买但不便宜的东西，你会？",
    options: [
      ["做表格，算使用频率和替代品。", { logic: 3 }],
      ["喜欢就冲，快乐有时效性。", { chaos: 2, drama: 1 }],
      ["问懂行朋友，综合口碑再下手。", { warmth: 1, logic: 2 }],
      ["想办法让它变成生产力工具。", { hustle: 3 }],
    ],
  },
  {
    kicker: "对线方式",
    title: "遇到观点完全相反的人，你的默认打法是？",
    options: [
      ["先定义概念，否则全是白吵。", { logic: 3, drama: 1 }],
      ["抓住核心矛盾，直接上强度。", { drama: 3, stage: 1 }],
      ["找共同点，能不撕就不撕。", { warmth: 3 }],
      ["用一句怪话让对方重新组织语言。", { chaos: 3 }],
    ],
  },
  {
    kicker: "团队定位",
    title: "大家一起做事时，你通常承担什么角色？",
    options: [
      ["总设计师：拆任务、定标准。", { logic: 2, hustle: 2 }],
      ["气氛发动机：人不能散。", { stage: 2, warmth: 2 }],
      ["临门一脚：关键时刻顶上。", { hustle: 3, drama: 1 }],
      ["灵感污染源：负责打开奇怪脑洞。", { chaos: 3 }],
    ],
  },
  {
    kicker: "朋友圈文学",
    title: "你发朋友圈/状态更可能是哪种？",
    options: [
      ["一段冷静总结，像月度报告。", { logic: 2 }],
      ["一句狠话配一张意味深长的图。", { drama: 2, stage: 1 }],
      ["生活碎片，重点是人情味。", { warmth: 3 }],
      ["别人看不懂，但你觉得特别准确。", { chaos: 3 }],
    ],
  },
  {
    kicker: "关键选择",
    title: "面对一个重要选择，你最看重？",
    options: [
      ["长期收益和风险边界。", { logic: 2, hustle: 2 }],
      ["我是不是真的会开心。", { warmth: 1, chaos: 1, drama: 1 }],
      ["能不能打出个人招牌。", { stage: 3, hustle: 1 }],
      ["有没有足够大的故事性。", { drama: 3, stage: 1 }],
    ],
  },
  {
    kicker: "终极抽象",
    title: "如果你的精神世界是一间屋子，里面最显眼的是？",
    options: [
      ["一面白板，写满箭头和因果。", { logic: 3 }],
      ["一盏聚光灯，随时准备开场。", { stage: 3 }],
      ["一张大圆桌，朋友来了就有位置。", { warmth: 3 }],
      ["一个按钮，按下去谁也不知道发生什么。", { chaos: 3, drama: 1 }],
    ],
  },
];

const profiles = [
  profile("徐静雨", "高密度输出评论员", { drama: 86, logic: 76, warmth: 42, hustle: 68, chaos: 64, stage: 92 }, "#ffd84d", "你擅长把平静话题讲成总决赛抢七，观点有锋芒，节奏有压迫感。只要给你一个话筒，你就能把空气搅热。", ["表达感染力强，适合做观点发动机。", "能迅速抓住争议点，把讨论推向高潮。", "缺点是容易太上头，偶尔需要给听众留个喘气口。"]),
  profile("峰哥", "现实主义观察家", { drama: 62, logic: 80, warmth: 45, hustle: 74, chaos: 72, stage: 58 }, "#ffb15d", "你的抽象来自清醒：看似松弛，实则对现实的门道很敏感。你不爱空谈漂亮话，更关心事情到底怎么运转。", ["判断现实成本很快，不容易被话术带走。", "擅长把复杂局面讲成朴素人话。", "偶尔会显得太冷，记得给理性加一点温度。"]),
  profile("张雪峰", "赛道规划教练", { drama: 74, logic: 88, warmth: 58, hustle: 92, chaos: 34, stage: 78 }, "#79d4ff", "你天然会问：这件事的投入产出是什么？你喜欢把迷茫变成路线图，也很擅长用大白话降低选择难度。", ["目标感强，能帮团队停止原地转圈。", "解释问题直给、有用、落地。", "需要小心把人生过早简化成单选题。"]),
  profile("战鹰", "松弛整活棋手", { drama: 54, logic: 62, warmth: 76, hustle: 42, chaos: 90, stage: 74 }, "#b7a2ff", "你不一定每一步都最优，但总能让过程变得有趣。你的魅力在于真实松弛，越不端着，越容易让人想靠近。", ["天然有亲和力，能把压力局变轻。", "抽象表达不刻意，节目效果自然发生。", "关键局面别只靠手感，偶尔也要算两步。"]),
  profile("吴京", "热血行动派", { drama: 88, logic: 48, warmth: 62, hustle: 94, chaos: 38, stage: 86 }, "#ff6f61", "你身上有一种「别说了，跟我上」的气质。面对难题，你更愿意用行动把路打出来。", ["执行力爆表，能在混乱里立住旗。", "情绪能量强，容易带动身边人。", "需要给队友一点自主空间，别全场都冲锋号。"]),
  profile("何炅", "高情商控场官", { drama: 40, logic: 70, warmth: 96, hustle: 62, chaos: 32, stage: 86 }, "#8be28b", "你擅长让所有人都舒服地待在场内。你能接住情绪，也能把尴尬轻轻转过去。", ["共情力强，能维护团队气氛。", "控场自然，不用大声也有存在感。", "别把所有人的感受都背到自己身上。"]),
  profile("黄磊", "生活秩序导演", { drama: 34, logic: 78, warmth: 86, hustle: 66, chaos: 20, stage: 52 }, "#ffd84d", "你重视经验、秩序和烟火气。你喜欢把日子安排得有章法，也擅长把知识变成可入口的家常菜。", ["稳定可靠，适合做长期主义组织者。", "会照顾细节，也会照顾人的胃和心。", "偶尔别太像教案，给意外留点位置。"]),
  profile("孙红雷", "戏剧压场玩家", { drama: 90, logic: 55, warmth: 54, hustle: 72, chaos: 70, stage: 92 }, "#ff9bb3", "你有强烈的现场感，轻轻一抬眉都像有剧情。你会试探、会反转，也会把平凡时刻演出层次。", ["存在感强，适合复杂社交局。", "能看懂人心里的小动作。", "别把每件事都玩成心理战，真诚有时更好用。"]),
  profile("邓超", "快乐能量发动机", { drama: 70, logic: 38, warmth: 82, hustle: 64, chaos: 82, stage: 88 }, "#79d4ff", "你像一块会走路的气氛电池。再普通的场合，只要你进来，就容易变得热闹。", ["调动情绪能力强，团队低电量时很关键。", "不怕出糗，反而能把尴尬变成笑点。", "注意别把认真场合也全部综艺化。"]),
  profile("Bin哥", "锋利上路突破手", { drama: 72, logic: 60, warmth: 36, hustle: 94, chaos: 58, stage: 70 }, "#ffb15d", "你喜欢正面交锋，也相信关键时刻要敢操作。你不怕压力，甚至会从压力里榨出状态。", ["胜负心强，敢打敢承担。", "擅长在僵局里撕开口子。", "顺风别太贪，逆风也别独自硬扛。"]),
  profile("JackeyLove", "天赋团战输出位", { drama: 80, logic: 54, warmth: 46, hustle: 88, chaos: 76, stage: 78 }, "#b7a2ff", "你有一种敢接大场面的心气。别人还在算风险，你已经在找能不能一波结束。", ["关键时刻胆子大，能制造决定性机会。", "高压下仍能保持操作欲。", "需要把冒险和信息量绑定，别只凭手感。"]),
  profile("罗翔", "冷幽默法理学者", { drama: 42, logic: 96, warmth: 68, hustle: 46, chaos: 58, stage: 70 }, "#8be28b", "你擅长在荒诞里找边界，在笑声里讲清规则。你的表达有秩序，也有一点突然冒出的幽默。", ["逻辑严密，能把混乱问题讲出层次。", "善于用故事降低理解门槛。", "小心想太多，把轻松局也开成研讨会。"]),
  profile("郭德纲", "语言包袱大师", { drama: 78, logic: 72, warmth: 64, hustle: 58, chaos: 80, stage: 96 }, "#ffd84d", "你的武器是语言节奏。你知道什么时候铺垫，什么时候抖包袱，也知道怎么把场面拿回来。", ["反应快，擅长用幽默化解冲突。", "表达层次丰富，有强烈个人风格。", "别让机智盖过倾听，对方也需要被认真接住。"]),
  profile("马东", "清醒辩题操盘手", { drama: 56, logic: 90, warmth: 70, hustle: 62, chaos: 54, stage: 84 }, "#79d4ff", "你擅长设置问题，也擅长让不同观点在同一张桌上发生化学反应。你不急着赢，更在意讨论有没有变高级。", ["会提问，能把模糊感受变成可讨论议题。", "兼具理性和松弛，适合主持复杂场面。", "有时别过度旁观，该表态时可以更锋利。"]),
  profile("李诞", "丧燃哲学段子手", { drama: 48, logic: 66, warmth: 52, hustle: 36, chaos: 92, stage: 78 }, "#ff9bb3", "你的抽象是一种看穿之后还愿意笑的能力。你不一定想解决全部问题，但很会把问题变得没那么沉。", ["语言有辨识度，能把疲惫讲成幽默。", "善于发现荒诞中的准确细节。", "别把松弛误用成逃避，重要的事还是要推进。"]),
  profile("杨超越", "好运直觉锦鲤", { drama: 66, logic: 28, warmth: 82, hustle: 52, chaos: 84, stage: 72 }, "#ffb15d", "你靠真实感和直觉吸引注意。你不一定按标准路线走，但经常能在混乱里找到自己的出口。", ["真实、不装，容易获得好感。", "直觉灵敏，能从小机会里钻出来。", "需要补一点方法论，让好运更可复制。"]),
  profile("沈腾", "懒洋洋喜剧军师", { drama: 58, logic: 70, warmth: 72, hustle: 34, chaos: 86, stage: 90 }, "#8be28b", "你看起来不紧不慢，脑子里其实全是节奏点。你擅长用低能量姿态打出高密度笑点。", ["松弛感强，不费力也能控场。", "对喜剧节奏和人情分寸很敏感。", "该动起来时别只用智慧远程指挥。"]),
  profile("撒贝宁", "机智控场学霸", { drama: 64, logic: 88, warmth: 78, hustle: 70, chaos: 62, stage: 94 }, "#b7a2ff", "你能在严肃和好笑之间无缝切换。该讲逻辑时很清楚，该活跃气氛时也能马上变速。", ["综合能力强，适合高压公开表达。", "知识感和亲和力兼备。", "偶尔会太全能，记得让别人也有发挥空间。"]),
  profile("雷军", "真诚发布会工程师", { drama: 52, logic: 86, warmth: 74, hustle: 88, chaos: 36, stage: 76 }, "#79d4ff", "你相信认真做事，也相信把复杂东西讲得朴素。你的表达不靠虚张声势，靠可信的细节。", ["产品思维强，能把愿景落到体验。", "真诚感足，容易建立信任。", "别把所有压力都变成自我加班。"]),
  profile("董宇辉", "诗意带货讲述者", { drama: 48, logic: 72, warmth: 92, hustle: 68, chaos: 32, stage: 82 }, "#ffd84d", "你擅长把普通物件讲出人生纹理。你的表达柔软、有画面，也能把商业话题讲得不那么硬。", ["叙事温暖，能让信息带上情感。", "知识和共情结合得好。", "需要避免过度抒情，关键利益点也要讲明白。"]),
  profile("王传君", "反套路观察者", { drama: 46, logic: 74, warmth: 50, hustle: 44, chaos: 78, stage: 58 }, "#ff9bb3", "你不太愿意按默认剧本生活。你会观察荒诞，识别表演，然后选择一种更接近自己的姿态。", ["独立判断强，不容易被热闹裹挟。", "能看见人群忽略的细节。", "别把所有规则都当成枷锁，有些规则只是工具。"]),
  profile("陈铭", "温柔逻辑辩手", { drama: 54, logic: 92, warmth: 84, hustle: 54, chaos: 26, stage: 82 }, "#8be28b", "你喜欢讲理，但不是为了压倒别人。你更像在给复杂情绪搭一座桥，让不同立场都能走过去。", ["逻辑清晰又不失温度。", "适合处理分歧、协调观点。", "偶尔可以少铺垫一点，结论更有力量。"]),
  profile("王建国", "冷脸谐音工程师", { drama: 38, logic: 62, warmth: 50, hustle: 30, chaos: 88, stage: 66 }, "#b7a2ff", "你把尴尬、疲惫和小聪明揉在一起，做成一种独特笑点。你不抢，但一开口可能精准命中。", ["低调但有梗，适合后手补刀。", "能把负能量转成可笑的东西。", "别只躲在自嘲里，认真表达也很有价值。"]),
  profile("于谦", "稳定捧场艺术家", { drama: 36, logic: 66, warmth: 88, hustle: 42, chaos: 64, stage: 74 }, "#ffb15d", "你有一种让别人发挥得更好的能力。你不一定站在最前面，但你在，场面就稳。", ["接话能力强，懂分寸也懂幽默。", "情绪稳定，是团队的缓冲垫。", "别总把主场让出去，你也可以当主角。"]),
  profile("陈泽", "高能抽象发动机", { drama: 82, logic: 44, warmth: 50, hustle: 70, chaos: 94, stage: 86 }, "#79d4ff", "你身上有一种高能量的离谱感，越到热闹场合越容易把气氛拧到不可预测频道。", ["整活冲击力强，能迅速制造记忆点。", "不怕表达外放，适合把场子点燃。", "需要注意节奏，别让别人还没上车就被甩到下一站。"]),
  profile("马云", "愿景叙事企业家", { drama: 76, logic: 72, warmth: 60, hustle: 96, chaos: 42, stage: 90 }, "#ff9bb3", "你擅长把目标讲成故事，把故事讲成动员。别人看到困难，你更容易看到未来的入口。", ["愿景感强，能调动团队相信长期目标。", "行动压强高，不太容易停在想法阶段。", "要小心叙事过满，具体执行也要经得起拆解。"]),
  profile("马化腾", "低调系统架构师", { drama: 28, logic: 94, warmth: 58, hustle: 88, chaos: 24, stage: 42 }, "#8be28b", "你不一定爱站在聚光灯下，但很擅长把复杂系统做稳。你的抽象不是喊出来的，是在长期布局里慢慢显形。", ["判断克制，重视结构和长期复利。", "能把需求沉到产品和系统里。", "偶尔可以更主动表达，否则别人容易低估你的锋利。"]),
  profile("韦世豪", "锋芒外露突破手", { drama: 88, logic: 48, warmth: 34, hustle: 90, chaos: 72, stage: 76 }, "#ffd84d", "你带着明显的进攻性和存在感，喜欢在正面对抗里证明自己。顺风很亮眼，逆风也敢站出来。", ["冲击力强，不怕关键场面。", "情绪和行动绑定紧，容易打出爆点。", "需要把火气变成判断力，别让节奏被情绪带走。"]),
  profile("周琦", "冷面天赋中轴", { drama: 42, logic: 58, warmth: 36, hustle: 72, chaos: 62, stage: 52 }, "#b7a2ff", "你常给人一种慢热甚至让人捉摸不透的感觉，但关键资源和天赋点很突出。状态起来时，存在感会突然变大。", ["硬条件好，适合承担关键位置。", "不需要一直外放，也能影响局面。", "稳定性是你的升级重点，别让观众只记住波动。"]),
  profile("柯洁", "胜负欲棋盘怪才", { drama: 76, logic: 96, warmth: 38, hustle: 82, chaos: 68, stage: 70 }, "#ffb15d", "你的脑子像一张高速棋盘，既要赢，也要赢得有表达。你对细节和局势都敏感，嘴上也不太愿意服软。", ["逻辑计算强，能预判多步后果。", "胜负心和表达欲都很鲜明。", "别把每次交流都当对局，松一点反而更好赢。"]),
  profile("罗永浩", "理想主义嘴炮产品经理", { drama: 84, logic: 78, warmth: 52, hustle: 86, chaos: 70, stage: 94 }, "#79d4ff", "你擅长把产品、观点和情绪一起讲到沸腾。即使现实很硬，你也会试图用表达和行动撬出一个新局面。", ["表达极具个人风格，适合做发布和说服。", "理想感强，遇到坑也愿意继续修路。", "要留意承诺边界，热血之外还需要余量。"]),
];

const state = {
  current: 0,
  answers: [],
  optionOrders: [],
  scores: createScores(),
};

const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const questionCount = document.querySelector("#question-count");
const traitHint = document.querySelector("#trait-hint");
const progressFill = document.querySelector("#progress-fill");
const questionKicker = document.querySelector("#question-kicker");
const questionTitle = document.querySelector("#question-title");
const optionsWrap = document.querySelector("#options");
const resultAvatar = document.querySelector("#result-avatar");
const resultName = document.querySelector("#result-name");
const resultSubtitle = document.querySelector("#result-subtitle");
const resultDesc = document.querySelector("#result-desc");
const resultStrengths = document.querySelector("#result-strengths");
const meterGrid = document.querySelector("#meter-grid");

document.querySelector("#start-btn").addEventListener("click", startQuiz);
document.querySelector("#restart-btn").addEventListener("click", resetQuiz);
document.querySelector("#back-btn").addEventListener("click", goBack);
document.querySelector("#copy-btn").addEventListener("click", copyResult);

function profile(name, subtitle, scores, color, desc, strengths) {
  return { name, subtitle, scores, color, desc, strengths };
}

function createScores() {
  return traits.reduce((acc, trait) => {
    acc[trait] = 0;
    return acc;
  }, {});
}

function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  renderQuestion();
}

function resetQuiz() {
  state.current = 0;
  state.answers = [];
  state.optionOrders = [];
  state.scores = createScores();
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  renderQuestion();
}

function goBack() {
  if (state.current === 0) {
    quizScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    return;
  }

  state.current -= 1;
  state.answers.pop();
  recalculateScores();
  renderQuestion();
}

function renderQuestion() {
  const question = questions[state.current];
  const count = String(state.current + 1).padStart(2, "0");
  questionCount.textContent = `${count} / ${questions.length}`;
  traitHint.textContent = getTraitHint();
  progressFill.style.width = `${(state.current / questions.length) * 100}%`;
  questionKicker.textContent = question.kicker;
  questionTitle.textContent = question.title;
  optionsWrap.innerHTML = "";

  const optionOrder = getOptionOrder(state.current, question.options.length);
  optionOrder.forEach((optionIndex, index) => {
    const [label, score] = question.options[optionIndex];
    const button = document.createElement("button");
    button.className = "option-btn";
    button.type = "button";
    button.dataset.letter = String.fromCharCode(65 + index);
    button.style.setProperty("--option-color", ["#ffd84d", "#79d4ff", "#8be28b", "#ff9bb3"][index]);
    button.textContent = label;
    button.addEventListener("click", () => chooseOption(score));
    optionsWrap.appendChild(button);
  });
}

function getOptionOrder(questionIndex, optionCount) {
  if (!state.optionOrders[questionIndex]) {
    state.optionOrders[questionIndex] = shuffleIndexes(optionCount);
  }
  return state.optionOrders[questionIndex];
}

function shuffleIndexes(count) {
  const indexes = Array.from({ length: count }, (_, index) => index);
  for (let index = indexes.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [indexes[index], indexes[swapIndex]] = [indexes[swapIndex], indexes[index]];
  }
  return indexes;
}

function chooseOption(score) {
  state.answers[state.current] = score;
  applyScore(score);
  state.current += 1;

  if (state.current >= questions.length) {
    showResult();
    return;
  }

  renderQuestion();
}

function applyScore(score) {
  Object.entries(score).forEach(([trait, value]) => {
    state.scores[trait] += value;
  });
}

function recalculateScores() {
  state.scores = createScores();
  state.answers.forEach(applyScore);
}

function getTraitHint() {
  const sorted = Object.entries(state.scores).sort((a, b) => b[1] - a[1]);
  if (!sorted[0] || sorted[0][1] === 0) {
    return "抽象雷达启动";
  }
  return `${traitLabels[sorted[0][0]]}上升中`;
}

function showResult() {
  progressFill.style.width = "100%";
  const normalized = normalizeScores(state.scores);
  const winner = profiles
    .map((item) => ({ item, distance: getDistance(normalized, item.scores) }))
    .sort((a, b) => a.distance - b.distance)[0].item;

  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  renderResult(winner, normalized);
}

function normalizeScores(rawScores) {
  const maxPossible = { drama: 27, logic: 31, warmth: 30, hustle: 27, chaos: 31, stage: 30 };
  return traits.reduce((acc, trait) => {
    acc[trait] = Math.round((rawScores[trait] / maxPossible[trait]) * 100);
    return acc;
  }, {});
}

function getDistance(userScores, profileScores) {
  return traits.reduce((sum, trait) => {
    const diff = userScores[trait] - profileScores[trait];
    return sum + diff * diff;
  }, 0);
}

function renderResult(profileData, userScores) {
  resultAvatar.style.setProperty("--avatar-color", profileData.color);
  resultAvatar.innerHTML = "<span></span>";
  resultName.textContent = profileData.name;
  resultSubtitle.textContent = profileData.subtitle;
  resultDesc.textContent = profileData.desc;
  resultStrengths.innerHTML = profileData.strengths.map((item) => `<li>${item}</li>`).join("");

  meterGrid.innerHTML = traits
    .map((trait, index) => {
      const colors = ["#ffd84d", "#79d4ff", "#8be28b", "#ff9bb3", "#b7a2ff", "#ffb15d"];
      return `
        <div class="meter">
          <strong>${traitLabels[trait]} ${userScores[trait]}</strong>
          <div class="meter-track" style="--meter-color: ${colors[index]}">
            <span style="width: ${userScores[trait]}%"></span>
          </div>
        </div>
      `;
    })
    .join("");

  window.currentResult = profileData;
}

async function copyResult() {
  const result = window.currentResult;
  if (!result) return;
  const text = `我的 CSTI 抽象人格是：${result.name}｜${result.subtitle}。快来测测你最像哪位抽象名人！`;

  try {
    await navigator.clipboard.writeText(text);
    flashCopyButton("已复制");
  } catch {
    flashCopyButton("复制失败");
  }
}

function flashCopyButton(label) {
  const button = document.querySelector("#copy-btn");
  const old = button.textContent;
  button.textContent = label;
  setTimeout(() => {
    button.textContent = old;
  }, 1300);
}
