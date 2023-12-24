"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
module.exports = {
    schema: {
        type: 'function',
        function: {
            name: 'call_ai_interpreter',
            description: 'call an AI-enabled assistant capable of performing a variety of tasks.',
            parameters: {
                type: 'object',
                properties: {
                    command: {
                        type: 'string',
                        description: 'The natural-language command to execute'
                    },
                },
                required: ['command']
            }
        },
    },
    function: async ({ command }) => {
    }
};
