import _ from 'lodash';
import { parseValue } from './parsers.js';

const compareTwoObjects = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const uniqueKeysFromBothObjects = _.union(keys1, keys2).sort();
  return uniqueKeysFromBothObjects.map((key) => {
    const name = key;
    const value1 = parseValue(object1[key]);
    const value2 = parseValue(object2[key]);
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
      const type = 'parent';
      return { name, type, children };
    }
    if (value1 === value2) {
      const type = 'same';
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

export default compareTwoObjects;
