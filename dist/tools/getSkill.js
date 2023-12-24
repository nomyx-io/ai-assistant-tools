"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const readdirAsync = util_1.default.promisify(fs_1.default.readdir);
module.exports = {
    schema: {
        type: 'function',
        function: {
            name: 'get_skill_details',
            description: 'get the details of how to perform a skill',
            parameters: {
                type: 'object',
                properties: {
                    skill: {
                        type: 'string',
                        description: 'The name of the skill to get'
                    }
                },
                required: ['skill']
            }
        },
    },
    function: async ({ skill }) => {
        try {
            if (!fs_1.default.existsSync(`./skills.json`)) {
                fs_1.default.writeFileSync(`./skills.json`, '{}');
            }
            const ff = fs_1.default.readFileSync(`./skills.json', 'utf8`);
            const skills = JSON.parse(ff.toString());
            const skillDetail = JSON.stringify(skills[skill]);
            return skillDetail;
        }
        catch (err) {
            return JSON.stringify(err.message);
        }
    }
};
