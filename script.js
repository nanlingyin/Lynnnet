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

floatingButton.addEventListener('click', () => {
    floatingMenu.style.display = (floatingMenu.style.display === 'block') ? 'none' : 'block';
});

// 拖动悬浮按钮
let isDragging = false;
let offsetX, offsetY;

floatingButton.addEventListener('mousedown', (e) => {
    // 防止拖动时触发点击事件
    if (e.target === floatingButton) {
        isDragging = true;
        offsetX = e.clientX - floatingButton.offsetLeft;
        offsetY = e.clientY - floatingButton.offsetTop;
        document.body.style.userSelect = 'none';
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // 限制菜单在视口内移动
        const maxX = window.innerWidth - floatingButton.offsetWidth;
        const maxY = window.innerHeight - floatingButton.offsetHeight;

        if (newX < 0) newX = 0;
        if (newX > maxX) newX = maxX;
        if (newY < 0) newY = 0;
        if (newY > maxY) newY = maxY;

        floatingButton.style.left = `${newX}px`;
        floatingButton.style.top = `${newY}px`;
        floatingButton.style.transform = 'none';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = 'auto';
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