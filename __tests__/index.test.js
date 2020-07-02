import { test, expect } from '@jest/globals';
import path from 'path';
import process from 'process';
import fs from 'fs';
import genDiff from '../index';

const getFixturePath = (fileName) => path.join(process.cwd(), '__fixtures__', fileName);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const getAnswerFromFile = (fileExt, outputFormat) => {
  const filename = `answer.${outputFormat}.${fileExt}`;
  return readFile(filename).trim();
};

const getResult = (fileExt, outputFormat) => {
  const firstFileName = `1.${fileExt}`;
  const secondFileName = `2.${fileExt}`;
  const pathToFirstFile = getFixturePath(firstFileName);
  const pathToSecondFile = getFixturePath(secondFileName);
  return genDiff(pathToFirstFile, pathToSecondFile, outputFormat);
};

let result;
let answer;
let fileExt;
let outputFormat;

describe('Processing pair of .json files...', () => {
  fileExt = 'json';
  test('Testing output in stylish format...', () => {
    outputFormat = 'stylish';
    result = getResult(fileExt, outputFormat);
    answer = getAnswerFromFile(fileExt, outputFormat);
    expect(result).toBe(answer);
  });
  test('Testing output in plain format...', () => {
    outputFormat = 'plain';
    result = getResult(fileExt, outputFormat);
    answer = getAnswerFromFile(fileExt, outputFormat);
    expect(result).toBe(answer);
  });
  test('Testing output in JSON format...', () => {
    outputFormat = 'json';
    result = getResult(fileExt, outputFormat);
    answer = getAnswerFromFile(fileExt, outputFormat);
    expect(result).toBe(answer);
  });
});

describe('Processing pair of .ini files...', () => {
  fileExt = 'ini';
  test('Testing output in stylish format...', () => {
    outputFormat = 'stylish';
    result = getResult(fileExt, outputFormat);
    answer = getAnswerFromFile(fileExt, outputFormat);
    expect(result).toBe(answer);
  });
  test('Testing output in plain format...', () => {
    outputFormat = 'plain';
    result = getResult(fileExt, outputFormat);
    answer = getAnswerFromFile(fileExt, outputFormat);
    expect(result).toBe(answer);
  });
  test('Testing output in JSON format...', () => {
    outputFormat = 'json';
    result = getResult(fileExt, outputFormat);
    answer = getAnswerFromFile(fileExt, outputFormat);
    expect(result).toBe(answer);
  });
});

describe('Processing pair of .yml files...', () => {
  fileExt = 'yml';
  test('Testing output in stylish format...', () => {
    outputFormat = 'stylish';
    result = getResult(fileExt, outputFormat);
    answer = getAnswerFromFile(fileExt, outputFormat);
    expect(result).toBe(answer);
  });
  test('Testing output in plain format...', () => {
    outputFormat = 'plain';
    result = getResult(fileExt, outputFormat);
    answer = getAnswerFromFile(fileExt, outputFormat);
    expect(result).toBe(answer);
  });
  test('Testing output in JSON format...', () => {
    outputFormat = 'json';
    result = getResult(fileExt, outputFormat);
    answer = getAnswerFromFile(fileExt, outputFormat);
    expect(result).toBe(answer);
  });
});
