import path from 'path';
import parseFile from './src/parsers.js';
import buildTree from './src/treebuilder.js';
import chooseFormatter from './src/formatters/index.js';
import { getFileFormat, getFileContents } from './src/fstoolkit.js';

const genDiff = (filepath1, filepath2, format) => {
  const fileContents1 = getFileContents(path.resolve(filepath1));
  const fileContents2 = getFileContents(path.resolve(filepath2));
  const format1 = getFileFormat(filepath1);
  const format2 = getFileFormat(filepath2);
  const obj1 = parseFile(fileContents1, format1);
  const obj2 = parseFile(fileContents2, format2);
  const tree = buildTree(obj1, obj2);
  return chooseFormatter(tree, format);
};

export default genDiff;
