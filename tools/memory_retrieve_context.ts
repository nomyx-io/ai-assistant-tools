import chromadb from 'chromadb';
module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'memory_retrieve_context',
            description: 'Retrieves contextually relevant data from ChromaDB',
            parameters: {
                type: 'object',
                properties: {
                    embeddings: {
                        type: 'array',
                        description: 'Embeddings used for querying the database',
                        items: {
                            type: 'number',
                            description: 'Embedding value'
                        }
                    }
                },
                required: ['embeddings']
            }
        },
    },
    function: async ({ embeddings }: any) => {
        // Query ChromaDB using embeddings
        // const collection = await chromadb.getCollection('chromadb');
        // const queryResults = collection.query({ embeddings });
        //return { queryResults };
        return 'does nothing'
    }
})
