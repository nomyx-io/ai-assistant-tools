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
    function: async ({ directory }) => {
        try {
            const out = [];
            const files = fs_1.default.readdirSync(directory);
            for (const file of files) {
                const filePath = path_1.default.join(directory, file);
                const stat = fs_1.default.statSync(filePath);
                out.push({
                    name: file,
                    path: filePath,
                    size: stat.size,
                    isDirectory: stat.isDirectory()
                });
            }
            return JSON.stringify(out);
        }
        catch (err) {
            return JSON.stringify(err.message);
        }
    }
});
