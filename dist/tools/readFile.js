"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const readFileAsync = util_1.default.promisify(fs_1.default.readFile);
module.exports = (config) => ({
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
    function: async ({ path }) => {
        try {
            const ret = await readFileAsync(path, { encoding: 'utf8' });
            return ret;
        }
        catch (err) {
            return `Error reading ${path}: ${err.message}`;
        }
    }
});
