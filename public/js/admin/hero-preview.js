// hero-preview.js — Previewing a hero block in the admin panel

// Global object for storing current hero settings
window.heroPreviewData = {
    min_height: '90vh',
    max_height: '90vh',
    max_width: '1920px',
    padding_top: '',
    padding_bottom: '',
    content_max_width: '1720px',
    content_align: 'left',
    background_type: 'color',
    bg_color: '#0f172a',
    bg_gradient: 'linear-gradient(135deg, #0f172a, #1e293b)',
    bg_image: '',
    bg_video: '',
    overlay_opacity: '0.35',
    overlay_color: '#000000',
    accentColor: '#6366f1',
    extraClass: '',
    badge_text: 'New',
    badge_text_size: '',
    badge_text_color: '',
    badge_font_weight: '',
    badge_margin_top: '',
    badge_margin_bottom: '',
    badge_margin_left: '',
    badge_margin_right: '',
    badge_top: '',
    badge_bottom: '',
    badge_left: '',
    badge_right: '',
    badge_width: '',
    badge_height: '',
    title: 'Your title',
    title_text_color: '#000000',
    title_size: 'clamp(2.8rem, 7vw, 5rem)',
    title_font_weight: 'bold',
    title_margin_top: '',
    title_margin_bottom: '',
    title_margin_left: '',
    title_margin_right: '',
    title_top: '',
    title_bottom: '',
    title_left: '',
    title_right: '',
    title_width: '',
    title_height: '',
    subtitle: 'Short description',
    subtitle_text_color: '#000000',
    subtitle_size: '1.25rem',
    subtitle_margin_top: '',
    subtitle_margin_bottom: '',
    subtitle_margin_left: '',
    subtitle_margin_right: '',
    subtitle_top: '',
    subtitle_bottom: '',
    subtitle_left: '',
    subtitle_right: '',
    subtitle_width: '',
    subtitle_height: '',
    main_image: '',
    main_image_width: '',
    main_image_height: '',
    main_image_border_radius: '',
    main_image_margin_top: '',
    main_image_margin_bottom: '',
    main_image_margin_left: '',
    main_image_margin_right: '',
    main_image_top: '',
    main_image_bottom: '',
    main_image_left: '',
    main_image_right: '',
    primary_btn_text: 'Start',
    primary_btn_url: '#',
    primary_btn_color: '',
    primary_btn_text_color: '',
    primary_btn_text_font_weight: '',
    primary_btn_text_font_size: '',
    primary_btn_padding_top: '',
    primary_btn_padding_bottom: '',
    primary_btn_padding_left: '',
    primary_btn_padding_right: '',
    primary_btn_border_radius: '',
    primary_btn_margin_top: '',
    primary_btn_margin_bottom: '',
    primary_btn_margin_left: '',
    primary_btn_margin_right: '',
    primary_btn_top: '',
    primary_btn_bottom: '',
    primary_btn_left: '',
    primary_btn_right: '',
    primary_btn_width: '',
    primary_btn_height: '',
    secondary_btn_text: 'Learn more',
    secondary_btn_url: '#',
    secondary_btn_color: '',
    secondary_btn_text_color: '',
    secondary_btn_text_font_weight: '',
    secondary_btn_text_font_size: '',
    secondary_btn_padding_top: '',
    secondary_btn_padding_bottom: '',
    secondary_btn_padding_left: '',
    secondary_btn_padding_right: '',
    secondary_btn_border_radius: '',
    secondary_btn_margin_top: '',
    secondary_btn_margin_bottom: '',
    secondary_btn_margin_left: '',
    secondary_btn_margin_right: '',
    secondary_btn_top: '',
    secondary_btn_bottom: '',
    secondary_btn_left: '',
    secondary_btn_right: '',
    secondary_btn_width: '',
    secondary_btn_height: ''
};

// The main function for sending data to an iframe
function sendPreviewDataToIframe() {
    const iframe = document.getElementById('heroPreviewIframe');
    if (!iframe || !iframe.contentWindow) {
        console.warn('Iframe preview not found or not ready');
        return;
    }

    const dataToSend = {
        ...window.heroPreviewData,
        _timestamp: Date.now()
    };

    console.log('[PREVIEW → IFRAME] Sending data:', dataToSend);

    try {
        iframe.contentWindow.postMessage({
            type: 'updateHeroPreview',
            data: dataToSend
        }, '*');
    } catch (e) {
        console.error('[PREVIEW → IFRAME] Error sending data:', e);
    }
}

// Updating data from form fields
function updateHeroPreviewData(newData = {}) {
    // If new data is provided — update the object
    if (Object.keys(newData).length > 0) {
        Object.assign(window.heroPreviewData, newData);
    }

    // Collect all current values from the modal fields
    document.querySelectorAll('#blockFields input, #blockFields select, #blockFields textarea').forEach(el => {
        if (el.id) {
            let value = el.value.trim();
            // If this is a checkbox — convert to true/false
            if (el.type === 'checkbox') {
                value = el.checked;
            }
            window.heroPreviewData[el.id] = value;
        }
    });

    // Send to iframe
    sendPreviewDataToIframe();
}

// Automatic desktop mode when opening the modal
document.getElementById('addBlockModal').addEventListener('shown.bs.modal', function () {
    console.log('Modal opened — setting desktop mode automatically');

    const iframe = document.getElementById('heroPreviewIframe');
    if (!iframe) {
        console.warn('Iframe not found');
        return;
    }

    // Making an iframe full-width (desktop)
    iframe.style.width = '100%';
    iframe.style.maxWidth = 'none';
    iframe.style.height = '100%';
    iframe.style.maxHeight = 'none';
    iframe.style.margin = '0';
    iframe.style.border = 'none';

    // Activate the Desktop button (if it exists)
    document.querySelectorAll('.preview-mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const desktopBtn = document.querySelector('.preview-mode-btn[data-mode="desktop"]');
    if (desktopBtn) {
        desktopBtn.classList.add('active');
    }

    // We immediately send the current data (so that the preview is immediately displayed correctly)
    updateHeroPreviewData();
});

// Switching modes by buttons (keeping as is but improving)
document.querySelectorAll('.preview-mode-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.preview-mode-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const mode = this.dataset.mode;
        const iframe = document.getElementById('heroPreviewIframe');
        if (!iframe) return;

        if (mode === 'desktop') {
            iframe.style.width = '100%';
            iframe.style.margin = '0';
        } else if (mode === 'mobile') {
            iframe.style.width = '375px';
            iframe.style.margin = '0 auto';
        } else if (mode === 'tablet') {
            iframe.style.width = '768px';
            iframe.style.margin = '0 auto';
        }

        // Resend data after mode change
        updateHeroPreviewData();
    });
});

// Connect listeners to all fields in the modal
function connectFieldListeners() {
    const fieldsContainer = document.getElementById('blockFields');
    if (!fieldsContainer) return;

    // React to any changes
    fieldsContainer.addEventListener('input', debounce(updateHeroPreviewData, 300));
    fieldsContainer.addEventListener('change', updateHeroPreviewData);

    console.log('Listeners for modal fields connected');
}

// Simple debounce
function debounce(fn, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            fn(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialization on page load
document.addEventListener('DOMContentLoaded', function () {
    // Connect listeners
    connectFieldListeners();

    // If the modal is already open — start desktop mode
    if (document.getElementById('addBlockModal').classList.contains('show')) {
        updateHeroPreviewData();
    }
});