import fs from 'fs';
import util from 'util';
const readFileAsync = util.promisify(fs.readFile);

module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'read_file_content',
            description: 'read the content of the file at the given path',
            parameters: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                        description: 'The path of the file to read'
                    }
                },
                required: ['path']
            }
        },
    },
    function: async ({ path }: any ) => {
        try {
            const ret = await readFileAsync(path, { encoding: 'utf8' });
            return ret;
        } catch (err: any) {
            return `Error reading ${path}: ${err.message}`
        }
    }
})