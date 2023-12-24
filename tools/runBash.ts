import shell from 'shelljs';
import highlight from 'cli-highlight';

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
    function: async ({ command }: any) => {
        return new Promise((resolve, reject) => {
            shell.exec(command, { silent: true }, (code: any, stdout: any, stderr: any) => {
                if (code === 0) {
                    resolve(stdout);
                } else {
                    resolve(`${stdout}\n${stderr}`)
                }
            });
        });
    }
}