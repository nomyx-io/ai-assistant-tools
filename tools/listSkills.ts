import fs from 'fs';
module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'list_learned_skills',
            description: 'list all the learned skills in the agent',
            parameters: {
            }
        },
    },
    function: async () => {
        try {
            if (!fs.existsSync(`./skills.json`)) {
                fs.writeFileSync(`./skills.json`, '{}');
            }
            const skills = JSON.parse(fs.readFileSync(`./skills.json`, 'utf-8'));
            return JSON.stringify(Object.keys(skills))
        } catch (err: any) {
            return JSON.stringify(err.message);
        }
    }
})