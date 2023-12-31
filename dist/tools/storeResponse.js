"use strict";
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'store_response',
            description: 'Stores the ChatGPT response in ChromaDB as embeddings',
            parameters: {
                type: 'object',
                properties: {
                    responseText: {
                        type: 'string',
                        description: 'ChatGPT response to be stored'
                    }
                },
                required: ['responseText']
            }
        },
    },
    function: async ({ responseText }) => {
        // Convert response text to embeddings and store in ChromaDB
        // const responseEmbeddings = embeddingFunction(responseText);
        // const collection = chromadb.getCollection('conversationData');
        // collection.add({ documents: [responseText], embeddings: [responseEmbeddings] });
        // return { success: true };
        return `not implemented yet`;
    }
});
