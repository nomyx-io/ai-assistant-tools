"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
//const hljs = import 'highlight.js';
module.exports = {
    schema: {
        type: "function",
        function: {
            name: "run_python_code",
            description: "execute arbitrary Python code and return the result",
            parameters: {
                type: "object",
                properties: {
                    python: {
                        type: "string",
                        description: "Python code to run"
                    }
                },
                required: ["python"]
            }
        }
    },
    function: async ({ python }) => {
        return new Promise((resolve, _reject) => {
            try {
                const fileName = path_1.default.join(__dirname, new Date().getTime() + ".py");
                fs_1.default.writeFileSync(fileName, python);
                (0, child_process_1.exec)(`python ${fileName}`, (error, stdout, stderr) => {
                    fs_1.default.unlinkSync(fileName);
                    if (error) {
                        resolve(error.message);
                    }
                    else if (stderr) {
                        resolve(JSON.stringify(stderr));
                    }
                    else {
                        resolve(JSON.stringify(stdout));
                    }
                });
            }
            catch (err) {
                resolve(err.message);
            }
        });
    }
};
