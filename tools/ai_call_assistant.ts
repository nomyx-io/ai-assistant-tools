import dotenv from "dotenv"; 
dotenv.config();

module.exports = (config: any, getTools: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'call_ai_assistant',
            description: 'call an AI-enabled assistant capable of performing a variety of tasks including gathering information, answering questions, and performing actions',
            parameters: {
                type: 'object',
                properties: {
                    persona: {
                        type: 'string',
                        description: 'The persona to use for the assistant. A persona is a set of skills that the assistant can use to perform tasks, usually stated as, "I am an expert in X."'
                    },
                    command: {
                        type: 'string',
                        description: 'The command to run. The assistant will attempt to perform the command and return the result. Clearly describe the task and the expected result and its format.'
                    },
                },
                required: ['command']
            }
        },
    },
    function: async ({ persona, command }: any) => {
        const { Assistant, loadNewPersona } = require("@nomyx/assistant");
        const baseTools: any = getTools();
        
        try {
            const _persona = persona + '. Available tools are: ' + Object.keys(baseTools.funcs).join(', ');
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