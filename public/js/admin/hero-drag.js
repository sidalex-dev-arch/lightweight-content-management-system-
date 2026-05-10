// hero-drag.js

// ===== DRAG & DROP LOGIC =====
let draggedElement = null;
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// Function for determining the element type by classes
function getElementType(element) {
    if (element.classList.contains('hero-badge')) return 'badge';
    if (element.classList.contains('hero-title')) return 'title';
    if (element.classList.contains('hero-subtitle')) return 'subtitle';
    if (element.classList.contains('main-image')) return 'main_image';
    if (element.classList.contains('button-primary')) return 'primary_btn';
    if (element.classList.contains('button-secondary')) return 'secondary_btn';
    return null;
}

// Function for updating form fields
function updateFormFields(elementType, left, top) {
    const leftField = document.getElementById(elementType + '_left');
    const topField = document.getElementById(elementType + '_top');
    
    if (leftField) {
        leftField.value = left;
        leftField.dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (topField) {
        topField.value = top;
        topField.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Function for updating hero preview data
    if (typeof updateHeroPreviewData === 'function') {
        updateHeroPreviewData();
    }
}

// Listening to messages from iframes
window.addEventListener('message', function(event) {
    // If coordinates came from drag & drop
    if (event.data && event.data.type === 'elementMoved') {
        const data = event.data.data;
        updateFormFields(data.element, data.left, data.top);
        console.log(`Получены координаты для ${data.element}:`, data);
    }
});

// Adding drag & drop handlers to iframe after it loads
function initDragDropOnIframe() {
    const iframe = document.getElementById('heroPreviewIframe');
    if (!iframe || !iframe.contentDocument) return;
    
    const iframeDoc = iframe.contentDocument;
    
    iframeDoc.addEventListener('mousedown', function(e) {
        const target = e.target.closest('.hero-abs');
        if (!target) return;
        
        e.preventDefault();
        
        draggedElement = target;
        isDragging = true;
        
        const rect = draggedElement.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        draggedElement.style.cursor = 'grabbing';
        draggedElement.style.opacity = '0.8';
        draggedElement.style.zIndex = '999';
    });
    
    iframeDoc.addEventListener('mousemove', function(e) {
        if (!isDragging || !draggedElement) return;
        
        e.preventDefault();
        
        const container = iframeDoc.querySelector('.hero-content');
        if (!container) return;
        
        const containerRect = container.getBoundingClientRect();
        
        let newLeft = e.clientX - containerRect.left - offsetX;
        let newTop = e.clientY - containerRect.top - offsetY;
        
        draggedElement.style.left = newLeft + 'px';
        draggedElement.style.top = newTop + 'px';
    });
    
    iframeDoc.addEventListener('mouseup', function(e) {
        if (!isDragging || !draggedElement) return;
        
        draggedElement.style.cursor = '';
        draggedElement.style.opacity = '1';
        draggedElement.style.zIndex = '';
        
        const container = iframeDoc.querySelector('.hero-content');
        if (container) {
            const containerRect = container.getBoundingClientRect();
            const elementRect = draggedElement.getBoundingClientRect();
            
            const finalLeft = elementRect.left - containerRect.left;
            const finalTop = elementRect.top - containerRect.top;
            
            const elementType = getElementType(draggedElement);
            
            if (elementType) {
                // Sending coordinates to the main window
                window.postMessage({
                    type: 'elementMoved',
                    data: {
                        element: elementType,
                        left: Math.round(finalLeft) + 'px',
                        top: Math.round(finalTop) + 'px'
                    }
                }, '*');
            }
        }
        
        draggedElement = null;
        isDragging = false;
    });
    
    iframeDoc.addEventListener('dragstart', function(e) {
        if (e.target.closest('.hero-abs')) {
            e.preventDefault();
        }
    });
}

// Listening to iframe loading
const iframeObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'src') {
            setTimeout(initDragDropOnIframe, 500);
        }
    });
});

const iframe = document.getElementById('heroPreviewIframe');
if (iframe) {
    iframeObserver.observe(iframe, { attributes: true });
    iframe.addEventListener('load', initDragDropOnIframe);
}
// ===== end DRAG & DROP LOGIC =====
