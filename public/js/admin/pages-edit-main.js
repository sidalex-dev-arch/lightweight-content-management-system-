// pages-edit-main.js — entry point, main events

document.addEventListener('DOMContentLoaded', function() {
    console.log("Admin panel — startup");

    // Block type change event
    document.getElementById('blockType')?.addEventListener('change', function() {
        if (this.value) {
            loadBlockFields(this.value);
        }
    });

    // Save block
    document.getElementById('saveBlockBtn')?.addEventListener('click', function() {
        const type = document.getElementById('blockType')?.value?.trim();
        if (!type) return alert('Select block type');

        const settings = {};
        document.querySelectorAll('#blockFields input, #blockFields select, #blockFields textarea').forEach(el => {
            if (el.id) {
                settings[el.id] = el.type === 'hidden' && el.value.includes('[') 
                    ? JSON.parse(el.value || '[]') 
                    : (el.value?.trim() || '');
            }
        });

        if (editingIndex === -1) {
            blocks.push({ type, settings });
        } else {
            blocks[editingIndex] = { type, settings };
            editingIndex = -1;
        }

        renderBlocksList();
        bootstrap.Modal.getInstance(document.getElementById('addBlockModal'))?.hide();

        if (type === 'hero') {
            updateHeroPreviewData(settings);
        }
    });

    // Initialization
    renderBlocksList();

    console.log("Admin panel ready");
});