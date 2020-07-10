/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (somepath) => path.resolve(somepath);
const getFileFormat = (filepath) => path.extname(filepath).slice(1);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFileContents = (fullFilePath) => fs.readFileSync(fullFilePath, 'utf-8').trim();

export {
  getFilePath,
  getFileFormat,
  getFixturePath,
  getFileContents,
};
