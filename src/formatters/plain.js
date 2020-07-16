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
  const iter = (tree, acc) => tree.flatMap((node) => {
    const newAcc = acc === '' ? node.name : `${acc}.${node.name}`;
    switch (node.type) {
      case 'added':
        return `Property '${newAcc}' was added with value: ${formatValue(node.value)}`;
      case 'removed':
        return `Property '${newAcc}' was removed`;
      case 'differs':
        return `Property '${newAcc}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`;
      case 'parent':
        return iter(node.children, newAcc);
      case 'same':
        return null;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  return iter(data, '').filter(_.identity).join('\n');
};
