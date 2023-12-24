module.exports = {
    schema: {
        type: 'function',
        function: {
            name: 'replace_text_in_string',
            description: 'replace text in a string with other text',
            parameters: {
                type: 'object',
                properties: {
                    content: {
                        type: 'string',
                        description: 'The string to replace text in'
                    },
                    find: {
                        type: 'string',
                        description: 'The text to find'
                    },
                    replace: {
                        type: 'string',
                        description: 'The text to replace'
                    },
                    caseSensitive: {
                        type: 'boolean',
                        description: 'Whether to match case'
                    },
                    regex: {
                        type: 'boolean',
                        description: 'Whether to use regex'
                    },
                    global: {
                        type: 'boolean',
                        description: 'Whether to replace all instances'
                    }
                },
                required: ['content', 'find', 'replace']
            }
        },
    },
    function: async ({ content, find, replace, caseSensitive, regex, global }: any) => {
        try {
            let flags = 'g';
            if (!global) {
                flags = '';
            }
            if (caseSensitive) {
                flags += 'i';
            }
            let regexObj = undefined;
            if (regex) {
                regexObj = new RegExp(find, flags);
            } else {
                regexObj = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
            }
            const ret = content.replace(regexObj, replace);
            return ret;
        } catch (error: any) {
            return `Error replacing text in string: ${error.message}`
        }
    }
}