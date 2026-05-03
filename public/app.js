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
    kicker: "群聊降临",
    title: "群里突然有人发：『我悟了，人生就是一场大型加载失败。』你怎么接？",
    options: [
      ["先别悟，谁来定义一下加载失败？", { logic: 3, chaos: 1 }],
      ["我直接补一句：但会员可以跳过片头。", { chaos: 3, stage: 1 }],
      ["别崩，先吃饭，吃完再当哲学家。", { warmth: 3, logic: 1 }],
      ["截图，发言人已经进入名场面候选。", { stage: 2, drama: 2 }],
    ],
  },
  {
    kicker: "赛博早八",
    title: "早上醒来发现世界像没刷新，但你必须出门，你的精神启动方式是？",
    options: [
      ["列三件必须做的事，其他全部延迟加载。", { logic: 2, hustle: 2 }],
      ["放一首很燃的歌，假装自己在预告片里。", { drama: 2, stage: 2 }],
      ["给朋友发一句离谱废话，确认自己还活着。", { chaos: 3, warmth: 1 }],
      ["沉默洗漱，像系统后台自动运行。", { logic: 2, warmth: 1 }],
    ],
  },
  {
    kicker: "外卖玄学",
    title: "外卖超时 28 分钟，骑手定位在地图上画符，你会？",
    options: [
      ["开始分析路线：这不是配送，是战术绕后。", { logic: 3, chaos: 1 }],
      ["先给骑手留活路，可能大家都在渡劫。", { warmth: 3 }],
      ["饿到开麦：今天必须有人给我一个说法。", { drama: 3, stage: 1 }],
      ["拍下来发群里：新概念电子寻龙点穴。", { chaos: 3, stage: 1 }],
    ],
  },
  {
    kicker: "抽象会议",
    title: "一个会议开了 40 分钟，结论是『我们之后再同步』，你脑内弹幕是？",
    options: [
      ["这个会本质上是时间的殡仪馆。", { chaos: 2, drama: 2 }],
      ["请给负责人、截止日、验收标准。", { logic: 3, hustle: 2 }],
      ["大家其实都累了，我来把话说圆。", { warmth: 3, stage: 1 }],
      ["很好，我已经想好怎么把它讲成段子。", { stage: 2, chaos: 2 }],
    ],
  },
  {
    kicker: "朋友圈考古",
    title: "深夜刷到三年前自己发的矫情动态，你第一反应？",
    options: [
      ["别删，这是人类进化的化石证据。", { chaos: 3, warmth: 1 }],
      ["复盘当年为什么会那样表达。", { logic: 3 }],
      ["尴尬，但那时候的我也挺真诚。", { warmth: 3, drama: 1 }],
      ["截图留档，未来可以做反向人设包装。", { stage: 3, hustle: 1 }],
    ],
  },
  {
    kicker: "逆风饭局",
    title: "饭桌上有人开始讲很离谱但很自信的观点，你会怎么处理？",
    options: [
      ["先问三个问题，让它自己塌。", { logic: 3, stage: 1 }],
      ["看气氛，不伤人地把话题换走。", { warmth: 3 }],
      ["我忍不了，必须当场开辩。", { drama: 3, logic: 1 }],
      ["顺着他说，看看能不能离谱到闭环。", { chaos: 3, stage: 1 }],
    ],
  },
  {
    kicker: "精神工位",
    title: "如果你的脑子是一张办公桌，现在桌面最显眼的是？",
    options: [
      ["一排待办，每个都写着今天必须赢。", { hustle: 3, logic: 1 }],
      ["一杯冷掉的咖啡和一堆人生疑问。", { drama: 1, warmth: 1, chaos: 1 }],
      ["一个喇叭，随时准备发表重要讲话。", { stage: 3, drama: 1 }],
      ["一个写满箭头的白板，箭头比字多。", { logic: 3 }],
    ],
  },
  {
    kicker: "短视频宇宙",
    title: "你刷到一个 7 秒视频，看完感觉自己被宇宙轻轻打了一拳，你会？",
    options: [
      ["马上转发：这个世界终于疯得有证据了。", { chaos: 3, stage: 1 }],
      ["拆它为什么好笑，笑点结构很关键。", { logic: 3, chaos: 1 }],
      ["收藏，等朋友低落时精准投喂。", { warmth: 3 }],
      ["模仿一遍，争取青出于蓝。", { stage: 3, hustle: 1 }],
    ],
  },
  {
    kicker: "上头瞬间",
    title: "你最容易在哪种瞬间突然上头？",
    options: [
      ["有人把简单问题复杂化，还很骄傲。", { logic: 2, drama: 2 }],
      ["局势已经到斩杀线，没人敢按按钮。", { hustle: 3, drama: 1 }],
      ["一个梗没人接，像球传到空地。", { chaos: 2, stage: 2 }],
      ["看见别人硬撑，但没人问他累不累。", { warmth: 3, drama: 1 }],
    ],
  },
  {
    kicker: "抽象社交",
    title: "第一次见面，对方说『我这个人比较正常』，你怎么判断？",
    options: [
      ["正常人通常不会先声明自己正常。", { logic: 2, chaos: 1 }],
      ["没事，我也不太稳定，大家公平。", { chaos: 3, warmth: 1 }],
      ["先观察他对服务员和弱势方的态度。", { warmth: 3, logic: 1 }],
      ["看他说这句话时有没有镜头感。", { stage: 3, drama: 1 }],
    ],
  },
  {
    kicker: "人生补丁",
    title: "如果人生今晚要更新一个补丁，你最希望修复什么？",
    options: [
      ["修复拖延，但别修得太像上班机器。", { hustle: 2, chaos: 1 }],
      ["修复表达，让我别把真心说成阴阳怪气。", { warmth: 2, drama: 1 }],
      ["修复决策，把选项背后的代价显示出来。", { logic: 3 }],
      ["修复无聊，给每天加一点不可预测事件。", { chaos: 3, stage: 1 }],
    ],
  },
  {
    kicker: "争议热搜",
    title: "一个争议热搜爆了，所有人都在站队，你会先做什么？",
    options: [
      ["找原始信息，别拿二创当判决书。", { logic: 3 }],
      ["看各方怎么表演，先不急着入场。", { stage: 1, chaos: 2 }],
      ["如果有人被网暴，先劝大家别上头。", { warmth: 3 }],
      ["观点明确就说，模糊时也要说清为什么模糊。", { drama: 2, logic: 2 }],
    ],
  },
  {
    kicker: "队友掉线",
    title: "团队关键时刻有人掉线，你最真实的反应是？",
    options: [
      ["我先补位，骂人等赢了再骂。", { hustle: 3, drama: 1 }],
      ["立刻重排任务，别让系统继续漏水。", { logic: 3, hustle: 1 }],
      ["先确认他是不是出事了。", { warmth: 3 }],
      ["这剧情可以，但导演最好给我解释。", { chaos: 2, stage: 2 }],
    ],
  },
  {
    kicker: "精神头像",
    title: "给你的精神状态配一个头像，最像哪种？",
    options: [
      ["戴墨镜的表情包，嘴角写着不服。", { drama: 2, stage: 2 }],
      ["一只加载中的圆圈，旁边写着别催。", { chaos: 2, warmth: 1 }],
      ["一张流程图，箭头最终指向睡觉。", { logic: 3, chaos: 1 }],
      ["一个小太阳，亮但电量告急。", { warmth: 3, stage: 1 }],
    ],
  },
  {
    kicker: "终极选择",
    title: "如果今晚必须给世界留下一句抽象遗言，你会选？",
    options: [
      ["别急着站队，先看定义。", { logic: 3 }],
      ["来都来了，先把场面撑住。", { stage: 2, drama: 2 }],
      ["人可以离谱，但别没良心。", { warmth: 3, drama: 1 }],
      ["我宣布：此刻开始进入隐藏剧情。", { chaos: 3, stage: 1 }],
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

const profileAnswerKeys = {
  "徐静雨": [3, 1, 2, 3, 3, 2, 2, 3, 0, 3, 2, 3, 0, 0, 1],
  "峰哥": [0, 3, 0, 1, 1, 0, 3, 1, 0, 0, 2, 0, 1, 2, 0],
  "张雪峰": [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2, 0, 1, 2, 0],
  "战鹰": [1, 2, 1, 0, 0, 3, 1, 0, 2, 1, 3, 2, 3, 1, 3],
  "吴京": [3, 1, 2, 1, 3, 2, 0, 3, 1, 3, 0, 3, 0, 0, 1],
  "何炅": [2, 2, 1, 2, 2, 1, 1, 2, 3, 2, 1, 2, 2, 3, 2],
  "黄磊": [2, 3, 1, 2, 2, 1, 3, 2, 3, 2, 2, 2, 2, 3, 2],
  "孙红雷": [3, 1, 2, 0, 3, 2, 2, 3, 0, 3, 0, 3, 3, 0, 1],
  "邓超": [1, 2, 3, 3, 0, 3, 2, 3, 2, 1, 3, 1, 3, 0, 3],
  "Bin哥": [3, 0, 2, 1, 3, 2, 0, 3, 1, 3, 0, 3, 0, 0, 1],
  "JackeyLove": [1, 1, 2, 0, 3, 3, 0, 3, 1, 1, 0, 1, 0, 0, 3],
  "罗翔": [0, 3, 0, 1, 1, 0, 3, 1, 0, 2, 2, 0, 1, 2, 0],
  "郭德纲": [3, 1, 3, 3, 3, 3, 2, 3, 2, 3, 3, 1, 3, 0, 1],
  "马东": [0, 3, 0, 2, 1, 0, 3, 1, 0, 0, 2, 0, 1, 2, 1],
  "李诞": [1, 2, 3, 0, 0, 3, 1, 0, 2, 1, 3, 1, 3, 1, 3],
  "杨超越": [2, 2, 1, 0, 0, 3, 1, 0, 3, 1, 3, 2, 2, 3, 3],
  "沈腾": [1, 2, 3, 3, 0, 3, 1, 0, 2, 1, 3, 1, 3, 1, 3],
  "撒贝宁": [0, 1, 0, 3, 1, 0, 2, 3, 0, 3, 2, 3, 1, 0, 1],
  "雷军": [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 2, 0, 1, 2, 1],
  "董宇辉": [2, 3, 1, 2, 2, 1, 1, 2, 3, 2, 1, 2, 2, 3, 2],
  "王传君": [0, 3, 0, 0, 1, 0, 3, 1, 0, 0, 2, 1, 1, 2, 0],
  "陈铭": [0, 3, 1, 2, 1, 0, 3, 1, 0, 2, 2, 0, 1, 2, 0],
  "王建国": [1, 2, 3, 0, 0, 3, 1, 0, 2, 1, 3, 1, 3, 1, 0],
  "于谦": [2, 3, 1, 2, 2, 1, 1, 2, 3, 2, 1, 2, 2, 1, 2],
  "陈泽": [1, 2, 3, 0, 0, 3, 2, 0, 2, 1, 3, 1, 3, 0, 3],
  "马云": [3, 0, 2, 1, 3, 2, 0, 3, 1, 3, 0, 3, 0, 0, 2],
  "马化腾": [0, 3, 0, 1, 1, 0, 3, 1, 0, 0, 2, 0, 1, 2, 2],
  "韦世豪": [3, 1, 2, 0, 3, 2, 0, 3, 1, 3, 0, 3, 0, 0, 1],
  "周琦": [3, 3, 1, 2, 2, 1, 1, 2, 3, 2, 0, 2, 2, 1, 2],
  "柯洁": [0, 3, 0, 1, 1, 0, 3, 1, 0, 0, 2, 0, 1, 0, 0],
  "罗永浩": [3, 1, 2, 3, 3, 2, 2, 3, 0, 3, 0, 3, 0, 0, 1],
};

profiles.forEach((item) => {
  item.key = profileAnswerKeys[item.name];
  if (!item.key || item.key.length !== questions.length) {
    throw new Error('Missing answer key for ' + item.name);
  }
});

const state = {
  current: 0,
  answers: [],
  optionOrders: [],
  answerScores: [],
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
  state.answerScores = [];
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
  state.answerScores.pop();
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
    button.addEventListener("click", () => chooseOption(optionIndex, score));
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

function chooseOption(optionIndex, score) {
  state.answers[state.current] = optionIndex;
  state.answerScores[state.current] = score;
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
  state.answerScores.forEach(applyScore);
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
  const winner = getBestProfile(state.answers);

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

function getBestProfile(answerKey) {
  return profiles
    .map((item, index) => ({
      item,
      index,
      score: getAnswerKeyScore(answerKey, item.key),
    }))
    .sort((a, b) => a.score - b.score || a.index - b.index)[0].item;
}

function getAnswerKeyScore(answerKey, profileKey) {
  return answerKey.reduce((sum, choice, index) => {
    if (choice === profileKey[index]) {
      return sum;
    }
    const distance = Math.abs(choice - profileKey[index]);
    return sum + 10 + distance;
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
