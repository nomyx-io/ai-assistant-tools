"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'execute_batch_edit_operations',
            description: 'execute a series of edit operations on the file at the given path *** USE THIS TOOL FOR TEXT EDITING!!! ***',
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
                                    description: 'The name of the operation to execute. Supported operations: replace, remove, insert, append, prepend'
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
                    path: {
                        type: 'string',
                        description: 'The path to the file to edit.'
                    }
                },
                required: ['operations', 'path']
            }
        },
    },
    function: async ({ operations, path }) => {
        try {
            if (!fs_1.default.existsSync(path)) {
                return `Error: File not found at path ${path}`;
            }
            let text = fs_1.default.readFileSync(path, 'utf8');
            text = executeBatchOperations(text, operations);
            fs_1.default.writeFileSync(path, text);
            return `Successfully executed batch edit operations on file at path ${path}`;
        }
        catch (error) {
            return `Error: ${error.message}`;
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
        case 'insert':
            return insert;
        case 'append':
            return append;
        case 'prepend':
            return prepend;
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
function insert(text, parameters) {
    const { index, value } = parameters;
    return text.slice(0, index) + value + text.slice(index);
}
function append(text, parameters) {
    const { value } = parameters;
    return text + value;
}
function prepend(text, parameters) {
    const { value } = parameters;
    return value + text;
}
