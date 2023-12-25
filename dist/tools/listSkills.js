"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'list_learned_skills',
            description: 'list all the learned skills in the agent',
            parameters: {}
        },
    },
    function: async () => {
        try {
            if (!fs_1.default.existsSync(`./skills.json`)) {
                fs_1.default.writeFileSync(`./skills.json`, '{}');
            }
            const skills = JSON.parse(fs_1.default.readFileSync(`./skills.json`, 'utf-8'));
            return JSON.stringify(Object.keys(skills));
        }
        catch (err) {
            return JSON.stringify(err.message);
        }
    }
});
