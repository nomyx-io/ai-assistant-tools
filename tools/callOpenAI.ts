import dotenv from "dotenv"; 
dotenv.config();
import { OpenAI } from 'openai';
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
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
            command = command.split('.');
            let ref: any = client;
            while (command.length > 0) {
                ref = ref[command.shift()];
            }
            params = params.split(',');
            return await ref(...params);
        } catch (error: any) {
            return `Error calling OpenAI API: ${error.message}`;
        }
    }
}