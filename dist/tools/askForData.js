"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
module.exports = (config) => ({
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
    function: async ({ data, greeting }) => {
        try {
            const dataToGather = data.split(',');
            const gatheredData = {};
            const rl = readline_1.default.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            if (!greeting)
                greeting = '\NPlease provide the following data:';
            console.log(greeting);
            for (const data of dataToGather) {
                const answer = await new Promise((resolve) => {
                    rl.question(`Please enter the value for ${data}: `, (answer) => {
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
            fs_1.default.writeFileSync(`./config.json`, JSON.stringify(newConfig, null, 4));
            return JSON.stringify(gatheredData);
        }
        catch (err) {
            return JSON.stringify(err.message);
        }
    }
});
