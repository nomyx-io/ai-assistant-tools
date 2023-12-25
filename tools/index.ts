import fs from 'fs';
import path from 'path';

export const schemas: any = []
export const funcs: any = {}
export const tools: any = []


module.exports = (config: any) => {

    const curFolder = path.join(__dirname, '.');

    // read all the files in the current folder
    const files = fs.readdirSync(curFolder);
    
    // remove files not ending with js and index.js
    const jsFiles = files.filter(f => f.endsWith('.js') && !f.startsWith('index'));

    for(const jsFile of jsFiles) {
        const jsFilePath = path.join(curFolder, jsFile);
        const jsFileContent = require(jsFilePath)(config)
        
        if(!jsFileContent['schema'] || !jsFileContent['function']) {
            continue;
        }
        tools.push(jsFileContent);
        const schema = jsFileContent.schema;
        const func = jsFileContent.function;
        if(schema) {
            schemas.push(schema);
        }
        if(func) {
            funcs[schema.function.name] = func;
        }
    }
    

    return {
        schemas,
        funcs,
        tools
    }
}