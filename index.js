import parseFile from './src/parsers.js';
import chooseFormatter from './src/formatters/index.js';

const createObjectFromFile = (filepath) => parseFile(filepath);

const genDiff = (filepath1, filepath2, format) => {
  const objectBefore = createObjectFromFile(filepath1);
  const objectAfter = createObjectFromFile(filepath2);

  const genDiffBetweenObjects = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    const result = {};
    keys1.forEach((key) => {
      const value1 = object1[key];
      const value2 = object2[key];
      if (keys2.includes(key)) {
        if (value1 === value2) {
          result[`  ${key}`] = value1;
        } else if (value1.constructor.name === 'Object' && value2.constructor.name === 'Object') {
          result[`  ${key}`] = genDiffBetweenObjects(value1, value2);
        } else {
          result[`+ ${key}`] = value2;
          result[`- ${key}`] = value1;
        }
      } else {
        result[`--${key}`] = value1;
      }
    });
    keys2.forEach((key) => {
      if (!keys1.includes(key)) {
        result[`++${key}`] = object2[key];
      }
    });
    return result;
  };
  const result = genDiffBetweenObjects(objectBefore, objectAfter);
  return chooseFormatter(format)(result);
};

export default genDiff;
