import _ from 'lodash';

export default (tree) => {
  const parseValue = (value) => {
    if (_.isPlainObject(value)) {
      return '[complex value]';
    }
    if (_.isString(value)) {
      return `'${value}'`;
    }
    return value;
  };
  const parseNode = (node, path) => {
    const newPath = path === '' ? node.name : `${path}.${node.name}`;
    switch (node.type) {
      case 'added':
        return `Property '${newPath}' was added with value: ${parseValue(node.value)}`;
      case 'removed':
        return `Property '${newPath}' was removed`;
      case 'differs':
        return `Property '${newPath}' was updated. From ${parseValue(node.value1)} to ${parseValue(node.value2)}`;
      case 'parent':
        return node.children.flatMap((child) => parseNode(child, newPath)).filter((element) => element !== '').join('\n').trim();
      case 'same':
        return '';
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  };
  return tree.flatMap((node) => parseNode(node, '')).filter((entry) => entry !== '').join('\n').trim();
};
