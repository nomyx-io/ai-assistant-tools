"use strict";
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'display_Markdown',
            description: 'display the given markdown string to the user in a formatted way',
            parameters: {
                type: 'object',
                properties: {
                    value: {
                        type: 'string',
                        description: 'The markdown string to display'
                    }
                },
                required: ['path']
            }
        },
    },
    function: async ({ value }) => {
        try {
            const highlight = require('highlight.js').highlightAuto;
            console.log(highlight(value, { language: 'markdown', ignoreIllegals: true }));
        }
        catch (err) {
            console.log(value);
        }
    }
});
