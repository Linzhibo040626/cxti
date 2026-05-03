# CSTI 网站制作与发布流程

这份流程记录 CSTI 抽象人格测试从想法、代码库、GitHub 到 Cloudflare 上线的完整路径，后续改版可以按这个顺序推进。

## 1. 明确网站定位

- 网站名称：CSTI，抽象人格测试。
- 使用场景：手机竖屏优先，适合微信内打开和分享。
- 视觉风格：黑白漫画线稿为主，加入少量可爱卡通色彩点缀。
- 内容方向：15 道年轻人语境的抽象场景题，结果直接展示名人名字。
- 技术目标：纯静态网页，不依赖外部 CDN、字体或复杂框架，降低国内网络访问风险。

## 2. 创建代码库

项目放在本地文件夹：

```text
D:\网页部署2
```

核心文件：

- `index.html`：页面结构。
- `style.css`：移动端视觉样式。
- `app.js`：题库、选项乱序、答题组匹配、结果页渲染。
- `public/`：Cloudflare 实际发布目录。
- `wrangler.toml`：Cloudflare Workers 静态资源配置。

## 3. 设计题库与结果逻辑

第一版使用指数匹配，但测试后发现某些结果会高频出现。

现在改为更严格的答题组逻辑：

- 每题有 4 个原始选项，展示时会随机打乱。
- 用户点击后记录原始选项编号，而不是记录 A/B/C/D。
- 每个名人结果都有一套 15 位答案指纹。
- 完全命中某个指纹时，必定得到对应名人。
- 如果不是完全命中，则选择距离最近的答案指纹。

这样可以避免某个中间型结果被大量吸附，也能让每个结果都有明确路径。

## 4. 本地检查

常用检查：

```bash
node -e "new Function(require('fs').readFileSync('app.js','utf8')); console.log('syntax ok')"
```

本地预览：

```bash
npx serve public
```

如果只想快速看页面，也可以直接打开：

```text
public/index.html
```

## 5. 推送到 GitHub

远程仓库：

```text
https://github.com/Linzhibo040626/cxti
```

常用命令：

```bash
git add .
git commit -m "Update CSTI"
git push
```

## 6. Cloudflare Pages 部署

Cloudflare Pages 推荐配置：

- Framework preset: `None`
- Build command: 留空，或 `npm run build`
- Build output directory: `public`

注意：

- 不要把输出目录填成 `/`，否则 Cloudflare 可能扫描错误目录并报 `[ERROR] Asset too large`。
- 如果走 Workers / Wrangler，`wrangler.toml` 已配置 `[assets] directory = "./public"`。

## 7. 自定义域名与中国网络访问

想让它成为正式网站，建议：

1. 购买自己的域名。
2. 在 Cloudflare Pages 里绑定 Custom Domain。
3. 把域名 DNS 接入 Cloudflare。
4. 在微信和中国大陆网络里实际测试打开速度。

如果需要中国大陆长期稳定访问，后续可以考虑国内云服务和 ICP 备案。当前项目是纯静态网页，未来从 Cloudflare 迁移到国内对象存储、静态网站托管或 CDN 的成本很低。

## 8. 开源发布

开源需要三件事：

- 仓库可见性设置为 Public。
- 仓库内添加明确开源协议，本项目使用 MIT License。
- README 写清楚项目用途、结构、部署方式和本地预览方法。

完成以上步骤后，其他人就可以查看、学习、Fork 和二次开发这个项目。
