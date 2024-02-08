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
const PlayHT = __importStar(require("playht"));
const fs_1 = __importDefault(require("fs"));
var player = require('play-sound')({});
function getNonce() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
module.exports = (config) => ({
    schema: {
        "type": 'function',
        "function": {
            "name": 'tts_speak',
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
        const apiKey = config.playHT.apiKey;
        const userId = config.playHT.userId;
        const maleVoice = config.playHT.maleVoice;
        const femaleVoice = config.playHT.femaleVoice;
        if (!apiKey || !userId || !maleVoice || !femaleVoice) {
            const missing = [];
            if (!apiKey)
                missing.push('playHT.apiKey');
            if (!userId)
                missing.push('playHT.userId');
            if (!maleVoice)
                missing.push('playHT.maleVoice');
            if (!femaleVoice)
                missing.push('playHT.femaleVoice');
            return `Missing configuration: ${missing.join(', ')} in configuration file. Please ask the user to provide the missing configuration using the ask_for_data tool.`;
        }
        // Initialize PlayHT API
        PlayHT.init({
            apiKey: config.playHT.apiKey,
            userId: config.playHT.userId,
        });
        async function speakSentence(sentence, voice) {
            if (!sentence)
                return;
            const stream = await PlayHT.stream(sentence, {
                voiceEngine: "PlayHT2.0-turbo",
                voiceId: voice === 'male' ? config.playHT.maleVoice : config.playHT.femaleVoice,
            });
            const chunks = [];
            stream.on("data", (chunk) => chunks.push(chunk));
            return new Promise((resolve, reject) => {
                stream.on("end", () => {
                    const buf = Buffer.concat(chunks);
                    // save the audio to a file
                    const filename = `${getNonce()}.mp3`;
                    fs_1.default.writeFileSync(filename, buf);
                    player.play(filename, function (err) {
                        fs_1.default.unlinkSync(filename);
                        resolve(`done`);
                    });
                });
            });
        }
        // split the text into sentences
        const sentences = text.split(/[.!?]/g).filter((sentence) => sentence.length > 0);
        const consumeSentence = async () => {
            return new Promise((resolve, reject) => {
                const loop = async () => {
                    const sentence = sentences.shift();
                    if (!sentence)
                        return resolve('done');
                    await speakSentence(sentence, voice);
                    return await loop();
                };
                return loop();
            });
        };
        await consumeSentence();
        return 'done';
    }
});
