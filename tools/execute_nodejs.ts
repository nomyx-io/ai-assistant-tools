import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'execute_nodejs',
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
    function: async ({ js }: any) => {
        return new Promise((resolve, reject) => {
            try {
                const fileName = path.join(__dirname, new Date().getTime() + ".js");
                fs.writeFileSync(fileName, js);
                exec(`node ${fileName}`, ((error: any, stdout, stderr) => {
                    fs.unlinkSync(fileName);
                    if (error) {
                        resolve(error.message);
                    } else if (stderr) {
                        resolve(stderr);
                    } else {
                        resolve(JSON.stringify(stdout));
                    }
                } ));
            } catch (err: any) {
                resolve(err.message);
            }
        });
    }
})