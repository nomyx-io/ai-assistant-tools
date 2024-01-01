import dotenv from "dotenv"; 
dotenv.config();
import { OpenAI } from 'openai';

module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'call_Open_AI_API',
            description: 'call an OpenAI API using the openai npm package ** YOU ARE ALREADY LOGGED IN **',
            parameters: {
                type: 'object',
                properties: {
                    command: {
                        type: 'string',
                        description: 'The function path to call (e.g. beta.threads.messages.create)'
                    },
                    params: {
                        type: 'string',
                        description: 'Comma-separated list of parameters to pass to the function'
                    },
                },
                required: ['command']
            }
        },
    },
    function: async ({command, params}: any) => {
        try {
            const client = new OpenAI({
                apiKey: config.openai_api_key,
            });
            command = command.split('.');
            let ref: any = client;
            while (command.length > 0) {
                ref = ref[command.shift()];
            }
            if(params) {
                params = params && params.split(',');
                return await ref(...params);
            } else {
                return await ref();
            }
        } catch (error: any) {
            return `Error calling OpenAI API: ${error.message}`;
        }
    }
})