import fs from 'fs';
import OpenAI from 'openai';

module.exports = (config: any) => ({
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
    function: async ({ task }: any): Promise<string> => {
        const openai = new OpenAI(config.openai_api_key);
        try {
            const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: 'You are an expert implementer. You are currently reviewing tasks that you must perform later and need to decompose the following task into a series of subtasks you can handle.  ** Return the result as a JSON array of strings ** ' }, { role: "user", content: task }],
                model: "gpt-4-1106-preview",
            });
            return JSON.stringify(completion.choices[0])
        }  catch (err: any) {
            return JSON.stringify(err.message);
        }
    }
})