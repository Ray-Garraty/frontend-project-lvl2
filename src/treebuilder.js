import _ from 'lodash';

const buildTree = (object1, object2) => {
  const keys1 = _.keys(object1);
  const keys2 = _.keys(object2);
  return _.union(keys1, keys2)
    .sort()
    .map((key) => {
      const value1 = object1[key];
      const value2 = object2[key];
      if (!_.has(object1, key)) {
        return { key, type: 'added', value: value2 };
      }
      if (!_.has(object2, key)) {
        return { key, type: 'removed', value: value1 };
      }
      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        const children = buildTree(value1, value2);
        return { key, type: 'nested', children };
      }
      if (value1 === value2) {
        return { key, type: 'unchanged', value: value1 };
      }
      return {
        key,
        type: 'changed',
        value1,
        value2,
      };
    });
};

export default buildTree;
