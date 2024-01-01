"use strict";
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'get_code_keys',
            description: 'get the keys for all the source code elements in the source file at the given path. returns an array of keys. ** USE THIS FOR EDITING SOURCE CODE **',
            parameters: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                        description: 'the path to the source file'
                    },
                    keys: {
                        type: 'string',
                        description: 'a comma-delimited list of keys to parse the source code with. if not provided, all keys will be returned.'
                    }
                },
                required: ['path']
            }
        },
    },
    function: async (params) => {
        const parsedCode = await parseCode(params.path, params.keys, config.openai_api_key);
        if (!parsedCode.elements)
            return `Error: No file found at path ${params.path}`;
        const keys = parsedCode.elements.map((element) => element.key);
        return JSON.parse(keys);
    },
    exports: {
        parseCode: async (path, keys = undefined) => parseCode(path, keys, config.openai_api_key)
    }
});
async function parseCode(path, keys = '', apiKey) {
    const fs = require('fs');
    const { Assistant } = require("@nomyx/assistant");
    try {
        if (!fs.existsSync(path))
            return `Error: File does not exist at path ${path}`;
        let fileContents = fs.readFileSync(path, 'utf8');
        const assistant = await Assistant.create('get_code_keys', `You parse source code into a list of key-value pairs. If given a set of keys you parse the source code using those keys.
Given some source code you parse elements by turning functions, variable assignments, classes and statements into key value pairs.
You then return a JSON array of key-value objects. You output a response formatted like so:
{
    language: <language>,
    elements: [{
        key: 'function foo()',
        value: "{\n.   console.log('foo')"
    }, ...]
}
Please note how the key and the value must be appedned together in order tou output the source code in full.
If you need to create your own key, then use the appropriate comment syntax for the language you are parsing so that the key is safely outputted. Always use existinng keys where possible.
*** IT IS CRITICAL THAT YOU NEVER TRUNCATE ANY CODE AND ALWAYS OUTPUT ALL THE SOURCE CODE IN FULL ***
*** FAILURE TO COMPLY MAY RESULT INN PERMANENT DELETION OF VITAL WORK ***
`, {}, 'gpt-4-1106-preview');
        if (!assistant) {
            return `Error: Could not create assistant`;
        }
        if (keys) {
            fileContents = `
FILE CONTENTS: ${fileContents},
---
KEYS: ${keys}
`;
        }
        const code = await assistant.run(fileContents, {}, [], apiKey, (event, value) => { });
        assistant.delete();
        return JSON.parse(code);
    }
    catch (err) {
        return {};
    }
}
