"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'execute_batch_edit_operations',
            description: 'execute a series of edit operations in the text in the given order',
            parameters: {
                type: 'object',
                properties: {
                    operations: {
                        type: 'array',
                        description: 'The operations to execute.',
                        items: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    description: 'The name of the operation to execute.'
                                },
                                parameters: {
                                    type: 'object',
                                    description: 'The parameters to pass to the operation.',
                                    additionalProperties: true
                                }
                            },
                            required: ['name']
                        }
                    },
                    text: {
                        type: 'string',
                        description: 'The text to execute the operations on.'
                    }
                },
                required: ['operations', 'text']
            }
        },
    },
    function: async ({ operations, text }) => {
        try {
            executeBatchOperations(text, operations);
            return `Success`;
        }
        catch (error) {
            return `Error calling external API: ${error.message}`;
        }
    }
});
function executeBatchOperations(inputText, operations) {
    let text = inputText;
    for (const operation of operations) {
        const { name, parameters } = operation;
        const operationFunction = getOperationFunction(name);
        text = operationFunction(text, parameters);
    }
    return text;
}
function getOperationFunction(name) {
    switch (name) {
        case 'replace':
            return replace;
        case 'remove':
            return remove;
        default:
            throw new Error(`Unknown operation: ${name}`);
    }
}
function replace(text, parameters) {
    const { find, replace } = parameters;
    return text.replace(find, replace);
}
function remove(text, parameters) {
    const { find } = parameters;
    return text.replace(find, '');
}
