/* eslint-disable no-underscore-dangle */

import _ from 'lodash';
import getFileContents from './src/parsers.js';
import chooseFormatter from './src/formatters/index.js';

const genDiff = (filepath1, filepath2, format) => {
  const obj1 = getFileContents(filepath1);
  const obj2 = getFileContents(filepath2);

  const compareTwoObjects = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    const uniqueKeysFromBothObjects = [...keys1, ...keys2];
    console.log(uniqueKeysFromBothObjects);
    return uniqueKeysFromBothObjects.map((key) => {
      const name = key;
      const value1 = object1[key];
      const value2 = object2[key];
      if (!keys1.includes(key)) {
        const type = 'added';
        const value = value2;
        return { name, type, value };
      }
      if (!keys2.includes(key)) {
        const type = 'removed';
        const value = value1;
        return { name, type, value };
      }
      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        const children = compareTwoObjects(value1, value2);
        const type = 'has children';
        return { name, type, children };
      }
      if (value1 === value2) {
        const type = 'same in both files';
        const value = value1;
        return { name, type, value };
      }
      const type = 'differs';
      return {
        name,
        type,
        value1,
        value2,
      };
    });
  };
  const result = compareTwoObjects(obj1, obj2);
  return chooseFormatter(format)(result);
};

export default genDiff;
