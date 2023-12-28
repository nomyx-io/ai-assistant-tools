import fs from 'fs';
import util from 'util';

module.exports = (config: any) => ({
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
            const assistant = (this as any).assistant;
            const myAssistantFiles = await assistant.listFiles();
            return JSON.stringify(myAssistantFiles);
        } catch (err: any) {
            return JSON.stringify(err.message);
        }
    }
})