import { parseFile } from './src/parsers.js';
import compareTwoObjects from './src/comparator.js';
import chooseFormatter from './src/formatters/index.js';
import { makeFullFilePath, getFileExtension, getFileContents } from './src/utilities.js';

const genDiff = (filepath1, filepath2, format) => {
  const fileContents1 = getFileContents(makeFullFilePath(filepath1));
  const fileContents2 = getFileContents(makeFullFilePath(filepath2));
  const fileExt1 = getFileExtension(filepath1);
  const fileExt2 = getFileExtension(filepath2);
  const obj1 = parseFile(fileContents1, fileExt1);
  const obj2 = parseFile(fileContents2, fileExt2);
  const tree = compareTwoObjects(obj1, obj2);
  return chooseFormatter(format)(tree);
};

export default genDiff;
