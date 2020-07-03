// export default (tree) => JSON.stringify(tree, null, 0);
import _ from 'lodash';

export default (tree) => {
  const parseValue = (value) => {
    if (!_.isPlainObject(value)) {
      return value;
    }
    const [[key, val]] = Object.entries(value);
    return `{${key}: ${val}}`;
  };
  const parseEntry = (entry) => {
    if (entry.type === 'added') {
      return `{+ ${entry.name}: ${parseValue(entry.value)}}`;
    }
    if (entry.type === 'removed') {
      return `{- ${entry.name}: ${parseValue(entry.value)}}`;
    }
    if (entry.type === 'same in both files') {
      return `{${entry.name}: ${parseValue(entry.value)}}`;
    }
    if (entry.type === 'differs') {
      return `{+ ${entry.name}: ${parseValue(entry.value2)},- ${entry.name}: ${parseValue(entry.value1)}}`;
    }
    const keys = Object.keys(entry);
    if (keys.includes('children')) {
      const { children } = entry;
      return `${entry.name}: [${children.flatMap((child) => parseEntry(child)).join(',')}]`;
    }
    return "Oops, seems like something's wrong";
  };
  return `[${tree.flatMap((node) => parseEntry(node)).join(',')}]`;
};
