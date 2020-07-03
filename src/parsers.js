import fs from 'fs';
import ini from 'ini';
import path from 'path';
import yaml from 'js-yaml';

const getFileContents = (somepath) => {
  const makeFullFilePath = (randomPath) => {
    if (randomPath.startsWith('/')) {
      return randomPath;
    }
    if (randomPath.startsWith('~')) {
      return path.join(process.env.home, randomPath);
    }
    return path.join(process.cwd(), randomPath);
  };
  const parseFile = (filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    const extension = path.extname(fileName);
    switch (extension) {
      case '.yml':
        return yaml.safeLoad(fileContents);
      case '.ini':
        return ini.parse(fileContents);
      case '.json':
        return JSON.parse(fileContents);
      default:
        return fileContents.trim();
    }
  };
  const fullFilePath = makeFullFilePath(somepath);
  return parseFile(fullFilePath);
};

export default getFileContents;
