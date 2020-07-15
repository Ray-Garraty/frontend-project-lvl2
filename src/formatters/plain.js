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

const parseNode = (someNode) => {
  const iter = (node, ancestry) => {
    const updatedAncestry = ancestry === '' ? node.name : `${ancestry}.${node.name}`;
    switch (node.type) {
      case 'added':
        return `Property '${updatedAncestry}' was added with value: ${stringifyValue(node.value)}`;
      case 'removed':
        return `Property '${updatedAncestry}' was removed`;
      case 'differs':
        return `Property '${updatedAncestry}' was updated. From ${stringifyValue(node.value1)} to ${stringifyValue(node.value2)}`;
      case 'parent':
        return node.children.flatMap((child) => iter(child, updatedAncestry));
      case 'same':
        return null;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  };
  const result = iter(someNode, '');
  return Array.isArray(result) ? result.filter(_.identity) : result;
};

export default (tree) => tree.flatMap((node) => parseNode(node)).join('\n').trim();
