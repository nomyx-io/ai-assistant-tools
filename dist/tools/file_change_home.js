"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'file_change_home',
            description: 'change the default directory of the agent. All subsequent actions will be relative to this directory',
            parameters: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                        description: 'The path to the directory.'
                    },
                },
                required: ['path']
            }
        },
    },
    function: async ({ path }) => {
        try {
            os_1.default.homedir = path;
            return `new path: ${path}`;
        }
        catch ({ error }) {
            return `Error changing home directory: ${error.message}`;
        }
    }
});
