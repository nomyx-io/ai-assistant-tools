"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai_1 = require("openai");
module.exports = (config) => ({
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
    function: async ({ command, params }) => {
        try {
            const client = new openai_1.OpenAI({
                apiKey: config.openai_api_key,
            });
            command = command.split('.');
            let ref = client;
            while (command.length > 0) {
                ref = ref[command.shift()];
            }
            if (params) {
                params = params && params.split(',');
                const result = await ref(...params);
                return JSON.stringify(result || {});
            }
            else {
                const result = await ref();
                return JSON.stringify(result || {});
            }
        }
        catch (error) {
            return `Error calling OpenAI API: ${error.message}`;
        }
    }
});
