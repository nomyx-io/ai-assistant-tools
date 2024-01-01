"use strict";
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'set_code_value_for_key',
            description: 'set the value for the given key in the given source file. ** USE THIS FOR EDITING SOURCE CODE **',
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
                    value: {
                        type: 'string',
                        description: 'the value to set'
                    }
                },
                required: ['path', 'key', 'value']
            }
        },
    },
    function: async ({ path, key, value }) => {
        const fs = require('fs');
        const parseCode = require('./getCodeKeys')(config).exports.parseCode;
        try {
            const codeObject = await parseCode(path);
            const code = JSON.parse(codeObject);
            const valueIndex = code.elements.findIndex((element) => element.key === key);
            if (valueIndex === -1) {
                return JSON.stringify(`Error: Could not find key ${key} in ${path}`);
            }
            code.elements[valueIndex].value = value;
            fs.writeFileSync(path, JSON.stringify(code, null, 4));
            return JSON.stringify(`Successfully set value for key ${key} in ${path}`);
        }
        catch (err) {
            return `Error: ${err.message}`;
        }
    }
});
