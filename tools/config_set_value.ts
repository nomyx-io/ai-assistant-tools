import * as fs from 'fs';
import * as path from 'path';

// Example config file path; you might want to set your specific path or logic to determine it.
const CONFIG_FILE_PATH = path.join(__dirname,  'config.json');


module.exports = (config: any) => ({
  schema: {
      type: 'function',
      function: {
          name: 'config_set_value',
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
  function: async function ({key, value}: any) {
    try {
        config[key] = value;
        if(!fs.existsSync(CONFIG_FILE_PATH)) {
            fs.writeFileSync(CONFIG_FILE_PATH, '{}', 'utf8');
        }
        fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), 'utf8');
        return `Set config key ${key} to ${value}`;
    } catch (err: any) {
        return `Error: ${err.message}`
    }
  }
})