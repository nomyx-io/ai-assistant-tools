import dotenv from "dotenv"; 
dotenv.config();

module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'call_ai_assistant',
            description: 'call an AI-enabled assistant capable of performing a variety of tasks including gathering information, answering questions, and performing actions',
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
        const { Assistant, loadNewPersona } = require("@nomyx/assistant");
        const baseTools: any = require('../index')({
            openai_api_key: config.openai_api_key,
        });
        try {
            const assistant = await Assistant.create(
                config.assistant_name,
                await loadNewPersona(baseTools.schemas),
                baseTools.schemas,
                config.model
            );
            if(!assistant) {
                return `Error: Could not create assistant`;
            }
            const result = await assistant.run(command, baseTools.funcs, baseTools.schemas, config.openai_api_key, (event: string, value: any) => {});
            assistant.delete();
            return result;
        } catch (err: any) {
            return `Error: ${err.message}`
        }
    }
})