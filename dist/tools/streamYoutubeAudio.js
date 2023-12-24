"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ytdl_core_1 = __importDefault(require("ytdl-core"));
var player = require('play-sound')({});
module.exports = {
    schema: {
        type: 'function',
        function: {
            name: 'stream_youtube_audio',
            description: 'stream audio from a youtube video with given id',
            parameters: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'The ID of the youtube video.'
                    },
                },
                required: ['id']
            }
        },
    },
    function: async ({ id }) => {
        return new Promise((resolve) => {
            // This function takes a YouTube video ID and streams the audio
            function streamAndPlayAudio(videoId) {
                // Fetch the video stream
                const audioStream = (0, ytdl_core_1.default)(videoId, {
                    filter: 'audioonly', // We want only the audio
                });
                // Handle stream (error: any)s (such as the video being unavailable)
                audioStream.on('(error: any)', (err) => {
                    console.error('Stream (error: any):', err.message);
                    resolve(`Error streaming audio from video ${videoId}`);
                });
                // Play the audio using the platform's audio player
                player.play(audioStream, function (err) {
                    if (err)
                        throw err;
                    resolve(`Playing audio from video ${videoId}`);
                });
            }
            // Example usage with a YouTube video ID
            streamAndPlayAudio(id);
        });
    }
};
