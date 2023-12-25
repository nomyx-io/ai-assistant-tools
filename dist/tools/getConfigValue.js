"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Example config file path; you might want to set your specific path or logic to determine it.
const CONFIG_FILE_PATH = path_1.default.join(__dirname, 'config.json');
/**
 * This tool retrieves a configuration value by key from a JSON config file.
 *
 * @toolType utility
 * @hasSideEffect false
 * @param {string} key - The config key to retrieve.
 * @returns {string|number|boolean|object|undefined} The value corresponding to the key, or undefined if the key does not exist.
 */
function getConfigValue(key) {
    let config = {};
    if (fs_1.default.existsSync(CONFIG_FILE_PATH)) {
        config = JSON.parse(fs_1.default.readFileSync(CONFIG_FILE_PATH, 'utf8'));
    }
    return JSON.stringify(config[key]);
}
module.exports = (config) => ({
    schema: {
        type: 'function',
        function: {
            name: 'get_config_value',
            description: 'get a configuration value by key',
            parameters: {
                type: 'object',
                properties: {
                    key: {
                        type: 'string',
                        description: 'The config key to get'
                    }
                },
                required: ['key']
            }
        },
    },
    function: getConfigValue
});
