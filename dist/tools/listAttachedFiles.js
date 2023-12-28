"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'list_attached_assistant_files',
            description: 'list the files attached to the assistant',
            parameters: {
                type: 'object',
                properties: {},
            }
        },
    },
    function: async function () {
        try {
            const assistant = this.assistant;
            const myAssistantFiles = await assistant.listFiles();
            return JSON.stringify(myAssistantFiles);
        }
        catch (err) {
            return JSON.stringify(err.message);
        }
    }
});
