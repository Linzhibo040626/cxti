# CSTI 抽象人格测试

一个黑白漫画风、带可爱卡通色彩的手机竖屏人格测试网页。项目是纯静态页面，不依赖 CDN、字体包或前端框架，适合部署到 Cloudflare Pages / Workers，也适合在微信里直接打开。

## 内容

- 15 道抽象人格测试题
- 60 个直接名人结果
- 黑白线稿 + 彩色卡通点缀
- 移动端竖屏优先
- 支持复制测试结果
- 选项展示顺序随机，结果按 15 位答题组指纹匹配

## 项目结构

```text
.
├── app.js              # 题库、答题组匹配逻辑、结果渲染
├── index.html          # 页面结构
├── style.css           # 黑白漫画风移动端样式
├── public/             # Cloudflare 发布目录
├── wrangler.toml       # Workers / Wrangler 静态资源配置
├── _headers            # Cloudflare Pages 安全响应头
└── PROCESS.md          # 从制作到部署的完整流程
```

## 本地预览

直接打开 `public/index.html` 即可预览。

也可以使用任意静态服务器，例如：

```bash
npx serve public
```

## Cloudflare 部署

如果使用 Cloudflare Pages：

- Build command: 留空，或填写 `npm run build`
- Build output directory: `public`
- Framework preset: None

不要把 Build output directory 填成 `/`。Cloudflare 会把构建环境根目录当成输出目录扫描，容易出现 `[ERROR] Asset too large`。

如果 Cloudflare 使用 Workers / Wrangler 部署，项目已在 `wrangler.toml` 配置：

```toml
[assets]
directory = "./public"
```

这可以避免 `[ERROR] Missing entry-point to Worker script or to assets directory`。

## 开源协议

本项目使用 MIT License 开源，详见 [LICENSE](./LICENSE)。
