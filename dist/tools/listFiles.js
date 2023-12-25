"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const readdirAsync = util_1.default.promisify(fs_1.default.readdir);
module.exports = (config) => ({
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
    function: async ({ directory }) => {
        try {
            const files = await readdirAsync(directory);
            const fils = JSON.stringify(files);
            return fils;
        }
        catch (err) {
            return JSON.stringify(err.message);
        }
    }
});
