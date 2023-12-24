"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
module.exports = {
    schema: {
        type: 'function',
        function: {
            name: 'run_node_js_code',
            description: 'execute arbitrary JavaScript code in node.js and return the result',
            parameters: {
                type: 'object',
                properties: {
                    js: {
                        type: 'string',
                        description: 'JavaScript code to run'
                    }
                },
                required: ['js']
            }
        }
    },
    function: async ({ js }) => {
        return new Promise((resolve, reject) => {
            try {
                const fileName = path_1.default.join(__dirname, new Date().getTime() + ".js");
                fs_1.default.writeFileSync(fileName, js);
                (0, child_process_1.exec)(`node ${fileName}`, ((error, stdout, stderr) => {
                    fs_1.default.unlinkSync(fileName);
                    if (error) {
                        resolve(error.message);
                    }
                    else if (stderr) {
                        resolve(stderr);
                    }
                    else {
                        resolve(JSON.stringify(stdout));
                    }
                }));
            }
            catch (err) {
                resolve(err.message);
            }
        });
    }
};
