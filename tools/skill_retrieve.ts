import fs from 'fs';
import util from 'util';
const readdirAsync = util.promisify(fs.readdir);

module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'skill_retrieve',
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
    function: async ({ skill }: any) => {
        try {
            if (!fs.existsSync(`./skills.json`)) {
                fs.writeFileSync(`./skills.json`, '{}');
            }
            const ff = fs.readFileSync(`./skills.json', 'utf8`)
            const skills = JSON.parse(ff.toString());
            const skillDetail = JSON.stringify(skills[skill]);
            return skillDetail;
        } catch (err: any) {
            return JSON.stringify(err.message);
        }
    }
})