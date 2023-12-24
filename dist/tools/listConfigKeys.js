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
const path = __importStar(require("path"));
// Define the path to the config file
const CONFIG_FILE_PATH = path.join(__dirname, 'config.json');
/**
 * This tool retrieves a list of keys from the config file.
 *
 * @toolType utility
 * @hasSideEffect false
 * @returns {Array<string>} An array of all config keys from the config file.
 */
function listConfigKeys() {
    try {
        let keys = [];
        if (fs.existsSync(CONFIG_FILE_PATH)) {
            // Read and parse the config file
            const config = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, 'utf8'));
            // Retrieve all keys from the config object
            keys = Object.keys(config);
        }
        return JSON.stringify(keys);
    }
    catch (err) {
        return JSON.stringify(err.message);
    }
}
module.exports = {
    schema: {
        type: 'function',
        function: {
            name: 'list_config_keys',
            description: 'list all config keys',
            parameters: {}
        },
    },
    function: listConfigKeys
};
