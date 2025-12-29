import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

const Signup = () => {
    const { t } = useLanguage();

    return (
        <AuthLayout title={t('create_account')} subtitle={t('join_today')}>
            <form className="auth-form">
                <div className="input-box-custom mb-3">
                    <label>{t('full_name')}</label>
                    <input type="text" placeholder="John Doe" required />
                </div>
                <div className="input-box-custom mb-3">
                    <label>{t('email_address')}</label>
                    <input type="email" placeholder="email@example.com" required />
                </div>
                <div className="input-box-custom mb-3">
                    <label>{t('password')}</label>
                    <input type="password" placeholder="••••••••" required />
                </div>
                <div className="input-box-custom mb-4">
                    <label>{t('confirm_password')}</label>
                    <input type="password" placeholder="••••••••" required />
                </div>
                <button type="submit" className="btn-auth w-100 mb-3">{t('sign_up')}</button>
                <p className="text-center">
                    {t('have_account')} <Link to="/login">{t('sign_in')}</Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Signup;
