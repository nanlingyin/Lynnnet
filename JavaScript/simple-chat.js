// 简化的聊天功能实现
let chatBot = null;

// API配置 - 请在这里配置你的LLM API
const API_CONFIG = {
    // 替换为你的API端点
    apiUrl: 'https://api.siliconflow.cn/v1/chat/completions', // 例如: 'https://api.openai.com/v1/chat/completions'
    
    // 替换为你的API密钥
    apiKey: 'sk-rnqeqivssxpeuwxpqnpsjsqpdfrzkzkplkkragkfblslzegh',
    
    // API类型 - 支持 'openai', 'claude', 'custom'
    apiType: 'siliconflow',
    
    // 系统提示词
    systemPrompt: '你是Lynn，一个友善的AI助手，是这个网站的主人。你是石河子大学软件工程专业的学生，喜欢AI和Web开发研究。请用简洁、亲切的方式回答问题，保持Lynn的个性。回复请控制在100字以内。',
    
    // 请求配置
    requestConfig: {
        model: 'Qwen/Qwen3-32B', // 根据你的API调整
        max_tokens: 2000,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    }
};

// 聊天功能主类
class SimpleChatBot {
    constructor() {
        this.isTyping = false;
        this.chatHistory = [];
        this.isApiConfigured = this.checkApiConfiguration();
        this.init();
    }

    checkApiConfiguration() {
        return API_CONFIG.apiUrl !== 'YOUR_API_ENDPOINT_HERE' && 
               API_CONFIG.apiKey !== 'YOUR_API_KEY_HERE' && 
               API_CONFIG.apiUrl && 
               API_CONFIG.apiKey;
    }

    init() {
        console.log('聊天机器人初始化...');
        this.setupEventListeners();
        this.addWelcomeMessage();
        this.loadChatHistory();
    }

    setupEventListeners() {
        // 等待DOM加载完成后绑定事件
        setTimeout(() => {
            const chatInput = document.getElementById('chat-input');
            const sendButton = document.getElementById('chat-send');
            
            if (chatInput) {
                chatInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && !this.isTyping) {
                        this.sendMessage();
                    }
                });
                console.log('输入框事件绑定成功');
            } else {
                console.error('找不到聊天输入框');
            }

            if (sendButton) {
                sendButton.addEventListener('click', () => {
                    if (!this.isTyping) {
                        this.sendMessage();
                    }
                });
                console.log('发送按钮事件绑定成功');
            } else {
                console.error('找不到发送按钮');
            }
        }, 500);
    }

    toggleChat() {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            const isVisible = chatContainer.style.display === 'flex';
            chatContainer.style.display = isVisible ? 'none' : 'flex';
            console.log('聊天窗口', isVisible ? '关闭' : '打开');
            
            if (!isVisible) {
                // 聊天框打开时，聚焦输入框
                setTimeout(() => {
                    const input = document.getElementById('chat-input');
                    if (input) input.focus();
                }, 100);
            }
        } else {
            console.error('找不到聊天容器');
        }
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const sendButton = document.getElementById('chat-send');
        
        if (!input || this.isTyping) return;
        
        const message = input.value.trim();
        if (!message) return;

        console.log('发送消息:', message);

        // 添加用户消息
        this.addMessage('user', message);
        this.chatHistory.push({ role: 'user', content: message });
        
        // 清空输入框并禁用发送按钮
        input.value = '';
        if (sendButton) {
            sendButton.disabled = true;
            sendButton.textContent = '...';
        }
        
        // 显示打字指示器
        this.showTypingIndicator();
        
        try {
            let reply;
            if (this.isApiConfigured) {
                reply = await this.callLLMAPI(message);
            } else {
                reply = await this.getLocalReply(message);
            }
            
            this.hideTypingIndicator();
            this.addMessage('assistant', reply);
            this.chatHistory.push({ role: 'assistant', content: reply });
            this.saveChatHistory();
        } catch (error) {
            console.error('获取回复失败:', error);
            this.hideTypingIndicator();
            this.addMessage('assistant', '抱歉，我现在有点忙，请稍后再试。如果问题持续，可能是网络连接问题。');
        } finally {
            if (sendButton) {
                sendButton.disabled = false;
                sendButton.textContent = '发送';
            }
        }
    }

    async callLLMAPI(message) {
        try {
            console.log('调用LLM API...');
            
            // 构建消息历史
            const messages = [
                { role: 'system', content: API_CONFIG.systemPrompt }
            ];
            
            // 添加最近的5条对话历史
            const recentHistory = this.chatHistory.slice(-5);
            messages.push(...recentHistory);
            
            // 构建请求体
            const requestBody = {
                messages: messages,
                ...API_CONFIG.requestConfig
            };

            // 构建请求头
            const headers = {
                'Content-Type': 'application/json'
            };

            // 根据API类型设置认证头
            if (API_CONFIG.apiType === 'openai') {
                headers['Authorization'] = `Bearer ${API_CONFIG.apiKey}`;
            } else if (API_CONFIG.apiType === 'claude') {
                headers['x-api-key'] = API_CONFIG.apiKey;
                headers['anthropic-version'] = '2023-06-01';
                // Claude API格式调整
                requestBody.model = requestBody.model || 'claude-3-sonnet-20240229';
                requestBody.max_tokens = requestBody.max_tokens || 150;
                delete requestBody.top_p;
                delete requestBody.frequency_penalty;
                delete requestBody.presence_penalty;
            } else {
                // 自定义API
                headers['Authorization'] = `Bearer ${API_CONFIG.apiKey}`;
            }

            console.log('发送API请求:', { url: API_CONFIG.apiUrl, body: requestBody });

            const response = await fetch(API_CONFIG.apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API请求失败:', response.status, errorText);
                
                if (response.status === 401) {
                    throw new Error('API密钥无效，请检查配置');
                } else if (response.status === 429) {
                    throw new Error('API调用频率超限，请稍后再试');
                } else if (response.status === 403) {
                    throw new Error('API访问被拒绝，请检查权限');
                } else {
                    throw new Error(`API请求失败: ${response.status}`);
                }
            }

            const data = await response.json();
            console.log('API响应:', data);

            // 解析不同API的响应格式
            let reply = '';
            if (API_CONFIG.apiType === 'siliconflow' && data.choices && data.choices[0]) {
                reply = data.choices[0].message.content;
            } else if (API_CONFIG.apiType === 'claude' && data.content && data.content[0]) {
                reply = data.content[0].text;
            } else if (data.response) {
                reply = data.response;
            } else if (data.message) {
                reply = data.message;
            } else if (data.text) {
                reply = data.text;
            } else {
                console.warn('未知的API响应格式:', data);
                reply = '抱歉，我无法理解服务器的响应。';
            }

            return reply || '抱歉，我没能生成回复。';

        } catch (error) {
            console.error('LLM API调用错误:', error);
            
            // 网络错误处理
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('网络连接失败，请检查网络设置');
            } else if (error.message.includes('CORS')) {
                throw new Error('跨域访问被阻止，可能需要配置代理');
            } else {
                throw error;
            }
        }
    }

    async getLocalReply(message) {
        // 本地模拟回复（当API未配置时使用）
        console.log('使用本地模拟回复');
        
        // 模拟API延迟
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('你好') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return '你好！我是Lynn，很高兴认识你！有什么想聊的吗？😊\n\n💡 提示：要启用真正的AI对话，请配置API_CONFIG中的apiUrl和apiKey。';
        } else if (lowerMessage.includes('api') || lowerMessage.includes('配置')) {
            return '要连接真实的LLM API，请在simple-chat.js文件中修改API_CONFIG：\n\n1. 设置apiUrl（如OpenAI API端点）\n2. 设置apiKey（你的API密钥）\n3. 选择合适的apiType\n\n配置完成后即可享受真正的AI对话！';
        } else if (lowerMessage.includes('再见') || lowerMessage.includes('拜拜') || lowerMessage.includes('bye')) {
            return '再见！很高兴和你聊天，期待下次见面～👋';
        } else if (lowerMessage.includes('你是谁') || lowerMessage.includes('介绍')) {
            return '我是Lynn，这个网站的主人。我是苏州大学软件工程专业的学生，喜欢AI和Web开发！';
        } else if (lowerMessage.includes('网站') || lowerMessage.includes('项目')) {
            return '这个网站是我的个人项目，用来分享资源和记录学习经历。目前还在不断完善中，你觉得怎么样？';
        } else if (lowerMessage.includes('学习') || lowerMessage.includes('编程')) {
            return '我正在学习软件工程，特别是AI和Web开发。最近在研究LLM的幻觉缓解问题，你也在学习编程吗？';
        } else {
            const replies = [
                '这是一个很有趣的问题！我正在思考...🤔\n\n💡 配置真实API后可获得更智能的回复！',
                '哇，你提到的这个话题很棒！\n\n💡 想要更深入的对话？试试配置LLM API吧！',
                '让我想想...这确实值得深入讨论！',
                '这个问题让我想到了很多，你觉得呢？',
                '真是个好问题！我的看法是...',
                '嗯嗯，我明白你的意思！',
                '我正在学习中，这个问题让我想到了很多新的想法！'
            ];
            return replies[Math.floor(Math.random() * replies.length)];
        }
    }

    addMessage(sender, content) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) {
            console.error('找不到消息容器');
            return;
        }

        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}`;
        
        const contentElement = document.createElement('div');
        contentElement.className = 'message-content';
        contentElement.textContent = content;
        
        const timeElement = document.createElement('div');
        timeElement.className = 'message-time';
        timeElement.textContent = this.getCurrentTime();
        
        messageElement.appendChild(contentElement);
        messageElement.appendChild(timeElement);
        messagesContainer.appendChild(messageElement);
        
        // 滚动到底部
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
        this.isTyping = true;
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        const typingElement = document.createElement('div');
        typingElement.className = 'message assistant';
        typingElement.id = 'typing-indicator';
        typingElement.innerHTML = `
            <div class="message-content" style="background: #f0f0f0; color: #888;">
                Lynn正在输入...
            </div>
        `;
        
        messagesContainer.appendChild(typingElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingElement = document.getElementById('typing-indicator');
        if (typingElement) {
            typingElement.remove();
        }
    }

    getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    addWelcomeMessage() {
        // 清空默认消息并添加欢迎消息
        setTimeout(() => {
            const messagesContainer = document.getElementById('chat-messages');
            if (messagesContainer) {
                messagesContainer.innerHTML = '';
                const welcomeMsg = this.isApiConfigured 
                    ? '你好！我是Lynn，现在已连接到AI服务，有什么想聊的吗？😊'
                    : '你好！我是Lynn，有什么想聊的吗？😊\n\n💡 提示：当前使用模拟回复，配置API后可启用真正的AI对话。';
                this.addMessage('assistant', welcomeMsg);
            }
        }, 200);
    }

    saveChatHistory() {
        try {
            // 只保存最近10条对话
            const recentHistory = this.chatHistory.slice(-10);
            localStorage.setItem('lynn_chat_history', JSON.stringify(recentHistory));
        } catch (error) {
            console.warn('无法保存聊天记录:', error);
        }
    }

    loadChatHistory() {
        try {
            const saved = localStorage.getItem('lynn_chat_history');
            if (saved) {
                this.chatHistory = JSON.parse(saved);
                // 恢复最近的3条消息到界面
                const messagesContainer = document.getElementById('chat-messages');
                if (messagesContainer && this.chatHistory.length > 0) {
                    messagesContainer.innerHTML = '';
                    const recentMessages = this.chatHistory.slice(-3);
                    recentMessages.forEach(msg => {
                        this.addMessage(msg.role === 'user' ? 'user' : 'assistant', msg.content);
                    });
                }
            }
        } catch (error) {
            console.warn('无法加载聊天记录:', error);
        }
    }

    // 清除聊天记录
    clearHistory() {
        this.chatHistory = [];
        localStorage.removeItem('lynn_chat_history');
        const messagesContainer = document.getElementById('chat-messages');
        if (messagesContainer) {
            messagesContainer.innerHTML = '';
            this.addWelcomeMessage();
        }
    }

    // 获取API状态
    getApiStatus() {
        return {
            configured: this.isApiConfigured,
            apiUrl: API_CONFIG.apiUrl !== 'YOUR_API_ENDPOINT_HERE' ? API_CONFIG.apiUrl : '未配置',
            apiType: API_CONFIG.apiType
        };
    }
}

// 全局函数
function toggleChat() {
    if (chatBot) {
        chatBot.toggleChat();
    } else {
        console.error('聊天机器人未初始化');
    }
}

function sendMessage() {
    if (chatBot) {
        chatBot.sendMessage();
    } else {
        console.error('聊天机器人未初始化');
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面加载完成，初始化聊天机器人');
    chatBot = new SimpleChatBot();
    window.chatBot = chatBot;
});

// 如果DOMContentLoaded已经触发，立即初始化
if (document.readyState === 'loading') {
    // DOM还在加载中
    document.addEventListener('DOMContentLoaded', () => {
        chatBot = new SimpleChatBot();
        window.chatBot = chatBot;
    });
} else {
    // DOM已经加载完成
    chatBot = new SimpleChatBot();
    window.chatBot = chatBot;
}