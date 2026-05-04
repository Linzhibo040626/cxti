const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const ffmpeg = require("@ffmpeg-installer/ffmpeg").path;

const root = path.resolve(__dirname, "..");
const raw = path.join(__dirname, "raw");
const outDir = path.join(__dirname, "out");
fs.mkdirSync(outDir, { recursive: true });

const output = path.join(outDir, "csti-bilibili-promo-subtitled.mp4");
const subtitleFile = path.join(outDir, "subtitles.ass");

const W = 1080;
const H = 1920;

const clips = [
  {
    type: "video",
    file: "phone-demo.mp4",
    start: 0,
    duration: 8,
    title: "花了一晚上，用 AI + GitHub + Cloudflare\n搭了个 CSTI 抽象人格测试",
    subtitle: "不测 I 人 E 人，直接测你像哪位抽象名人",
  },
  {
    type: "video",
    file: "phone-demo.mp4",
    start: 8,
    duration: 8,
    title: "15 道题，轻松秒选",
    subtitle: "狗咬人、外卖香菜、发错群，全是年轻人的精神状态",
  },
  {
    type: "image",
    file: "图片素材1.jpg",
    duration: 4,
    title: "结果不是乱算",
    subtitle: "每个结果都有专属 15 位答题指纹",
  },
  {
    type: "image",
    file: "图片素材2.jpg",
    duration: 4,
    title: "60 个可能结果",
    subtitle: "徐静雨、张雪峰、战鹰、李诞、王建国、陈泽……",
  },
  {
    type: "image",
    file: "图片素材3.jpg",
    duration: 4,
    title: "测完适合发群里",
    subtitle: "看看谁才是这个群最抽象的人",
  },
  {
    type: "video",
    file: "codex素材.mp4",
    start: 0,
    duration: 8,
    title: "第一步：Codex",
    subtitle: "用 AI 辅助写题库、页面和匹配逻辑",
  },
  {
    type: "video",
    file: "github素材.mp4",
    start: 0,
    duration: 7,
    title: "第二步：GitHub",
    subtitle: "代码开源，版本记录完整保留",
  },
  {
    type: "video",
    file: "cloudflare素材.mp4",
    start: 0,
    duration: 8,
    title: "第三步：Cloudflare",
    subtitle: "静态网页自动部署，上线速度很快",
  },
  {
    type: "video",
    file: "腾讯云素材.mp4",
    start: 0,
    duration: 7,
    title: "第四步：腾讯云域名",
    subtitle: "买下 csti.site，正式变成一个网站",
  },
  {
    type: "image",
    file: "图片素材4.jpg",
    duration: 5,
    title: "现在就能测",
    subtitle: "打开 https://csti.site",
  },
  {
    type: "image",
    file: "图片素材5.jpg",
    duration: 5,
    title: "测完发评论区",
    subtitle: "我想看看 B 站哪种抽象人格最多",
  },
  {
    type: "image",
    file: "图片素材6.jpg",
    duration: 4,
    title: "https://csti.site",
    subtitle: "CSTI 抽象人格测试",
  },
];

function escAss(text) {
  return text.replace(/[{}]/g, "").replace(/\n/g, "\\N");
}

function formatAssTime(seconds) {
  const cs = Math.round(seconds * 100);
  const h = Math.floor(cs / 360000);
  const m = Math.floor((cs % 360000) / 6000);
  const s = Math.floor((cs % 6000) / 100);
  const c = cs % 100;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(c).padStart(2, "0")}`;
}

function writeSubtitles() {
  let t = 0;
  const lines = [
    "[Script Info]",
    "ScriptType: v4.00+",
    "PlayResX: 1080",
    "PlayResY: 1920",
    "",
    "[V4+ Styles]",
    "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
    "Style: Title,Noto Sans SC,72,&H00141414,&H000000FF,&H00FFFFFF,&H00FFFFFF,-1,0,0,0,100,100,0,0,1,8,0,8,70,70,250,1",
    "Style: Sub,Noto Sans SC,42,&H00141414,&H000000FF,&H00FFFFFF,&H00FFFFFF,-1,0,0,0,100,100,0,0,1,6,0,2,78,78,170,1",
    "Style: Url,Noto Sans SC,58,&H00141414,&H000000FF,&H004DD8FF,&H004DD8FF,-1,0,0,0,100,100,0,0,1,8,0,2,70,70,360,1",
    "",
    "[Events]",
    "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text",
  ];

  for (const clip of clips) {
    const start = t;
    const end = t + clip.duration;
    lines.push(`Dialogue: 2,${formatAssTime(start)},${formatAssTime(end)},Title,,0,0,0,,${escAss(clip.title)}`);
    lines.push(`Dialogue: 2,${formatAssTime(start)},${formatAssTime(end)},Sub,,0,0,0,,${escAss(clip.subtitle)}`);
    t = end;
  }

  fs.writeFileSync(subtitleFile, lines.join("\n"), "utf8");
}

function normalizePathForAss(file) {
  return file.replace(/\\/g, "/").replace(/:/g, "\\:");
}

function build() {
  writeSubtitles();
  const args = ["-y"];
  const filterParts = [];
  const segmentLabels = [];

  clips.forEach((clip) => {
    const full = path.join(raw, clip.file);
    if (clip.type === "image") {
      args.push("-loop", "1", "-t", String(clip.duration), "-i", full);
    } else {
      args.push("-ss", String(clip.start || 0), "-t", String(clip.duration), "-i", full);
    }
  });

  clips.forEach((clip, index) => {
    const label = `v${index}`;
    const base =
      clip.type === "image"
        ? `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,fps=30,trim=duration=${clip.duration},setpts=PTS-STARTPTS`
        : `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,fps=30`;
    filterParts.push(`[${index}:v]${base},format=yuv420p[${label}]`);
    segmentLabels.push(`[${label}]`);
  });

  const subtitlePath = normalizePathForAss(subtitleFile);
  filterParts.push(`${segmentLabels.join("")}concat=n=${clips.length}:v=1:a=0,subtitles='${subtitlePath}'[vout]`);

  args.push(
    "-filter_complex",
    filterParts.join(";"),
    "-map",
    "[vout]",
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "16",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    output
  );

  console.log(`Writing ${output}`);
  execFileSync(ffmpeg, args, { stdio: "inherit", cwd: root });
}

build();
