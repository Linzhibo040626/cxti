# Contributing

欢迎改进 CSTI 抽象人格测试。这个项目适合添加新题目、新结果、样式优化和部署配置改进。

## 开发方式

1. Fork 仓库。
2. 修改 `app.js`、`index.html` 或 `style.css`。
3. 本地检查 JS 语法：

```bash
node -e "new Function(require('fs').readFileSync('app.js','utf8')); console.log('syntax ok')"
```

4. 确认 `public/` 中的发布文件已同步。
5. 提交 Pull Request。

## 内容建议

- 题目要有明确区分度，避免一眼看出固定规律。
- 结果逻辑优先使用答题组指纹，不建议回到指数距离匹配。
- 文案保持娱乐向，不把结果包装成严肃心理学结论。
- 不要添加外部 CDN、远程字体或大型资源，保证微信内打开更稳。
