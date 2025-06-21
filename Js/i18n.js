// 国际化翻译数据
const translations = {
    zh: {
        // 导航菜单
        'about_me': '关于我',
        'resource_share': '资源分享',
        'donate': '捐赠',
        'friend_link': '友链',
        'main_page': '主页',
        
        // 特效页面
        'eye_tracking': '我会一直视奸你',
        'mouse_follow': '跟踪鼠标',
        'galaxy': '星辰宇宙',
        'color_bubble': '七彩泡泡',
        'more': '更多',
        'back_to_top': '回到顶部',
        
        // 常用词汇
        'home': '首页',
        'contact': '联系',
        'portfolio': '作品集',
        'blog': '博客',
        'projects': '项目',
        'skills': '技能',
        'experience': '经验',
        'education': '教育',
        
        // 网站标题
        'site_title': '主页/Lynn'
    },
    en: {
        // 导航菜单
        'about_me': 'About Me',
        'resource_share': 'Resource Share',
        'donate': 'Donate',
        'friend_link': 'Friend Links',
        'main_page': 'Home',
        
        // 特效页面
        'eye_tracking': 'Eye Tracking You',
        'mouse_follow': 'Mouse Follow',
        'galaxy': 'Galaxy Universe',
        'color_bubble': 'Colorful Bubbles',
        'more': 'More',
        'back_to_top': 'Back to Top',
        
        // 常用词汇
        'home': 'Home',
        'contact': 'Contact',
        'portfolio': 'Portfolio',
        'blog': 'Blog',
        'projects': 'Projects',
        'skills': 'Skills',
        'experience': 'Experience',
        'education': 'Education',
        
        // 网站标题
        'site_title': 'Home/Lynn'
    }
};

// 当前语言，默认为中文
let currentLanguage = localStorage.getItem('language') || 'zh';

// 初始化语言设置
function initLanguage() {
    // 设置HTML lang属性
    document.documentElement.lang = currentLanguage;
    
    // 应用翻译
    applyTranslations();
    
    // 更新语言切换按钮状态
    updateLanguageButton();
}

// 应用翻译
function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translations[currentLanguage][key];
            } else if (element.hasAttribute('title')) {
                element.title = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });
    
    // 更新页面标题
    if (translations[currentLanguage]['site_title']) {
        document.title = translations[currentLanguage]['site_title'];
    }
}

// 切换语言
function toggleLanguage() {
    currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    localStorage.setItem('language', currentLanguage);
    initLanguage();
}

// 更新语言切换按钮
function updateLanguageButton() {
    const langButton = document.getElementById('language-toggle');
    if (langButton) {
        langButton.textContent = currentLanguage === 'zh' ? 'EN' : '中';
        langButton.title = currentLanguage === 'zh' ? 'Switch to English' : '切换到中文';
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initLanguage();
});