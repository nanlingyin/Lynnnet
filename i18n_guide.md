# 网站国际化使用指南

## 功能介绍
本网站已集成中英文切换功能，用户可以通过右上角的语言切换按钮在中文和英文之间切换。

## 如何为新页面添加国际化功能

### 1. 在HTML页面中添加必要的元素

在页面的 `<head>` 标签中添加：
```html
<link rel="stylesheet" href="../Css/index.css"> <!-- 包含语言切换按钮样式 -->
```

在页面的 `<body>` 开始处添加语言切换按钮：
```html
<!-- 语言切换按钮 -->
<button id="language-toggle" class="language-toggle" onclick="toggleLanguage()" title="切换语言">EN</button>
```

在页面底部添加国际化脚本：
```html
<!-- 国际化脚本 -->
<script src="../Js/i18n.js"></script>
```

### 2. 为需要翻译的文本添加标记

为需要翻译的HTML元素添加 `data-i18n` 属性：
```html
<h1 data-i18n="about_me">关于我</h1>
<a href="#" data-i18n="home">首页</a>
<span data-i18n="contact">联系</span>
```

### 3. 添加新的翻译内容

在 `/Js/i18n.js` 文件中的 `translations` 对象里添加新的翻译键值对：

```javascript
const translations = {
    zh: {
        'your_new_key': '您的中文文本'
    },
    en: {
        'your_new_key': 'Your English Text'
    }
};
```

## 当前已支持的翻译内容

### 导航菜单
- about_me: 关于我 / About Me
- resource_share: 资源分享 / Resource Share
- donate: 捐赠 / Donate
- friend_link: 友链 / Friend Links
- main_page: 主页 / Home

### 特效页面
- eye_tracking: 我会一直视奸你 / Eye Tracking You
- mouse_follow: 跟踪鼠标 / Mouse Follow
- galaxy: 星辰宇宙 / Galaxy Universe
- color_bubble: 七彩泡泡 / Colorful Bubbles
- more: 更多 / More
- back_to_top: 回到顶部 / Back to Top

### 常用词汇
- home: 首页 / Home
- contact: 联系 / Contact
- portfolio: 作品集 / Portfolio
- blog: 博客 / Blog
- projects: 项目 / Projects
- skills: 技能 / Skills
- experience: 经验 / Experience
- education: 教育 / Education

## 功能特点

1. **自动保存语言偏好**：用户选择的语言会保存在本地存储中，下次访问时自动应用
2. **响应式设计**：语言切换按钮在移动端和桌面端都有良好的显示效果
3. **平滑过渡**：切换语言时有平滑的动画效果
4. **保持原有设计**：不改变网站原有的UI设计和布局
5. **SEO友好**：自动设置HTML lang属性和页面标题

## 注意事项

1. 确保所有需要翻译的文本都添加了 `data-i18n` 属性
2. 新增翻译内容时，需要同时在中英文两个语言对象中添加对应的键值对
3. 语言切换按钮的z-index设置为1000，确保始终显示在最上层
4. 如果页面有特殊的CSS样式，可能需要调整语言切换按钮的位置