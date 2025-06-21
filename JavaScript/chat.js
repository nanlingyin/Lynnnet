// Live2D聊天功能
class ChatBot {
    constructor() {
        // 使用配置文件中的设置，如果没有则使用默认值
        this.config = window.API_CONFIG || {
            apiUrl: 'https://api.siliconflow.cn/v1',
            apiKey: 'sk-rnqeqivssxpeuwxpqnpsjsqpdfrzkzkplkkragkfblslzegh',
            systemPrompt: '你是Lynn，一个友善的AI助手。请用简洁、亲切的方式回答问题。',
            chatConfig: {
                maxHistoryLength: 10,
                typingDelay: 1000,
                maxMessageLength: 500,
                enableTypingIndicator: true,
                saveHistory: true
            }
        };
        
        this.isTyping = false;
        this.chatHistory = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadChatHistory();
        this.addWelcomeMessage();
    }

    setupEventListeners() {
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('chat-send');
        const chatToggle = document.querySelector('.chat-toggle');
        const chatClose = document.querySelector('.chat-close');

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !this.isTyping) {
                    this.sendMessage();
                }
            });
        }

        if (sendButton) {
            sendButton.addEventListener('click', () => {
                if (!this.isTyping) {
                    this.sendMessage();
                }
            });
        }

        if (chatToggle) {
            chatToggle.addEventListener('click', () => {
                this.toggleChat();
            });
        }

        if (chatClose) {
            chatClose.addEventListener('click', () => {
                this.toggleChat();
            });
        }
    }

    toggleChat() {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            const isVisible = chatContainer.style.display === 'flex';
            chatContainer.style.display = isVisible ? 'none' : 'flex';
            
            if (!isVisible) {
                // 聊天框打开时，聚焦输入框
                setTimeout(() => {
                    const input = document.getElementById('chat-input');
                    if (input) input.focus();
                }, 100);
            }
        }
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const sendButton = document.getElementById('chat-send');
        
        if (!input || this.isTyping) return;
        
        const message = input.value.trim();
        if (!message) return;

        // 添加用户消息
        this.addMessage('user', message);
        this.chatHistory.push({ role: 'user', content: message });
        
        // 清空输入框并禁用发送按钮
        input.value = '';
        this.setButtonState(sendButton, false);
        
        // 显示输入指示器
        this.showTypingIndicator();
        
        try {
            // 调用API获取回复
            const reply = await this.callAPI(message);
            this.hideTypingIndicator();
            this.addMessage('assistant', reply);
            this.chatHistory.push({ role: 'assistant', content: reply });
            this.saveChatHistory();
        } catch (error) {
            console.error('API调用失败:', error);
            this.hideTypingIndicator();
            this.addMessage('assistant', '抱歉，我现在有点忙，请稍后再试。');
        } finally {
            this.setButtonState(sendButton, true);
        }
    }

    async callAPI(message) {
        // 如果没有配置API，返回模拟回复
        if (this.config.apiUrl === 'YOUR_API_ENDPOINT_HERE' || !this.config.apiUrl) {
            return this.getSimulatedReply(message);
        }

        try {
            // 构建请求头
            const headers = {
                'Content-Type': 'application/json',
                ...this.config.requestConfig?.headers
            };

            // 如果有API密钥，添加到请求头
            if (this.config.apiKey && this.config.apiKey !== 'YOUR_API_KEY_HERE') {
                headers['Authorization'] = `Bearer ${this.config.apiKey}`;
            }

            // 构建消息历史
            const messages = [
                { role: 'system', content: this.config.systemPrompt }
            ];

            // 添加历史对话（限制数量）
            const maxHistory = this.config.chatConfig?.maxHistoryLength || 10;
            const recentHistory = this.chatHistory.slice(-maxHistory);
            messages.push(...recentHistory);
            
            // 添加当前用户消息
            messages.push({ role: 'user', content: message });

            // 构建请求体
            const requestBody = {
                ...this.config.requestConfig?.bodyTemplate,
                messages: messages
            };

            // 发送API请求
            const response = await fetch(this.config.apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            // 根据不同API格式解析响应
            let reply = '';
            if (data.choices && data.choices[0] && data.choices[0].message) {
                // OpenAI格式
                reply = data.choices[0].message.content;
            } else if (data.content && data.content[0] && data.content[0].text) {
                // Claude格式
                reply = data.content[0].text;
            } else if (data.response) {
                // 通用格式
                reply = data.response;
            } else if (data.message) {
                // 另一种通用格式
                reply = data.message;
            } else {
                // 如果都不匹配，尝试直接使用data作为字符串
                reply = typeof data === 'string' ? data : '抱歉，我无法理解API的响应格式。';
            }

            return reply || '抱歉，我没能生成回复。';

        } catch (error) {
            console.error('API调用失败:', error);
            // 网络错误时返回友好的错误消息
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                return '网络连接似乎有问题，请检查你的网络设置。';
            } else if (error.message.includes('401')) {
                return 'API密钥似乎有问题，请检查配置。';
            } else if (error.message.includes('429')) {
                return 'API请求过于频繁，请稍后再试。';
            } else {
                return '抱歉，服务暂时不可用，请稍后再试。';
            }
        }
    }

    getSimulatedReply(message) {
        // 模拟延迟
        const delay = this.config.chatConfig?.typingDelay || 1000;
        return new Promise(resolve => {
            setTimeout(() => {
                const replies = [
                    '这是一个很有趣的问题！我正在思考...🤔',
                    '哇，你提到的这个话题很棒！我觉得...',
                    '让我想想...这确实值得深入讨论！',
                    '你好！我是Lynn，很高兴和你聊天～',
                    '这个问题让我想到了很多，你觉得呢？',
                    '真是个好问题！我的看法是...',
                    '嗯嗯，我明白你的意思，让我来解答一下！',
                    '我正在学习中，这个问题让我想到了很多新的想法！',
                    '作为一个正在学习AI的学生，我觉得这个话题很有意思！',
                    '这让我想起了我在开发这个网站时的经历...'
                ];
                
                // 根据消息内容提供更智能的回复
                const lowerMessage = message.toLowerCase();
                
                if (lowerMessage.includes('你好') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                    resolve('你好！我是Lynn，很高兴认识你！有什么想聊的吗？😊');
                } else if (lowerMessage.includes('再见') || lowerMessage.includes('拜拜') || lowerMessage.includes('bye')) {
                    resolve('再见！很高兴和你聊天，期待下次见面～👋');
                } else if (lowerMessage.includes('你是谁') || lowerMessage.includes('介绍')) {
                    resolve('我是Lynn，这个网站的主人。我是苏州大学软件工程专业的学生，喜欢AI和Web开发！');
                } else if (lowerMessage.includes('网站') || lowerMessage.includes('项目')) {
                    resolve('这个网站是我的个人项目，用来分享资源和记录学习经历。目前还在不断完善中，你觉得怎么样？');
                } else if (lowerMessage.includes('学习') || lowerMessage.includes('编程')) {
                    resolve('我正在学习软件工程，特别是AI和Web开发。最近在研究LLM的幻觉缓解问题，你也在学习编程吗？');
                } else if (lowerMessage.includes('ai') || lowerMessage.includes('人工智能')) {
                    resolve('AI是我最感兴趣的领域！我正在研究大语言模型，特别是如何缓解幻觉问题。你对AI的哪个方面感兴趣？');
                } else if (lowerMessage.includes('研究') || lowerMessage.includes('论文')) {
                    resolve('我刚完成了我的首篇论文"HIYO-Encoder"，还参加了2025ETAI会议做了presentation！研究真是让人兴奋的事情。');
                } else if (lowerMessage.includes('游戏') || lowerMessage.includes('cs') || lowerMessage.includes('瓦洛兰特')) {
                    resolve('哈哈，我也喜欢打游戏！CS2和瓦洛兰特都玩，不过技术还是菜鸟级别的😅 你也玩游戏吗？');
                } else if (lowerMessage.includes('scratch')) {
                    resolve('哦！你也知道Scratch吧！我以前叫洛亦离999，在scratch吧比较活跃。那是我编程的起点呢！');
                } else if (lowerMessage.includes('联系') || lowerMessage.includes('交流')) {
                    resolve('欢迎和我交流！可以通过这个网站的联系方式找到我，我很乐意和同样喜欢技术的朋友聊天！');
                } else {
                    const randomReply = replies[Math.floor(Math.random() * replies.length)];
                    resolve(randomReply);
                }
            }, delay + Math.random() * 1000); // 添加随机延迟使对话更自然
        });
    }

    addMessage(sender, content) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

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
        typingElement.className = 'message assistant typing-indicator';
        typingElement.id = 'typing-indicator';
        typingElement.innerHTML = `
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
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

    setButtonState(button, enabled) {
        if (button) {
            button.disabled = !enabled;
            button.textContent = enabled ? '发送' : '...';
        }
    }

    getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    addWelcomeMessage() {
        const messagesContainer = document.getElementById('chat-messages');
        if (messagesContainer && messagesContainer.children.length <= 1) {
            // 如果没有历史消息，添加欢迎消息
            this.addMessage('assistant', '你好！我是Lynn，有什么想聊的吗？😊');
        }
    }

    saveChatHistory() {
        if (!this.config.chatConfig?.saveHistory) return;
        
        try {
            // 只保存配置中指定数量的对话
            const maxHistory = this.config.chatConfig?.maxHistoryLength || 20;
            const recentHistory = this.chatHistory.slice(-maxHistory);
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
                // 恢复最近的几条消息到界面
                const messagesContainer = document.getElementById('chat-messages');
                if (messagesContainer && this.chatHistory.length > 0) {
                    messagesContainer.innerHTML = ''; // 清空默认消息
                    // 只显示最近5条消息
                    const recentMessages = this.chatHistory.slice(-5);
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
}

// 页面加载完成后初始化聊天机器人
document.addEventListener('DOMContentLoaded', () => {
    window.chatBot = new ChatBot();
});

// 导出以供其他脚本使用
window.ChatBot = ChatBot;