import _ from 'lodash';

export default (tree) => {
  const createIndentation = (n) => '  '.repeat(n);
  const parseValue = (value, n) => {
    if (!_.isPlainObject(value)) {
      return value;
    }
    const [[key, val]] = Object.entries(value);
    return `{\n${createIndentation(n + 1)}${key}: ${val}\n${createIndentation(n)}}`;
  };
  const parseEntry = (entry, n) => {
    if (entry.type === 'added') {
      return `${createIndentation(n)}+ ${entry.name}: ${parseValue(entry.value, n)}`;
    }
    if (entry.type === 'removed') {
      return `${createIndentation(n)}- ${entry.name}: ${parseValue(entry.value, n)}`;
    }
    if (entry.type === 'same in both files') {
      return `${createIndentation(n)}  ${entry.name}: ${parseValue(entry.value, n)}`;
    }
    if (entry.type === 'differs') {
      return `${createIndentation(n)}+ ${entry.name}: ${parseValue(entry.value2, n)}\n${createIndentation(n)}- ${entry.name}: ${parseValue(entry.value1, n)}`;
    }
    const keys = Object.keys(entry);
    if (keys.includes('children')) {
      const { children } = entry;
      return `${createIndentation(n + 1)}${entry.name}: {\n${children.flatMap((child) => parseEntry(child, n + 1)).join('\n')}\n${createIndentation(n)}}`;
    }
    return "Oops, seems like something's wrong";
  };
  return `{\n${tree.flatMap((node) => parseEntry(node, 1)).join('\n')}\n}`;
};
