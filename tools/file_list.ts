import fs from 'fs';
import path from 'path';

module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'file_list',
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
            const files = fs.readdirSync(directory);
            for (const file of files) {
                const filePath = path.join(directory, file);
                const stat = fs.statSync(filePath);
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