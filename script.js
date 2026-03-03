// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 主题切换功能
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');

    // 检查本地存储中的主题偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');

        // 更新图标
        if (document.body.classList.contains('light-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navbar.style.padding = '15px 0';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.8)';

            if (document.body.classList.contains('light-theme')) {
                navbar.style.backgroundColor = 'rgba(248, 250, 252, 0.8)';
            }
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.backdropFilter = 'none';
            navbar.style.backgroundColor = 'var(--bg-primary)';
        }
    });

    // 平滑滚动导航链接
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 卡片动画效果
    const animatedCards = document.querySelectorAll(
        '.project-card, .skill-category, .award-card, .research-item, .timeline-content'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            }
        });
    }, observerOptions);

    animatedCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });

    // 技能条动画
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillBarObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 300);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillBarObserver.observe(bar);
    });

    // 二维码图片交互效果
    const qrImage = document.querySelector('.qr-image');

    if (qrImage) {
        qrImage.addEventListener('click', function() {
            alert('微信二维码已加载，请使用微信扫描添加好友。');
        });

        qrImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });

        qrImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    }

    // 按钮悬停效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 动态更新版权年份
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = copyrightElement.textContent.replace('2026', currentYear);
    }

    // 标签悬停效果
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.backgroundColor = 'var(--accent-primary)';
            this.style.color = 'var(--bg-primary)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = '';
            this.style.color = '';
        });
    });

    // 控制台欢迎信息
    console.log('%c🔬 刘昊东 · 学术个人主页', 'color: #64ffda; font-size: 18px; font-weight: bold;');
    console.log('%c欢迎访问我的学术主页！', 'color: #57cbff; font-size: 14px;');
    console.log('%c这是一个展示我在太赫兹技术、器件设计与微纳加工领域研究成果的个人页面。', 'color: #a8b2d1;');
    console.log('%c如有学术合作或技术交流意向，欢迎通过页面中的联系方式与我联系。', 'color: #a8b2d1;');
});