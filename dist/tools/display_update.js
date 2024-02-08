"use strict";
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'display_update',
            description: 'display the given update to the user in a formatted way',
            parameters: {
                type: 'object',
                properties: {
                    value: {
                        type: 'string',
                        description: 'The update to display'
                    }
                },
                required: ['value']
            }
        },
    },
    function: async ({ value }) => {
        console.log(value);
        return `Successfully displayed markdown`;
    }
});
