import {
  test,
  expect,
  beforeAll,
} from '@jest/globals';
import genDiff from '../index';
import { buildFullPath, readFile } from '../src/fstoolkit.js';

const extensions = ['json', 'yml', 'ini'];
const formats = ['stylish', 'plain', 'json'];
const testTable = extensions.flatMap((ext) => formats.map((format) => [ext, format]));
const expected = {};
const buildFixturePath = (filename) => buildFullPath('..', '__fixtures__', filename);

beforeAll(() => {
  formats.forEach((format) => {
    const filepath = buildFixturePath(`expected_${format}`);
    expected[format] = readFile(filepath).trim();
  });
});

test.each(testTable)('Testing genDiff function when format is specified...', (ext, format) => {
  const filepath1 = buildFixturePath(`1.${ext}`);
  const filepath2 = buildFixturePath(`2.${ext}`);
  const result = genDiff(filepath1, filepath2, format);
  expect(result).toBe(expected[format]);
});

test.each(extensions)('Testing genDiff function when format is not specified...', (ext) => {
  const filepath1 = buildFixturePath(`1.${ext}`);
  const filepath2 = buildFixturePath(`2.${ext}`);
  const result = genDiff(filepath1, filepath2);
  expect(result).toBe(expected.stylish);
});
