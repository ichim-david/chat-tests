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
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

function runTest(testName: string, assertions: string[]) {
  console.log(`\n${BLUE}=== ${testName} ===${RESET}`);
  console.log(`Assertions: ${assertions.length}`);
  assertions.forEach((assertion, i) => {
    console.log(`  ${i + 1}. ${assertion}`);
  });
  
  try {
    const codeToJudge = readFileSync(join(__dirname, 'data', 'code-to-judge'), 'utf-8');
    const result = judgeCode(codeToJudge, assertions);
    
    console.log(`\n${YELLOW}Result:${RESET}`);
    console.log(`Message: ${result.message}`);
    console.log(`Score: ${result.score < 2.0 ? RED : GREEN}${result.score}${RESET}\n`);
    
    return result.score;
  } catch (error) {
    console.error(`${RED}Error: ${error instanceof Error ? error.message : error}${RESET}`);
    return -1;
  }
}

function main() {
  console.log(`${BLUE}LLM Code Judge - Test Scenarios${RESET}`);
  console.log('Testing different constraint combinations...\n');

  // Test 1: Perfect score scenario (original)
  const perfectAssertions = [
    "[MUST] The year of the copyright notice has to be 2025.",
    "[MUST] The link to the Twitter profile has to be to @thorstenball",
    "Menu item linking to Register Spill must be marked as new",
    "Should mention that Thorsten is happy to receive emails",
    "Has photo of Thorsten",
  ];
  
  // Test 2: Missing a nice-to-have constraint
  const missingNiceToHaveAssertions = [
    "[MUST] The year of the copyright notice has to be 2025.",
    "[MUST] The link to the Twitter profile has to be to @thorstenball",
    "Menu item linking to Register Spill must be marked as new",
    "Should mention that Thorsten is happy to receive emails",
    "Has photo of Thorsten",
    "Should mention that Thorsten is happy to receive phone calls", // This will fail
  ];
  
  // Test 3: Missing a MUST constraint
  const missingMustAssertions = [
    "[MUST] The year of the copyright notice has to be 2025.",
    "[MUST] The link to the Twitter profile has to be to @thorstenball",
    "[MUST] Should mention that Thorsten is happy to receive phone calls", // This will fail
    "Menu item linking to Register Spill must be marked as new",
    "Has photo of Thorsten",
  ];
  
  // Test 4: Only MUST constraints (all met)
  const onlyMustAssertions = [
    "[MUST] The year of the copyright notice has to be 2025.",
    "[MUST] The link to the Twitter profile has to be to @thorstenball",
  ];

  // Run all tests
  const scores = [
    runTest("Perfect Score Test", perfectAssertions),
    runTest("Missing Nice-to-Have Test", missingNiceToHaveAssertions),
    runTest("Missing MUST Constraint Test", missingMustAssertions),
    runTest("Only MUST Constraints Test", onlyMustAssertions),
  ];

  // Summary
  console.log(`${BLUE}=== Test Summary ===${RESET}`);
  console.log(`Test 1 (Perfect): ${scores[0] === 5 ? GREEN + 'PASS' : RED + 'FAIL'} (Score: ${scores[0]})${RESET}`);
  console.log(`Test 2 (Missing Nice-to-Have): ${scores[1] >= 3 && scores[1] < 5 ? GREEN + 'PASS' : RED + 'FAIL'} (Score: ${scores[1]})${RESET}`);
  console.log(`Test 3 (Missing MUST): ${scores[2] <= 1 ? GREEN + 'PASS' : RED + 'FAIL'} (Score: ${scores[2]})${RESET}`);
  console.log(`Test 4 (Only MUST): ${scores[3] === 5 ? GREEN + 'PASS' : RED + 'FAIL'} (Score: ${scores[3]})${RESET}`);
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
