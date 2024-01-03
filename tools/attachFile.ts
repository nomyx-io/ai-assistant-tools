import fs from 'fs';
import util from 'util';
import OpenAI from 'openai';

module.exports = (config: any) => ({
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
    function: async function ({ path }: any, assistant: any) {
        try {
            const myAssistantFile = await assistant.attachFile(path);
            return JSON.stringify(myAssistantFile);
        } catch (err: any) {
            return JSON.stringify(err.message);
        }
    }
})