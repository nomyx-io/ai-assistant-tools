"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tools = exports.funcs = exports.schemas = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.schemas = [];
exports.funcs = {};
exports.tools = [];
function getTools() {
    return {
        schemas: exports.schemas,
        funcs: exports.funcs,
        tools: exports.tools
    };
}
module.exports = (config) => {
    const curFolder = path_1.default.join(__dirname, '.');
    // read all the files in the current folder
    const files = fs_1.default.readdirSync(curFolder);
    // remove files not ending with js and index.js
    const jsFiles = files.filter(f => f.endsWith('.js') && !f.startsWith('index'));
    for (const jsFile of jsFiles) {
        const jsFilePath = path_1.default.join(curFolder, jsFile);
        const jsFileContent = require(jsFilePath)(config, getTools);
        if (!jsFileContent['schema'] || !jsFileContent['function']) {
            continue;
        }
        exports.tools.push(jsFileContent);
        const schema = jsFileContent.schema;
        const func = jsFileContent.function;
        if (schema) {
            exports.schemas.push(schema);
        }
        if (func) {
            exports.funcs[schema.function.name] = func;
        }
    }
    return {
        schemas: exports.schemas,
        funcs: exports.funcs,
        tools: exports.tools
    };
};
exports.default = module.exports;
