import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Partners = () => {
    const { t } = useLanguage();

    const partnerItems = [
        { name: "Mobil", icon: "bi-fuel-pump" },
        { name: "Shell", icon: "bi-droplet-half" },
        { name: "Taqa", icon: "bi-lightning-charge" },
        { name: "Gas Tech", icon: "bi-fire" }
    ];

    // Duplicate list for seamless marquee loop
    const marqueeItems = [...partnerItems, ...partnerItems, ...partnerItems];

    return (
        <section className="partners" id="partners">
            <h2 className="text-center mb-5">{t('partners_title')}</h2>
            <div className="marquee-container">
                <div className="marquee-content">
                    {marqueeItems.map((item, i) => (
                        <div key={i} className="partner-card-3d">
                            <i className={`bi ${item.icon}`}></i> {item.name}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
