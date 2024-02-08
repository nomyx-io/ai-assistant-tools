module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'file_list_attached',
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
    function: async function (_dummy: any, assistant: any) {
        try {
            if(!assistant) {
                return `Error: Could not create assistant`;
            }
            const myAssistantFiles = await assistant.listFiles();
            return JSON.stringify(myAssistantFiles);
        } catch (err: any) {
            return `Error: ${err.message}`
        }
    }
})