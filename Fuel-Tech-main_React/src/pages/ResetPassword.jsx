import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

const ResetPassword = () => {
    const { t } = useLanguage();

    return (
        <AuthLayout title={t('reset_password')} subtitle={t('reset_subtitle')}>
            <form className="auth-form">
                <div className="input-box-custom mb-4">
                    <label>{t('email_address')}</label>
                    <input type="email" placeholder="email@example.com" required />
                </div>
                <button type="submit" className="btn-auth w-100 mb-3">{t('send_reset')}</button>
                <div className="text-center">
                    <Link to="/login" className="back-to-login">
                        <i className="fa-solid fa-arrow-left me-2"></i> {t('back_to_login')}
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default ResetPassword;
