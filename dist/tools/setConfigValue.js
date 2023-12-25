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
// Example config file path; you might want to set your specific path or logic to determine it.
const CONFIG_FILE_PATH = path.join(__dirname, 'config.json');
/**
 * This tool sets a configuration value by key to a JSON config file.
 *
 * @toolType utility
 * @hasSideEffect true
 * @param {string} key - The config key to set.
 * @param {string|number|boolean|object} value - The value to set for the key.
 * @returns {void}
 */
function setConfigValue({ key, value }) {
    let config = {};
    if (fs.existsSync(CONFIG_FILE_PATH)) {
        config = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, 'utf8'));
    }
    config[key] = value;
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), 'utf8');
    return `Set config key ${key} to ${value}`;
}
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'set_config_value',
            description: 'set a configuration value by key',
            parameters: {
                type: 'object',
                properties: {
                    key: {
                        type: 'string',
                        description: 'The config key to set'
                    },
                    value: {
                        type: 'string',
                        description: 'The value to set for the key'
                    }
                },
                required: ['key', 'value']
            }
        },
    },
    function: setConfigValue
});
