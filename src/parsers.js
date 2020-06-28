import fs from 'fs';
import ini from 'ini';
import path from 'path';
import yaml from 'js-yaml';
import process from 'process';

const parseFile = (filePath) => {
  const workingDir = process.cwd();
  const filePathResolved = filePath.startsWith('.') ? path.resolve(workingDir, filePath) : path.resolve(filePath);
  const fileContents = fs.readFileSync(filePathResolved, 'utf-8');
  const fileName = path.basename(filePathResolved);
  const extension = path.extname(fileName);
  let parser;
  switch (extension) {
    case '.yml':
      parser = yaml.safeLoad;
      break;
    case '.ini':
      parser = ini.parse;
      break;
    default:
      parser = JSON.parse;
  }
  return parser(fileContents);
};

export default parseFile;
