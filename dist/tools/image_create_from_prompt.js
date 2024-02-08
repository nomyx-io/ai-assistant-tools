"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const openai_1 = __importDefault(require("openai"));
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'image_create_from_prompt',
            description: 'create an image from a text prompt',
            type: 'object',
            properties: {
                prompt: {
                    type: 'string',
                    description: 'The prompt to use to generate the image'
                }
            },
            required: ['prompt']
        },
    },
    function: async function ({ prompt }) {
        try {
            const openai = new openai_1.default(config.openai_api_key);
            const images = await openai.images.generate({
                model: "dall-e-3",
                prompt: prompt,
                response_format: "b64_json"
            });
            for (const image of images.data) {
                let buffer;
                image.b64_json && (buffer = Buffer.from(image.b64_json, 'base64'));
                const path = `./${Date.now()}.png`;
                buffer && fs_1.default.writeFileSync(path, buffer);
                return path;
            }
        }
        catch (err) {
            return JSON.stringify(err.message);
        }
    }
});
