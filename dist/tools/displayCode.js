"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_highlight_1 = require("cli-highlight");
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'display_code',
            description: 'display the given code string to the user in a formatted way',
            parameters: {
                type: 'object',
                properties: {
                    value: {
                        type: 'string',
                        description: 'The code string to display'
                    },
                    type: {
                        type: 'string',
                        description: 'The type of the value to display (text, json, yaml, html, xml, csv, ...)'
                    }
                },
                required: ['path']
            }
        },
    },
    function: async ({ value, type }) => {
        try {
            const highlighted = (0, cli_highlight_1.highlight)(value, { language: type, ignoreIllegals: true });
            console.log('\n' + highlighted + '\n');
            return `displayed ${type} code`;
        }
        catch (err) {
            console.log(value);
            return `displayed ${type} code`;
        }
    }
});
