import fs from 'fs';

module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'delete_File',
            description: 'delete a file at the given path',
            parameters: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                        description: 'The path of the file to delete'
                    }
                },
                required: ['path']
            }
        },
    },
    function: async ({ path }: any) => {
        return new Promise((resolve, reject) => {
            fs.unlink(path, (err) => {
                if (err) {
                    resolve(`Error deleting ${path}: ${err.message}`);
                } else {
                    resolve(`Successfully deleted ${path}`);
                }
            });
        });
    }
})