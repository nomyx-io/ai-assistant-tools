"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const curFolder = path_1.default.join(__dirname, '.');
// read all the files in the current folder
const files = fs_1.default.readdirSync(curFolder);
// remove files not ending with js and index.js
const jsFiles = files.filter(f => f.endsWith('.js') && !f.startsWith('index'));
const schemas = [];
const funcs = {};
const tools = [];
for (const jsFile of jsFiles) {
    const jsFilePath = path_1.default.join(curFolder, jsFile);
    const jsFileContent = require(jsFilePath);
    if (!jsFileContent['schema'] || !jsFileContent['function']) {
        continue;
    }
    tools.push(jsFileContent);
    const schema = jsFileContent.schema;
    const func = jsFileContent.function;
    if (schema) {
        schemas.push(schema);
    }
    if (func) {
        funcs[schema.function.name] = func;
    }
}
module.exports = {
    schemas,
    funcs,
    tools
};
