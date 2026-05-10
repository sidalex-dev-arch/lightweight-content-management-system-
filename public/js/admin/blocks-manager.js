
// blocks-manager.js — managing the list of blocks on a page

let blocks = [];
let editingIndex = -1;

try {
    blocks = JSON.parse(document.getElementById('blocksInput')?.value || '[]');
} catch (e) {
    blocks = [];
    console.warn('Failed to parse blocksInput, empty array set');
}

function renderBlocksList() {
    const list = document.getElementById('blocksList');
    if (!list) return;

    list.innerHTML = '';
    blocks.forEach((block, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span><strong>${block.type}</strong> (settings: ${Object.keys(block.settings || {}).length})</span>
            <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-primary" onclick="editBlock(${index})">
                    <i class="bi bi-pencil"></i> Edit
                </button>
                <button type="button" class="btn btn-outline-danger" onclick="removeBlock(${index})">
                    <i class="bi bi-trash"></i> Delete
                </button>
            </div>
        `;
        list.appendChild(li);
    });
    document.getElementById('blocksInput').value = JSON.stringify(blocks);
}

window.editBlock = function(index) {
    editingIndex = index;
    const block = blocks[index];
    if (!block) return;

    const typeSelect = document.getElementById('blockType');
    if (typeSelect) typeSelect.value = block.type;

    if (typeof loadBlockFields === 'function') {
        loadBlockFields(block.type, block.settings || {});
    }

    if (block.type === 'hero' && block.settings && typeof updateHeroPreviewData === 'function') {
        updateHeroPreviewData(block.settings);
    }

    const modal = new bootstrap.Modal(document.getElementById('addBlockModal'));
    modal.show();
};

window.removeBlock = function(index) {
    if (!confirm('Delete block?')) return;
    blocks.splice(index, 1);
    renderBlocksList();
};

// Initializing the list on load (called from main)
window.addEventListener('load', () => {
    renderBlocksList();
});