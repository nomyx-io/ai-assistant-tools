import fs from 'fs';
import util from 'util';
import OpenAI from 'openai';


module.exports = (config: any) => ({
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
    function: async function ({prompt}: any) {
        try {
            const openai = new OpenAI(config.openai_api_key);
            const images = await openai.images.generate({ 
                model: "dall-e-3", 
                prompt: prompt,
                response_format: "b64_json"
            });
            for (const image of images.data) {
                let buffer; image.b64_json && (buffer = Buffer.from(image.b64_json, 'base64'));
                const path = `./${Date.now()}.png`;
                buffer && fs.writeFileSync(path, buffer);
                return path;
            }
        } catch (err: any) {
            return JSON.stringify(err.message);
        }
    }
})