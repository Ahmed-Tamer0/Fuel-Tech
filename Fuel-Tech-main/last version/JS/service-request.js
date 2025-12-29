document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('serviceRequestForm');
    const steps = document.querySelectorAll('.form-step');
    const indicators = document.querySelectorAll('.step-indicator');
    const btnNext = document.querySelectorAll('.btn-next');
    const btnPrev = document.querySelectorAll('.btn-prev');

    let currentStep = 1;
    const totalSteps = steps.length;

    // --- Navigation ---

    function updateSteps() {
        // Update Forms
        steps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.id.split('-')[1]) === currentStep) {
                step.classList.add('active');
            }
        });

        // Update Indicators
        indicators.forEach(ind => {
            const stepNum = parseInt(ind.dataset.step);
            ind.classList.remove('active');
            const circle = ind.querySelector('.circle');

            if (stepNum <= currentStep) {
                ind.classList.add('active');
                if (stepNum < currentStep) {
                    circle.innerHTML = '<i class="fa-solid fa-check"></i>';
                } else {
                    circle.textContent = stepNum;
                }
            } else {
                circle.textContent = stepNum;
            }
        });

        // Update Speedometer
        updateSpeedometer();
    }

    function updateSpeedometer() {
        const progress = (currentStep / totalSteps) * 100;
        const needle = document.getElementById('speedNeedleWrapper');
        const ring = document.getElementById('speedRing');
        const valueDisplay = document.getElementById('speedValue');

        // Needle rotation: -120deg to 120deg
        const rotation = -120 + (progress * 2.4);
        needle.style.transform = `rotate(${rotation}deg)`;

        // Ring offset: 440 (0%) to 0 (100%)
        // The stroke-dasharray is "440 880", so offset 440 is empty, 0 is full
        const offset = 440 - (progress * 4.4);
        ring.style.strokeDashoffset = offset;

        // Text value animation
        let start = parseInt(valueDisplay.textContent) || 0;
        const end = Math.round(progress);
        const duration = 800;

        if (start === end) {
            valueDisplay.textContent = end;
            return;
        }

        const stepTime = Math.abs(Math.floor(duration / (end - start)));
        const timer = setInterval(() => {
            if (start < end) start++;
            else if (start > end) start--;
            valueDisplay.textContent = start;
            if (start === end) clearInterval(timer);
        }, Math.max(stepTime, 10));
    }

    // Initialize state
    updateSteps();

    btnNext.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                if (currentStep < totalSteps) {
                    currentStep++;
                    updateSteps();
                }
            }
        });
    });

    btnPrev.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateSteps();
            }
        });
    });

    // --- Validation ---

    function validateStep(step) {
        let isValid = true;
        const currentStepEl = document.getElementById(`step-${step}`);
        const inputs = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');

        inputs.forEach(input => {
            // Reset errors
            setError(input, '');

            if (!input.checkValidity()) {
                isValid = false;
                // Custom messages
                if (input.validity.valueMissing) {
                    setError(input, 'This field is required');
                } else if (input.validity.patternMismatch) {
                    setError(input, 'Invalid format');
                } else {
                    setError(input, input.validationMessage);
                }
            }
        });

        // Specific Step 2 Validation (At least one service selected)
        if (step === 2) {
            const checkedServices = currentStepEl.querySelectorAll('input[type="checkbox"]:checked');
            if (checkedServices.length === 0) {
                isValid = false;
                alert('Please select at least one service or issue.');
            }
        }

        return isValid;
    }

    function setError(input, message) {
        const errorSpan = input.parentElement.querySelector('.error-msg');
        if (errorSpan) {
            errorSpan.textContent = message;
        }
        if (message) {
            input.style.borderColor = 'var(--error-color)';
        } else {
            input.style.borderColor = 'var(--border-color)';
        }
    }

    // --- Service Toggles (Step 2) ---
    const toggleOptions = document.querySelectorAll('.toggle-option');
    const serviceGrids = document.querySelectorAll('.services-grid');

    toggleOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            // UI Toggle
            toggleOptions.forEach(t => t.classList.remove('active'));
            opt.classList.add('active');

            // View Toggle
            const targetId = opt.dataset.target;
            serviceGrids.forEach(grid => {
                if (grid.id === targetId) {
                    grid.classList.add('active');
                } else {
                    grid.classList.remove('active');
                }
            });
        });
    });

    // --- Fuel Option Visibility ---
    const fuelCheck = document.getElementById('fuel-check');
    const fuelOptions = document.getElementById('fuel-options-container');

    if (fuelCheck) {
        fuelCheck.addEventListener('change', () => {
            if (fuelCheck.checked) {
                fuelOptions.classList.remove('hidden');
            } else {
                fuelOptions.classList.add('hidden');
            }
        });
    }

    // --- File Upload Previews ---
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const wrapper = input.parentElement;
                wrapper.classList.add('file-uploaded');
                const uiText = wrapper.querySelector('.upload-ui span');
                const uiIcon = wrapper.querySelector('.upload-ui i');

                uiText.textContent = e.target.files[0].name;
                uiIcon.className = 'fa-solid fa-check';
            }
        });
    });

    // --- Geolocation ---
    const locBtn = document.getElementById('get-location-btn');
    const locInput = document.getElementById('location');

    if (locBtn) {
        locBtn.addEventListener('click', () => {
            if (navigator.geolocation) {
                locInput.placeholder = translations[document.documentElement.lang]?.locating || "Locating...";
                locBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        locInput.value = `Lat: ${latitude.toFixed(5)}, Long: ${longitude.toFixed(5)}`;
                        locBtn.innerHTML = `<i class="fa-solid fa-check"></i> ${translations[document.documentElement.lang]?.detected || 'Detected'}`;
                        locBtn.style.color = '#10b981';
                    },
                    (error) => {
                        locInput.placeholder = translations[document.documentElement.lang]?.location_error || "Error detecting location";
                        locBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
                        console.error(error);
                    }
                );
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        });
    }

    // --- Dynamic Support for Language Changes ---
    document.addEventListener('languageChanged', (e) => {
        // Refresh items that aren't purely data-i18n driven if any
        if (locInput.value === "") {
            locInput.placeholder = translations[e.detail.language]?.location_placeholder || locInput.placeholder;
        }
    });
});
