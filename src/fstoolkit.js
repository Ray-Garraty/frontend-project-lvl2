/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getFileFormat = (filepath) => path.extname(filepath).slice(1);
export const buildFilePath = (...paths) => path.resolve(__dirname, ...paths);
export const extractFileContents = (fullFilePath) => fs.readFileSync(fullFilePath, 'utf-8');
