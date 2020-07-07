import {
  test,
  expect,
  describe,
} from '@jest/globals';
import path from 'path';
import process from 'process';
import genDiff from '../index';
import getFileContents from '../src/parsers.js';

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);

describe('Running tests...', () => {
  const json = getFileContents(getFixturePath('expected_json'));
  const plain = getFileContents(getFixturePath('expected_plain'));
  const stylish = getFileContents(getFixturePath('expected_stylish'));
  const extensions = ['json', 'yml', 'ini'];
  const formatsAndExpectedFiles = { stylish, plain, json };
  const array = Object.entries(formatsAndExpectedFiles);
  const testTable = extensions.flatMap((ext) => array.map((item) => {
    const sourceFilesPaths = [getFixturePath(`1.${ext}`), getFixturePath(`2.${ext}`)];
    return [sourceFilesPaths, ...item];
  }));
  // пытался сделать testTable как положено в виде переменной, объявив её на уровне модуля,
  // но это не сработало, блок test.each её не видел,
  // поэтому пришлось её сделать константой внутри блока describe
  test.each(testTable)('Testing genDiff function...', ([filepath1, filepath2], format, expectedFileContent) => {
    expect(genDiff(filepath1, filepath2, format)).toBe(expectedFileContent);
  });
});
