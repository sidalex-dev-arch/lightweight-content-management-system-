// media-picker.js — working with selecting, loading, and clearing media

window.currentBlockMediaField = null;

document.getElementById('blockImagePickerModal')?.addEventListener('show.bs.modal', function () {
    document.activeElement?.blur();
});

window.openBlockImagePicker = function(fieldName) {
    window.currentBlockMediaField = fieldName;
    document.getElementById('blockUploadFile').accept = 'image/*';
    document.querySelector('#blockImagePickerModal .modal-title').textContent = 'Select or upload an image';
    new bootstrap.Modal(document.getElementById('blockImagePickerModal')).show();
};

window.openBlockVideoPicker = function(fieldName) {
    window.currentBlockMediaField = fieldName;
    document.getElementById('blockUploadFile').accept = 'video/mp4,video/webm';
    document.querySelector('#blockImagePickerModal .modal-title').textContent = 'Select or upload a video (mp4, webm)';
    new bootstrap.Modal(document.getElementById('blockImagePickerModal')).show();
};

window.clearBlockImage = function(fieldName) {
    const input = document.getElementById(fieldName);
    const preview = document.getElementById(fieldName + '-preview');
    if (input) input.value = '';
    if (preview) {
        preview.innerHTML = '<div class="bg-light p-3 text-center">Not selected</div>';
    }

    // If this is an important hero field — update the preview
    if (['bg_image', 'bg_video', 'main_image'].includes(fieldName)) {
        if (typeof updateHeroPreviewData === 'function') {
            updateHeroPreviewData();
        }
    }
};

window.addGalleryImage = function(fieldName) {
    window.currentBlockMediaField = fieldName;
    document.getElementById('blockUploadFile').accept = 'image/*';
    document.querySelector('#blockImagePickerModal .modal-title').textContent = 'Select or upload an image';
    new bootstrap.Modal(document.getElementById('blockImagePickerModal')).show();
};

window.removeGalleryImage = function(fieldName, index) {
    if (!confirm('Delete image?')) return;

    const hiddenInput = document.getElementById(fieldName);
    let images = JSON.parse(hiddenInput.value || '[]');
    images.splice(index, 1);
    hiddenInput.value = JSON.stringify(images);

    const listDiv = document.getElementById(fieldName + '-list');
    if (listDiv) {
        listDiv.innerHTML = images.map((url, idx) => `
            <div class="col-4 mb-3 position-relative">
                <img src="${url}" style="max-width:100%; height:auto; object-fit:cover;">
                <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0" 
                        onclick="removeGalleryImage('${fieldName}', ${idx})">×</button>
            </div>
        `).join('');
    }
};

// Search through the list of images
document.getElementById('blockImageSearch')?.addEventListener('keyup', function() {
    const term = this.value.toLowerCase();
    document.querySelectorAll('.block-image-item').forEach(item => {
        item.style.display = item.dataset.name.toLowerCase().includes(term) ? '' : 'none';
    });
});

// Select image by clicking
document.addEventListener('click', function(e) {
    const item = e.target.closest('.block-image-item');
    if (item) {
        document.querySelectorAll('.block-image-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const previewImg = document.getElementById('blockImagePreview');
        if (previewImg) {
            previewImg.src = item.dataset.preview;
            previewImg.style.display = 'block';
        }
    }
});

// The "Select" button in the image modal
document.getElementById('blockSelectImage')?.addEventListener('click', function() {
    const selected = document.querySelector('.block-image-item.active');
    if (!selected) return alert('Select an item');

    const url = selected.dataset.url;

    if (window.currentBlockMediaField) {
        const input = document.getElementById(window.currentBlockMediaField);
        if (input && input.id.includes('images')) {
            // Gallery  
            let images = JSON.parse(input.value || '[]');
            images.push(url);
            input.value = JSON.stringify(images);

            const listDiv = document.getElementById(window.currentBlockMediaField + '-list');
            if (listDiv) {
                listDiv.innerHTML += `
                    <div class="col-4 mb-3 position-relative">
                        <img src="${url}" style="max-width:100%; height:auto; object-fit:cover;">
                        <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0" 
                                onclick="removeGalleryImage('${window.currentBlockMediaField}', ${images.length - 1})">×</button>
                    </div>
                `;
            }
        } else {
            // Single image/video
            input.value = url;
            const previewDiv = document.getElementById(window.currentBlockMediaField + '-preview');
            if (previewDiv) {
                const isVideo = url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm');
                previewDiv.innerHTML = isVideo 
                    ? `<video src="${url}" controls style="max-width:100%; height:auto; display:block;"></video>`
                    : `<img src="${url}" style="max-width:100%; height:auto; object-fit:cover; display:block;">`;
                previewDiv.innerHTML += `<button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0" 
                                               onclick="clearBlockImage('${window.currentBlockMediaField}')">×</button>`;
            }

            // Update the hero preview, if this is an important field
            if (['main_image', 'bg_image', 'bg_video'].includes(window.currentBlockMediaField)) {
                if (typeof updateHeroPreviewData === 'function') {
                    updateHeroPreviewData();
                }
            }
        }
    }

    bootstrap.Modal.getInstance(document.getElementById('blockImagePickerModal')).hide();
});

// Uploading a new file
document.getElementById('blockUploadBtn')?.addEventListener('click', function() {
    const fileInput = document.getElementById('blockUploadFile');
    const file = fileInput?.files[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const uploadUrl = isVideo ? '/upload-video' : '/admin/pages/upload-image';

    const spinner = document.getElementById('blockUploadSpinner');
    if (spinner) spinner.classList.remove('d-none');

    const formData = new FormData();
    formData.append('file', file);

    fetch(uploadUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (spinner) spinner.classList.add('d-none');

        if (data.success) {
            const li = document.createElement('li');
            li.className = 'list-group-item block-image-item active';
            li.dataset.url = data.url;
            li.dataset.preview = data.url;
            li.dataset.name = file.name;
            li.textContent = file.name;
            document.getElementById('blockImageList')?.prepend(li);

            const previewImg = document.getElementById('blockImagePreview');
            if (previewImg) {
                previewImg.src = data.url;
                previewImg.style.display = 'block';
            }

            if (window.currentBlockMediaField) {
                const input = document.getElementById(window.currentBlockMediaField);
                if (input && input.id.includes('images')) {
                    let images = JSON.parse(input.value || '[]');
                    images.push(data.url);
                    input.value = JSON.stringify(images);

                    const listDiv = document.getElementById(window.currentBlockMediaField + '-list');
                    if (listDiv) {
                        listDiv.innerHTML += `
                            <div class="col-4 mb-3 position-relative">
                                <img src="${data.url}" style="max-width:100%; height:auto; object-fit:cover;">
                                <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0" 
                                        onclick="removeGalleryImage('${window.currentBlockMediaField}', ${images.length - 1})">×</button>
                            </div>
                        `;
                    }
                } else {
                    input.value = data.url;
                    const previewDiv = document.getElementById(window.currentBlockMediaField + '-preview');
                    if (previewDiv) {
                        previewDiv.innerHTML = isVideo
                            ? `<video src="${data.url}" controls style="max-width:100%;"></video>`
                            : `<img src="${data.url}" style="max-width:100%;">`;
                        previewDiv.innerHTML += `<button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0" 
                                                       onclick="clearBlockImage('${window.currentBlockMediaField}')">×</button>`;
                    }
                }

                // Update the hero preview after upload
                if (['main_image', 'bg_image', 'bg_video'].includes(window.currentBlockMediaField)) {
                    if (typeof updateHeroPreviewData === 'function') {
                        updateHeroPreviewData();
                    }
                }
            }
        } else {
            alert('Error uploading: ' + (data.message || 'unknown error'));
        }
    })
    .catch(err => {
        console.error('Error uploading:', err);
        if (spinner) spinner.classList.add('d-none');
        alert('Server error during upload');
    });
});