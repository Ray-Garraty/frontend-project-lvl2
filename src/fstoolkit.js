/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFileFormat = (filepath) => path.extname(filepath).slice(1);
export const buildFilePath = (...paths) => path.resolve(__dirname, ...paths);
export const getFileContents = (fullFilePath) => fs.readFileSync(fullFilePath, 'utf-8').trim();
