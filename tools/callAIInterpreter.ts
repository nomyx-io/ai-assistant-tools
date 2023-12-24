import dotenv from "dotenv"; 
dotenv.config();

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
    function: async ({ command }: any) => {

    }
}