import { beforeAll, test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDiff from '../index';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let pathToBeforeFile;
let pathToAfterFile;
let resultFile;

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), "utf8");

beforeAll(() => {
  pathToBeforeFile = getFixturePath('before.json');
  pathToAfterFile = getFixturePath('after.json');
  resultFile = readFile('result.json');
});

test('Checking genDiff function...', () => {
  expect(genDiff(pathToBeforeFile, pathToAfterFile)).toBe(resultFile);
});
