import fs from 'fs';
import readline from 'readline';

module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'ask_for_data',
            description: 'ask the user for values for the given comma-delimited list of data then update the config.json with with the values',
            parameters: {
                type: 'object',
                properties: {
                    greeting: {
                        type: 'string',
                        description: 'the greeting to say. use this field to customize the greeting. if not specified, the default greeting will be used'
                    },
                    data: {
                        type: 'string',
                        description: 'A comma-delimited list of data to ask for'
                    }
                },
                required: ['data']
            }
        },
    },
    function: async ({ data, greeting }: any) => {
        try {
            const dataToGather = data.split(',');
            const gatheredData: any = {};
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            if(!greeting) greeting = '\NPlease provide the following data:';
            console.log(greeting);
            for (const data of dataToGather) {
                const answer = await new Promise((resolve) => {
                    rl.question(`Please enter the value for ${data}: `, (answer: any) => {
                        resolve(answer);
                    });
                });
                const dataParts = data.split('.');
                let currentConfig = config;
                for (const dataPart of dataParts) {
                    currentConfig = currentConfig[dataPart];
                }
                gatheredData[data] = answer;
                currentConfig = answer;
            }
            rl.close();
            const newConfig = {
                ...config,
                ...gatheredData
            };
            fs.writeFileSync(`./config.json`, JSON.stringify(newConfig, null, 4));
            return JSON.stringify(gatheredData);
        } catch (err: any) {
            return JSON.stringify(err.message);
        }
    }
})