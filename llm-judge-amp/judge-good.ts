#!/usr/bin/env bun

import { readFileSync, writeFileSync } from 'fs';
import { spawnSync } from 'child_process';

interface Judgement {
  score: number;
  message: string;
}

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

async function getGeminiResponse(prompt: string): Promise<string> {
  const tempFile = '/tmp/gemini-prompt.txt';
  writeFileSync(tempFile, prompt);
  
  const result = spawnSync('sh', ['-c', `cat ${tempFile} | gemini`], {
    encoding: 'utf8'
  });
  
  if (result.error) {
    throw result.error;
  }
  
  if (result.status !== 0) {
    throw new Error(`Gemini process exited with code ${result.status}: ${result.stderr}`);
  }
  
  return result.stdout.trim();
}

function judgeCode(code: string, assertions: string[]): Promise<Judgement> {
  const fencedCode = `\`\`\`typescript\n${code}\n\`\`\``;
  
  const formattedAssertions = assertions
    .map(a => `- ${a}`)
    .join('\n');
  
  const promptTemplate = readFileSync('prompts/judge.md', 'utf-8');
  const prompt = promptTemplate
    .replace('<code>', fencedCode)
    .replace('<assertions>', formattedAssertions);
  
  return getGeminiResponse(prompt).then(response => {
    const lines = response.trim().split('\n');
    const lastLine = lines[lines.length - 1];
    const score = parseFloat(lastLine);
    
    if (isNaN(score)) {
      throw new Error(`Failed to parse score from response: ${lastLine}`);
    }
    
    const message = lines.slice(0, -1).join('\n').trim();
    
    return {
      score,
      message
    };
  });
}

async function main() {
  try {
    const assertions = [
      "[MUST] The code should be valid TypeScript",
      "[MUST] Functions should have proper type annotations",
      "Code should include error handling",
      "Should use modern ES6+ features",
      "Should have clear variable names"
    ];
    
    const code = readFileSync('data/good-code.ts', 'utf-8');
    
    const result = await judgeCode(code, assertions);
    
    console.log('========= Result =======');
    console.log(`Message: ${result.message}`);
    console.log();
    console.log(`Score: ${result.score < 2.0 ? RED : GREEN}${result.score}${RESET}`);
    console.log();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
