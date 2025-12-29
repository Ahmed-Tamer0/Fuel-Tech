import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { t, toggleLanguage, language } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) setScrolled(true);
            else setScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Don't show full navbar on auth pages or request service page if they didn't have it
    // From research, index.html had a navbar, request-service.html had a simplified header with "Back" button.
    const isMainPage = location.pathname === '/';

    if (!isMainPage) {
        return (
            <nav className="navbar navbar-expand-lg fixed-top scrolled">
                <div className="container">
                    <Link className="navbar-brand" to="/">Fuel <span>Tech</span></Link>
                    <div className="d-flex align-items-center ms-auto">
                        <button onClick={toggleLanguage} className="lang-btn border-0 bg-transparent me-2" style={{ fontSize: '1.2rem', color: 'var(--text)' }}>
                            <i className="bi bi-translate"></i>
                        </button>
                        <button onClick={toggleTheme} className="theme-btn border-0 bg-transparent me-2" style={{ fontSize: '1.2rem', color: 'var(--text)' }}>
                            <i className={`bi ${theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars'}`}></i>
                        </button>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <Link className="navbar-brand" to="/">Fuel <span>Tech</span></Link>

                <div className="d-flex align-items-center order-lg-3 ms-3">
                    <button id="language-toggle" onClick={toggleLanguage} className="lang-btn border-0 bg-transparent me-2"
                        style={{ fontSize: '1.2rem', color: 'var(--text)' }}>
                        <i className="bi bi-translate"></i>
                    </button>
                    <button id="theme-toggle" onClick={toggleTheme} className="theme-btn border-0 bg-transparent me-2"
                        style={{ fontSize: '1.2rem', color: 'var(--text)' }}>
                        <i className={`bi ${theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars'}`}></i>
                    </button>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
                    aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="bi bi-list"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                        <li className="nav-item"><Link className="nav-link active" to="/">{t('home')}</Link></li>
                        <li className="nav-item"><a className="nav-link" href="#services">{t('services')}</a></li>
                        <li className="nav-item"><a className="nav-link" href="#faqs">{t('faqs')}</a></li>
                        <li className="nav-item"><a className="nav-link" href="#partners">{t('partners')}</a></li>
                        <li className="nav-item ms-lg-3">
                            <Link to="/request-service" className="btn-nav-cta text-decoration-none">
                                <i className="bi bi-cart4"></i>
                                <span>{t('order_now')}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
