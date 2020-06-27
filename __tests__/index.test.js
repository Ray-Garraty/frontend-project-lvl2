import { beforeAll, test, expect } from '@jest/globals';
import path from 'path';
import { dirname } from 'path';
import fs from 'fs';
import genDiff from '../index';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let pathToBeforeFile;
let pathToAfterFile;
let result;
let answer;
let testNumber;

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), "utf8");
const getResult = (pathToBeforeFile, pathToAfterFile) => genDiff(pathToBeforeFile, pathToAfterFile).split('\n').join('').trim();
const getAnswer = (filename) => readFile(filename).split('\n').join('').trim();

test('Processing first pair of files...', () => {
  testNumber = 1;
  pathToBeforeFile = getFixturePath(`before${testNumber}.json`);
  pathToAfterFile = getFixturePath(`after${testNumber}.json`);
  result = getResult(pathToBeforeFile, pathToAfterFile);
  answer = getAnswer(`answer${testNumber}.json`);
  expect(result).toBe(answer);
});

test('Processing second pair of files...', () => {
  testNumber = 2;
  pathToBeforeFile = getFixturePath(`before${testNumber}.json`);
  pathToAfterFile = getFixturePath(`after${testNumber}.json`);
  result = getResult(pathToBeforeFile, pathToAfterFile);
  answer = getAnswer(`answer${testNumber}.json`);
  expect(result).toBe(answer);
});
