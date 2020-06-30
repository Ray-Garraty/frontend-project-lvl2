import fs from 'fs';
import ini from 'ini';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filePath) => {
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
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
