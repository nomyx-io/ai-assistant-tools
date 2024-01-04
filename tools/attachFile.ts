import fs from 'fs';
import util from 'util';
import OpenAI from 'openai';

module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'attach_file_to_assistant',
            description: 'attach a file to the assistant to make it available to the assistant',
            parameters: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                        description: 'The path to the file to attach'
                    }
                },
                required: ['path']
            }
        },
    },
    function: async function ({ path }: any, assistant: any) {
        try {
            if(!fs.existsSync(path)) {
                return `Error: File ${path} does not exist`;
            }
            const supportedFormats = ['c', 'cpp', 'csv', 'docx', 'html', 'java', 'json', 'md', 'pdf', 'php', 'pptx', 'py', 'rb', 'tex', 'txt', 'css', 'jpeg', 'jpg', 'js', 'gif', 'png', 'tar', 'ts', 'xlsx', 'xml', 'zip'];
            const extension = path.split('.').pop();
            if(!extension || !supportedFormats.includes(extension)) {
                return `Error: File ${path} has an unsupported format`;
            }
            const ret = assistant.attachFile(path);
            return ret && `Successfully attached file ${path} to assistant ${assistant.name}` || `Error attaching file ${path} to assistant ${assistant.name}`;
        } catch (err: any) {
            return `Error attaching file ${path} to assistant ${assistant.name}: ${err.message}`
        }
    }
})