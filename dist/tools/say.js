"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const playht_1 = __importDefault(require("playht"));
const fs_1 = require("fs");
function getNonce() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
var player = require('play-sound')({});
module.exports = {
    schema: {
        "type": 'function',
        "function": {
            "name": 'say_text',
            "description": 'say the text using text-to-speech',
            "parameters": {
                "type": 'object',
                "properties": {
                    "text": {
                        "type": 'string',
                        "description": 'the text to say',
                    },
                    "voice": {
                        "type": 'string',
                        "description": 'the voice to use (can be \'male\' or \'female\'). If not specified, the default male voice will be used',
                    }
                },
                "required": ['text']
            }
        }
    },
    function: async ({ text, voice }) => {
        if (!voice) {
            voice = 'male';
        }
        else if (voice === 'male') {
            voice = process.env.PLAY_HT_MALE_VOICE;
        }
        else if (voice === 'female') {
            voice = process.env.PLAY_HT_FEMALE_VOICE;
        }
        // Initialize PlayHT API
        playht_1.default.init({
            apiKey: process.env.PLAY_HT_AUTHORIZATION,
            userId: process.env.PLAY_HT_USER_ID
        });
        const GenerationOptions = {
            voiceEngine: "PlayHT2.0-turbo",
            voiceId: voice
        };
        // Warm up the network caching and voice
        const warmUpStream = await playht_1.default.stream("warm up", GenerationOptions);
        await new Promise((resolve, reject) => {
            warmUpStream.on("data", resolve);
            warmUpStream.on("(error: any)", reject);
        });
        // split the text into sentences
        const sentences = text.split(/[.!?]/g).filter((sentence) => sentence.length > 0);
        const consumeSentence = async () => {
            const sentence = sentences.shift();
            if (!sentence)
                return `done`;
            const musicFileName = getNonce() + ".mp3";
            const fileStream = (0, fs_1.createWriteStream)(musicFileName);
            const stream = await playht_1.default.stream(sentence, GenerationOptions);
            stream.on("data", (chunk) => fileStream.write(chunk));
            stream.on("end", () => {
                fileStream.end();
                console.log(`speaking: ${sentence}`);
                player.play(musicFileName, () => {
                    consumeSentence();
                });
            });
            stream.on("(error: any)", () => consumeSentence);
        };
        await consumeSentence();
    }
};
