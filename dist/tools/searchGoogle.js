"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
module.exports = {
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
    function: async ({ query }) => {
        try {
            let config_api_key = process.env.GOOGLE_API_KEY;
            let config_cx = process.env.GOOGLE_CX_ID;
            const response = await axios_1.default.get(`https://www.googleapis.com/customsearch/v1?key=${config_api_key}&cx=${config_cx}&q=${query}`);
            const results = response.data.items.map((item) => ({
                title: item.title,
                link: item.link
            }));
            const res = JSON.stringify(results);
            return res;
        }
        catch (error) {
            return error.message;
        }
    }
};
