import _ from 'lodash';

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
    case 'differs': {
      const indent = createIndentation(n);
      return `${indent}- ${entry.name}: ${parseValue(entry.value1, n)}\n${indent}+ ${entry.name}: ${parseValue(entry.value2, n)}`;
    }
    case 'parent': {
      const incrIndt = createIndentation(n + 1);
      const parsedChildren = entry.children.flatMap((child) => parseEntry(child, n + 2));
      return `${incrIndt}${entry.name}: {\n${parsedChildren.join('\n')}\n${incrIndt}}`;
    }
    default:
      throw new Error(`Unknown node type: ${entry.type}`);
  }
};

export default (tree) => `{\n${tree.flatMap((node) => parseEntry(node, 1)).join('\n')}\n}`;
