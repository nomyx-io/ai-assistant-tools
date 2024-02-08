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
            name: 'file_attach',
            description: 'attach a file to the assistant to make it available to the assistant [c, cpp, csv, docx, html, java, json, md, pdf, php, pptx, py, rb, tex, txt, css, jpeg, jpg, js, gif, png, tar, ts, xlsx, xml, zip] only',
            parameters: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                        description: 'The path to the file to attach'
                    }
                },
                required: ['path']
            }
        },
    },
    function: async function ({ path }, assistant) {
        try {
            if (!fs_1.default.existsSync(path)) {
                return `Error: File ${path} does not exist`;
            }
            const supportedFormats = ['c', 'cpp', 'csv', 'docx', 'html', 'java', 'json', 'md', 'pdf', 'php', 'pptx', 'py', 'rb', 'tex', 'txt', 'css', 'jpeg', 'jpg', 'js', 'gif', 'png', 'tar', 'ts', 'xlsx', 'xml', 'zip'];
            const extension = path.split('.').pop();
            if (!extension || !supportedFormats.includes(extension)) {
                return `Error: File ${path} has an unsupported format`;
            }
            const ret = assistant.attachFile(path);
            return ret && `Successfully attached file ${path} to assistant ${assistant.name}` || `Error attaching file ${path} to assistant ${assistant.name}`;
        }
        catch (err) {
            return `Error attaching file ${path} to assistant ${assistant.name}: ${err.message}`;
        }
    }
});
