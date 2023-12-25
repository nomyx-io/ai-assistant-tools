import fs from 'fs';
import path from 'path';

module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'create_Append_Overwrite_File',
            description: 'create, append to, or overwrite a file in the given folder with the given name and content',
            parameters: {
                type: 'object',
                properties: {
                    directory: {
                        type: 'string',
                        description: 'The directory in which to create the file'
                    },
                    fileName: {
                        type: 'string',
                        description: 'The name of the file to create'
                    },
                    content: {
                        type: 'string',
                        description: 'Initial content of the file',
                        default: ''
                    },
                    append: {
                        type: 'boolean',
                        description: 'Flag to append to the file (default: false)',
                        default: false
                    }
                },
                required: ['directory', 'fileName']
            }
        },
    },
    function: async ({ directory, fileName, content = '', append = false }: any) => {
        const filePath = path.join(directory, fileName);
        return new Promise((resolve, reject) => {
            if (append) {
                fs.appendFile(filePath, content, 'utf8', (err) => {
                    if (err) {
                        reject(`Error appending to ${filePath}: ${err.message}`);
                    } else {
                        resolve(`Successfully appended to ${filePath}`);
                    }
                });
            } else {
                fs.writeFile(filePath, content, 'utf8', (err) => {
                    if (err) {
                        reject(`Error creating ${filePath}: ${err.message}`);
                    } else {
                        resolve(`Successfully created ${filePath}`);
                    }
                });
            }
        });
    }
})