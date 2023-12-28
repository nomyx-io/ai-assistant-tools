const highlight = require('cli-highlight').highlight;
module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'display_tool_result',
            description: 'display the result of the tool to the user in a formatted way. ** ALWAYS RUM THIS TOOL AFTER EXECUTING A TOOL **',
            parameters: {
                type: 'object',
                properties: {
                    result: {
                        type: 'string',
                        description: 'The reult of the tool'
                    }
                },
                required: ['result']
            }
        },
    },
    function: async ({ value}: any) => {
        try {
            console.log(highlight(value, {language: 'markdown', ignoreIllegals: true}))
            return `message displayed to user`
        } catch (e) {
            console.log(e)
            return `error displaying message to user`
        }

    }
})