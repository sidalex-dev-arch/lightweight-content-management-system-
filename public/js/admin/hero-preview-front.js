// hero-preview-front.js — Preview the Hero block inside an iframe

document.addEventListener('DOMContentLoaded', function () {
    let currentData = {};

    function updateHeroBlock(incomingData) {
        currentData = { ...incomingData };
             console.log('обьект стилей ',currentData);
        const heroInner = document.querySelector('.hero-inner');
        if (!heroInner) {
            console.warn('Element .hero-inner not found');
            return;
        }

        // Фон
        const bgType = currentData.background_type || 'color';
        heroInner.style.background = '';
        heroInner.style.backgroundImage = '';

        if (bgType === 'color') {
            heroInner.style.backgroundColor = currentData.bg_color || '#114dd8';
        } else if (bgType === 'gradient') {
            heroInner.style.background = currentData.bg_gradient;
        } else if (bgType === 'image' && currentData.bg_image) {
            heroInner.style.backgroundImage = `url(${currentData.bg_image}?t=${Date.now()})`;
            heroInner.style.backgroundSize = 'cover';
            heroInner.style.backgroundPosition = 'center';
        } else if (bgType === 'video' && currentData.bg_video) {
            let video = heroInner.querySelector('.hero-video-bg');
            if (!video) {
                video = document.createElement('video');
                video.className = 'hero-video-bg';
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                video.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:0;';
                heroInner.prepend(video);
            }
            video.innerHTML = `<source src="${currentData.bg_video}?t=${Date.now()}" type="video/mp4">`;
        }

        // Dimensions and indents
        heroInner.style.height = currentData.height || '90vh';
        heroInner.style.paddingTop = currentData.padding_top || '';
        heroInner.style.paddingBottom = currentData.padding_bottom || '';

        // Overlay
        let overlay = heroInner.querySelector('.hero-overlay');
        const opacity = parseFloat(currentData.overlay_opacity) || 0;
        if (opacity > 0) {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'hero-overlay';
                overlay.style.cssText = 'position:absolute; inset:0; z-index:1;';
                heroInner.appendChild(overlay);
            }
            overlay.style.backgroundColor = currentData.overlay_color || '#000000';
            overlay.style.opacity = opacity;
        } else if (overlay) {
            overlay.remove();
        }

        // Content container
        const content = document.querySelector('.container.content');
        if (content) {
            content.style.maxWidth = currentData.content_max_width || '1720px';
            content.style.textAlign = currentData.content_align || 'left';
        }

        const heroBadge = document.querySelector('.hero-badge');
        if (heroBadge) {
            heroBadge.textContent = currentData.badge_text || 'New';
            heroBadge.style.fontSize = currentData.badge_text_size || '';
            heroBadge.style.color = currentData.badge_text_color || '';
            heroBadge.style.fontWeight = currentData.badge_font_weight || '';
            heroBadge.style.top = currentData.badge_top || '';
            heroBadge.style.left = currentData.badge_left || '';
            heroBadge.style.width = currentData.badge_width || '';
            heroBadge.style.height = currentData.badge_height || '';
            heroBadge.style.display = currentData.badge_text ? 'block' : 'none';
        }

        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.textContent = currentData.title || 'Your Title';
            heroTitle.style.fontSize = currentData.title_size || 'clamp(2.8rem, 7vw, 5rem)';
            heroTitle.style.color = currentData.title_text_color || '#000000';
            heroTitle.style.fontWeight = currentData.title_font_weight || 'bold';
            heroTitle.style.top = currentData.title_top || '';
            heroTitle.style.left = currentData.title_left || '';
            heroTitle.style.width = currentData.title_width || '';
            heroTitle.style.height = currentData.title_height || '';
            heroTitle.style.display = currentData.title ? 'block' : 'none';
        }

        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            heroSubtitle.textContent = currentData.subtitle || 'Short description';
            heroSubtitle.style.fontSize = currentData.subtitle_size;
            heroSubtitle.style.color = currentData.subtitle_text_color;
            heroSubtitle.style.fontWeight = currentData.subtitle_font_weight || '';   
            heroSubtitle.style.top = currentData.subtitle_top || '';
            heroSubtitle.style.left = currentData.subtitle_left || '';
            heroSubtitle.style.width = currentData.subtitle_width;
            heroSubtitle.style.height = currentData.subtitle_height;   
            heroSubtitle.style.display = currentData.subtitle ? 'block' : 'none'; 
        }

        const mainImg = document.querySelector('.main-image');
    if (mainImg) {
        if (currentData.main_image) {
            mainImg.src = currentData.main_image + '?t=' + Date.now();
            mainImg.style.display = 'block';
            
            // Basic styles
            mainImg.style.width = currentData.main_image_width || '';
            mainImg.style.height = currentData.main_image_height || '';
            mainImg.style.borderRadius = currentData.main_image_border_radius || '';
            mainImg.style.objectFit = 'cover';
            mainImg.style.position = 'absolute';
            mainImg.style.zIndex = '3';
            
            // Positioning
            mainImg.style.top = currentData.main_image_top || '';
            mainImg.style.left = currentData.main_image_left || '';
        } else {
            mainImg.style.display = 'none';
        }
}


        const primaryBtn = document.querySelector('.button-primary');
        if (primaryBtn) {
            primaryBtn.textContent = currentData.primary_btn_text || 'Start';
            primaryBtn.href = currentData.primary_btn_url || '#';
            primaryBtn.style.backgroundColor = currentData.primary_btn_color || 'yellow';
            primaryBtn.style.color = currentData.primary_btn_text_color || '';
            primaryBtn.style.fontWeight = currentData.primary_btn_text_font_weight || '';
            primaryBtn.style.fontSize = currentData.primary_btn_text_font_size || '';
            primaryBtn.style.borderRadius = currentData.primary_btn_border_radius || '';
            primaryBtn.style.paddingTop = currentData.primary_btn_padding_top || '';
            primaryBtn.style.paddingBottom = currentData.primary_btn_padding_bottom || '';
            primaryBtn.style.paddingLeft = currentData.primary_btn_padding_left || '';
            primaryBtn.style.paddingRight = currentData.primary_btn_padding_right || '';
            primaryBtn.style.top = currentData.primary_btn_top || '';
            primaryBtn.style.left = currentData.primary_btn_left || '';
            primaryBtn.style.display = currentData.primary_btn_text ? 'inline-block' : 'none';
            primaryBtn.style.textDecoration = 'none';
        }

        const secondaryBtn = document.querySelector('.button-secondary');
        if (secondaryBtn) {
            secondaryBtn.textContent = currentData.secondary_btn_text || 'Learn more';
            secondaryBtn.href = currentData.secondary_btn_url || '#';
            secondaryBtn.style.backgroundColor = currentData.secondary_btn_color || 'green';
            secondaryBtn.style.color = currentData.secondary_btn_text_color || '';
            secondaryBtn.style.fontWeight = currentData.secondary_btn_text_font_weight || '';
            secondaryBtn.style.fontSize = currentData.secondary_btn_text_font_size || '';
            secondaryBtn.style.borderRadius = currentData.secondary_btn_border_radius || '';
            secondaryBtn.style.paddingTop = currentData.secondary_btn_padding_top || '';
            secondaryBtn.style.paddingBottom = currentData.secondary_btn_padding_bottom || '';
            secondaryBtn.style.paddingLeft = currentData.secondary_btn_padding_left || '';
            secondaryBtn.style.paddingRight = currentData.secondary_btn_padding_right || '';
            secondaryBtn.style.top = currentData.secondary_btn_top || '';
            secondaryBtn.style.left = currentData.secondary_btn_left || '';
            secondaryBtn.style.display = currentData.secondary_btn_text ? 'inline-block' : 'none';
            secondaryBtn.style.textDecoration = 'none';
        }
    }

    // Initialization - apply defaults only if there is no data
    if (Object.keys(currentData).length === 0) {
        updateHeroBlock({});
    }

    // Listening to messages from the admin panel
    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'updateHeroPreview') {
            console.log('New data received for hero:', event.data.data);
            updateHeroBlock(event.data.data);
        }
    });

    // We inform the admin that the iframe is ready
    window.parent?.postMessage({ type: 'iframeReady' }, '*');
    console.log('Iframe reported: I am ready to receive data');
});