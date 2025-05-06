/**
 * API service for Tabby interactions
 */
class TabbyAPI {
    constructor() {
        this.apiUrlPrefix = 'http://localhost:5001/v1';
    }

    /**
     * Set the API key for requests
     * @param {string} apiKey - The API key
     */
    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    /**
     * Get the headers for API requests
     * @returns {Object} - Request headers
     */
    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        };
    }

    /**
     * List available models
     * @returns {Promise} - Promise resolving to model list data
     */
    async listModels() {
        const listApiUrl = `${this.apiUrlPrefix}/model/list`;
        
        try {
            const response = await fetch(listApiUrl, {
                headers: this.getHeaders()
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching models:', error);
            throw error;
        }
    }

    /**
     * Load a specific model
     * @param {string} modelName - Name of the model to load
     * @param {number} maxSeqLen - Maximum sequence length
     * @param {string} cacheMode - Cache mode (Q4, Q6, Q8)
     * @returns {Promise} - Promise resolving to load result
     */
    async loadModel(modelName, maxSeqLen, cacheMode) {
        const loadApiUrl = `${this.apiUrlPrefix}/model/load`;
        
        try {
            const response = await fetch(loadApiUrl, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({
                    name: modelName,
                    max_seq_len: maxSeqLen,
                    cache_mode: cacheMode,
                    cache_size: maxSeqLen
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Error loading model:', error);
            throw error;
        }
    }

    /**
     * Unload the current model
     * @returns {Promise} - Promise resolving to unload result
     */
    async unloadModel() {
        const unloadApiUrl = `${this.apiUrlPrefix}/model/unload`;
        
        try {
            const response = await fetch(unloadApiUrl, {
                method: 'POST',
                headers: this.getHeaders()
            });
            return await response.json();
        } catch (error) {
            console.error('Error unloading model:', error);
            throw error;
        }
    }
}
