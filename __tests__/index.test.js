import {
  test,
  expect,
  beforeAll,
} from '@jest/globals';
import genDiff from '../index';
import { buildFullPath, readData } from '../src/fstoolkit.js';

const extensions = ['json', 'yml', 'ini'];
const formats = ['stylish', 'plain', 'json'];
const testTable = extensions.flatMap((ext) => formats.map((format) => [ext, format]));
const expected = {};
const buildFixturePath = (filename) => buildFullPath('..', '__fixtures__', filename);

beforeAll(() => {
  formats.forEach((format) => {
    expected[format] = readData(buildFixturePath(`expected_${format}`)).trim();
  });
});

test.each(testTable)('Testing genDiff function...', (ext, format) => {
  const result = genDiff(buildFixturePath(`1.${ext}`), buildFixturePath(`2.${ext}`), format);
  expect(result).toBe(expected[format]);
});
