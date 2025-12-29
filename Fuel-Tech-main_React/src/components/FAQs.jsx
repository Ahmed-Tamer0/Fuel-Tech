import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const FAQs = () => {
    const { t } = useLanguage();

    const faqItems = [
        { q: t('faq1_q'), a: t('faq1_a'), icon: 'bi-question-circle' },
        { q: t('faq2_q'), a: t('faq2_a'), icon: 'bi-shield-check' },
        { q: t('faq3_q'), a: t('faq3_a'), icon: 'bi-cloud-arrow-up' },
        { q: t('faq4_q'), a: t('faq4_a'), icon: 'bi-geo-alt' }
    ];

    return (
        <section className="faqs" id="faqs">
            <h2 className="text-center mb-5">{t('faq_title')}</h2>
            <div className="faqs-grid">
                {faqItems.map((item, i) => (
                    <div key={i} className="faq-card">
                        <h3><i className={`bi ${item.icon}`}></i> <span>{item.q}</span></h3>
                        <p>{item.a}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQs;
