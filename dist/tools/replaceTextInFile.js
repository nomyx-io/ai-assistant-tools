"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fs_1 = __importDefault(require("fs"));
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'replace_text_in_file',
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
    function: async ({ filePath, find, replace, caseSensitive, regex, global }) => {
        try {
            if (!fs_1.default.existsSync(filePath)) {
                return `Error reading ${filePath}: file does not exist`;
            }
            const content = fs_1.default.readFileSync(filePath, { encoding: 'utf8' });
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
            }
            else {
                regexObj = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
            }
            const ret = content.replace(regexObj, replace);
            fs_1.default.writeFileSync(filePath, ret, { encoding: 'utf8' });
            return `Successfully replaced text in ${filePath}`;
        }
        catch ({ error }) {
            return `Error replacing text in ${filePath}: ${error.message}`;
        }
    }
});
