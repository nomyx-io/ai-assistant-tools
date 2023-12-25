import * as fs from 'fs';
import * as util from 'util';
const readFileAsync = util.promisify(fs.readFile);

module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'srite_to_file',
            description: 'write the given content to the file at the given path',
            parameters: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                        description: 'The path of the file to read'
                    },
                    content: {
                        type: 'string',
                        description: 'The content to write'
                    }
                },
                required: ['path', 'content']
            }
        },
    },
    function: async ({ path }: any) => {
        try {
            const ret = await readFileAsync(path, { encoding: 'utf8' });
            return ret;
        } catch (err: any) {
            return `Error reading ${path}: ${err.message}`
        }
    }
})