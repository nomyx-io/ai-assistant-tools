import dotenv from "dotenv"; dotenv.config();
import * as PlayHT from "playht"
import fs from "fs";
var player = require('play-sound')({})

function getNonce() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

module.exports = (config: any) => ({
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
    function: async ({ text, voice }: any) => {
        const apiKey = config.playHT.apiKey;
        const userId = config.playHT.userId;
        const maleVoice = config.playHT.maleVoice;
        const femaleVoice = config.playHT.femaleVoice;
        if(!apiKey || !userId || !maleVoice || !femaleVoice) {
            const missing = [];
            if(!apiKey) missing.push('playHT.apiKey');
            if(!userId) missing.push('playHT.userId');
            if(!maleVoice) missing.push('playHT.maleVoice');
            if(!femaleVoice) missing.push('playHT.femaleVoice');
            return `Missing configuration: ${missing.join(', ')} in configuration file. Please ask the user to provide the missing configuration using the ask_for_data tool.`;
        }

        // Initialize PlayHT API
        PlayHT.init({
            apiKey: config.playHT.apiKey,
            userId: config.playHT.userId,
        } as any);

        async function speakSentence(sentence: string, voice: string) {
            if(!sentence) return;
            const stream = await PlayHT.stream(sentence, {
                voiceEngine: "PlayHT2.0-turbo",
                voiceId: voice === 'male' ? config.playHT.maleVoice : config.playHT.femaleVoice,
            });
            const chunks: any = [];
            stream.on("data", (chunk) => chunks.push(chunk));

            return new Promise((resolve, reject) => {
                stream.on("end", () => {
                    const buf = Buffer.concat(chunks);
                    // save the audio to a file
                    const filename = `${getNonce()}.mp3`;
                    fs.writeFileSync(filename, buf);
                    player.play(filename, function (err: any) {
                        fs.unlinkSync(filename);
                        resolve(`done`);
                    });
                });
            })
        }
        

        // split the text into sentences
        const sentences = text.split(/[.!?]/g).filter((sentence: string) => sentence.length > 0);
        const consumeSentence = async () => {
            return new Promise((resolve, reject) => {
                const loop = async (): Promise<any> => {
                    const sentence = sentences.shift();
                    if(!sentence) return resolve('done');
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