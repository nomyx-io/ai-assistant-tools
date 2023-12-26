import fs from 'fs';
import path from 'path';
import util from 'util';
const readdirAsync = util.promisify(fs.readdir);
const statAsync = util.promisify(fs.stat);

module.exports = (config: any) => ({
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
            const out: any = [];
            const files = await readdirAsync(directory);
            for (const file of files) {
                const filePath = path.join(directory, file);
                const stat = await statAsync(filePath);
                out.push({
                    name: file,
                    path: filePath,
                    size: stat.size,
                    isDirectory: stat.isDirectory()
                });
            }
            return JSON.stringify(out);
        } catch (err: any) {
            return JSON.stringify(err.message);
        }
    }
})