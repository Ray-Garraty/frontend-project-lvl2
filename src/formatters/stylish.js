import _ from 'lodash';

export default (tree) => {
  const createIndentation = (n) => '  '.repeat(n);

  const parseValue = (value, n) => {
    if (!_.isPlainObject(value)) {
      return value;
    }
    const [[key, val]] = Object.entries(value);
    return `{\n${createIndentation(n + 3)}${key}: ${val}\n${createIndentation(n + 1)}}`;
  };

  const parseEntry = (entry, n) => {
    switch (entry.type) {
      case 'added':
        return `${createIndentation(n)}+ ${entry.name}: ${parseValue(entry.value, n)}`;
      case 'removed':
        return `${createIndentation(n)}- ${entry.name}: ${parseValue(entry.value, n)}`;
      case 'same':
        return `${createIndentation(n)}  ${entry.name}: ${parseValue(entry.value, n)}`;
      case 'differs':
        return `${createIndentation(n)}- ${entry.name}: ${parseValue(entry.value1, n)}\n${createIndentation(n)}+ ${entry.name}: ${parseValue(entry.value2, n)}`;
      case 'parent':
        return `${createIndentation(n + 1)}${entry.name}: {\n${entry.children.flatMap((child) => parseEntry(child, n + 2)).join('\n')}\n${createIndentation(n + 1)}}`;
      default:
        throw new Error(`Unknown node type: ${entry.type}`);
    }
  };

  return `{\n${tree.flatMap((node) => parseEntry(node, 1)).join('\n')}\n}`;
};
