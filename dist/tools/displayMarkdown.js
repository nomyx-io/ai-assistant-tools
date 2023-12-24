"use strict";
module.exports = {
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
        console.log(highlight(value, { language: 'markdown', ignoreIllegals: true }));
        return value;
    }
};
