module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'get_code_keys',
            description: 'get the keys for all the source code elements in the given source file. returns an array of keys. ** USE THIS FOR EDITING SOURCE CODE **',
            parameters: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                        description: 'the path to the source file'
                    },
                },
                required: ['path']
            }
        },
    },
    function: async ({ path }: any) => {
        const fs = require('fs');
        try {
            const pathParts = path.split('.');
            const extension = pathParts[pathParts.length - 1];
            let codeKeys: any = [];
            const fileContents = fs.readFileSync(path, 'utf8');
            if (extension === 'js') {
                return fileContents.match(/(?<=\${).*?(?=})/g);
            } else if (extension === 'ts') {
                return fileContents.match(/(?<=\${).*?(?=})/g);
            } else if (extension === 'python') {
                return fileContents.match(/(?<=\${).*?(?=})/g);
            }
            return JSON.stringify(codeKeys);
        } catch (err: any) {
            return JSON.stringify(err.message);
        }
    }
});
