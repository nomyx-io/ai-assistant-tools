const fs = require('fs')
module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'file_insert_text_at_pos',
            description: 'Insert text in a file at the given position',
            parameters: {
                type: 'object',
                properties: {
                    path: {
                        type: 'string',
                        description: 'The path of the file to insert text in'
                    },
                    text: {
                        type: 'string',
                        description: 'The text to insert'
                    },
                    position: {
                        type: 'string',
                        description: ''
                    }
                },
                required: []
            }
        },
    },
    function: (path: string, position: any, textToInsert: string) => {
        try {
            if(!fs.existsSync(path)) {
                return `File not found`;
            }
            const inputText = fs.readFileSync(path, 'utf8');
            const result = inputText.slice(0, position) + textToInsert + inputText.slice(position);
            fs.writeFileSync(path, result)
            return `text inserted in file`;
        } catch (error: any) {
            return `Error calling API: ${error.message}`;
        }
    }
});

