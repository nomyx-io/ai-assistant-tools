"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'find_text_position',
            description: 'Find the position of the given text in the input text',
            parameters: {
                type: 'object',
                properties: {
                    text: {
                        type: 'string',
                        description: 'The text to search for'
                    },
                    pattern: {
                        type: 'string',
                        description: 'The pattern to search for'
                    },
                    startSearchPos: {
                        type: 'number',
                        description: 'The position to start searching from'
                    }
                },
                required: ['text', 'pattern']
            }
        },
    },
    function: (text, pattern, startSearchPos = 0) => {
        try {
            let index = text.indexOf(pattern, startSearchPos);
            return index + '';
        }
        catch (error) {
            return `Error calling API: ${error.message}`;
        }
    }
});
