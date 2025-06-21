// 多语言切换功能
class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'zh';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.createLanguageToggle();
        this.updateContent();
    }

    async loadTranslations() {
        try {
            const response = await fetch('./JavaScript/lang.json');
            this.translations = await response.json();
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }

    createLanguageToggle() {
        const langToggle = document.createElement('div');
        langToggle.className = 'language-toggle';
        langToggle.innerHTML = `
            <button class="lang-btn" id="lang-toggle">
                <span class="lang-icon">🌐</span>
                <span class="lang-text">${this.currentLang === 'zh' ? 'EN' : '中'}</span>
            </button>
        `;

        // 添加到导航栏右侧
        const topar = document.querySelector('.topar');
        if (topar) {
            topar.appendChild(langToggle);
        }

        // 绑定点击事件
        document.getElementById('lang-toggle').addEventListener('click', () => {
            this.toggleLanguage();
        });
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('language', this.currentLang);
        this.updateContent();
        this.updateToggleButton();
    }

    updateToggleButton() {
        const langText = document.querySelector('.lang-text');
        if (langText) {
            langText.textContent = this.currentLang === 'zh' ? 'EN' : '中';
        }
    }

    updateContent() {
        const t = this.translations[this.currentLang];
        if (!t) return;

        // 更新导航栏
        this.updateElement('[data-lang="nav.about"]', t.nav.about);
        this.updateElement('[data-lang="nav.share"]', t.nav.share);
        this.updateElement('[data-lang="nav.donate"]', t.nav.donate);
        this.updateElement('[data-lang="nav.friends"]', t.nav.friends);

        // 更新卡片内容
        this.updateElement('[data-lang="cards.eye"]', t.cards.eye);
        this.updateElement('[data-lang="cards.follow"]', t.cards.follow);
        this.updateElement('[data-lang="cards.galaxy"]', t.cards.galaxy);
        this.updateElement('[data-lang="cards.bubble"]', t.cards.bubble);
        this.updateElement('[data-lang="cards.more"]', t.cards.more);
        this.updateElement('[data-lang="cards.coming"]', t.cards.coming);
        this.updateElement('[data-lang="cards.developing"]', t.cards.developing);
        this.updateElement('[data-lang="cards.online"]', t.cards.online);
        this.updateElement('[data-lang="cards.new"]', t.cards.new);

        // 更新内容区域
        this.updateElement('[data-lang="content.welcome"]', t.content.welcome);
        this.updateElement('[data-lang="content.description"]', t.content.description);
        this.updateElement('[data-lang="content.more"]', t.content.more);
        this.updateElement('[data-lang="content.backToTop"]', t.content.backToTop);
    }

    updateElement(selector, text) {
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = text;
        }
    }
}

// 初始化语言切换器
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});

// 导出供其他文件使用
window.LanguageSwitcher = LanguageSwitcher;