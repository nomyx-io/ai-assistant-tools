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
    function: async ({ path }: any) => {
        try {
            const fs = require('fs');
            const pathParts = path.split('.');
            const extension = pathParts[pathParts.length - 1];
            let codeKeys: any = [];
            const fileContents = fs.readFileSync(path, 'utf8');
            if (extension === 'js') {
                codeKeys = await fileContents.match(/(?<=\${).*?(?=})/g);
            } else if (extension === 'ts') {
                codeKeys = await fileContents.match(/(?<=\${).*?(?=})/g);
            } else if (extension === 'python') {
                codeKeys = await fileContents.match(/(?<=\${).*?(?=})/g);
            }
            return JSON.stringify(codeKeys);
        } catch (err: any) {
            return JSON.stringify(err.message);
        }
    }
});
