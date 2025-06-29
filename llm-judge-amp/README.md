# LLM Code Judge

A TypeScript implementation of an LLM-based code judging system, inspired by Thorsten Ball's "Judging Code" blog post. This tool uses the Gemini CLI to evaluate code against specified constraints and provides a numerical score.

## Features

- **Code Evaluation**: Judges code based on customizable constraints
- **Scoring System**: Provides scores from 0-5 based on constraint fulfillment
- **TypeScript Support**: Built with TypeScript for type safety
- **Gemini Integration**: Uses the Gemini CLI tool for LLM responses
- **Color Output**: Visual feedback with colored scoring

## Requirements

- [Bun](https://bun.sh/) runtime
- `gemini` CLI tool configured with your API

## Setup

1. Install dependencies:
```bash
bun install
```

2. Ensure the `gemini` CLI tool is properly configured and available in your PATH

## Usage

### Basic Usage

1. Place your code to judge in `data/code-to-judge`
2. Run the judge:
```bash
bun run index.ts
```

### Judging Good TypeScript Code

To test with a well-written TypeScript example:
```bash
bun run judge-good.ts
```

### Custom Constraints

Edit the `assertions` array in `index.ts` to define your own constraints:

```typescript
const assertions = [
  "[MUST] The code should be valid TypeScript",           // Required constraint
  "[MUST] Functions should have proper type annotations", // Required constraint  
  "Code should include error handling",                   // Nice-to-have
  "Should use modern ES6+ features",                      // Nice-to-have
  "Should have clear variable names"                      // Nice-to-have
];
```

## Scoring Criteria

- **5**: All must-have + all nice-to-have constraints met
- **4**: All must-have + majority of nice-to-have constraints met  
- **3**: All must-have + some nice-to-have constraints met
- **2**: All must-have constraints met but failed some nice-to-have
- **1**: Some must-have constraints met
- **0**: No must-have constraints met or invalid code

Constraints marked with `[MUST]` are required for a passing score.

## Files

- `index.ts` - Main judging logic
- `judge-good.ts` - Example with well-written TypeScript code
- `prompts/judge.md` - LLM prompt template
- `data/code-to-judge` - Default code sample (basic JavaScript)
- `data/good-code.ts` - Well-written TypeScript example

## How It Works

1. Reads code from the specified file
2. Formats the code and constraints into a structured prompt
3. Sends the prompt to Gemini via the CLI tool
4. Parses the response to extract score and feedback
5. Displays results with color-coded scoring

The prompt template guides the LLM to provide structured analysis including:
- Brief code analysis
- List of constraints met
- List of constraints not met  
- Final numerical score

## Example Output

```
========= Result =======
Message: Code Analysis: The TypeScript code defines a User interface, 
functions with proper type annotations and error handling...

Constraints Met:
- [MUST] The code is valid TypeScript
- [MUST] Functions have proper type annotations
- Code includes error handling
- Uses modern ES6+ features
- Variable names are clear

Constraints Not Met:
- None

Score: 5
```
