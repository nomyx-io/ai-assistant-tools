"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
module.exports = {
    schema: {
        type: 'function',
        function: {
            name: 'run_bash_command',
            description: 'execute an arbitrary Bash command',
            parameters: {
                type: 'object',
                properties: {
                    command: {
                        type: 'string',
                        description: 'Bash command to run'
                    }
                },
                required: ['command']
            }
        }
    },
    function: async ({ command }) => {
        return new Promise((resolve, reject) => {
            shelljs_1.default.exec(command, { silent: true }, (code, stdout, stderr) => {
                if (code === 0) {
                    resolve(stdout);
                }
                else {
                    resolve(`${stdout}\n${stderr}`);
                }
            });
        });
    }
};
