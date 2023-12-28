"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'attach_file_to_assistant',
            description: 'attach a file to the assistant to make it available to the assistant',
            parameters: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                        description: 'The path to the file to attach'
                    }
                },
                required: ['path']
            }
        },
    },
    function: async function ({ path }) {
        try {
            const assistant = this.assistant;
            const myAssistantFile = await assistant.attachFile(path);
            return JSON.stringify(myAssistantFile);
        }
        catch (err) {
            return JSON.stringify(err.message);
        }
    }
});
