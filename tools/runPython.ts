import fs from "fs";
import path from "path";
import { exec } from "child_process";

//const hljs = import 'highlight.js';

module.exports = (config: any) => ({
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
    function: async ({ python }: any) => {
        return new Promise((resolve, _reject) => {
            try {
                const fileName = path.join(__dirname, new Date().getTime() + ".py");
                fs.writeFileSync(fileName, python);
                exec(`python ${fileName}`, (error: any, stdout: any, stderr: any) => {
                    fs.unlinkSync(fileName);
                    if (error) {
                        resolve(error.message);
                    } else if (stderr) {
                        resolve(JSON.stringify(stderr));
                    } else {
                        resolve(JSON.stringify(stdout));
                    }
                });
            } catch (err: any) {
                resolve(err.message);
            }
        });
    }
})