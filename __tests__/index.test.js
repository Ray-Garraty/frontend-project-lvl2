/* eslint-disable no-underscore-dangle */

import { test, expect, beforeEach } from '@jest/globals';
import path, { format } from 'path';
import { dirname } from 'path';
import fs from 'fs';
import genDiff from '../index';
import { fileURLToPath } from 'url';
import stringifyObject from '../src/stylish';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputFormat = 'stylish';
let result;
let answer;
let fileExt;
let testNumber;

const genFileName = (fileType, testNumber, fileExt) => `${fileType}${testNumber}.${fileExt}`;
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), "utf8");

const getAnswerFromFile = (testNumber, fileExt) => {
  const filename = genFileName('answer', testNumber, fileExt);
  return readFile(filename).trim();
};

const getResult = (testNumber, fileExt) => {
  const beforeFileName = genFileName('before', testNumber, fileExt);
  const afterFileName = genFileName('after', testNumber, fileExt);
  const pathToBeforeFile = getFixturePath(beforeFileName);
  const pathToAfterFile = getFixturePath(afterFileName);
  return genDiff(pathToBeforeFile, pathToAfterFile, outputFormat);
};

test('Processing first pair of .json files...', () => {
  testNumber = 1;
  fileExt = 'json';
  result = getResult(testNumber, fileExt);
  answer = getAnswerFromFile(testNumber, fileExt);
  expect(result).toBe(answer);
});

test('Processing second pair of .json files...', () => {
  testNumber = 2;
  fileExt = 'json';
  result = getResult(testNumber, fileExt);
  answer = getAnswerFromFile(testNumber, fileExt);
  expect(result).toBe(answer);
});

test('Processing third pair of .json files...', () => {
  testNumber = 3;
  fileExt = 'json';
  result = getResult(testNumber, fileExt);
  answer = getAnswerFromFile(testNumber, fileExt);
  expect(result).toBe(answer);
});

test('Processing fourth pair of .json files...', () => {
  testNumber = 4;
  fileExt = 'json';
  result = getResult(testNumber, fileExt);
  answer = getAnswerFromFile(testNumber, fileExt);
  expect(result).toBe(answer);
});

test('Processing first pair of .yml files...', () => {
  testNumber = 1;
  fileExt = 'yml';
  result = getResult(testNumber, fileExt);
  answer = getAnswerFromFile(testNumber, fileExt);
  expect(result).toBe(answer);
});

test('Processing second pair of .yml files...', () => {
  testNumber = 2;
  fileExt = 'yml';
  result = getResult(testNumber, fileExt);
  answer = getAnswerFromFile(testNumber, fileExt);
  expect(result).toBe(answer);
});

test('Processing first pair of .ini files...', () => {
  testNumber = 1;
  fileExt = 'ini';
  result = getResult(testNumber, fileExt);
  answer = getAnswerFromFile(testNumber, fileExt);
  expect(result).toBe(answer);
});

test('Processing second pair of .ini files...', () => {
  testNumber = 2;
  fileExt = 'ini';
  result = getResult(testNumber, fileExt);
  answer = getAnswerFromFile(testNumber, fileExt);
  expect(result).toBe(answer);
});

test('Checking function stringifyObject...', () => {
  const obj = {'fruits': {bananas: 5, oranges: 6, apples: 10, 'grapes': {'seedy': 10, 'seedless': 5}}, 'vegetables': {'potatoes': 7, 'mushrooms': {'white': 10, 'grey': 12}, 'tomatoes': 'none'}, 'meat': {'chicken': 'plenty', 'beef': 'not a lot', 'pork': 'almost none'}, 'bread': {'brown': 2, 'white': 'none'}, 'candies': 'none', 'beverages': 'cola', 'spoiled': false};
  const result = stringifyObject(obj);
  const answer = readFile('answer.txt').trim();
  expect(result).toBe(answer);
});
