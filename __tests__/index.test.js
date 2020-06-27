import { test, expect } from '@jest/globals';
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
const getResult = (pathToBeforeFile, pathToAfterFile) => genDiff(pathToBeforeFile, pathToAfterFile).trim();
const getAnswer = (filename) => readFile(filename).trim();

test('Processing first pair of .json files...', () => {
  testNumber = 1;
  pathToBeforeFile = getFixturePath(`before${testNumber}.json`);
  pathToAfterFile = getFixturePath(`after${testNumber}.json`);
  result = getResult(pathToBeforeFile, pathToAfterFile);
  answer = getAnswer(`answer${testNumber}.json`);
  expect(result).toBe(answer);
});

test('Processing second pair of .json files...', () => {
  testNumber = 2;
  pathToBeforeFile = getFixturePath(`before${testNumber}.json`);
  pathToAfterFile = getFixturePath(`after${testNumber}.json`);
  result = getResult(pathToBeforeFile, pathToAfterFile);
  answer = getAnswer(`answer${testNumber}.json`);
  expect(result).toBe(answer);
});

test('Processing third pair of .json files...', () => {
  testNumber = 3;
  pathToBeforeFile = getFixturePath(`before${testNumber}.json`);
  pathToAfterFile = getFixturePath(`after${testNumber}.json`);
  result = getResult(pathToBeforeFile, pathToAfterFile);
  answer = getAnswer(`answer${testNumber}.json`);
  expect(result).toBe(answer);
});

test('Processing first pair of .yml files...', () => {
  testNumber = 1;
  pathToBeforeFile = getFixturePath(`before${testNumber}.yml`);
  pathToAfterFile = getFixturePath(`after${testNumber}.yml`);
  result = getResult(pathToBeforeFile, pathToAfterFile);
  answer = getAnswer(`answer${testNumber}.yml`);
  expect(result).toBe(answer);
});

test('Processing second pair of .yml files...', () => {
  testNumber = 2;
  pathToBeforeFile = getFixturePath(`before${testNumber}.yml`);
  pathToAfterFile = getFixturePath(`after${testNumber}.yml`);
  result = getResult(pathToBeforeFile, pathToAfterFile);
  answer = getAnswer(`answer${testNumber}.yml`);
  expect(result).toBe(answer);
});
