import path from 'path';
import parseData from './src/parsers.js';
import buildTree from './src/treebuilder.js';
import chooseFormatter from './src/formatters/index.js';
import { getFileFormat, extractFileContents } from './src/fstoolkit.js';

const genDiff = (filepath1, filepath2, format) => {
  const data1 = extractFileContents(path.resolve(filepath1));
  const data2 = extractFileContents(path.resolve(filepath2));
  const format1 = getFileFormat(filepath1);
  const format2 = getFileFormat(filepath2);
  const obj1 = parseData(data1, format1);
  const obj2 = parseData(data2, format2);
  const tree = buildTree(obj1, obj2);
  return chooseFormatter(tree, format);
};

export default genDiff;
