const fs = require('fs');
module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'get_code_value_for_key',
            description: 'get the value for the given key in the given source file ** USE THIS FOR EDITING SOURCE CODE **',
            parameters: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                        description: 'the path to the source file'
                    },
                    key: {
                        type: 'string',
                        description: 'the key to get the value for'
                    },
                },
                required: ['path', 'key']
            }
        },
    },
    function: async ({ path, key }: any) => {
        const parseCode = require('./getCodeKeys')(config).exports.parseCode;
        try {
            const codeObject = await parseCode(path);
            const code = JSON.parse(codeObject);
            const value = code.elements.find((element: any) => element.key === key);
        } catch (err: any) {
            return JSON.stringify(err.message);
        }
    }
});
