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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const util = __importStar(require("util"));
const readdirAsync = util.promisify(fs.readdir);
module.exports = {
    schema: {
        type: 'function',
        function: {
            name: 'save_learned_skill',
            description: 'set the details of how to perform a skill',
            parameters: {
                type: 'object',
                properties: {
                    skill: {
                        type: 'string',
                        description: 'The name of the skill to get'
                    },
                    skillDetail: {
                        type: 'string',
                        description: 'The details of the skill'
                    }
                },
                required: ['skill', 'skillDetail']
            }
        },
    },
    function: async ({ skill, skillDetail }) => {
        try {
            if (!fs.existsSync(`./skills.json`)) {
                fs.writeFileSync(`./skills.json`, '{}');
            }
            const sf = fs.readFileSync(`./skills.json`, 'utf8');
            const skills = JSON.parse(sf.toString());
            skills[skill] = skillDetail;
            fs.writeFileSync(`./skills.json`, JSON.stringify(skills));
            return `Successfully set skill ${skill}}`;
        }
        catch (err) {
            return JSON.stringify(err.message);
        }
    }
};
