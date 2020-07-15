import {
  test,
  expect,
  beforeAll,
} from '@jest/globals';
import genDiff from '../index';
import { buildFilePath, extractFileContents } from '../src/fstoolkit.js';

const extensions = ['json', 'yml', 'ini'];
const formats = ['stylish', 'plain', 'json'];
const testTable = extensions.flatMap((ext) => formats.map((format) => [ext, format]));
const expected = {};
const getFixturePath = (filename) => buildFilePath('..', '__fixtures__', filename);

beforeAll(() => {
  formats.forEach((format) => {
    expected[format] = extractFileContents(getFixturePath(`expected_${format}`)).trim();
  });
});

test.each(testTable)('Testing genDiff function...', (ext, format) => {
  const result = genDiff(getFixturePath(`1.${ext}`), getFixturePath(`2.${ext}`), format);
  expect(result).toBe(expected[format]);
});
