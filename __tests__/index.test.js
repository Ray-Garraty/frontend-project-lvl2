import { test, expect } from '@jest/globals';
import path from 'path';
import process from 'process';
import fs from 'fs';
import genDiff from '../index';
import stringifyObject from '../src/formatters/stylish';

const getFixturePath = (fileName) => path.join(process.cwd(), '__fixtures__', fileName);
const genFileName = (fileType, testNum, fileExtension) => `${fileType}${testNum}.${fileExtension}`;
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const getAnswerFromFile = (testNumber, fileExt) => {
  const filename = genFileName('answer', testNumber, fileExt);
  return readFile(filename).trim();
};

const getResult = (testNumber, fileExt, outputFormat) => {
  const beforeFileName = genFileName('before', testNumber, fileExt);
  const afterFileName = genFileName('after', testNumber, fileExt);
  const pathToBeforeFile = getFixturePath(beforeFileName);
  const pathToAfterFile = getFixturePath(afterFileName);
  return genDiff(pathToBeforeFile, pathToAfterFile, outputFormat);
};

let result;
let answer;
let fileExt;
let testNumber;
let outputFormat;

test('Processing first pair of .json files...', () => {
  testNumber = 1;
  fileExt = 'json';
  outputFormat = 'stylish';
  result = getResult(testNumber, fileExt, outputFormat);
  answer = getAnswerFromFile(testNumber, fileExt);
  expect(result).toBe(answer);
});

test('Processing second pair of .json files...', () => {
  testNumber = 2;
  fileExt = 'json';
  outputFormat = 'stylish';
  result = getResult(testNumber, fileExt, outputFormat);
  answer = getAnswerFromFile(testNumber, fileExt);
  expect(result).toBe(answer);
});

test('Processing third pair of .json files...', () => {
  testNumber = 3;
  fileExt = 'json';
  outputFormat = 'stylish';
  result = getResult(testNumber, fileExt, outputFormat);
  answer = getAnswerFromFile(testNumber, fileExt);
  expect(result).toBe(answer);
});

test('Processing fourth pair of .json files...', () => {
  testNumber = 4;
  fileExt = 'json';
  outputFormat = 'stylish';
  result = getResult(testNumber, fileExt, outputFormat);
  answer = getAnswerFromFile(testNumber, fileExt);
  expect(result).toBe(answer);
});

test('Processing fifth pair of .json files...', () => {
  testNumber = 5;
  fileExt = 'json';
  outputFormat = 'plain';
  result = getResult(testNumber, fileExt, outputFormat);
  answer = getAnswerFromFile(testNumber, fileExt);
  expect(result).toBe(answer);
});

test('Processing sixth pair of .json files...', () => {
  testNumber = 6;
  fileExt = 'json';
  outputFormat = 'json';
  result = getResult(testNumber, fileExt, outputFormat);
  answer = getAnswerFromFile(testNumber, fileExt);
  expect(result).toBe(answer);
});

test('Processing first pair of .yml files...', () => {
  testNumber = 1;
  fileExt = 'yml';
  outputFormat = 'stylish';
  result = getResult(testNumber, fileExt, outputFormat);
  answer = getAnswerFromFile(testNumber, fileExt);
  expect(result).toBe(answer);
});

test('Processing second pair of .yml files...', () => {
  testNumber = 2;
  fileExt = 'yml';
  outputFormat = 'stylish';
  result = getResult(testNumber, fileExt, outputFormat);
  answer = getAnswerFromFile(testNumber, fileExt);
  expect(result).toBe(answer);
});

test('Processing first pair of .ini files...', () => {
  testNumber = 1;
  fileExt = 'ini';
  outputFormat = 'stylish';
  result = getResult(testNumber, fileExt, outputFormat);
  answer = getAnswerFromFile(testNumber, fileExt);
  expect(result).toBe(answer);
});

test('Processing second pair of .ini files...', () => {
  testNumber = 2;
  fileExt = 'ini';
  outputFormat = 'stylish';
  result = getResult(testNumber, fileExt, outputFormat);
  answer = getAnswerFromFile(testNumber, fileExt);
  expect(result).toBe(answer);
});

test('Checking function stringifyObject...', () => {
  const obj = {
    fruits: {
      bananas: 5,
      oranges: 6,
      apples: 10,
      grapes: {
        seedy: 10,
        seedless: 5,
      },
    },
    vegetables: {
      potatoes: 7,
      mushrooms: {
        white: 10, grey: 12,
      },
      tomatoes: 'none',
    },
    meat: {
      chicken: 'plenty',
      beef: 'not a lot',
      pork: 'almost none',
    },
    bread: {
      brown: 2,
      white: 'none',
    },
    candies: 'none',
    beverages: 'cola',
    spoiled: false,
  };
  result = stringifyObject(obj);
  answer = readFile('answer.txt').trim();
  expect(result).toBe(answer);
});
