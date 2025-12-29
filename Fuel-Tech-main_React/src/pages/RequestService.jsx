import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import '../styles/service-request.css';

const RequestService = () => {
    const { t, language } = useLanguage();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        cartype: '',
        carmodel: '',
        services: [],
        problems: [],
        fuelType: 'Gasoline 80',
        location: '',
        files: {
            front_face: null,
            back_face: null,
            issue_photo: null
        }
    });

    const [activeTab, setActiveTab] = useState('regular-services');
    const [detecting, setDetecting] = useState(false);
    const [detected, setDetected] = useState(false);

    const totalSteps = 4;
    const progress = (step / totalSteps) * 100;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e, type) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const list = [...prev[type]];
            if (checked) {
                if (!list.includes(value)) list.push(value);
            } else {
                const index = list.indexOf(value);
                if (index > -1) list.splice(index, 1);
            }
            return { ...prev, [type]: list };
        });
    };

    const handleFileChange = (e, key) => {
        if (e.target.files.length > 0) {
            setFormData(prev => ({
                ...prev,
                files: { ...prev.files, [key]: e.target.files[0] }
            }));
        }
    };

    const nextStep = () => {
        if (validateStep()) {
            setStep(prev => Math.min(prev + 1, totalSteps));
        }
    };

    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const validateStep = () => {
        if (step === 1) {
            return formData.name && formData.phone && formData.cartype && formData.carmodel;
        }
        if (step === 2) {
            if (formData.services.length === 0 && formData.problems.length === 0) {
                alert('Please select at least one service or issue.');
                return false;
            }
        }
        if (step === 3) {
            return formData.files.front_face && formData.files.back_face;
        }
        return true;
    };

    const handleDetectLocation = () => {
        if (navigator.geolocation) {
            setDetecting(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setFormData(prev => ({ ...prev, location: `Lat: ${latitude.toFixed(5)}, Long: ${longitude.toFixed(5)}` }));
                    setDetecting(false);
                    setDetected(true);
                },
                (error) => {
                    console.error(error);
                    setDetecting(false);
                    alert(t('location_error'));
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className="request-service-page">
            <div className="background-animation"></div>
            <div className="main-container pt-5 mt-5">
                <header className="header px-4">
                    <Link to="/" className="back-btn text-decoration-none">
                        <i className="fa-solid fa-arrow-left"></i> <span>{t('back')}</span>
                    </Link>
                </header>

                <div className="wizard-container mx-auto mt-4 px-3" style={{ maxWidth: '800px' }}>
                    {/* Speedometer for Progress */}
                    <div className="speedometer-wrapper">
                        <div className="speedometer">
                            <svg viewBox="0 0 350 350">
                                <circle className="ring-bg" cx="175" cy="175" r="140" strokeDasharray="440 880"
                                    strokeDashoffset="-220"></circle>
                                <circle id="speedRing" className="ring-active" cx="175" cy="175" r="140" strokeDasharray="440 880"
                                    strokeDashoffset={440 - (progress * 4.4)}></circle>
                            </svg>
                            <div className="needle-wrapper" style={{ transform: `translate(-50%, -50%) rotate(${-120 + (progress * 2.4)}deg)` }}>
                                <div className="needle"></div>
                            </div>
                            <div className="center-knob"></div>
                            <div className="speed-info">
                                <span className="speed-value text-white">{Math.round(progress)}</span>
                                <span className="speed-unit" style={{ color: '#64748b' }}>{t('progress_percent')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar Indicators */}
                    <div className="progress-bar-container mt-5">
                        {[1, 2, 3, 4].map(num => (
                            <React.Fragment key={num}>
                                <div className={`step-indicator ${step >= num ? 'active' : ''}`}>
                                    <div className="circle">
                                        {step > num ? <i className="fa-solid fa-check"></i> : num}
                                    </div>
                                    <span>{t(['info', 'service', 'details', 'confirm'][num - 1])}</span>
                                </div>
                                {num < 4 && <div className="line"></div>}
                            </React.Fragment>
                        ))}
                    </div>

                    <form className="mt-4 pb-5">
                        {/* Step 1 */}
                        {step === 1 && (
                            <div className="form-step active">
                                <h2 className="text-center">{t('step1_title')}</h2>
                                <p className="subtitle text-center">{t('step1_subtitle')}</p>
                                <div className="input-group-custom">
                                    <div className="input-box">
                                        <label>{t('your_name')}</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required />
                                    </div>
                                    <div className="input-box">
                                        <label>{t('phone_number')}</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="01xxxxxxxxx" required />
                                    </div>
                                </div>
                                <div className="input-group-custom">
                                    <div className="input-box">
                                        <label>{t('car_type')}</label>
                                        <input type="text" name="cartype" value={formData.cartype} onChange={handleInputChange} placeholder="e.g. Sedan, SUV" required />
                                    </div>
                                    <div className="input-box">
                                        <label>{t('car_model')}</label>
                                        <input type="text" name="carmodel" value={formData.carmodel} onChange={handleInputChange} placeholder="e.g. Toyota Corolla 2022" required />
                                    </div>
                                </div>
                                <div className="btn-group single-right mt-4">
                                    <button type="button" className="btn-next" onClick={nextStep}>
                                        <span>{t('next_step')}</span> <i className="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2 */}
                        {step === 2 && (
                            <div className="form-step active">
                                <h2 className="text-center">{t('step2_title')}</h2>
                                <p className="subtitle text-center">{t('step2_subtitle')}</p>
                                <div className="services-toggle-container mx-auto">
                                    <div className={`toggle-option ${activeTab === 'regular-services' ? 'active' : ''}`} onClick={() => setActiveTab('regular-services')}>{t('regular_services')}</div>
                                    <div className={`toggle-option ${activeTab === 'issues-services' ? 'active' : ''}`} onClick={() => setActiveTab('issues-services')}>{t('breakdown_issues')}</div>
                                </div>

                                {activeTab === 'regular-services' && (
                                    <div className="services-grid active mt-4">
                                        {['Fuel', 'Car Wash', 'Tires', 'Rescue', 'Engine Oil', 'Battery', 'Maintenance', 'Engine Check'].map(svc => (
                                            <label key={svc} className={`service-card ${formData.services.includes(svc) ? 'selected' : ''}`}>
                                                <input type="checkbox" checked={formData.services.includes(svc)} onChange={(e) => handleCheckboxChange(e, 'services')} value={svc} />
                                                <div className="card-content">
                                                    <i className={`fa-solid ${svc === 'Fuel' ? 'fa-gas-pump' : svc === 'Car Wash' ? 'fa-soap' : svc === 'Tires' ? 'fa-life-ring' : svc === 'Rescue' ? 'fa-truck-pickup' : svc === 'Engine Oil' ? 'fa-oil-can' : svc === 'Battery' ? 'fa-car-battery' : svc === 'Maintenance' ? 'fa-wrench' : 'fa-stethoscope'}`}></i>
                                                    <span>{t('service_' + svc.toLowerCase().replace(' ', '_'))}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {formData.services.includes('Fuel') && activeTab === 'regular-services' && (
                                    <div className="fuel-options mt-4">
                                        <h4>{t('select_fuel_type')}</h4>
                                        <div className="radio-group-custom">
                                            {['Gasoline 80', 'Gasoline 92', 'Gasoline 95', 'Natural Gas'].map(fuel => (
                                                <label key={fuel} className="radio-card">
                                                    <input type="radio" name="fuelType" value={fuel} checked={formData.fuelType === fuel} onChange={handleInputChange} />
                                                    <span>{t(fuel.toLowerCase().replace(' ', '_'))}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'issues-services' && (
                                    <div className="services-grid active mt-4">
                                        {['Won\'t Start', 'Battery', 'Overheating', 'Flat Tire', 'Brake Issue', 'Other'].map(issue => (
                                            <label key={issue} className={`service-card issue ${formData.problems.includes(issue) ? 'selected' : ''}`}>
                                                <input type="checkbox" checked={formData.problems.includes(issue)} onChange={(e) => handleCheckboxChange(e, 'problems')} value={issue} />
                                                <div className="card-content">
                                                    <i className={`fa-solid ${issue === 'Won\'t Start' ? 'fa-power-off' : issue === 'Battery' ? 'fa-car-burst' : issue === 'Overheating' ? 'fa-temperature-arrow-up' : issue === 'Flat Tire' ? 'fa-compact-disc' : issue === 'Brake Issue' ? 'fa-triangle-exclamation' : 'fa-question'}`}></i>
                                                    <span>{t('issue_' + issue.toLowerCase().replace(' ', '_').replace("'", ""))}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                <div className="btn-group mt-4">
                                    <button type="button" className="btn-prev" onClick={prevStep}><i className="fa-solid fa-arrow-left"></i> {t('prev_step')}</button>
                                    <button type="button" className="btn-next" onClick={nextStep}>{t('next_step')} <i className="fa-solid fa-arrow-right"></i></button>
                                </div>
                            </div>
                        )}

                        {/* Step 3 */}
                        {step === 3 && (
                            <div className="form-step active">
                                <h2 className="text-center">{t('step3_title')}</h2>
                                <p className="subtitle text-center">{t('step3_subtitle')}</p>
                                <div className="upload-split mt-4">
                                    <div className="upload-box">
                                        <label>{t('id_front')}</label>
                                        <div className={`file-input-wrapper-custom ${formData.files.front_face ? 'file-uploaded' : ''}`}>
                                            <input type="file" onChange={(e) => handleFileChange(e, 'front_face')} accept="image/*" required />
                                            <div className="upload-ui">
                                                <i className={`fa-solid ${formData.files.front_face ? 'fa-check' : 'fa-id-card'}`}></i>
                                                <span>{formData.files.front_face ? formData.files.front_face.name : t('upload_front')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="upload-box">
                                        <label>{t('id_back')}</label>
                                        <div className={`file-input-wrapper-custom ${formData.files.back_face ? 'file-uploaded' : ''}`}>
                                            <input type="file" onChange={(e) => handleFileChange(e, 'back_face')} accept="image/*" required />
                                            <div className="upload-ui">
                                                <i className={`fa-solid ${formData.files.back_face ? 'fa-check' : 'fa-id-card'}`}></i>
                                                <span>{formData.files.back_face ? formData.files.back_face.name : t('upload_back')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="upload-box full-width-upload mt-4">
                                    <label>{t('breakdown_photo')}</label>
                                    <div className={`file-input-wrapper-custom ${formData.files.issue_photo ? 'file-uploaded' : ''}`}>
                                        <input type="file" onChange={(e) => handleFileChange(e, 'issue_photo')} accept="image/*" />
                                        <div className="upload-ui">
                                            <i className={`fa-solid ${formData.files.issue_photo ? 'fa-check' : 'fa-camera'}`}></i>
                                            <span>{formData.files.issue_photo ? formData.files.issue_photo.name : t('upload_car_photo')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="btn-group mt-4">
                                    <button type="button" className="btn-prev" onClick={prevStep}><i className="fa-solid fa-arrow-left"></i> {t('prev_step')}</button>
                                    <button type="button" className="btn-next" onClick={nextStep}>{t('next_step')} <i className="fa-solid fa-arrow-right"></i></button>
                                </div>
                            </div>
                        )}

                        {/* Step 4 */}
                        {step === 4 && (
                            <div className="form-step active">
                                <h2 className="text-center">{t('step4_title')}</h2>
                                <p className="subtitle text-center">{t('step4_subtitle')}</p>
                                <div className="location-box mt-4">
                                    <div className="input-box full-width">
                                        <label>{t('current_location')}</label>
                                        <div className="location-input-wrapper-custom">
                                            <input type="text" readOnly value={formData.location} placeholder={t('location_placeholder')} required />
                                            <button type="button" className="loc-btn-custom" onClick={handleDetectLocation}>
                                                <i className={`fa-solid ${detecting ? 'fa-spinner fa-spin' : detected ? 'fa-check' : 'fa-location-crosshairs'}`}></i> <span>{detected ? t('detected') : t('detect')}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="summary-preview mt-4 text-center">
                                    <p>{t('terms_agree')}</p>
                                </div>
                                <div className="btn-group mt-4">
                                    <button type="button" className="btn-prev" onClick={prevStep}><i className="fa-solid fa-arrow-left"></i> {t('prev_step')}</button>
                                    <button type="submit" className="submit-btn-final">{t('submit_request')} <i className="fa-solid fa-paper-plane"></i></button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RequestService;
