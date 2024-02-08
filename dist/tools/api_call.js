"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'api_call',
            description: 'make an external API call at the given url using the given request method with given request params and return the response',
            parameters: {
                type: 'object',
                properties: {
                    url: {
                        type: 'string',
                        description: 'The URL to call.'
                    },
                    method: {
                        type: 'string',
                        description: 'The HTTP method to use.'
                    },
                    request_params: {
                        type: 'object',
                        description: 'The request parameters to send.',
                        additionalProperties: true
                    }
                },
                required: ['url', 'method']
            }
        },
    },
    function: async ({ url, method, request_params = {} }) => {
        try {
            const response = await (0, axios_1.default)({ method, url, data: request_params });
            const ret = JSON.stringify(response.data);
            return ret;
        }
        catch (error) {
            return `Error calling external API: ${error.message}`;
        }
    }
});
