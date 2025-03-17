// 主要功能和通用功能

// 顯示時間功能
function updateClock() {
    const now = new Date();
    
    // 更新時間
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
    
    // 更新日期
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    document.getElementById('date').textContent = `${year}年${month}月${date}日`;
    
    // 更新星期
    const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
    const dayOfWeek = now.getDay();
    document.getElementById('day').textContent = `星期${dayNames[dayOfWeek]}`;
}

// 初始化時鐘並每秒更新
updateClock();
setInterval(updateClock, 1000);

// 標籤頁切換功能
document.addEventListener('DOMContentLoaded', function() {
    // 主標籤頁切換
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 隱藏所有內容區域和重置標籤樣式
            document.querySelectorAll('.calculator-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelectorAll('.tab').forEach(t => {
                t.classList.remove('active');
            });
            
            // 顯示選定的內容並激活標籤
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            this.classList.add('active');
        });
    });
    
    // 子標籤頁切換功能
    const subTabs = document.querySelectorAll('.sub-tab');
    subTabs.forEach(subTab => {
        subTab.addEventListener('click', function() {
            // 隱藏所有子內容區域和重置子標籤樣式
            document.querySelectorAll('.sub-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelectorAll('.sub-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            // 顯示選定的子內容並激活子標籤
            const tabId = this.getAttribute('data-subtab');
            document.getElementById(tabId + '-calc').classList.add('active');
            this.classList.add('active');
        });
    });
});

// 通用音效功能
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 產生嗶聲
function generateBeep(frequency, duration, volume) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    oscillator.connect(gainNode);
    
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = volume;
    
    oscillator.start();
    
    setTimeout(() => {
        oscillator.stop();
        oscillator.disconnect();
        gainNode.disconnect();
    }, duration);
}

// 產生水滴聲
function generateDropSound(volume) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 1800;
    
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = 0;
    
    oscillator.connect(gainNode);
    oscillator.start();
    
    // 創建水滴聲效果
    const now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    
    setTimeout(() => {
        oscillator.stop();
        oscillator.disconnect();
        gainNode.disconnect();
    }, 300);
}

// 產生點擊聲
function generateClickSound(volume) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'square';
    oscillator.frequency.value = 800;
    
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = 0;
    
    oscillator.connect(gainNode);
    oscillator.start();
    
    // 創建點擊聲效果
    const now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(volume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    setTimeout(() => {
        oscillator.stop();
        oscillator.disconnect();
        gainNode.disconnect();
    }, 100);
}

// 通用格式化時間函數
function formatTime(date) {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

// 通用補零函數
function padZero(num) {
    return String(num).padStart(2, '0');
}

// Mobile Menu Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu button
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-button';
    menuButton.innerHTML = `
        <span class="icon"></span>
        <span class="icon"></span>
        <span class="icon"></span>
    `;
    document.body.appendChild(menuButton);
    
    // Create mobile menu container
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <span class="close-btn">&times;</span>
        <ul id="mobile-nav-list"></ul>
    `;
    document.body.appendChild(mobileMenu);
    
    // Get the tabs and create mobile menu items
    const tabs = document.querySelectorAll('.tab');
    const mobileNavList = document.getElementById('mobile-nav-list');
    
    tabs.forEach(tab => {
        const tabId = tab.getAttribute('data-tab');
        const tabText = tab.textContent;
        
        const menuItem = document.createElement('li');
        menuItem.innerHTML = `<a href="#" data-mobile-tab="${tabId}">${tabText}</a>`;
        mobileNavList.appendChild(menuItem);
    });
    
    // Toggle mobile menu when button is clicked
    menuButton.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });
    
    // Close mobile menu when the X is clicked
    const closeBtn = mobileMenu.querySelector('.close-btn');
    closeBtn.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
    
    // Handle mobile menu item clicks
    const mobileMenuItems = mobileMenu.querySelectorAll('a[data-mobile-tab]');
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the tab ID
            const tabId = this.getAttribute('data-mobile-tab');
            
            // Hide all content areas and reset tab styles
            document.querySelectorAll('.calculator-content').forEach(content => {
                content.classList.remove('active');
            });
            
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected content and activate tab
            document.getElementById(tabId).classList.add('active');
            document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add('active');
            
            // Close the mobile menu
            mobileMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    });
    
    // Check window size and handle responsive behavior
    function handleResponsiveLayout() {
        const isMobile = window.innerWidth <= 768;
        const tabsContainer = document.querySelector('.tabs');
        
        if (isMobile) {
            tabsContainer.classList.remove('mobile-visible');
        } else {
            // If we're on desktop, ensure the tabs are visible
            tabsContainer.classList.add('mobile-visible');
            // Hide mobile menu on larger screens
            mobileMenu.classList.remove('active');
        }
    }
    
    // Initial check on page load
    handleResponsiveLayout();
    
    // Check again when window is resized
    window.addEventListener('resize', handleResponsiveLayout);
});
