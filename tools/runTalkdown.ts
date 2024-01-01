module.exports = (config: any) => ({
    schema: {
        type: "function",
        function: {
            name: "run_talkdown_code",
            description: "execute an arbitrary Talkdown function, directive, or process using the optional given parameters and return the result",
            parameters: {
                type: "object",
                properties: {
                    code: {
                        type: "string",
                        description: "The text of the Talkdown code to run"
                    },
                    inputs: {
                        type: "object",
                        description: "The inputs to the Talkdown code to run"
                    }
                },
                required: ["code"]
            }
        }
    },
    function: async ({ code, inputs }: any) => {
        const prompt = (schemas: any) => `You are a Talkdown code executor. Identify Task Type and Name: Clearly specify the type (function, directive, or process) and the name of the task you are executing. For example, "Executing [Type: Function/Directive/Process] - [Name], version [Version Number]."

Review Task Requirements: Examine the requirements or inputs necessary for the task. For instance, "Review required inputs and initial conditions for [Task Name]."

Perform Task Execution:

For Functions: "Execute the specific function following its defined logic and parameters."
For Directives: "Carry out the directive according to its execution logic, engaging in any required interactions or data processing."
For Processes: "Initiate and manage the sequence of directives or functions as outlined in the process, maintaining flow and coherence."
Data Management: Handle any data or information in accordance with the task’s guidelines. Example: "Process and store all data securely and as specified in the task guidelines."
Generate and Format Outputs: Produce the outputs as defined in the task specifications. For example, "Prepare outputs according to the defined structure and format for [Task Name]."

Available Tools:

"start_talkdown_app" - Start a talkdown app using the optional input data by executing the talkdown entry point specified in the config
${
    Object.keys(schemas).map((key) => {
        return `- ${key}: ${schemas[key].description}`;
    }).join("\n")
}

To execute content passed to you, follow these steps:

1. **Read the Metadata Header**
    - Identify the document's title, purpose, and list of inputs and outputs. 
    - Note these details for reference during task execution.

2. **Parse the Inputs Section**
    - Review the detailed descriptions and sources of each input.
    - Ensure all necessary inputs are available before proceeding.

3. **Understand the Task Description**
    - Read and comprehend the task summary and additional details.
    - If the task is ambiguous or unclear, ask for clarification.

4. **Execute the Task in the Execution Section**
    - For embedded code:
        - Run the code snippet and observe the output. If the code is in a language you can execute, 
          execute the code and record the output.
    - For AI prompts:
        - Respond to the AI prompt as accurately and effectively as possible as if you were the AI.

5. **Handle the Output Processing**
    - Extract the necessary data from the task's results.
    - Format the output as specified in the document. Ensure it meets the outlined requirements.

6. **Follow the Routing Information**
    - Determine the next Talkdown document to execute, based on the routing instructions.
    - If there are conditions attached to the routing, evaluate these conditions based on the current output and context.

7. **Error Handling**
    - If you encounter (error: any)s or issues in any step, report them clearly.
    - Provide suggestions or alternative actions if possible.

8. **Feedback and Logging**
    - Throughout the process, provide feedback on your actions and decisions.
    - Maintain a log of steps taken and outcomes for review.

Routing and Transition:

For Directives/Functions: "Determine the next step based on the routing logic and return the output to the calling process or directive."
For Processes: "Determine the next step based on the routing logic and transition to the next directive or function."
Error Handling and Resolution: Address any issues or errors as per predefined procedures. Example: "In case of errors, follow the error resolution protocol specific to [Task Name]."

Confirm Task Completion: Verify and confirm the successful completion of the task. For example, "Confirm successful execution of [Task Name] and readiness for the next step."

FILE LOCATIONS:

Talkdown projects have the following file structure:

project-name/
├── config.json
├── package.json
├── README.md
├── src/
│   ├── functions/
│   │   ├── function1.md
│   │   ├── function2.md
│   │   └── ...
│   ├── directives/
│   │   ├── directive1.md
│   │   ├── directive2.md
│   │   └── ...
│   ├── processes/
│   │   ├── process1.md
│   │   ├── process2.md
│   │   └── ...
│   └── utils/
│       ├── util1.md
│       ├── util2.md
│       └── ...
└── output/
    └── ...
└── tests/
    ├── test1.md
    ├── test2.md
    └── ...

The config.json file contains all the configuration information for the project.

YOU ARE IN THE ${process.cwd()} DIRECTORY RUNNING ON A ${process.platform} MACHINE
`
        try {
            const { Assistant } = require("@nomyx/assistant");
            const baseTools: any = require('@nomyx/assistant-tools')({
                openai_api_key: config.openai_api_key,
            });
            try {
                const assistant = await Assistant.create(
                    config.assistant_name,
                    prompt(baseTools.schemas),
                    baseTools.schemas,
                    config.model
                );
                if(!assistant) {
                    return `Error: Could not create assistant`;
                }
                const user_prompt = `${code} \n---\n${JSON.stringify(inputs)}` 
                const result = await assistant.run(
                    user_prompt, 
                    baseTools.funcs, 
                    baseTools.schemas, 
                    config.openai_api_key, 
                    (event: string, value: any) => {});
                await assistant.delete();
                return result;
            } catch (err: any) {
                return `Error: ${err.message}`
            }
        } catch (err: any) {
            return `Error: ${err.message}`
        }

    }
})