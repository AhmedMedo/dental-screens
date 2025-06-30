// Dental Chart Functionality
class DentalChart {
    constructor() {
        this.selectedTooth = null;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Tooth click handlers
        document.querySelectorAll('.tooth-element').forEach(tooth => {
            tooth.addEventListener('click', (e) => {
                const toothNumber = e.currentTarget.dataset.toothNumber;
                this.openToothModal(toothNumber);
            });
        });

        // Modal handlers
        this.initializeModalHandlers();
        
        // Form handlers
        this.initializeFormHandlers();
    }

    openToothModal(toothNumber) {
        this.selectedTooth = toothNumber;
        const modal = document.getElementById('tooth-modal');
        const toothNumberSpan = document.getElementById('modal-tooth-number');
        
        if (modal && toothNumberSpan) {
            toothNumberSpan.textContent = toothNumber;
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    initializeModalHandlers() {
        // Close modal buttons
        document.querySelectorAll('[data-close-modal]').forEach(button => {
            button.addEventListener('click', (e) => {
                const modalId = e.currentTarget.dataset.closeModal;
                this.closeModal(modalId);
            });
        });

        // Close modal on backdrop click
        document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
            backdrop.addEventListener('click', (e) => {
                if (e.target === e.currentTarget) {
                    const modal = e.currentTarget.closest('.modal');
                    if (modal) {
                        modal.classList.add('hidden');
                        document.body.style.overflow = 'auto';
                    }
                }
            });
        });
    }

    initializeFormHandlers() {
        // Treatment plan stage updates
        document.querySelectorAll('.stage-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const stage = e.currentTarget.dataset.stage;
                const planId = e.currentTarget.dataset.planId;
                this.updateTreatmentStage(planId, stage);
            });
        });

        // Dynamic form additions
        document.querySelectorAll('[data-add-field]').forEach(button => {
            button.addEventListener('click', (e) => {
                const fieldType = e.currentTarget.dataset.addField;
                this.addFormField(fieldType);
            });
        });
    }

    updateTreatmentStage(planId, stage) {
        // Update progress bar
        const progressBar = document.querySelector(`[data-plan-id="${planId}"] .progress-bar`);
        const stageButtons = document.querySelectorAll(`[data-plan-id="${planId}"] .stage-button`);
        
        const stageProgress = {
            'pre-op': 25,
            'procedure': 50,
            'follow-up': 75,
            'completed': 100
        };

        if (progressBar) {
            progressBar.style.width = `${stageProgress[stage]}%`;
        }

        // Update button states
        stageButtons.forEach(button => {
            const buttonStage = button.dataset.stage;
            const isCompleted = stageProgress[buttonStage] <= stageProgress[stage];
            
            if (isCompleted) {
                button.classList.add('bg-blue-600', 'text-white');
                button.classList.remove('bg-gray-300', 'text-gray-500');
            } else {
                button.classList.add('bg-gray-300', 'text-gray-500');
                button.classList.remove('bg-blue-600', 'text-white');
            }

            if (buttonStage === stage) {
                button.classList.add('ring-4', 'ring-blue-200');
            } else {
                button.classList.remove('ring-4', 'ring-blue-200');
            }
        });
    }

    addFormField(fieldType) {
        const container = document.querySelector(`[data-field-container="${fieldType}"]`);
        if (!container) return;

        const fieldHtml = this.getFieldTemplate(fieldType);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = fieldHtml;
        
        container.appendChild(tempDiv.firstElementChild);
    }

    getFieldTemplate(fieldType) {
        const templates = {
            'issue': `
                <div class="flex items-center gap-2 mb-2 fade-in">
                    <input type="text" name="issues[]" class="flex-1 border border-gray-300 rounded-md px-3 py-2" placeholder="Enter issue...">
                    <button type="button" class="text-red-600 hover:text-red-700" onclick="this.parentElement.remove()">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            `,
            'recommendation': `
                <div class="flex items-center gap-2 mb-2 fade-in">
                    <input type="text" name="recommendations[]" class="flex-1 border border-gray-300 rounded-md px-3 py-2" placeholder="Enter recommendation...">
                    <button type="button" class="text-red-600 hover:text-red-700" onclick="this.parentElement.remove()">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            `,
            'procedure': `
                <div class="flex items-center gap-2 mb-2 fade-in">
                    <input type="text" name="procedures[]" class="flex-1 border border-gray-300 rounded-md px-3 py-2" placeholder="Enter procedure...">
                    <button type="button" class="text-red-600 hover:text-red-700" onclick="this.parentElement.remove()">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            `
        };

        return templates[fieldType] || '';
    }
}

// Tab functionality
class TabManager {
    constructor() {
        this.initializeTabs();
    }

    initializeTabs() {
        document.querySelectorAll('[data-tab]').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabId = e.currentTarget.dataset.tab;
                this.switchTab(tabId);
            });
        });
    }

    switchTab(activeTabId) {
        // Update tab buttons
        document.querySelectorAll('[data-tab]').forEach(tab => {
            if (tab.dataset.tab === activeTabId) {
                tab.classList.add('border-blue-500', 'text-blue-600');
                tab.classList.remove('border-transparent', 'text-gray-500');
            } else {
                tab.classList.add('border-transparent', 'text-gray-500');
                tab.classList.remove('border-blue-500', 'text-blue-600');
            }
        });

        // Update tab content
        document.querySelectorAll('[data-tab-content]').forEach(content => {
            if (content.dataset.tabContent === activeTabId) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new DentalChart();
    new TabManager();
    
    // Initialize tooltips and other interactive elements
    initializeInteractiveElements();
});

function initializeInteractiveElements() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Auto-hide alerts
    document.querySelectorAll('.alert-auto-hide').forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    });
}

// Utility functions
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
};

window.confirmDelete = function(message = 'Are you sure you want to delete this item?') {
    return confirm(message);
};