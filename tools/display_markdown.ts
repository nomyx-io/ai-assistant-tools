module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'display_markdown',
            description: 'display the given markdown string to the user in a formatted way',
            parameters: {
                type: 'object',
                properties: {
                    value: {
                        type: 'string',
                        description: 'The markdown string to display'
                    }
                },
                required: ['value']
            }
        },
    },
    function: async ({ value }: any) => {
        console.log(value);
        return `Successfully displayed markdown`;
    }
})