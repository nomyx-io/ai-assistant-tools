"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const util = __importStar(require("util"));
const readFileAsync = util.promisify(fs.readFile);
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'read_file_content_window',
            description: 'read a window of content of the file at the given path starting at the given offset and ending at the given length',
            parameters: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                        description: 'The path of the file to read'
                    },
                    offset: {
                        type: 'integer',
                        description: 'The offset to start reading at'
                    },
                    length: {
                        type: 'integer',
                        description: 'The length to read'
                    }
                },
                required: ['path', 'offset', 'length']
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
