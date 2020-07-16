import path from 'path';
import parseData from './src/parsers.js';
import buildTree from './src/treebuilder.js';
import renderTree from './src/formatters/index.js';
import { getFormat, readData } from './src/fstoolkit.js';

const genDiff = (filepath1, filepath2, format) => {
  const data1 = readData(path.resolve(filepath1));
  const data2 = readData(path.resolve(filepath2));
  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);
  const obj1 = parseData(data1, format1);
  const obj2 = parseData(data2, format2);
  const tree = buildTree(obj1, obj2);
  return renderTree(tree, format);
};

export default genDiff;
