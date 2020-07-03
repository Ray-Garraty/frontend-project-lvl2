import {
  test,
  expect,
  beforeAll,
  beforeEach,
} from '@jest/globals';
import path from 'path';
import process from 'process';
import fs from 'fs';
import genDiff from '../index';

const getFixturePath = (fileName) => path.join(process.cwd(), '__fixtures__', fileName);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const getContentFromExpectedFile = (outputFormat) => {
  const filename = `expected.${outputFormat}`;
  return readFile(filename).trim();
};

const getResult = (fileExt, outputFormat) => {
  const firstFileName = `1.${fileExt}`;
  const secondFileName = `2.${fileExt}`;
  const pathToFirstFile = getFixturePath(firstFileName);
  const pathToSecondFile = getFixturePath(secondFileName);
  return genDiff(pathToFirstFile, pathToSecondFile, outputFormat);
};

let format;
let expected;
let formatsStack;

beforeAll(() => {
  formatsStack = ['json', 'plain', 'stylish'];
});
beforeEach(() => {
  format = formatsStack.pop();
  expected = getContentFromExpectedFile(format);
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
