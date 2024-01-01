import fs from 'fs';
import readline from 'readline';
const inquirer = require('inquirer');
const path = require('path');

function parseInput(input: any) {
  // If input is a valid JSON string, parse it; otherwise, it's a file path
  try {
    return JSON.parse(input);
  } catch (e) {
    // Read file and parse JSON content
    return JSON.parse(fs.readFileSync(input, 'utf-8'));
  }
}

function getQuestions(questionsArray: any) {
  return questionsArray.map((questionData: any) => {
    switch (questionData.type) {
      case 'multiplechoice':
        return {
          type: 'list',
          name: questionData.question, // Using the question as the unique "name"
          message: questionData.question,
          choices: questionData.values,
        };
      case 'truefalse':
        return {
          type: 'confirm',
          name: questionData.question,
          message: questionData.question,
        };
      case 'fillintheblank':
        return {
          type: 'input',
          name: questionData.question,
          message: questionData.question,
        };
      default:
        throw new Error(`Unsupported question type: ${questionData.type}`);
    }
  });
}

module.exports = (config: any) => ({
    schema: {
        type: 'function',
        function: {
            name: 'ask_questions',
            description: 'ask the user for values for the given comma-delimited list of data then update the config.json with with the values',
            parameters: {
                type: 'array',
                input: {
                    type: 'object',
                    properties: {
                        question: {
                            type: 'string',
                            description: 'The question to ask the user'
                        },
                        type: {
                            type: 'string',
                            description: 'The type of question to ask the user',
                            enum: ['multiplechoice', 'truefalse', 'fillintheblank']
                        },
                        values: {
                            type: 'array',
                            description: 'The possible values for the question. Only used for multiplechoice questions'
                        }
                    },
                    required: ['question', 'type']
                },
                required: ['data']
            }
        },
    },
    function: async (properties: any) => {
        const input = properties

        // Exit if input is not provided
        if (!input) {
          console.error('Please provide the JSON questions block or file path as a command-line argument.');
          process.exit(1);
        }
      
        const questionsArray = parseInput(input);
        const questions = getQuestions(questionsArray);

        inquirer.prompt(questions).then((answers: any) => {
          const results = questionsArray.map((questionData: any) => ({
            ...questionData,
            answer: answers[questionData.question],
          }));
          return answers.push(results);
        }).then((answers: any) => {
            console.log(answers);
            return JSON.stringify(answers);
        })
        .catch((error: any) => {
          console.error('An error occurred:', error);
        });
    }
})