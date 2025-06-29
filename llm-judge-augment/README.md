# LLM Code Judge

A TypeScript implementation of the code judging system described in [Thorsten Ball's blog post](https://registerspill.thorstenball.com/p/judging-code). This system uses LLMs to evaluate code against a set of constraints/assertions.

## Features

- **TypeScript implementation** - Modern, type-safe code
- **Bun runtime** - Fast execution without additional installations
- **Gemini CLI integration** - Uses your existing `gemini -p` CLI tool
- **Flexible assertions** - Support for MUST-have and nice-to-have constraints
- **Colored output** - Visual feedback with red/green scoring
- **Reliable scoring** - Consistent 0-5 scoring system

## Prerequisites

- [Bun](https://bun.sh/) installed
- `gemini -p` CLI tool configured with your API

## Usage

### Basic Usage

```bash
# Run with default assertions and test data
bun run judge.ts

# Or use the npm script
npm run judge
```

### Custom Usage

You can modify the assertions and code to judge by editing:

1. **Assertions**: Edit the `assertions` array in `judge.ts`
2. **Code to judge**: Replace the content in `data/code-to-judge`

### Example Assertions

```typescript
const assertions = [
  "[MUST] The year of the copyright notice has to be 2025.",
  "[MUST] The link to the Twitter profile has to be to @thorstenball",
  "Menu item linking to Register Spill must be marked as new",
  "Should mention that Thorsten is happy to receive emails",
  "Has photo of Thorsten",
];
```

## Project Structure

```
.
├── judge.ts              # Main TypeScript file
├── prompts/
│   └── judge.md          # LLM prompt template
├── data/
│   └── code-to-judge     # Code file to evaluate
├── package.json          # Project configuration
└── README.md            # This file
```

## Scoring System

- **5**: All must-have + all nice-to-have constraints met
- **4**: All must-have + majority of nice-to-have constraints met  
- **3**: All must-have + some nice-to-have constraints met
- **2**: All must-have constraints met but failed some nice-to-have
- **1**: Some must-have constraints met
- **0**: No must-have constraints met or invalid code

## API

### `judgeCode(code: string, assertions: string[]): Judgement`

Evaluates code against assertions and returns a judgment.

### `getGeminiResponse(prompt: string): string`

Calls the gemini CLI tool and returns the response.

### `Judgement` interface

```typescript
interface Judgement {
  score: number;    // 0-5 score
  message: string;  // Detailed evaluation message
}
```

## Example Output

```
========= Result =======
Message: 1. Analysis:
Simple personal website with navigation menu, about section, and contact information. Clean HTML structure with proper meta tags and styling links.

2. Constraints met:
- Copyright year is 2025
- Twitter profile links to @thorstenball
- Register Spill menu item is marked with "new!"
- Explicitly states "I love getting email from you"
- Has profile picture (avatar.jpg)

3. Constraints not met:
- None

4. Final score:
All must-have constraints are met (copyright year and Twitter handle) and all nice-to-have constraints are met (Register Spill marking, email happiness, photo).

Score: 5
```

## Customization

### Adding New Assertions

Edit the `assertions` array in `judge.ts`:

```typescript
const assertions = [
  "[MUST] Your required constraint here",
  "Your optional constraint here",
  // ... more assertions
];
```

### Changing the Code to Judge

Replace the content in `data/code-to-judge` with your code file.

### Modifying the Prompt

Edit `prompts/judge.md` to customize how the LLM evaluates code.

## License

MIT
