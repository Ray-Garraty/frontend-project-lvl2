import _ from 'lodash';

const createIndent = (n) => '  '.repeat(n);

const formatValue = (value, n) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const [[key, val]] = Object.entries(value);
  return `{\n${createIndent(n + 3)}${key}: ${val}\n${createIndent(n + 1)}}`;
};

export default (data) => {
  const iter = (tree, acc) => tree.flatMap((node) => {
    const {
      name,
      type,
      value,
      value1,
      value2,
      children,
    } = node;
    switch (type) {
      case 'added':
        return `${createIndent(acc)}+ ${name}: ${formatValue(value, acc)}`;
      case 'removed':
        return `${createIndent(acc)}- ${name}: ${formatValue(value, acc)}`;
      case 'same':
        return `${createIndent(acc)}  ${name}: ${formatValue(value, acc)}`;
      case 'differs': {
        const indent = createIndent(acc);
        return `${indent}- ${name}: ${formatValue(value1, acc)}\n${indent}+ ${node.name}: ${formatValue(value2, acc)}`;
      }
      case 'parent': {
        return `${createIndent(acc + 1)}${node.name}: {\n${iter(children, acc + 2).join('\n')}\n${createIndent(acc + 1)}}`;
      }
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  return `{\n${iter(data, 1).join('\n')}\n}`;
};
