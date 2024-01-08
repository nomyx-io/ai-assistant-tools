import fs from 'fs';
module.exports = (config: any) => ({
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
    function: async ({ operations, path }: any) => {
        try {
            if(!fs.existsSync(path)) {
                return `Error: File not found at path ${path}`;
            }
            let text = fs.readFileSync(path, 'utf8');
            text = executeBatchOperations(text, operations);
            fs.writeFileSync(path, text);
            return `Successfully executed batch edit operations on file at path ${path}`
        } catch (error: any) {
            return `Error: ${error.message}`
        }
    }
})

function executeBatchOperations(inputText: string, operations: any) {
    let text = inputText;
    for (const operation of operations) {
        const { name, parameters } = operation;
        const operationFunction = getOperationFunction(name);
        text = operationFunction(text, parameters);
    }
    return text;
}

function getOperationFunction(name: string) {
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

function replace(text: string, parameters: any) {
    const { find, replace } = parameters;
    return text.replace(find, replace);
}

function remove(text: string, parameters: any) {
    const { find } = parameters;
    return text.replace(find, '');
}

function insert(text: string, parameters: any) {
    const { index, value } = parameters;
    return text.slice(0, index) + value + text.slice(index);
}

function append(text: string, parameters: any) {
    const { value } = parameters;
    return text + value;
}

function prepend(text: string, parameters: any) {
    const { value } = parameters;
    return value + text;
}