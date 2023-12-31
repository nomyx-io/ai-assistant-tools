"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
module.exports = (config) => ({
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
    function: async ({ directory, fileName, content = '', append = false }) => {
        const filePath = path_1.default.join(directory, fileName);
        return new Promise((resolve, reject) => {
            // first make sure that the directory exists
            fs_1.default.mkdir(directory, { recursive: true }, (err) => {
                if (err) {
                    resolve(`Error creating directory ${directory}: ${err.message}. Are you providing a full path?`);
                }
            });
            if (append) {
                fs_1.default.appendFile(filePath, content, 'utf8', (err) => {
                    if (err) {
                        resolve(`Error appending to ${filePath}: ${err.message}. Are you providing a full path?`);
                    }
                    else {
                        resolve(`Successfully appended to ${filePath}`);
                    }
                });
            }
            else {
                fs_1.default.writeFile(filePath, content, 'utf8', (err) => {
                    if (err) {
                        resolve(`Error creating ${filePath}: ${err.message}.  Are you providing a full path?`);
                    }
                    else {
                        resolve(`Successfully created ${filePath}`);
                    }
                });
            }
        });
    }
});
