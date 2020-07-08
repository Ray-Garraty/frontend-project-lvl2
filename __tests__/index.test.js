/* eslint-disable no-underscore-dangle */

import {
  test,
  expect,
  beforeAll,
} from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../index';
import { parseFile } from '../src/parsers.js';
import { getFileContents } from '../src/utilities.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// честно признаться, я так и не въехал, почему __dirname лучше, чем process.cwd().
// Оба работают, выполняют свою задачу. Но не вижу преимуществ у __dirname перед process.cwd
// Зато вижу у __dirname явный недостаток: необходимость глушить функции линтера.
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let testTable;
let expectedFileContents;

beforeAll(() => {
  const extensions = ['json', 'yml', 'ini'];
  const formats = ['stylish', 'plain', 'json'];
  testTable = extensions.flatMap((ext) => formats.map((format) => [ext, format]));
  expectedFileContents = {};
  formats.forEach((format) => {
    expectedFileContents[format] = getFileContents(getFixturePath(`expected_${format}`));
  });
});

test('Testing genDiff function...', () => {
  testTable.forEach(([ext, format]) => {
    const result = genDiff(getFixturePath(`1.${ext}`), getFixturePath(`2.${ext}`), format);
    const expected = parseFile(expectedFileContents[format], '');
    expect(result).toBe(expected);
  });
});
