import {
  test,
  expect,
  beforeAll,
  beforeEach,
} from '@jest/globals';
import path from 'path';
import genDiff from '../index';
import getFileContents from '../src/parsers.js';

const getResult = (fileExt, outputFormat) => {
  const getFixturePath = (number) => path.join(process.cwd(), '__fixtures__', `${number}.${fileExt}`);
  const pathToFirstFile = getFixturePath(1, fileExt);
  const pathToSecondFile = getFixturePath(2, fileExt);
  return genDiff(pathToFirstFile, pathToSecondFile, outputFormat);
};

let format;
let expected;
let formatsStack;
let expectedFilePath;

beforeAll(() => {
  formatsStack = ['json', 'plain', 'stylish'];
});
beforeEach(() => {
  format = formatsStack.pop();
  expectedFilePath = path.join(process.cwd(), '__fixtures__', `expected_${format}`);
  expected = getFileContents(expectedFilePath);
});
test('Comparing 3 types of files in stylish output format...', () => {
  expect(getResult('json', format)).toBe(expected);
  expect(getResult('yml', format)).toBe(expected);
  expect(getResult('ini', format)).toBe(expected);
});
test('Comparing 3 types of files in plain output format...', () => {
  expect(getResult('json', format)).toBe(expected);
  expect(getResult('yml', format)).toBe(expected);
  expect(getResult('ini', format)).toBe(expected);
});
test('Comparing 3 types of files in JSON output format...', () => {
  expect(getResult('json', format)).toBe(expected);
  expect(getResult('yml', format)).toBe(expected);
  expect(getResult('ini', format)).toBe(expected);
});
