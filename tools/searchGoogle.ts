import axios from "axios";
module.exports = (config: any) => ({
    schema: {
        type: "function",
        function: {
            name: "search_Google",
            description: "perform a google search using the given query",
            parameters: {
                type: "object",
                properties: {
                    query: {
                        type: "string",
                        description: "The query to search for"
                    }
                },
                required: ["query"]
            }
        }
    },
    function: async ({ query }: any) => {
        try {
            let config_api_key = process.env.GOOGLE_API_KEY;
            let config_cx =  process.env.GOOGLE_CX_ID;
            const response = await
                axios.get(`https://www.googleapis.com/customsearch/v1?key=${config_api_key}&cx=${config_cx}&q=${query}`);
            const results = response.data.items.map((item: any) => ({
                title: item.title,
                link: item.link
            }));
            const res = JSON.stringify(results);
            return res;
        } catch (error: any) {
            return error.message;
        }
    }
})