// API配置文件
// 请在这里配置你的API信息

const API_CONFIG = {
    // 你的API端点URL
    apiUrl: 'https://api.siliconflow.cn/v1',
    
    // 你的API密钥（如果需要）
    apiKey: 'sk-rnqeqivssxpeuwxpqnpsjsqpdfrzkzkplkkragkfblslzegh',
    
    // API请求配置
    requestConfig: {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 如果需要Authorization header，可以在这里配置
            // 'Authorization': 'Bearer YOUR_API_KEY'
        },
        // 请求体配置示例（根据你的API调整）
        bodyTemplate: {
            model: 'Pro/deepseek-ai/DeepSeek-V3', // 根据你的API调整
            max_tokens: 500,
            temperature: 0.7,
            stream: false // 如果支持流式响应，可以设置为true
        }
    },
    
    // 系统提示词配置
    systemPrompt: '你是Lynn，一个友善的AI助手。你是这个网站的主人，喜欢技术和分享。请用简洁、亲切的方式回答问题，保持Lynn的个性。',
    
    // 聊天配置
    chatConfig: {
        maxHistoryLength: 10, // 保留的最大历史对话数
        typingDelay: 1000, // 模拟打字延迟（毫秒）
        maxMessageLength: 500, // 最大消息长度
        enableTypingIndicator: true, // 是否显示打字指示器
        saveHistory: true // 是否保存聊天历史
    }
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
} else {
    window.API_CONFIG = API_CONFIG;
}

/* 
使用说明：
1. 将 YOUR_API_ENDPOINT_HERE 替换为你的实际API端点
2. 将 YOUR_API_KEY_HERE 替换为你的API密钥
3. 根据你的API文档调整 requestConfig 和 bodyTemplate
4. 可以自定义 systemPrompt 来调整AI的回复风格
5. 通过 chatConfig 调整聊天体验设置

常见API配置示例：

OpenAI API:
apiUrl: 'https://api.openai.com/v1/chat/completions'
headers: { 'Authorization': 'Bearer YOUR_OPENAI_API_KEY' }

Claude API:
apiUrl: 'https://api.anthropic.com/v1/messages'
headers: { 'x-api-key': 'YOUR_CLAUDE_API_KEY' }

自定义API:
根据你的API文档进行配置
*/