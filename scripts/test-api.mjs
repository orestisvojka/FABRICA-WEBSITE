import fs from 'fs';
import { getQuolyBotSystemInstruction } from '../src/data/quolybotKnowledge.js';

const env = fs.readFileSync('.env', 'utf-8');
const match = env.match(/VITE_GEMINI_API_KEY\s*=\s*['"]?([^'"\r\n]+)/);
const key = match[1].trim();

const systemInstruction = getQuolyBotSystemInstruction();

const requestBody = {
  system_instruction: {
    parts: [{ text: systemInstruction }],
  },
  contents: [
    {
      role: 'user',
      parts: [{ text: "How much does a website cost, and why shouldn't I just hire someone cheap on Fiverr?" }],
    },
  ],
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 1000,
  },
};

const models = [
  'gemini-2.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash-lite',
  'gemini-2.5-pro',
  'gemini-3.8-flash',
  'gemini-3.6-flash',
  'gemini-flash-lite-latest'
];

for (const model of models) {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const data = await res.json();
    if (res.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.log(`\n>>> SUCCESS with ${model}!`);
      console.log(data.candidates[0].content.parts[0].text);
      break;
    } else {
      console.log(`Model ${model}:`, data.error?.message || 'No candidate text');
    }
  } catch (e) {
    console.log(`Model ${model} network error:`, e.message);
  }
}
