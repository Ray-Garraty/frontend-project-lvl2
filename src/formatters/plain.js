import _ from 'lodash';

const stringifyValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

export default (data) => {
  const iter = (tree, parentName) => tree.flatMap((node) => {
    const fullName = parentName === '' ? node.key : `${parentName}.${node.key}`;
    switch (node.type) {
      case 'added':
        return `Property '${fullName}' was added with value: ${stringifyValue(node.value)}`;
      case 'removed':
        return `Property '${fullName}' was removed`;
      case 'unequal':
        return `Property '${fullName}' was updated. From ${stringifyValue(node.value1)} to ${stringifyValue(node.value2)}`;
      case 'nested':
        return iter(node.children, fullName);
      case 'equal':
        return null;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  return iter(data, '').filter(_.identity).join('\n');
};
