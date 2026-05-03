# CSTI 抽象人格测试

一个黑白漫画风、带可爱卡通色彩的手机竖屏人格测试网页。项目是纯静态页面，不依赖 CDN、字体包或前端框架，适合部署到 Cloudflare Pages，也适合在微信里直接打开。

## 内容

- 15 道抽象人格测试题
- 30 个左右的人物型结果
- 黑白线稿 + 彩色卡通点缀
- 移动端竖屏优先
- 支持复制测试结果

## Cloudflare Pages 部署

如果使用 Cloudflare Pages：

- Build command: 留空，或填写 `npm run build`
- Build output directory: `/`
- Framework preset: None

## 本地预览

直接打开 `index.html` 即可预览。

也可以使用任意静态服务器，例如：

```bash
npx serve .
```
