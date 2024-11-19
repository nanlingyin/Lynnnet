// script.js

// 菜单切换功能
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active'); /* 切换active类以触发旋转 */
});

// 贡献者模态窗口功能
const contributorsLink = document.getElementById('contributors-link');
const contributorsModal = document.getElementById('contributors-modal');
const closeModal = document.querySelector('.modal .close');

// 打开模态窗口
contributorsLink.addEventListener('click', (e) => {
    e.preventDefault();
    contributorsModal.style.display = 'block';
});

// 关闭模态窗口
closeModal.addEventListener('click', () => {
    contributorsModal.style.display = 'none';
});

// 点击模态窗口外部关闭窗口
window.addEventListener('click', (event) => {
    if (event.target == contributorsModal) {
        contributorsModal.style.display = 'none';
    }
});

// 动态调整导航链接
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#nav-menu ul li a');
    const currentPage = window.location.pathname.split('/').pop(); // 获取当前页面文件名

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            // 如果是内部锚点链接
            if (currentPage !== 'index.html' && currentPage !== '') {
                // 如果当前页面不是主页
                link.setAttribute('href', `index.html${href}`);
            }
            // 如果是主页，则保持不变
        }
    });
});

// 悬浮按钮功能
const floatingButton = document.getElementById('floating-button');
const floatingMenu = document.getElementById('floating-menu');
let isDraggingFloating = false;

// 悬浮按钮点击事件
floatingButton.addEventListener('click', (e) => {
    if (!isDraggingFloating) { // 仅在非拖动时触发
        if (floatingMenu.style.display === 'block') {
            floatingMenu.style.display = 'none';
        } else {
            floatingMenu.style.display = 'block';
            positionFloatingMenu();
        }
    }
});

// 监听页面加载完成后确保悬浮按钮和菜单的位置
document.addEventListener('DOMContentLoaded', () => {
    resetFloatingPosition();
});

// 监听滚动事件，确保悬浮按钮和菜单在页面底部也能正常工作
window.addEventListener('scroll', () => {
    // 可根据需要添加相关逻辑
    // 例如：确保悬浮按钮不被底部内容遮挡
});

// 位置调整函数优化
function positionFloatingMenu() {
    // 不再动态计算位置，保持固定位置
}

// 重置悬浮按钮和菜单位置到右下角
function resetFloatingPosition() {
    floatingButton.style.left = '';
    floatingButton.style.top = '';
    floatingButton.style.right = '20px';
    floatingButton.style.bottom = '20px';
    floatingMenu.style.left = '';
    floatingMenu.style.top = '';
    floatingMenu.style.bottom = '80px';
    floatingMenu.style.right = '20px';
    floatingMenu.style.display = 'none'; // 初始化时隐藏悬浮菜单
}

// 其他优化：增加点击区域扩大用户体验
document.addEventListener('click', (event) => {
    if (!floatingButton.contains(event.target) && !floatingMenu.contains(event.target)) {
        floatingMenu.style.display = 'none';
    }
});

// 切换粒子效果
const toggleParticlesBtn = document.getElementById('toggle-particles-effect');
let particlesEnabled = true;

toggleParticlesBtn.addEventListener('click', () => {
    particlesEnabled = !particlesEnabled;
    if (particlesEnabled) {
        particlesJS.load('particles-js', 'particles.json', function() {
            console.log('particles.js loaded - callback');
        });
    } else {
        // 停止粒子效果
        if (window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
            window.pJSDom = [];
        }
    }
});

// 切换鼠标拖尾效果
const toggleMouseTrailBtn = document.getElementById('toggle-mouse-trail');
let mouseTrailEnabled = false;
const mouseTrailContainer = document.getElementById('mouse-trail');

toggleMouseTrailBtn.addEventListener('click', () => {
    mouseTrailEnabled = !mouseTrailEnabled;
    if (mouseTrailEnabled) {
        document.addEventListener('mousemove', createMouseTrail);
    } else {
        document.removeEventListener('mousemove', createMouseTrail);
        mouseTrailContainer.innerHTML = ''; // 清空拖尾效果
    }
});

function createMouseTrail(e) {
    const trail = document.createElement('div');
    trail.className = 'cursor-effect';
    trail.style.left = `${e.clientX}px`;
    trail.style.top = `${e.clientY}px`;
    mouseTrailContainer.appendChild(trail);
}

// 监听页面尺寸变化，适配移动端和桌面端
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        // 桌面端时，保持当前位置
    } else {
        // 移动端时，重置到右下角
        resetFloatingPosition();
        floatingMenu.style.display = 'none'; // 隐藏悬浮菜单
    }
});