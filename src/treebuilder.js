import _ from 'lodash';

const buildTree = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const uniqueKeysFromBothObjects = _.union(keys1, keys2).sort();
  return uniqueKeysFromBothObjects.map((key) => {
    const name = key;
    const value1 = object1[key];
    const value2 = object2[key];
    if (!_.has(object1, key)) {
      const type = 'added';
      return { name, type, value: value2 };
    }
    if (!_.has(object2, key)) {
      const type = 'removed';
      return { name, type, value: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      const children = buildTree(value1, value2);
      const type = 'parent';
      return { name, type, children };
    }
    if (value1 === value2) {
      const type = 'same';
      return { name, type, value: value1 };
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

export default buildTree;
