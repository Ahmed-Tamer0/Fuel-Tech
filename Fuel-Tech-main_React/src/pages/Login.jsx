import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

const Login = () => {
    const { t } = useLanguage();

    return (
        <AuthLayout title={t('welcome_back')} subtitle={t('login_subtitle')}>
            <form className="auth-form">
                <div className="input-box-custom mb-3">
                    <label>{t('email_address')}</label>
                    <input type="email" placeholder="email@example.com" required />
                </div>
                <div className="input-box-custom mb-3">
                    <label>{t('password')}</label>
                    <input type="password" placeholder="••••••••" required />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <Link to="/reset-password">{t('forgot_password')}</Link>
                </div>
                <button type="submit" className="btn-auth w-100 mb-3">{t('sign_in')}</button>
                <p className="text-center">
                    {t('no_account')} <Link to="/signup">{t('sign_up')}</Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Login;
