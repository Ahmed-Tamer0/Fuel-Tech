function applyLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'tel' || el.type === 'email' || el.type === 'password')) {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if (lang === 'ar') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
    localStorage.setItem('language', lang);

    // Broadcast change for local scripts
    const event = new CustomEvent('languageChanged', { detail: { language: lang } });
    document.dispatchEvent(event);
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', theme);

    // Update theme icons if they exist
    const themeIcons = document.querySelectorAll('#theme-toggle i');
    themeIcons.forEach(icon => {
        if (theme === 'dark') {
            icon.classList.replace("bi-moon-stars", "bi-sun-fill");
            icon.classList.replace("fa-moon", "fa-sun");
        } else {
            icon.classList.replace("bi-sun-fill", "bi-moon-stars");
            icon.classList.replace("fa-sun", "fa-moon");
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Load saved settings
    const savedLang = localStorage.getItem('language') || 'en';
    const savedTheme = localStorage.getItem('theme') || 'dark';

    applyLanguage(savedLang);
    applyTheme(savedTheme);

    // Language Toggle Listener
    const langToggle = document.getElementById('language-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = localStorage.getItem('language') || 'en';
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            applyLanguage(newLang);
        });
    }

    // Theme Toggle Listener
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }
});
