import os from 'os';

module.exports = (config: any) => ({
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
    function: async ({ path }: any) => {
        try {
            os.homedir = path;
            return `new path: ${path}`;
        } catch ({error}: any) {
            return `Error changing home directory: ${error.message}`;
        }
    }
})