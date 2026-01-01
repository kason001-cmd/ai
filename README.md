# Soulmate AI Predictor

一个基于 React + Tailwind CSS + Framer Motion 的趣味 AI 预测应用，用于预测你的理想另一半。

## 功能特点

- 🎨 现代极简设计，移动端优先
- 🌈 深蓝到浅紫的渐变色主题
- ✨ 流畅的动画效果
- 📱 响应式设计，完美适配各种设备
- 🎯 分步表单收集用户信息
- 📊 可视化匹配度雷达图
- 🎭 AI 生成结果展示
- 🖼️  AI 生成人物画像（使用阿里百炼 z-image-turbo）
- 🔮 根据生日自动识别星座
- 📸 一键生成并下载精美分享海报

## 技术栈

- **React 18** - UI 框架
- **Tailwind CSS** - 样式框架
- **Framer Motion** - 动画库
- **Vite** - 构建工具

## 快速开始

### 安装依赖

```bash
npm install
```

**注意**：海报生成功能需要 `html2canvas` 库，如果安装时未自动安装，请手动安装：

```bash
npm install html2canvas
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## AI API 配置

### 配置阿里百炼 DashScope API（推荐）

1. 获取阿里百炼 API 密钥：
   - 访问 [阿里云百炼控制台](https://dashscope.console.aliyun.com/apiKey)
   - 创建新的 API 密钥

2. 配置环境变量：
   ```bash
   # 在项目根目录创建 .env 文件
   # 填入你的阿里百炼 API 密钥
   VITE_DASHSCOPE_API_KEY=your_dashscope_api_key_here
   
   # 可选：指定使用的模型（默认 qwen-turbo）
   # VITE_AI_MODEL=qwen-turbo
   # 可选值：qwen-turbo, qwen-plus, qwen-max 等
   ```

3. 重启开发服务器：
   ```bash
   npm run dev
   ```

### CORS 跨域问题解决

项目已配置 Vite 代理服务器，自动解决 CORS 跨域问题：

- **文本生成 API**：通过 `/api/text-generation` 代理到阿里百炼服务器
- **图片生成 API**：通过 `/api/image-generation` 代理到阿里百炼服务器

所有 API 请求都会先发送到同源的开发服务器，然后由服务器转发到阿里百炼，避免了浏览器的 CORS 限制。

**注意**：在生产环境中，建议使用后端服务器作为 API 代理，而不是直接在前端调用外部 API。

### 支持的模型

- **文本生成**：qwen-turbo（默认）、qwen-plus、qwen-max 等
- **图片生成**：z-image-turbo（自动使用）

### 兼容性说明

- 如果同时配置了 `VITE_DASHSCOPE_API_KEY` 和 `VITE_OPENAI_API_KEY`，会优先使用 `VITE_DASHSCOPE_API_KEY`
- 可以通过 `VITE_AI_API_URL` 自定义 API 地址（默认使用阿里百炼官方地址）

### 降级方案

如果没有配置 API 密钥，系统会自动使用模拟数据作为降级方案，确保应用可以正常运行。

## 项目结构

```
soulmate-ai-predictor/
├── src/
│   ├── components/
│   │   ├── Landing.jsx          # 首页组件
│   │   ├── InputForm.jsx        # 信息收集表单
│   │   ├── Loading.jsx          # 加载页面
│   │   ├── Result.jsx           # 结果展示页
│   │   ├── ParticleBackground.jsx  # 粒子背景
│   │   └── RadarChart.jsx       # 雷达图组件
│   ├── services/
│   │   └── aiService.js         # AI API 服务
│   ├── App.jsx                  # 主应用组件
│   ├── main.jsx                 # 入口文件
│   └── index.css                # 全局样式
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── .env.example                 # 环境变量示例文件
```

## 使用说明

1. **首页**：点击"开始分析"按钮进入信息收集页面
2. **信息收集**：分三步填写基础信息、性格倾向和理想型关键词
   - 选择出生日期后，系统会自动识别星座
3. **分析中**：点击"开始分析"后，系统会：
   - 调用 GPT API 生成个性化预测结果和画像描述
   - 调用 DALL-E 3 API 根据画像描述生成人物画像
4. **结果页**：查看 AI 预测的结果，包括：
   - AI 生成的人物画像
   - 匹配度雷达图
   - 性格解析
   - 相遇小贴士

## 注意事项

- 结果仅供娱乐，不构成任何科学依据
- 已集成真实的 AI API 调用功能，使用阿里百炼 DashScope API
- 文本生成使用通义千问模型（qwen-turbo/qwen-plus/qwen-max）
- 图片生成使用阿里百炼的 z-image-turbo 模型
- 如果未配置 API 密钥，系统会自动使用模拟数据作为降级方案
- 如果图片生成失败，系统会显示文本描述作为降级方案
- 请妥善保管你的 API 密钥，不要将其提交到代码仓库

## 许可证

MIT

