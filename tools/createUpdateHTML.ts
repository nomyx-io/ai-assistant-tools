import dotenv from "dotenv"; 
dotenv.config();

module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'create_update_html_from_instructions',
            description: 'create or update an html file from a set of instructions. USE THIS TOOL FOR HTML UPDATES AS MUCH AS POSSIBLE',
            parameters: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                        description: 'The path of the file to create or update'
                    },
                    instructions: {
                        type: 'string',
                        description: 'The natural-language instructions to execute'
                    },
                },
                required: ['command']
            }
        },
    },
    function: async ({ path, instructions }: any) => {
        const { Assistant } = require("@nomyx/assistant");
        const baseTools: any = require('@nomyx/assistant-tools')({
            openai_api_key: config.openai_api_key,
        });
        try {
            const assistant = await Assistant.create(
                config.assistant_name,
                `You are an HTML expert. Read the HTML file from the path given in the instructions and update it according to the instructions. Be surgixal and precise with your changes. ALWAYS check your work before submitting it.

ools at your disposal for this task include:
- create_Append_Overwrite_File - create, append to, or overwrite a file in the given folder with the given name and content. ONLY USE THIG TO CREATE THE FILE OR IF YOU HAVE SOMETHING TO APPEND TO THE FILE
- replace_text_in_file - replace one or more given strings in a file with another given string. USE THIS TOOL FOR TEXT FILE UPDATES AS MUCH AS POSSIBLE

INSTRUCTIONS:

1. make a backup of the file at the path given in the instructions
2. open the file at the path given in the instructions
3. examine the instructions
4. formulate a plan to update the file
5. execute the plan
6. check your work, comparing the results to the instructions
7. if the results match the instructions, submit your work. otherwise, go back to step 3
`,
                baseTools.schemas,
                config.model
            );
            if(!assistant) {
                return `Error: Could not create assistant`;
            }
            const command = `
PATH: ${path}
INSTRUCTIONS: ${instructions}`
            const result = await assistant.run(command, baseTools.funcs, baseTools.schemas, config.openai_api_key, (event: string, value: any) => {});
            assistant.delete();
            return result;
        } catch (err: any) {
            return `Error: ${err.message}`
        }
    }
})