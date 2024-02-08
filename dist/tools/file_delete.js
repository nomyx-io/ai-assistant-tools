"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'file_delete',
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
    function: async ({ path }) => {
        return new Promise((resolve, reject) => {
            fs_1.default.unlink(path, (err) => {
                if (err) {
                    resolve(`Error deleting ${path}: ${err.message}`);
                }
                else {
                    resolve(`Successfully deleted ${path}`);
                }
            });
        });
    }
});
