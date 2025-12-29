import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer>
            <div className="footer-col">
                <h3>Fuel Tech</h3>
                <p>{t('leading_tech')}</p>
                <Link to="/request-service" className="btn-footer text-decoration-none">
                    <i className="bi bi-cart4"></i> <span>{t('order_now')}</span>
                </Link>
            </div>
            <div className="footer-col">
                <h3>{t('links')}</h3>
                <Link to="/">{t('home')}</Link>
                <a href="#services">{t('services')}</a>
                <a href="#faqs">{t('faqs')}</a>
                <a href="#partners">{t('partners')}</a>
            </div>
            <div className="footer-col">
                <h3>{t('contact')}</h3>
                <p>Email: info@fueltech.com</p>
                <p>Phone: +1 234 567 890</p>
            </div>
        </footer>
    );
};

export default Footer;
