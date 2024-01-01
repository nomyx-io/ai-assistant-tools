"use strict";
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'get_config_value',
            description: 'get a configuration value by key',
            parameters: {
                type: 'object',
                properties: {
                    key: {
                        type: 'string',
                        description: 'The config key to get'
                    }
                },
                required: ['key']
            }
        },
    },
    function: async function ({ key }) {
        return `${key}=${config[key] || ""}`;
    }
});
