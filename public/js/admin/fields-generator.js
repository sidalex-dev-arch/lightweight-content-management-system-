// fields-generator.js — creating form fields for all block types

function loadBlockFields(type, settings = {}) {
    const fieldsDiv = document.getElementById('blockFields');
    if (!fieldsDiv) {
        console.warn('Container #blockFields not found');
        return;
    }

    fieldsDiv.innerHTML = '';

    const fieldsMap = {
        'hero': [
            {
                group: 'Section (general settings)',
                icon: 'bi bi-layout-text-window-reverse',
                fields: [
                    { name: 'height', label: 'Section height', type: 'text', default: '1000px' },
                    { name: 'padding_top', label: 'Top padding', type: 'text', default: '' },
                    { name: 'padding_bottom', label: 'Bottom padding', type: 'text', default: '' },
                    { name: 'content_max_width', label: 'Max width of content', type: 'text', default: '1920px' },
                    { name: 'content_align', label: 'Content alignment', type: 'select',
                      options: [
                        {value: 'left', label: 'Left'},
                        {value: 'center', label: 'Center'},
                        {value: 'right', label: 'Right'}
                      ],
                      default: 'left' }
                ]
            },
            {
                group: 'Background and overlay',
                icon: 'bi bi-palette',
                fields: [
                    { name: 'background_type', label: 'Background type', type: 'select',
                      options: [
                        {value: 'color', label: 'Solid color'},
                        {value: 'image', label: 'Image'},
                        {value: 'video', label: 'Video'}
                      ],
                      default: 'color' },
                    { name: 'bg_color', label: 'Background color', type: 'color', default: '#f03d10ff' },
                    { name: 'bg_image', label: 'Background image', type: 'image', default: '' },
                    { name: 'bg_video', label: 'Background video (mp4)', type: 'video', default: '' },
                    { name: 'overlay_opacity', label: 'Overlay opacity', type: 'number', default: 0.4, min: 0, max: 1, step: 0.05 },
                    { name: 'overlay_color', label: 'Overlay color', type: 'color', default: '#000000' }
                ]
            },
            {
                group: 'Badge',
                icon: 'bi bi-patch-check',
                fields: [
                    { name: 'badge_text', label: 'Badge text', type: 'text', default: 'Badge' },
                    { name: 'badge_text_size', label: 'Badge text size', type: 'text', default: '' },
                    { name: 'badge_text_color', label: 'Badge text color', type: 'color', default: '#000000' },
                    { name: 'badge_font_weight', label: 'Badge font weight', type: 'select',
                      options: [
                        {value: 'bold', label: 'bold'},
                        {value: 'bolder', label: 'bolder'},
                        {value: 'normal', label: 'normal'},
                        {value: 'light', label: 'light'},
                        {value: 'lighter', label: 'lighter'}
                      ],
                      default: 'bold' },
                    { name: 'badge_top', label: 'Badge top position', type: 'text', default: '10px' },
                    { name: 'badge_left', label: 'Badge left position', type: 'text', default: '10px' },
                    { name: 'badge_width', label: 'Badge width', type: 'text', default: '100px' },
                    { name: 'badge_height', label: 'Badge height', type: 'text', default: '100px' }
                ]
            },
            {
                group: 'Title',
                icon: 'bi bi-type-h1',
                fields: [
                    { name: 'title', label: 'Title text', type: 'text', default: 'Your title' },
                    { name: 'title_size', label: 'Title text size', type: 'text', default: '5rem' },
                    { name: 'title_text_color', label: 'Title text color', type: 'color', default: '#ffffff' },
                    { name: 'title_font_weight', label: 'Title font weight', type: 'select',
                      options: [
                        {value: 'bold', label: 'bold'},
                        {value: 'bolder', label: 'bolder'},
                        {value: 'normal', label: 'normal'},
                        {value: 'light', label: 'light'},
                        {value: 'lighter', label: 'lighter'}
                      ],
                      default: 'bold' },
                    { name: 'title_top', label: 'Title top position', type: 'text', default: '10px' },
                    { name: 'title_left', label: 'Title left position', type: 'text', default: '10px' },
                    { name: 'title_width', label: 'Title width', type: 'text', default: '' },
                    { name: 'title_height', label: 'Title height', type: 'text', default: '' }
                ]
            },
            {
                group: 'Subtitle',
                icon: 'bi bi-type-h2',
                fields: [
                    { name: 'subtitle', label: 'Subtitle text', type: 'text', default: 'Brief description' },
                    { name: 'subtitle_size', label: 'Subtitle text size', type: 'text', default: '1.25rem' },
                    { name: 'subtitle_text_color', label: 'Subtitle text color', type: 'color', default: '#ffffff' },
                    { name: 'subtitle_font_weight', label: 'Subtitle font weight', type: 'select',
                      options: [
                        {value: 'bold', label: 'bold'},
                        {value: 'bolder', label: 'bolder'},
                        {value: 'normal', label: 'normal'},
                        {value: 'light', label: 'light'},
                        {value: 'lighter', label: 'lighter'}
                      ],
                      default: '' },
                    { name: 'subtitle_top', label: 'Subtitle top position', type: 'text', default: '10px' },
                    { name: 'subtitle_left', label: 'Subtitle left position', type: 'text', default: '10px' },
                    { name: 'subtitle_width', label: 'Subtitle width', type: 'text', default: '' },
                    { name: 'subtitle_height', label: 'Subtitle height', type: 'text', default: '' }
                ]
            },
            {
                group: 'Main Image',
                icon: 'bi bi-image',
                fields: [
                    { name: 'main_image', label: 'Main Image', type: 'image', default: '' },
                    { name: 'main_image_width', label: 'Width', type: 'text', default: '' },
                    { name: 'main_image_height', label: 'Height', type: 'text', default: '' },
                    { name: 'main_image_border_radius', label: 'Border Radius', type: 'text', default: '' },
                    { name: 'main_image_top', label: 'Top Position', type: 'text', default: '10px' },
                    { name: 'main_image_left', label: 'Left Position', type: 'text', default: '10px' },
                ]
            },
            {
                group: 'Primary Button',
                icon: 'bi bi-hand-thumbs-up',
                fields: [
                    { name: 'primary_btn_color', label: 'Button Color', type: 'color', default: '' },
                    { name: 'primary_btn_text', label: 'Button Text', type: 'text', default: 'Start' },
                    { name: 'primary_btn_text_font_size', label: 'Text Size', type: 'text', default: '22px' },
                    { name: 'primary_btn_text_color', label: 'Text Color', type: 'color', default: '#000000' },
                    { name: 'primary_btn_text_font_weight', label: 'Font Weight', type: 'select',
                      options: [
                        {value: 'bold', label: 'bold'},
                        {value: 'bolder', label: 'bolder'},
                        {value: 'normal', label: 'normal'},
                        {value: 'light', label: 'light'},
                        {value: 'lighter', label: 'lighter'}
                      ],
                      default: 'bold' },
                    { name: 'primary_btn_padding_top', label: 'Top Padding', type: 'text', default: '10px' },
                    { name: 'primary_btn_padding_bottom', label: 'Bottom Padding', type: 'text', default: '10px' },
                    { name: 'primary_btn_padding_left', label: 'Left Padding', type: 'text', default: '10px' },
                    { name: 'primary_btn_padding_right', label: 'Right Padding', type: 'text', default: '10px' },
                    { name: 'primary_btn_border_radius', label: 'Border Radius', type: 'text', default: '5px' },
                    { name: 'primary_btn_url', label: 'URL', type: 'text', default: '#' },
                    { name: 'primary_btn_top', label: 'Top Position', type: 'text', default: '10px' },
                    { name: 'primary_btn_left', label: 'Left Position', type: 'text', default: '10px' },
                ]
            },
            {
                group: 'Secondary Button',
                icon: 'bi bi-hand-thumbs-up-fill',
                fields: [
                    { name: 'secondary_btn_color', label: 'Button Color', type: 'color', default: '' },
                    { name: 'secondary_btn_text', label: 'Button Text', type: 'text', default: 'Learn More' },
                    { name: 'secondary_btn_text_font_size', label: 'Text Size', type: 'text', default: '22px' },
                    { name: 'secondary_btn_text_color', label: 'Text Color', type: 'color', default: '#000000' },
                    { name: 'secondary_btn_text_font_weight', label: 'Font Weight', type: 'select',
                      options: [
                        {value: 'bold', label: 'bold'},
                        {value: 'bolder', label: 'bolder'},
                        {value: 'normal', label: 'normal'},
                        {value: 'light', label: 'light'},
                        {value: 'lighter', label: 'lighter'}
                      ],
                      default: 'bold' },
                    { name: 'secondary_btn_padding_top', label: 'Top Padding', type: 'text', default: '10px' },
                    { name: 'secondary_btn_padding_bottom', label: 'Bottom Padding', type: 'text', default: '10px' },
                    { name: 'secondary_btn_padding_left', label: 'Left Padding', type: 'text', default: '10px' },
                    { name: 'secondary_btn_padding_right', label: 'Right Padding', type: 'text', default: '10px' },
                    { name: 'secondary_btn_border_radius', label: 'Border Radius', type: 'text', default: '5px' },
                    { name: 'secondary_btn_url', label: 'URL', type: 'text', default: '#' },
                    { name: 'secondary_btn_top', label: 'Top Position', type: 'text', default: '10px' },
                    { name: 'secondary_btn_left', label: 'Left Position', type: 'text', default: '10px' },
                ]
            }
        ],
        'text-content': [
            {name: 'content', label: 'Text', type: 'textarea', default: 'Enter text...'},
            {name: 'background_color', label: 'Background Color', type: 'color', default: '#ffffff'}
        ],
        'image-gallery': [
            {name: 'title', label: 'Gallery Title', type: 'text', default: 'Image Gallery'},
            {name: 'images', label: 'Gallery Images', type: 'images-array', default: []}
        ],
        'contact-form': [
            {name: 'title', label: 'Form Title', type: 'text', default: 'Contact Us'}
        ],
        'footer': [
            {name: 'text', label: 'Footer Text', type: 'text', default: '© 2025 All rights reserved'}
        ],
        'block-grid': [
            {name: 'text', label: 'Header Text', type: 'text', default: 'My Header'},
            {name: 'color', label: 'Text Color', type: 'color', default: '#000000'},
            {name: 'images', label: 'Grid Images', type: 'images-array', default: []},
            {name: 'colsPerRow', label: 'Columns Per Row', type: 'number', default: 4},
        ],
        'block-carusel': [
            {name: 'text', label: 'Header Text', type: 'text', default: 'My Header'},
            {name: 'color', label: 'Text Color', type: 'color', default: '#000000'},
            {name: 'images', label: 'Gallery Images', type: 'images-array', default: []},
            {name: 'colsPerRow', label: 'Columns Per Row', type: 'number', default: 3},
        ]
    };

    const blockGroups = fieldsMap[type] || [];

    blockGroups.forEach(group => {
        const groupHeader = document.createElement('div');
        groupHeader.className = 'd-flex align-items-center mb-3 mt-4';
        groupHeader.innerHTML = `
            <i class="${group.icon || 'bi bi-gear'} me-2 fs-4 text-primary"></i>
            <h5 class="mb-0 fw-bold">${group.group}</h5>
        `;
        fieldsDiv.appendChild(groupHeader);

        group.fields.forEach(field => {
            const wrapper = document.createElement('div');
            wrapper.className = 'mb-3';

            const label = document.createElement('label');
            label.className = 'form-label';
            label.htmlFor = field.name;
            label.textContent = field.label;
            wrapper.appendChild(label);

            let input;
            if (field.type === 'select') {
                input = document.createElement('select');
                input.className = 'form-select';
                field.options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt.value;
                    option.textContent = opt.label;
                    if (settings[field.name] === opt.value || (!settings[field.name] && field.default === opt.value)) {
                        option.selected = true;
                    }
                    input.appendChild(option);
                });
            } else if (field.type === 'color') {
                input = document.createElement('input');
                input.type = 'color';
                input.className = 'form-control w-100';
            } else if (field.type === 'number') {
                input = document.createElement('input');
                input.type = 'number';
                input.className = 'form-control';
                input.min = field.min || 0;
                input.max = field.max || 999;
                input.step = field.step || 1;
            } else if (field.type === 'image') {
                const currentUrl = settings[field.name] || field.default || '';
                wrapper.innerHTML = `
                    <label class="form-label">${field.label}</label>
                    <input type="hidden" id="${field.name}" value="${currentUrl}">
                    <div id="${field.name}-preview" class="mt-2 position-relative" style="max-width: 300px;">
                        ${currentUrl ? `
                            <img src="${currentUrl}" style="max-width:100%; height:auto; object-fit:cover; display:block;">
                            <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0" 
                                    onclick="clearBlockImage('${field.name}')">×</button>
                        ` : '<div class="bg-light p-3 text-center">No image selected</div>'}
                    </div>
                    <button type="button" class="btn btn-primary btn-sm mt-2" 
                            onclick="openBlockImagePicker('${field.name}')">
                        Select / Upload Image
                    </button>
                `;
                fieldsDiv.appendChild(wrapper);
                return;
            } else if (field.type === 'video') {
                const currentUrl = settings[field.name] || field.default || '';
                wrapper.innerHTML = `
                    <label class="form-label">${field.label}</label>
                    <input type="hidden" id="${field.name}" value="${currentUrl}">
                    <div id="${field.name}-preview" class="mt-2 position-relative" style="max-width: 400px;">
                        ${currentUrl ? `
                            <video src="${currentUrl}" controls style="max-width:100%; height:auto; display:block;"></video>
                            <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0" 
                                    onclick="clearBlockImage('${field.name}')">×</button>
                        ` : '<div class="bg-light p-3 text-center">No video selected</div>'}
                    </div>
                    <button type="button" class="btn btn-primary btn-sm mt-2" 
                            onclick="openBlockVideoPicker('${field.name}')">
                        Select / Upload Video
                    </button>
                `;
                fieldsDiv.appendChild(wrapper);
                return;
            } else {
                input = document.createElement('input');
                input.type = 'text';
                input.className = 'form-control';
            }

            if (input) {
                input.id = field.name;
                input.value = settings[field.name] !== undefined ? settings[field.name] : field.default;

                // Live preview update when any hero field is changed
                if (type === 'hero') {
                    input.addEventListener('input', () => {
                        if (typeof updateHeroPreviewData === 'function') {
                            updateHeroPreviewData();
                        }
                    });
                    input.addEventListener('change', () => {
                        if (typeof updateHeroPreviewData === 'function') {
                            updateHeroPreviewData();
                        }
                    });
                }

                wrapper.appendChild(input);
                fieldsDiv.appendChild(wrapper);
            }
        });
    });

    // After the hero fields are fully rendered, a forced preview update is performed.
    if (type === 'hero') {
        setTimeout(() => {
            if (typeof updateHeroPreviewData === 'function') {
                updateHeroPreviewData();
            }
        }, 400);


    setTimeout(function() {
        const iframe = document.getElementById('heroPreviewIframe');
        iframe.onload = function() {
            const script = iframe.contentDocument.createElement('script');
            script.innerHTML = `
                // Simple handler
                console.log('🚀 Hero preview script loaded');
                
                // Notify that we are ready
                if (window.parent) {
                    window.parent.postMessage({
                        type: 'heroPreviewReady',
                        message: 'Ready!'
                    }, '*');
                }
                
                // Update the page
                window.updateHero = function(data) {
                    console.log('Data:', data);
                    // Simple updates for now
                    if (data.title) {
                        document.title = data.title;
                        const h1 = document.querySelector('h1');
                        if (h1) h1.textContent = data.title;
                    }
                };
                
                // Listen for messages
                window.addEventListener('message', function(e) {
                    if (e.data && e.data.type === 'updateHeroPreview') {
                        window.updateHero(e.data.data);
                    }
                });
            `;
            
            iframe.contentDocument.head.appendChild(script);
            setTimeout(function() {
                if (typeof updateHeroPreviewData === 'function') {
                    updateHeroPreviewData();
                }
            }, 100);
        };
        iframe.src = iframe.src.split('?')[0] + '?preview=true&t=' + Date.now();
        
    }, 300);
    }
}