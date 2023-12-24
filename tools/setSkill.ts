import * as fs from 'fs';
import * as util from 'util';
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
    function: async ({ skill, skillDetail }: any) => {
        try {
            if (!fs.existsSync(`./skills.json`)) {
                fs.writeFileSync(`./skills.json`, '{}');
            }
            const sf = fs.readFileSync(`./skills.json`, 'utf8');
            const skills = JSON.parse(sf.toString());
            skills[skill] = skillDetail;
            fs.writeFileSync(`./skills.json`, JSON.stringify(skills));
            return `Successfully set skill ${skill}}`
        } catch (err: any) {
            return JSON.stringify(err.message);
        }
    }
}