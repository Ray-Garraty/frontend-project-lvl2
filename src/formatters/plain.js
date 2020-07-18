import _ from 'lodash';

const formatValue = (value) => {
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
    const fullName = parentName === '' ? node.name : `${parentName}.${node.name}`;
    switch (node.type) {
      case 'added':
        return `Property '${fullName}' was added with value: ${formatValue(node.value)}`;
      case 'removed':
        return `Property '${fullName}' was removed`;
      case 'differs':
        return `Property '${fullName}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`;
      case 'parent':
        return iter(node.children, fullName);
      case 'same':
        return null;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  return iter(data, '').filter(_.identity).join('\n');
};
