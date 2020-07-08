import fs from 'fs';
import path from 'path';

const makeFullFilePath = (randomPath) => {
  if (randomPath.startsWith('/')) {
    return randomPath;
  }
  if (randomPath.startsWith('~')) {
    return path.join(process.env.home, randomPath);
  }
  return path.join(process.cwd(), randomPath);
};

const getFileExtension = (filepath) => path.extname(filepath);

const getFileContents = (fullFilePath) => fs.readFileSync(fullFilePath, 'utf-8');

export { makeFullFilePath, getFileExtension, getFileContents };
