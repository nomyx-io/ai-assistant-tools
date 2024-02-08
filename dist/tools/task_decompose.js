"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'task_decompose',
            description: 'decompose a task into subtasks',
            parameters: {
                type: 'object',
                properties: {
                    task: {
                        type: 'string',
                        description: 'The task to decompose'
                    }
                },
                required: ['path']
            }
        },
    },
    function: async ({ task }) => {
        const openai = new openai_1.default(config.openai_api_key);
        try {
            const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: 'You are an expert implementer. You are currently reviewing tasks that you must perform later and need to decompose the following task into a series of subtasks you can handle.  ** Return the result as a JSON array of strings ** ' }, { role: "user", content: task }],
                model: "gpt-4-1106-preview",
            });
            return JSON.stringify(completion.choices[0]);
        }
        catch (err) {
            return JSON.stringify(err.message);
        }
    }
});
