import fs from 'fs';
import util from 'util';
import OpenAI from 'openai';


module.exports = (config: any) => ({
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
    function: async function ({prompt}: any) {
        try {
            const openai = new OpenAI(config.openai_api_key);
            const image = await openai.images.generate({ model: "dall-e-3", prompt: "A cute baby sea otter" });
        } catch (err: any) {
            return JSON.stringify(err.message);
        }
    }
})