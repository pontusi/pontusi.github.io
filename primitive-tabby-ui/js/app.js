/**
 * Main application logic for Tabby UI
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize API and UI
    const api = new TabbyAPI();
    const ui = new TabbyUI();
    
    // Load stored API key
    const storedApiKey = ui.loadStoredApiKey();
    if (storedApiKey) {
        api.setApiKey(storedApiKey);
    }
    
    /**
     * List models handler
     */
    const listModels = async () => {
        try {
            // Get and set API key
            const apiKey = ui.getApiKey();
            if (!apiKey) {
                ui.showNotification('Please enter an API key', 'warning');
                return;
            }
            
            api.setApiKey(apiKey);
            
            // Fetch models
            const response = await api.listModels();
            
            if (response.data && Array.isArray(response.data)) {
                // Display models
                ui.displayModels(response.data, loadModel);
                ui.showNotification('Models loaded successfully', 'success');
            } else {
                ui.showNotification('No models found', 'warning');
            }
        } catch (error) {
            ui.showNotification('Error loading models: ' + error.message, 'danger');
        }
    };
    
    /**
     * Load model handler
     * @param {string} modelId - ID of the model to load
     */
    const loadModel = async (modelId) => {
        try {
            const apiKey = ui.getApiKey();
            if (!apiKey) {
                ui.showNotification('Please enter an API key', 'warning');
                return;
            }
            
            api.setApiKey(apiKey);
            
            // Get settings
            const contextSize = ui.getContextSize();
            const cacheMode = ui.getCacheMode();
            
            // Load model
            const response = await api.loadModel(modelId, contextSize, cacheMode);
            
            if (response.status === 'success') {
                ui.showNotification(`Model ${modelId} loaded successfully`, 'success');
            } else {
                ui.showNotification(`Error loading model: ${response.error || 'Unknown error'}`, 'danger');
            }
        } catch (error) {
            ui.showNotification('Error loading model: ' + error.message, 'danger');
        }
    };
    
    /**
     * Unload model handler
     */
    const unloadModel = async () => {
        try {
            const apiKey = ui.getApiKey();
            if (!apiKey) {
                ui.showNotification('Please enter an API key', 'warning');
                return;
            }
            
            api.setApiKey(apiKey);
            
            // Unload model
            const response = await api.unloadModel();
            
            if (response.status === 'success') {
                ui.showNotification('Model unloaded successfully', 'success');
            } else {
                ui.showNotification(`Error unloading model: ${response.error || 'Unknown error'}`, 'danger');
            }
        } catch (error) {
            ui.showNotification('Error unloading model: ' + error.message, 'danger');
        }
    };
    
    // Set button handlers
    ui.onListButtonClick(listModels);
    ui.onUnloadButtonClick(unloadModel);
    
    // Load models on page load if API key is available
    if (storedApiKey) {
        listModels();
    }
});
