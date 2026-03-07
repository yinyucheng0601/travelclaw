一个专为Openclaw设计的实时状态展示面板。

## 🌐 成果展示
👉 **https://yinyucheng0601.github.io/travelclaw/**

## 功能特性
- 🦞 **实时状态显示** - 助手名称、当前模型、在线状态
- ⏰ **运行信息** - 运行时间、任务队列、API调用统计
- 🛠️ **技能展示** - 可用技能列表（QVeris、Apple Notes等）
- 🌙 **暗色模式** - 自动跟随系统主题
- 📱 **PWA支持** - 可安装到手机主屏幕

## 技术栈

- HTML5
- CSS3 (Flexbox, Grid, CSS Variables)
- Vanilla JavaScript (ES6+)
- Font Awesome 图标
- PWA (Web App Manifest)

## 项目结构

```
travelclaw/
├── index.html          # 主页面（包含背景图片）
├── styles.css          # 样式文件
├── app.js             # 主逻辑
├── manifest.json      # PWA 配置文件
├── README.md          # 说明文档
└── #可以自定义扩展
    ├── icons/            # 应用图标
    └── assets/           # 静态资源
```

## 🛠️ 基于此项目的 OpenClaw Skill

这个项目展示了如何通过 OpenClaw 快速创建移动 Web 应用。基于这个经验，我们创建了一个完整的 OpenClaw Skill：

### Mobile WebApp Creator Skill 🚀
一个让所有 OpenClaw 用户都能通过手机快速创建和部署移动 Web 应用的技能。

**GitHub 仓库**: https://github.com/yinyucheng0601/mobile-webapp-creator
**主要功能**:
- 📱 通过手机对话创建完整 Web 应用
- 🎨 基于用户图片智能设计界面
- 🚀 一键部署到 GitHub Pages
- 📦 生成生产就绪的代码

**安装方式**:
```bash
npx skills add yinyucheng0601/mobile-webapp-creator -y -g
```

**使用示例**:
```
用户: "帮我创建一个状态展示面板，用这张图片做背景"
AI: 自动生成并部署 Web App，返回访问链接
```

### 贡献和 Star ⭐
如果你觉得这个项目有用，请：
1. 给 [mobile-webapp-creator](https://github.com/yinyucheng0601/mobile-webapp-creator) 仓库点个 Star
2. 分享给其他 OpenClaw 用户
3. 提交 Issue 或 PR 帮助改进

**提示**：这是一个纯前端状态展示面板，当前使用模拟数据。可以轻松集成真实 API 获取实际状态信息。
