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

const questionWeights = [2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2];

const questions = [
  {
    kicker: "路边突发",
    title: "看到一个人被狗咬了，你会？",
    options: [
      ["打 120。", {"logic":3,"warmth":1}],
      ["一脚把狗踢飞。", {"hustle":3,"drama":1}],
      ["去咬狗。", {"chaos":3,"stage":1}],
      ["和狗一起咬他。", {"chaos":2,"stage":2,"drama":1}],
    ],
  },
  {
    kicker: "群聊异变",
    title: "群里有人突然发“我悟了，世界是假的”，你回？",
    options: [
      ["先睡觉，明天再悟。", {"logic":3,"warmth":1}],
      ["证据呢？别空口开宇宙。", {"hustle":3,"drama":1}],
      ["你终于发现了。", {"chaos":3,"stage":1}],
      ["截图，年度发言来了。", {"chaos":2,"stage":2,"drama":1}],
    ],
  },
  {
    kicker: "老板开光",
    title: "老板说“这个需求很简单”，你会？",
    options: [
      ["先问清楚交付标准。", {"logic":3,"warmth":1}],
      ["行，我马上做。", {"hustle":3,"drama":1}],
      ["心里冷笑三声。", {"chaos":3,"stage":1}],
      ["问能不能把老板也外包。", {"chaos":2,"stage":2,"drama":1}],
    ],
  },
  {
    kicker: "减肥炸鸡",
    title: "朋友说要减肥，下一秒点了炸鸡，你会？",
    options: [
      ["劝他少吃点。", {"logic":3,"warmth":1}],
      ["帮他算热量。", {"hustle":3,"drama":1}],
      ["说今天是欺骗餐。", {"chaos":3,"stage":1}],
      ["把他的可乐也喝了。", {"chaos":2,"stage":2,"drama":1}],
    ],
  },
  {
    kicker: "排队插队",
    title: "你排队半小时，前面突然有人插队，你会？",
    options: [
      ["礼貌提醒。", {"logic":3,"warmth":1}],
      ["直接开麦。", {"hustle":3,"drama":1}],
      ["假装工作人员维持秩序。", {"chaos":3,"stage":1}],
      ["插到他前面完成闭环。", {"chaos":2,"stage":2,"drama":1}],
    ],
  },
  {
    kicker: "盲盒离谱",
    title: "你抽到一个离谱盲盒，第一反应是？",
    options: [
      ["看看能不能退。", {"logic":3,"warmth":1}],
      ["发群里让大家鉴赏。", {"hustle":3,"drama":1}],
      ["觉得这是命运安排。", {"chaos":3,"stage":1}],
      ["给它起名并供起来。", {"chaos":2,"stage":2,"drama":1}],
    ],
  },
  {
    kicker: "考前一夜",
    title: "考试或面试前一晚，你会？",
    options: [
      ["最后复盘一遍。", {"logic":3,"warmth":1}],
      ["早睡保持状态。", {"hustle":3,"drama":1}],
      ["临时抱佛脚抱到佛报警。", {"chaos":3,"stage":1}],
      ["发动态：生死有命。", {"chaos":2,"stage":2,"drama":1}],
    ],
  },
  {
    kicker: "香菜入侵",
    title: "备注不要香菜，外卖结果全是香菜，你会？",
    options: [
      ["联系商家处理。", {"logic":3,"warmth":1}],
      ["默默挑出来。", {"hustle":3,"drama":1}],
      ["怀疑这是香菜宣战。", {"chaos":3,"stage":1}],
      ["直接改信香菜教。", {"chaos":2,"stage":2,"drama":1}],
    ],
  },
  {
    kicker: "在吗攻击",
    title: "朋友突然发来一句“在吗”，你会？",
    options: [
      ["回“在，怎么了”。", {"logic":3,"warmth":1}],
      ["先问“借钱吗”。", {"hustle":3,"drama":1}],
      ["已读但战略观望。", {"chaos":3,"stage":1}],
      ["回“不在，我是自动回复”。", {"chaos":2,"stage":2,"drama":1}],
    ],
  },
  {
    kicker: "小财降临",
    title: "你突然中了 500 块钱，你会？",
    options: [
      ["存起来。", {"logic":3,"warmth":1}],
      ["请朋友喝奶茶。", {"hustle":3,"drama":1}],
      ["研究怎么变 5000。", {"chaos":3,"stage":1}],
      ["买一个没用但快乐的东西。", {"chaos":2,"stage":2,"drama":1}],
    ],
  },
  {
    kicker: "路上摔跤",
    title: "你在路上摔了一跤，第一反应是？",
    options: [
      ["看有没有受伤。", {"logic":3,"warmth":1}],
      ["看有没有人看到。", {"hustle":3,"drama":1}],
      ["顺势躺下思考人生。", {"chaos":3,"stage":1}],
      ["说这是大地在召唤我。", {"chaos":2,"stage":2,"drama":1}],
    ],
  },
  {
    kicker: "自信跑调",
    title: "朋友唱歌跑调但很自信，你会？",
    options: [
      ["鼓掌鼓励。", {"logic":3,"warmth":1}],
      ["委婉提醒。", {"hustle":3,"drama":1}],
      ["加入他，一起跑。", {"chaos":3,"stage":1}],
      ["录下来准备做传家宝。", {"chaos":2,"stage":2,"drama":1}],
    ],
  },
  {
    kicker: "短视频黑洞",
    title: "点开一个短视频，结果刷了两小时，你会？",
    options: [
      ["立刻关掉。", {"logic":3,"warmth":1}],
      ["反思时间管理。", {"hustle":3,"drama":1}],
      ["继续刷，反正已经晚了。", {"chaos":3,"stage":1}],
      ["研究它为什么让我停不下来。", {"chaos":2,"stage":2,"drama":1}],
    ],
  },
  {
    kicker: "发错群了",
    title: "你发现自己发错群了，你会？",
    options: [
      ["赶紧撤回。", {"logic":3,"warmth":1}],
      ["解释一下。", {"hustle":3,"drama":1}],
      ["装作本来就是发给这个群的。", {"chaos":3,"stage":1}],
      ["再发一句“测试一下大家反应”。", {"chaos":2,"stage":2,"drama":1}],
    ],
  },
  {
    kicker: "人生按钮",
    title: "如果人生有一个按钮，你最想按哪个？",
    options: [
      ["一键冷静。", {"logic":3,"warmth":1}],
      ["一键暴富。", {"hustle":3,"drama":1}],
      ["一键重开今天。", {"chaos":3,"stage":1}],
      ["一键让全世界陪我发疯。", {"chaos":2,"stage":2,"drama":1}],
    ],
  }
];

const profiles = [
  profile("徐静雨", "高密度开麦评论员", {"drama":22,"logic":50,"warmth":18,"hustle":33,"chaos":31,"stage":25}, "#ffd84d", "你擅长把平静场面讲成抢七大战，观点锋利，节奏很满。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("峰哥", "现实主义抽象观察家", {"drama":18,"logic":25,"warmth":18,"hustle":33,"chaos":61,"stage":28}, "#79d4ff", "你看似松弛，实则对现实成本和人间荒诞特别敏感。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("张雪峰", "赛道规划急救员", {"drama":33,"logic":18,"warmth":18,"hustle":42,"chaos":47,"stage":42}, "#8be28b", "你会把迷茫直接拆成选择、成本和出路，适合给人当现实闹钟。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("战鹰", "松弛整活棋手", {"drama":28,"logic":18,"warmth":18,"hustle":50,"chaos":47,"stage":31}, "#ff9bb3", "你不一定每步都最优，但总能让过程变得真实又有节目效果。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("陈泽", "高能抽象发动机", {"drama":22,"logic":42,"warmth":18,"hustle":25,"chaos":44,"stage":33}, "#b7a2ff", "你的精神状态很外放，越热闹越容易把场面拧到不可预测频道。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("李诞", "丧燃段子哲学家", {"drama":19,"logic":18,"warmth":18,"hustle":33,"chaos":75,"stage":36}, "#ffb15d", "你擅长把疲惫、尴尬和荒诞讲成一句让人想转发的话。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("王建国", "冷脸谐音工程师", {"drama":31,"logic":18,"warmth":18,"hustle":25,"chaos":61,"stage":50}, "#ffd84d", "你不抢场，但一开口可能精准补刀，把负能量变成笑点。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("罗永浩", "理想主义嘴炮产品经理", {"drama":22,"logic":50,"warmth":18,"hustle":25,"chaos":36,"stage":31}, "#79d4ff", "你有强烈表达欲和改造欲，遇到坑也想讲清楚再跨过去。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("雷军", "真诚发布会工程师", {"drama":18,"logic":33,"warmth":18,"hustle":18,"chaos":64,"stage":36}, "#8be28b", "你相信认真做事，也相信把复杂东西讲得朴素可信。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("马云", "愿景叙事企业家", {"drama":18,"logic":42,"warmth":18,"hustle":18,"chaos":61,"stage":39}, "#ff9bb3", "你擅长把目标讲成故事，把故事讲成动员。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("马化腾", "低调系统架构师", {"drama":18,"logic":75,"warmth":25,"hustle":25,"chaos":19,"stage":18}, "#b7a2ff", "你不一定爱站在台前，但很会把复杂系统稳稳跑起来。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("周鸿祎", "红衣战斗产品经理", {"drama":18,"logic":33,"warmth":18,"hustle":25,"chaos":58,"stage":31}, "#ffb15d", "你对问题反应快，喜欢正面拆招，也不怕观点有火药味。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("刘强东", "强执行现实派", {"drama":19,"logic":25,"warmth":18,"hustle":18,"chaos":69,"stage":42}, "#ffd84d", "你重视结果和责任，遇事更倾向直接推进。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("王思聪", "犀利围观审判官", {"drama":18,"logic":50,"warmth":18,"hustle":18,"chaos":53,"stage":25}, "#79d4ff", "你很难忍受装腔作势，看到离谱会想当场点评。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("董明珠", "强势秩序掌门人", {"drama":18,"logic":50,"warmth":18,"hustle":25,"chaos":42,"stage":25}, "#8be28b", "你相信规则、执行和硬气表达，气场天然压得住场。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("李佳琦", "高能种草控场王", {"drama":19,"logic":25,"warmth":18,"hustle":50,"chaos":47,"stage":19}, "#ff9bb3", "你擅长调动情绪和注意力，把普通选择讲得很有冲动。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("董宇辉", "诗意讲述者", {"drama":18,"logic":18,"warmth":18,"hustle":18,"chaos":83,"stage":39}, "#b7a2ff", "你会把普通事情讲出画面感，温柔但不虚。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("罗翔", "法理冷幽默学者", {"drama":18,"logic":33,"warmth":18,"hustle":33,"chaos":53,"stage":25}, "#ffb15d", "你擅长先定义边界，再在荒诞里讲清规则。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("何同学", "好奇心工程师", {"drama":25,"logic":33,"warmth":18,"hustle":42,"chaos":39,"stage":28}, "#ffd84d", "你习惯把问题做成漂亮实验，用技术感解释生活。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("半佛仙人", "商业拆解段子手", {"drama":18,"logic":50,"warmth":18,"hustle":33,"chaos":36,"stage":19}, "#79d4ff", "你喜欢看规则背后的规则，能把商业逻辑讲得有梗。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("何炅", "高情商控场官", {"drama":33,"logic":18,"warmth":18,"hustle":75,"chaos":25,"stage":19}, "#8be28b", "你能接住情绪，也能让尴尬场面软着陆。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("黄磊", "生活秩序导演", {"drama":18,"logic":33,"warmth":18,"hustle":25,"chaos":58,"stage":31}, "#ff9bb3", "你重视经验、照顾和生活章法，喜欢把日子安排明白。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("沈腾", "懒洋洋喜剧军师", {"drama":25,"logic":18,"warmth":18,"hustle":42,"chaos":56,"stage":33}, "#b7a2ff", "你看起来不费劲，但脑子里全是节奏和包袱。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("邓超", "快乐能量发动机", {"drama":18,"logic":25,"warmth":18,"hustle":18,"chaos":72,"stage":39}, "#ffb15d", "你像气氛电池，普通场合因为你变得热闹。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("孙红雷", "戏剧压场玩家", {"drama":25,"logic":25,"warmth":18,"hustle":50,"chaos":42,"stage":25}, "#ffd84d", "你有强烈现场感，平凡时刻也能演出层次。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("郭德纲", "语言包袱大师", {"drama":22,"logic":18,"warmth":18,"hustle":25,"chaos":69,"stage":42}, "#79d4ff", "你知道什么时候铺垫，什么时候抖包袱，也能把场面拿回来。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("于谦", "稳定捧场艺术家", {"drama":19,"logic":33,"warmth":18,"hustle":33,"chaos":50,"stage":28}, "#8be28b", "你能让别人发挥得更好，情绪稳定又懂分寸。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("撒贝宁", "机智控场学霸", {"drama":18,"logic":33,"warmth":18,"hustle":18,"chaos":67,"stage":33}, "#ff9bb3", "你能在严肃和好笑之间快速切换，知识感和综艺感都有。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("马东", "清醒辩题操盘手", {"drama":18,"logic":58,"warmth":19,"hustle":25,"chaos":36,"stage":19}, "#b7a2ff", "你擅长提问和设置讨论，让混乱观点变得可聊。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("陈铭", "温柔逻辑辩手", {"drama":18,"logic":50,"warmth":18,"hustle":25,"chaos":42,"stage":25}, "#ffb15d", "你讲理但不压人，喜欢给分歧搭一座桥。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("杨超越", "好运直觉锦鲤", {"drama":22,"logic":18,"warmth":18,"hustle":25,"chaos":69,"stage":42}, "#ffd84d", "你靠真实感和直觉吸引注意，混乱里也能找到出口。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("丁真", "天然纯粹符号", {"drama":19,"logic":42,"warmth":18,"hustle":18,"chaos":58,"stage":42}, "#79d4ff", "你的优势是松弛和自然，不太需要复杂包装。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("刘畊宏", "自律燃脂教练", {"drama":19,"logic":25,"warmth":18,"hustle":42,"chaos":53,"stage":25}, "#8be28b", "你适合把人从沙发上拉起来，用行动制造状态。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("范志毅", "暴躁锐评教练", {"drama":28,"logic":33,"warmth":18,"hustle":33,"chaos":42,"stage":36}, "#ff9bb3", "你开麦很直接，情绪到位时点评像一脚世界波。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("姚明", "稳重中轴大个子", {"drama":22,"logic":42,"warmth":18,"hustle":18,"chaos":50,"stage":39}, "#b7a2ff", "你不轻易上头，但关键位置需要你站住。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("周琦", "冷面天赋中轴", {"drama":18,"logic":33,"warmth":18,"hustle":33,"chaos":53,"stage":25}, "#ffb15d", "你不一定一直外放，但资源点和存在感很突出。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("韦世豪", "锋芒外露突破手", {"drama":18,"logic":42,"warmth":18,"hustle":33,"chaos":44,"stage":22}, "#ffd84d", "你喜欢正面对抗，顺风亮眼，逆风也敢站出来。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("柯洁", "胜负欲棋盘怪才", {"drama":18,"logic":18,"warmth":18,"hustle":18,"chaos":89,"stage":44}, "#79d4ff", "你脑子像高速棋盘，逻辑、胜负心和表达欲都很强。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("丁俊晖", "冷静准星选手", {"drama":18,"logic":25,"warmth":18,"hustle":18,"chaos":78,"stage":44}, "#8be28b", "你偏沉着，关键时刻靠准度和稳定感说话。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("武磊", "勤勉前插执行者", {"drama":25,"logic":33,"warmth":18,"hustle":42,"chaos":39,"stage":28}, "#ff9bb3", "你不一定最吵，但会在需要的时候默默跑到位置。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("Bin哥", "锋利上路突破手", {"drama":25,"logic":33,"warmth":18,"hustle":50,"chaos":33,"stage":22}, "#b7a2ff", "你敢打敢承担，喜欢在僵局里撕开口子。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("JackeyLove", "天赋团战输出位", {"drama":28,"logic":25,"warmth":18,"hustle":58,"chaos":33,"stage":22}, "#ffb15d", "你敢接大场面，别人算风险时你已经想一波结束。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("Uzi", "极致操作压迫感", {"drama":22,"logic":42,"warmth":18,"hustle":25,"chaos":44,"stage":33}, "#ffd84d", "你对胜负和细节都很敏感，输出欲很强。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("TheShy", "浪漫操作艺术家", {"drama":19,"logic":42,"warmth":18,"hustle":33,"chaos":42,"stage":25}, "#79d4ff", "你相信上限和灵感，有时风险本身就是表演的一部分。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("Doinb", "高能游走指挥官", {"drama":19,"logic":42,"warmth":18,"hustle":33,"chaos":42,"stage":25}, "#8be28b", "你会说、会动、会带节奏，场面越乱越有发挥空间。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("小虎", "稳健中路调度者", {"drama":22,"logic":33,"warmth":18,"hustle":42,"chaos":42,"stage":25}, "#ff9bb3", "你偏团队型，重视节奏和补位，不急着抢镜。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("姿态", "直播间效果大师", {"drama":22,"logic":25,"warmth":18,"hustle":18,"chaos":67,"stage":44}, "#b7a2ff", "你反应快，嘴上不闲，场面很容易被你带成节目。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("管泽元", "玄学解说预言家", {"drama":18,"logic":58,"warmth":19,"hustle":25,"chaos":42,"stage":18}, "#ffb15d", "你擅长制造悬念，一句话可能让局势进入玄学频道。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("大司马", "金牌讲师马老师", {"drama":19,"logic":18,"warmth":18,"hustle":25,"chaos":72,"stage":39}, "#ffd84d", "你会把操作讲成独门体系，朴素里带着奇妙逻辑。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("PDD", "豪爽整活老板", {"drama":25,"logic":42,"warmth":18,"hustle":42,"chaos":31,"stage":25}, "#79d4ff", "你有强烈气氛感，热闹、直接、很会带兄弟们一起乐。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("卢本伟", "名场面复读核心", {"drama":19,"logic":25,"warmth":18,"hustle":33,"chaos":58,"stage":31}, "#8be28b", "你天生带一点争议和名场面体质，场面容易炸。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("孙笑川", "抽象圣地符号", {"drama":22,"logic":25,"warmth":18,"hustle":33,"chaos":56,"stage":33}, "#ff9bb3", "你代表一种离谱、反讽、弹幕文化揉在一起的抽象气质。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("药水哥", "行为艺术整活人", {"drama":18,"logic":42,"warmth":18,"hustle":18,"chaos":56,"stage":33}, "#b7a2ff", "你很能把普通交流变成行为艺术，冲击力很强。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("Giao哥", "魔性口头禅大师", {"drama":22,"logic":33,"warmth":18,"hustle":25,"chaos":53,"stage":36}, "#ffb15d", "你不需要复杂逻辑，一个节奏就能让人记住。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("老番茄", "高完成度叙事者", {"drama":18,"logic":25,"warmth":18,"hustle":25,"chaos":67,"stage":33}, "#ffd84d", "你有梗也有结构，能把娱乐内容做得完整舒服。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("中国BOY", "快乐陪伴型主播", {"drama":22,"logic":18,"warmth":18,"hustle":25,"chaos":78,"stage":44}, "#79d4ff", "你外放但不压人，适合把普通日常变成好玩的陪伴。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("小潮院长", "团队整活导演", {"drama":28,"logic":18,"warmth":18,"hustle":42,"chaos":53,"stage":36}, "#8be28b", "你擅长组织场面，让一群人的混乱变成内容。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("敬汉卿", "体验派整活样本", {"drama":18,"logic":33,"warmth":18,"hustle":18,"chaos":67,"stage":33}, "#ff9bb3", "你愿意亲自上手，把离谱想法做成真实体验。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("手工耿", "无用发明大师", {"drama":25,"logic":25,"warmth":18,"hustle":42,"chaos":47,"stage":31}, "#b7a2ff", "你脑洞很硬核，离谱但能落地。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
  profile("毕导", "理科整活解释器", {"drama":28,"logic":18,"warmth":18,"hustle":25,"chaos":64,"stage":47}, "#ffb15d", "你喜欢认真研究不太正经的问题，并且真的讲出道理。", ["这类结果的关键不是选得离谱，而是离谱得有稳定风格。", "每一题都会改变最终匹配距离，不会只靠某一个选项定胜负。", "娱乐向结果，适合发给朋友互相迫害一下。"]),
];

const profileAnswerKeys = {
  "徐静雨": [0, 0, 3, 0, 1, 0, 3, 3, 1, 2, 0, 1, 1, 3, 0],
  "峰哥": [3, 2, 2, 2, 2, 1, 0, 2, 0, 1, 3, 2, 0, 1, 1],
  "张雪峰": [1, 3, 3, 1, 2, 3, 3, 1, 3, 0, 0, 1, 1, 3, 3],
  "战鹰": [2, 1, 3, 2, 3, 3, 2, 1, 0, 1, 1, 1, 3, 1, 0],
  "陈泽": [3, 3, 3, 0, 2, 0, 3, 3, 0, 1, 1, 0, 0, 1, 2],
  "李诞": [2, 1, 3, 2, 2, 2, 3, 3, 2, 2, 1, 2, 0, 1, 1],
  "王建国": [0, 3, 1, 0, 3, 3, 1, 3, 3, 2, 2, 3, 3, 3, 1],
  "罗永浩": [3, 1, 3, 3, 0, 0, 0, 0, 0, 2, 3, 0, 1, 3, 1],
  "雷军": [3, 1, 0, 3, 2, 0, 0, 2, 2, 1, 2, 0, 3, 3, 2],
  "马云": [3, 2, 0, 0, 0, 2, 3, 3, 0, 2, 1, 3, 0, 3, 2],
  "马化腾": [0, 1, 0, 3, 0, 3, 1, 0, 0, 2, 0, 0, 1, 0, 0],
  "周鸿祎": [2, 2, 3, 3, 1, 0, 1, 0, 2, 2, 0, 0, 2, 1, 3],
  "刘强东": [3, 2, 3, 0, 3, 2, 1, 2, 2, 3, 0, 0, 3, 2, 1],
  "王思聪": [2, 0, 2, 0, 3, 0, 2, 3, 2, 2, 0, 1, 0, 1, 0],
  "董明珠": [0, 2, 0, 2, 1, 3, 3, 2, 0, 1, 1, 0, 0, 3, 0],
  "李佳琦": [3, 2, 1, 1, 1, 1, 2, 2, 0, 2, 1, 2, 1, 0, 0],
  "董宇辉": [3, 0, 2, 2, 3, 1, 0, 2, 2, 2, 1, 2, 2, 2, 3],
  "罗翔": [2, 0, 0, 2, 2, 3, 0, 1, 1, 0, 3, 2, 1, 1, 2],
  "何同学": [1, 3, 3, 0, 1, 2, 0, 3, 0, 1, 1, 2, 1, 0, 3],
  "半佛仙人": [2, 0, 1, 0, 0, 2, 3, 3, 2, 1, 0, 0, 1, 1, 0],
  "何炅": [1, 1, 3, 1, 1, 2, 1, 1, 1, 1, 0, 1, 0, 3, 3],
  "黄磊": [3, 0, 3, 2, 2, 1, 0, 2, 0, 1, 0, 1, 3, 2, 2],
  "沈腾": [1, 2, 2, 1, 0, 2, 3, 3, 1, 2, 0, 1, 3, 1, 3],
  "邓超": [1, 0, 0, 2, 2, 3, 2, 3, 2, 3, 0, 1, 2, 3, 2],
  "孙红雷": [1, 1, 1, 2, 2, 3, 0, 1, 0, 1, 3, 1, 2, 3, 0],
  "郭德纲": [3, 0, 2, 2, 2, 2, 0, 3, 1, 3, 1, 3, 2, 3, 1],
  "于谦": [1, 1, 0, 3, 3, 0, 0, 2, 2, 3, 1, 2, 0, 2, 1],
  "撒贝宁": [1, 2, 2, 2, 3, 0, 2, 1, 0, 3, 2, 0, 2, 3, 0],
  "马东": [1, 0, 1, 3, 0, 0, 0, 2, 0, 1, 0, 2, 2, 0, 3],
  "陈铭": [0, 0, 3, 2, 1, 2, 1, 3, 1, 3, 0, 0, 0, 2, 0],
  "杨超越": [1, 3, 3, 3, 2, 2, 1, 2, 3, 3, 2, 2, 1, 0, 0],
  "丁真": [2, 0, 2, 0, 0, 0, 3, 1, 3, 3, 3, 3, 0, 2, 3],
  "刘畊宏": [1, 2, 1, 2, 2, 1, 0, 0, 3, 2, 3, 1, 2, 0, 1],
  "范志毅": [0, 0, 0, 3, 1, 2, 3, 1, 0, 1, 3, 3, 3, 1, 3],
  "姚明": [3, 0, 3, 1, 3, 0, 3, 2, 3, 0, 2, 3, 0, 0, 1],
  "周琦": [2, 0, 2, 2, 1, 0, 1, 2, 2, 3, 0, 1, 1, 3, 0],
  "韦世豪": [0, 1, 3, 2, 2, 2, 2, 0, 0, 0, 1, 3, 1, 1, 0],
  "柯洁": [2, 3, 2, 3, 1, 0, 2, 3, 3, 2, 0, 2, 2, 2, 2],
  "丁俊晖": [3, 0, 0, 3, 1, 3, 2, 2, 0, 2, 3, 2, 2, 3, 2],
  "武磊": [0, 1, 0, 3, 3, 1, 2, 0, 3, 1, 0, 1, 2, 3, 1],
  "Bin哥": [0, 0, 3, 1, 2, 1, 1, 3, 0, 0, 1, 2, 1, 1, 3],
  "JackeyLove": [0, 2, 2, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 3, 3],
  "Uzi": [2, 2, 0, 1, 0, 3, 3, 3, 0, 0, 3, 3, 1, 1, 0],
  "TheShy": [3, 0, 1, 3, 2, 2, 2, 1, 1, 0, 3, 1, 0, 0, 0],
  "Doinb": [1, 1, 0, 2, 0, 3, 0, 0, 2, 1, 0, 3, 3, 1, 2],
  "小虎": [0, 2, 2, 3, 1, 2, 3, 3, 1, 0, 1, 0, 1, 0, 1],
  "姿态": [0, 3, 1, 2, 3, 0, 2, 0, 3, 3, 3, 1, 2, 3, 2],
  "管泽元": [2, 1, 1, 0, 0, 2, 0, 2, 0, 0, 1, 2, 0, 0, 2],
  "大司马": [1, 2, 3, 0, 3, 2, 1, 2, 0, 2, 2, 3, 3, 1, 2],
  "PDD": [3, 0, 0, 3, 1, 0, 0, 3, 0, 1, 2, 1, 1, 3, 1],
  "卢本伟": [2, 0, 3, 3, 2, 0, 2, 2, 3, 1, 1, 1, 2, 0, 1],
  "孙笑川": [2, 1, 3, 1, 2, 3, 1, 3, 0, 2, 2, 1, 3, 0, 0],
  "药水哥": [2, 3, 0, 2, 0, 1, 3, 0, 2, 3, 3, 2, 0, 0, 1],
  "Giao哥": [3, 1, 3, 0, 2, 0, 2, 3, 1, 1, 3, 0, 2, 0, 3],
  "老番茄": [2, 1, 2, 3, 0, 0, 2, 2, 1, 3, 2, 2, 1, 3, 0],
  "中国BOY": [3, 1, 3, 2, 3, 2, 2, 3, 2, 1, 2, 0, 1, 2, 3],
  "小潮院长": [1, 2, 1, 3, 3, 1, 3, 3, 0, 1, 3, 1, 2, 0, 2],
  "敬汉卿": [1, 2, 0, 0, 2, 2, 0, 1, 2, 2, 2, 0, 3, 3, 3],
  "手工耿": [1, 1, 1, 3, 2, 3, 2, 3, 1, 0, 1, 3, 0, 0, 2],
  "毕导": [2, 3, 3, 2, 3, 1, 1, 1, 0, 2, 3, 3, 3, 0, 3],
};

profiles.forEach((item) => {
  item.key = profileAnswerKeys[item.name];
  if (!item.key || item.key.length !== questions.length) {
    throw new Error(`Missing answer key for ${item.name}`);
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
  const maxPossible = { drama: 36, logic: 36, warmth: 36, hustle: 36, chaos: 36, stage: 36 };
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
    return sum + questionWeights[index] * (4 + distance);
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
