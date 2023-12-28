"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'create_image_from_prompt',
            description: 'create an image from a text prompt',
            parameters: {
                type: 'object',
                parameters: {
                    type: 'object',
                    properties: {
                        prompt: {
                            type: 'string',
                            description: 'The prompt to use to generate the image'
                        }
                    },
                    required: ['path']
                }
            }
        },
    },
    function: async function ({ prompt }) {
        try {
            const openai = new openai_1.default(config.openai_api_key);
            const image = await openai.images.generate({ model: "dall-e-3", prompt: "A cute baby sea otter" });
        }
        catch (err) {
            return JSON.stringify(err.message);
        }
    }
});
