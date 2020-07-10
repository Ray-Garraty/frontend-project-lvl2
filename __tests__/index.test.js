import {
  test,
  expect,
  beforeAll,
} from '@jest/globals';
import genDiff from '../index';
import { getFixturePath, getFileContents } from '../src/fstoolkit.js';

const extensions = ['json', 'yml', 'ini'];
const formats = ['stylish', 'plain', 'json'];
const testTable = extensions.flatMap((ext) => formats.map((format) => [ext, format]));
const expectedFileContents = {};

beforeAll(() => {
  formats.forEach((format) => {
    expectedFileContents[format] = getFileContents(getFixturePath(`expected_${format}`));
  });
});

test.each(testTable)('Testing genDiff function...', (ext, format) => {
  const result = genDiff(getFixturePath(`1.${ext}`), getFixturePath(`2.${ext}`), format);
  // Не смог разобраться, как здесь можно применить %s.
  // Вроде пишут, что он удобен при использовании внутри console.log.
  // Могу здесь сделать string.replace('1.%s', ext),
  // но не совсем понимаю, что это даст... Вроде и так всё работает)
  expect(result).toBe(expectedFileContents[format]);
});
