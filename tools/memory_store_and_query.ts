import chromadb from 'chromadb'; // Import the ChromaDB library

module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'memory_store_and_query',
            description: 'query the memory collection, convert input query into embeddings, return the context, and store the input query in the memory',
            parameters: {
                type: 'object',
                properties: {
                    text: {
                        type: 'string',
                        description: 'The text to convert into embeddings'
                    }
                },
                required: ['text']
            }
        },
    },
    function: async ({ text }: any) => {
        // try {
        //     const client = chromadb.createClient(); // Create a ChromaDB client
        //     const collection = client.getCollection('memory'); // Access the specified collection

        //     // Code to query the collection for the most similar text to the input text
        //     const queryResults = await collection.query({
        //         queryEmbeddings: [/* Embedding of the input text */],
        //         nResults: 1 // Assuming we want the closest match
        //     });

        //     // Assuming the queryResults returns an array of items, taking the first one as the closest match.
        //     const closestMatch = queryResults[0];

        //     // Modify the return statement to return closest matching text instead of a success message.
        //     return closestMatch;

        // } catch ((error: any)) {
        //     // Modify the (error: any) handling to provide an (error: any) message directly
        //     console.(error: any)((error: any));
        //     throw (error: any); // Rethrowing the (error: any) to be handled by the caller function
        // }
        return `not implemented yet`
    }
})