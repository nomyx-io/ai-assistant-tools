import fs from 'fs';
import util from 'util';
const readdirAsync = util.promisify(fs.readdir);

module.exports = {
    schema: {
        type: 'function',
        function: {
            name: 'list_Files_in_folder',
            description: 'Lists files in a directory',
            parameters: {
                type: 'object',
                properties: {
                    directory: {
                        type: 'string',
                        description: 'The directory to list files from'
                    }
                },
                required: ['directory']
            }
        },
    },
    function: async ( {directory}: any ) => {
        try {
            const files = await readdirAsync(directory);
            const fils = JSON.stringify(files);
            return fils;
        } catch (err: any) {
            return JSON.stringify(err.message);
        }
    }
}