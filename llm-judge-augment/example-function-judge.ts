#!/usr/bin/env bun

import { judgeCode } from './judge.ts';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ANSI color codes
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

function main() {
  console.log(`${BLUE}LLM Code Judge - Function Example${RESET}`);
  console.log('Judging a JavaScript factorial function...\n');

  // Assertions for the factorial function
  const assertions = [
    "[MUST] Function should handle the base case (n = 0 or n = 1)",
    "[MUST] Function should handle negative input with an error",
    "[MUST] Function should use recursion",
    "Function should have clear variable names",
    "Function should include example usage",
    "Function should have comments explaining the logic",
  ];

  try {
    // Read the JavaScript function
    const codeToJudge = readFileSync(join(__dirname, 'data', 'sample-function.js'), 'utf-8');
    
    console.log('Code being judged:');
    console.log('---');
    console.log(codeToJudge);
    console.log('---\n');
    
    console.log('Assertions:');
    assertions.forEach((assertion, i) => {
      console.log(`  ${i + 1}. ${assertion}`);
    });
    console.log('');
    
    // Judge the code
    const result = judgeCode(codeToJudge, assertions);
    
    // Display results with color
    console.log('========= Result =======');
    console.log(`Message: ${result.message}\n`);
    console.log(`Score: ${result.score < 2.0 ? RED : GREEN}${result.score}${RESET}\n`);
    
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
