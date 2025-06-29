#!/usr/bin/env bun

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Judgement {
  score: number;
  message: string;
}

// ANSI color codes
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

/**
 * Call the gemini CLI tool to get an LLM response
 */
function getGeminiResponse(prompt: string): string {
  try {
    // Use gemini CLI with stdin input
    const result = execSync('gemini', {
      input: prompt,
      encoding: 'utf-8',
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer
    });
    return result.trim();
  } catch (error) {
    throw new Error(`Failed to get response from gemini CLI: ${error}`);
  }
}

/**
 * Judge code against a set of assertions using the LLM
 */
function judgeCode(code: string, assertions: string[]): Judgement {
  // Wrap code in fenced code block
  const fencedCode = `\`\`\`\n${code}\n\`\`\``;

  // Format assertions as bullet points
  const formattedAssertions = assertions
    .map((assertion) => `- ${assertion}`)
    .join('\n');

  // Load and format the prompt template
  const promptTemplate = readFileSync(
    join(__dirname, 'prompts', 'judge.md'),
    'utf-8',
  );
  const prompt = promptTemplate
    .replace('<code>', fencedCode)
    .replace('<assertions>', formattedAssertions);

  // Get response from LLM
  const response = getGeminiResponse(prompt);

  // Parse the response - score should be on the last line
  const lines = response.trim().split('\n');
  const scoreLine = lines[lines.length - 1];
  const score = parseFloat(scoreLine);

  if (isNaN(score) || score < 0 || score > 5) {
    throw new Error(
      `Failed to parse valid score from response. Got: "${scoreLine}"`,
    );
  }

  // Message is everything except the last line
  const message = lines.slice(0, -1).join('\n').trim();

  return {
    score,
    message,
  };
}

/**
 * Main function
 */
function main() {
  try {
    // Example assertions - you can modify these
    const assertions = [
      '[MUST] The year of the copyright notice has to be 2025.',
      '[MUST] The link to the Twitter profile has to be to @thorstenball',
      'Menu item linking to Register Spill must be marked as new',
      'Should mention that Thorsten is happy to receive emails',
      'Has photo of Thorsten',
    ];

    // Read code to judge from data directory
    const codeToJudge = readFileSync(
      join(__dirname, 'data', 'code-to-judge'),
      'utf-8',
    );

    // Judge the code
    const result = judgeCode(codeToJudge, assertions);

    // Display results with color
    console.log('========= Result =======');
    console.log(`Message: ${result.message}\n`);
    console.log(
      `Score: ${result.score < 2.0 ? RED : GREEN}${result.score}${RESET}\n`,
    );
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { judgeCode, getGeminiResponse, type Judgement };
