import dotenv from "dotenv"; dotenv.config();
import fs from 'fs';

module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'file_replace_text',
            description: 'replace one or more given strings in a file. ** USE THIS FUNCTION FOR TEXT FILE UPDATES AS MUCH AS POSSIBLE **',
            parameters: {
                type: 'object',
                properties: {
                    filePath: {
                        type: 'string',
                        description: 'The path of the file to replace text in'
                    },
                    find: {
                        type: 'string',
                        description: 'The text to find'
                    },
                    replace: {
                        type: 'string',
                        description: 'The text to replace'
                    },
                    caseSensitive: {
                        type: 'boolean',
                        description: 'Whether to match case'
                    },
                    regex: {
                        type: 'boolean',
                        description: 'Whether to use regex'
                    },
                    global: {
                        type: 'boolean',
                        description: 'Whether to replace all instances'
                    }
                },
                required: ['filePath', 'find', 'replace']
            }
        },
    },
    function: async ({ filePath, find, replace, caseSensitive, regex, global }: any) => {
        try {
            if (!fs.existsSync(filePath)) {
                return `Error reading ${filePath}: file does not exist`
            }
            const content = fs.readFileSync(filePath, { encoding: 'utf8' });
            let flags = 'g';
            if (!global) {
                flags = '';
            }
            if (caseSensitive) {
                flags += 'i';
            }
            let regexObj = undefined;
            if (regex) {
                regexObj = new RegExp(find, flags);
            } else {
                regexObj = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
            }
            const ret = content.replace(regexObj, replace);
            fs.writeFileSync(filePath, ret, { encoding: 'utf8' });
            return `Successfully replaced text in ${filePath}`
        } catch ({error}: any) {
            return `Error replacing text in ${filePath}: ${error.message}`
        }
    }
})