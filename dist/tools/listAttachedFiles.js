"use strict";
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'list_attached_assistant_files',
            description: 'list the files attached to the assistant for thread with thread_id',
            parameters: {
                type: 'object',
                properties: {
                    thread_id: {
                        type: 'string',
                        description: 'The thread_id of the assistant'
                    },
                },
            }
        },
    },
    function: async function (_dummy, assistant) {
        try {
            if (!assistant) {
                return `Error: Could not create assistant`;
            }
            const myAssistantFiles = await assistant.listFiles();
            return JSON.stringify(myAssistantFiles);
        }
        catch (err) {
            return `Error: ${err.message}`;
        }
    }
});
