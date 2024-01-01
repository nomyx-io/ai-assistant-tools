module.exports = (config: any) => ({
    "name": "call_smart_contract",
    "description": "Connects to a configured network, calls a smart contract function, and returns the transaction details.",
    "inputSchema": {
      "networkName": {
        "type": "string",
        "description": "Name of the network to connect to (e.g., Ethereum, Binance Smart Chain)."
      },
      "contractName": {
        "type": "string",
        "description": "The name of the smart contract."
      },
      "contractAddress": {
        "type": "string",
        "description": "The address of the smart contract on the network."
      },
      "functionName": {
        "type": "string",
        "description": "The name of the function to call on the smart contract."
      },
      "functionParams": {
        "type": "array",
        "description": "Array of values to be passed as parameters to the smart contract function."
      },
      "privateKey": {
        "type": "string",
        "description": "The private key for the wallet, if needed for a transactional function call.",
        "optional": true
      },
      "mnemonic": {
        "type": "string",
        "description": "The mnemonic for the wallet, if private key is not provided and needed for a transactional function call.",
        "optional": true
      }
    },
    "outputSchema": {
      "transactionDetails": {
        "type": "object",
        "description": "The details of the transaction after the contract call is confirmed."
      }
    },
    "configurationKeys": {
      "networks": {
        "description": "Contains configuration details for different networks such as provider URLs and API keys."
      }
    },
    "implementation": {
      "dependencies": [
        {
          "name": "@ethersproject/providers",
          "version": "^5.0.0"
        },
        {
          "name": "ethers",
          "version": "^5.0.0"
        }
      ],
      "code": "<CODE_PLACEHOLDER>"
    }
  });