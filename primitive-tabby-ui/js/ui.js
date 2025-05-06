/**
 * UI manager for Tabby interface
 */
class TabbyUI {
    constructor() {
        // Get UI elements
        this.apiKeyInput = document.getElementById('apiKey');
        this.listButton = document.getElementById('listButton');
        this.unloadButton = document.getElementById('unloadButton');
        this.modelListContainer = document.getElementById('modelListContainer');
        this.contextDropdown = document.getElementById('contextDropdown');
        this.cacheModeDropdown = document.getElementById('cacheModeDropdown');
        
        // Add event listeners
        this.apiKeyInput.addEventListener('input', this.handleApiKeyInput.bind(this));
        this.listButton.addEventListener('click', this.onListButtonClick.bind(this));
        this.unloadButton.addEventListener('click', this.onUnloadButtonClick.bind(this));
    }

    /**
     * Handle API key input change
     */
    handleApiKeyInput() {
        const apiKeyValue = this.apiKeyInput.value;
        localStorage.setItem('TabbyApiKey', apiKeyValue);
    }

    /**
     * Load API key from local storage
     */
    loadStoredApiKey() {
        const storedApiKey = localStorage.getItem('TabbyApiKey');
        if (storedApiKey) {
            this.apiKeyInput.value = storedApiKey;
            return storedApiKey;
        }
        return null;
    }

    /**
     * Get the current API key
     * @returns {string} - Current API key
     */
    getApiKey() {
        return this.apiKeyInput.value;
    }

    /**
     * Get the current context size
     * @returns {number|undefined} - Selected context size or undefined
     */
    getContextSize() {
        return this.contextDropdown.value || undefined;
    }

    /**
     * Get the current cache mode
     * @returns {string} - Selected cache mode
     */
    getCacheMode() {
        return this.cacheModeDropdown.value;
    }

    /**
     * Set the click handler for the List button
     * @param {Function} handler - Click handler function
     */
    onListButtonClick(handler) {
        if (typeof handler === 'function') {
            this.listButtonHandler = handler;
        } else if (this.listButtonHandler) {
            this.listButtonHandler();
        }
    }

    /**
     * Set the click handler for the Unload button
     * @param {Function} handler - Click handler function
     */
    onUnloadButtonClick(handler) {
        if (typeof handler === 'function') {
            this.unloadButtonHandler = handler;
        } else if (this.unloadButtonHandler) {
            this.unloadButtonHandler();
        }
    }

    /**
     * Display models in the UI
     * @param {Array} models - Array of model objects
     * @param {Function} loadModelHandler - Handler for loading a model
     */
    displayModels(models, loadModelHandler) {
        // Clear previous list
        this.modelListContainer.innerHTML = '';
        
        models.forEach(model => {
            // Create model card
            const modelCard = document.createElement('div');
            modelCard.className = 'col';
            
            modelCard.innerHTML = `
                <div class="card model-card h-100">
                    <div class="card-body">
                        <h5 class="card-title model-name">${model.id}</h5>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-success btn-sm w-100 load-model-btn">Load Model</button>
                    </div>
                </div>
            `;
            
            // Add click handler for the load button
            const loadButton = modelCard.querySelector('.load-model-btn');
            loadButton.addEventListener('click', () => {
                loadModelHandler(model.id);
            });
            
            this.modelListContainer.appendChild(modelCard);
        });
    }

    /**
     * Show a notification to the user
     * @param {string} message - Message to display
     * @param {string} type - Type of notification (success, error)
     */
    showNotification(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        document.querySelector('.container').prepend(alertDiv);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            const bsAlert = bootstrap.Alert.getOrCreateInstance(alertDiv);
            bsAlert.close();
        }, 5000);
    }
}
