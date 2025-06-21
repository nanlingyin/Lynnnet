# LLM API 配置指南

## 概述
这个聊天功能支持多种LLM API，包括OpenAI、Claude、以及其他兼容OpenAI格式的API服务。

## 配置步骤

### 1. 打开配置文件
编辑 `JavaScript/simple-chat.js` 文件中的 `API_CONFIG` 对象

### 2. 配置你的API

#### OpenAI API 配置
```javascript
const API_CONFIG = {
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    apiKey: 'sk-your-openai-api-key-here',
    apiType: 'openai',
    systemPrompt: '你是Lynn，一个友善的AI助手...',
    requestConfig: {
        model: 'gpt-3.5-turbo',  // 或 'gpt-4'
        max_tokens: 150,
        temperature: 0.7
    }
};
```

#### Claude API 配置
```javascript
const API_CONFIG = {
    apiUrl: 'https://api.anthropic.com/v1/messages',
    apiKey: 'sk-ant-your-claude-api-key-here',
    apiType: 'claude',
    systemPrompt: '你是Lynn，一个友善的AI助手...',
    requestConfig: {
        model: 'claude-3-sonnet-20240229',
        max_tokens: 150
    }
};
```

#### SiliconFlow API 配置（国内API服务）
```javascript
const API_CONFIG = {
    apiUrl: 'https://api.siliconflow.cn/v1/chat/completions',
    apiKey: 'sk-your-siliconflow-key-here',
    apiType: 'openai',
    systemPrompt: '你是Lynn，一个友善的AI助手...',
    requestConfig: {
        model: 'deepseek-chat',  // 或其他支持的模型
        max_tokens: 150,
        temperature: 0.7
    }
};
```

#### 月之暗面 API 配置
```javascript
const API_CONFIG = {
    apiUrl: 'https://api.moonshot.cn/v1/chat/completions',
    apiKey: 'sk-your-moonshot-key-here',
    apiType: 'openai',
    systemPrompt: '你是Lynn，一个友善的AI助手...',
    requestConfig: {
        model: 'moonshot-v1-8k',
        max_tokens: 150,
        temperature: 0.7
    }
};
```

#### 智谱AI API 配置
```javascript
const API_CONFIG = {
    apiUrl: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    apiKey: 'your-zhipu-api-key.your-signature',
    apiType: 'openai',
    systemPrompt: '你是Lynn，一个友善的AI助手...',
    requestConfig: {
        model: 'glm-4',
        max_tokens: 150,
        temperature: 0.7
    }
};
```

## 常见问题解决

### 1. CORS 跨域问题
如果遇到跨域访问错误，有以下解决方案：

#### 方案一：使用代理服务
创建一个简单的代理服务器：
```javascript
// 修改 apiUrl 为你的代理地址
apiUrl: 'http://localhost:3000/api/proxy'
```

#### 方案二：使用 Cloudflare Workers
部署一个 Cloudflare Worker 作为代理：
```javascript
apiUrl: 'https://your-worker.your-subdomain.workers.dev/v1/chat/completions'
```

### 2. API 密钥获取

- **OpenAI**: https://platform.openai.com/api-keys
- **Claude**: https://console.anthropic.com/
- **SiliconFlow**: https://cloud.siliconflow.cn/
- **月之暗面**: https://platform.moonshot.cn/
- **智谱AI**: https://open.bigmodel.cn/

### 3. 调试技巧

1. 打开浏览器开发者工具 (F12)
2. 查看 Console 标签页的日志
3. 检查 Network 标签页的API请求

## 系统提示词自定义

你可以修改 `systemPrompt` 来调整AI的回复风格：

```javascript
systemPrompt: `你是Lynn，这个网站的主人。你的特点：
- 苏州大学软件工程专业学生
- 热爱AI和Web开发
- 正在研究LLM幻觉缓解
- 喜欢打游戏（CS2、瓦洛兰特）
- 以前在Scratch社区活跃（洛亦离999）
- 回复要简洁亲切，控制在100字以内
- 保持友善和专业的态度`
```

## 测试配置

配置完成后，尝试发送以下消息测试：
- "你好"
- "你是谁"
- "介绍一下你的研究"
- "你在学什么"

如果配置正确，Lynn会给出更智能和个性化的回复。

## 注意事项

1. **API密钥安全**: 不要在公开仓库中暴露真实的API密钥
2. **费用控制**: 注意API调用的费用，建议设置使用限额
3. **频率限制**: 遵守API服务商的调用频率限制
4. **模型选择**: 根据需求选择合适的模型（速度vs质量）

## 故障排除

如果聊天功能不工作：
1. 检查API配置是否正确
2. 验证API密钥是否有效
3. 查看浏览器控制台的错误信息
4. 确认网络连接正常
5. 检查API服务商的服务状态