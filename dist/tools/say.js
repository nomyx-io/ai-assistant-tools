"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fs_1 = require("fs");
const PlayHT = __importStar(require("playht"));
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
        PlayHT.init({
            apiKey: process.env.PLAY_HT_AUTHORIZATION,
            userId: process.env.PLAY_HT_USER_ID
        });
        const GenerationOptions = {
            voiceEngine: "PlayHT2.0-turbo",
            voiceId: voice
        };
        // Warm up the network caching and voice
        const warmUpStream = await PlayHT.stream("warm up", GenerationOptions);
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
            const stream = await PlayHT.stream(sentence, GenerationOptions);
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
