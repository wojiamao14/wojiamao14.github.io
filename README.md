# mypage

> 正在学习，也在创造。

mypage 是我家猫的个人网站。我在这里整理学习笔记、回顾阶段进展，也为项目、写作和生活记录留了位置。

## 站点内容

| 栏目 | 内容 |
| --- | --- |
| [首页](index.html) | 从开场进入「关于我」、兴趣地图和栏目导航。 |
| [知识花园](learning.html) | 按领域浏览、搜索和筛选学习笔记，也可以查看阶段复盘。 |
| [项目](projects.html) · [博客](blog.html) · [生活](life.html) | 栏目入口已开放，内容待补充。 |

## 本地预览

网站使用 HTML、CSS 和 JavaScript 编写，无需安装前端依赖或运行构建命令。在项目目录执行：

```sh
python -m http.server 8000 --bind 127.0.0.1
```

然后访问 [http://localhost:8000/](http://localhost:8000/)。

## 文件导航

| 想修改的内容 | 对应文件 |
| --- | --- |
| 首页文案、兴趣地图和栏目入口 | [index.html](index.html) |
| 学习笔记、领域卡片和阶段复盘 | [learning.html](learning.html) |
| 知识花园的搜索与筛选 | [learning.js](learning.js) |
| 全站样式 | [styles.css](styles.css) |
| 导航、首页滚动和开场图形 | [navigation.js](navigation.js)、[home.js](home.js)、[hero-mark.js](hero-mark.js) |

## GitHub Pages 部署

首次部署时，在仓库的 **Settings → Pages** 中选择 **Deploy from a branch**，将发布来源设为 **main / (root)**。以后更新发布分支中的文件，等 **Actions** 显示部署成功后，再打开 Pages 提供的网址检查页面。

当前版本 **v0.1.0** · 作者 **我家猫** · Still growing.
