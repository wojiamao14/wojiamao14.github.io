# mypage v0.1.0

一个以学习与创作为主题的静态个人网站。

## 已完成

- 首页三屏包括开场、关于我与兴趣地图、Bento 栏目导航。
- 知识花园包括领域浏览、学习笔记搜索与筛选、阶段复盘。

## 待开发

- 项目、博客、生活暂用统一占位页，保留原有入口。
- 私人空间暂缓。

## 文件结构

- `index.html` — 首页
- `learning.html`、`learning.js` — 知识花园及交互
- `projects.html`、`blog.html`、`life.html` — 栏目占位页
- `styles.css` — 共用样式
- `navigation.js`、`home.js`、`hero-mark.js` — 首页导航和交互

## 本地预览

在项目目录运行 `python -m http.server 8000`，然后打开 `http://localhost:8000/`。无需构建步骤。

## GitHub Pages 部署

1. 确认 GitHub 账号、公开文件和仓库目标。优先选公开的 `<用户名>.github.io` 仓库。已有个人主页时，先确认是否改用独立的 `mypage` 仓库。
2. 检查提交中的文件和作者信息，将通过审核的文件提交并推送到 `main`。发布文件清单由 `.gitignore` 维护，加入新资源时同步更新清单。
3. 在仓库的 Settings → Pages 选择 Deploy from a branch，分支选 `main`，目录选 `/ (root)`。
4. 等部署完成后打开 Pages 提供的 HTTPS 地址，检查首页、子页面、学习交互和手机布局，然后在验证过的提交上记录 `v0.1.0`。

个人站点通常位于 `https://<用户名>.github.io/`，独立仓库通常位于 `https://<用户名>.github.io/mypage/`。
