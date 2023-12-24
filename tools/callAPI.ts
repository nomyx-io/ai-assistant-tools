import axios from 'axios';
module.exports = {
    schema: {
        type: 'function',
        function: {
            name: 'call_external_API',
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
    function: async ({ url, method, request_params = {} }: any) => {
        try {
            const response = await axios({ method, url, data: request_params });
            const ret = JSON.stringify(response.data);
            return ret;
        } catch (error: any) {
            return `Error calling external API: ${error.message}`;
        }
    }
}