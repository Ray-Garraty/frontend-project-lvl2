import _ from 'lodash';

const offset = 2;
const openSymbol = '{';
const closeSymbol = '}';
const indentSymbol = '  ';
const keyMarkers = {
  added: '+',
  removed: '-',
  equal: ' ',
};

const createIndent = (n) => '  '.repeat(n);

const addPrefix = (symbol, indent, marker = ' ') => `${indent}${marker} ${symbol}`;

const stringify = (data, indent) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const nestedIndent = addPrefix(indentSymbol, indent);
  const lines = [
    openSymbol,
    ...(_.entries(data)
      .map(([key, value]) => `${addPrefix(key, nestedIndent)}: ${stringify(value, nestedIndent)}`)),
    addPrefix(closeSymbol, indent),
  ];
  return lines.join('\n');
};

export default (data) => {
  const iter = (tree, depth) => _.flatMap(tree, (node) => {
    const {
      key,
      type,
      value,
      value1,
      value2,
      children,
    } = node;
    const indent = createIndent(depth);
    switch (type) {
      case 'added':
      case 'removed':
      case 'unchanged':
        return `${addPrefix(key, indent, keyMarkers[type])}: ${stringify(value, indent)}`;
      case 'changed':
        return [
          `${addPrefix(key, indent, keyMarkers.removed)}: ${stringify(value1, indent)}`,
          `${addPrefix(key, indent, keyMarkers.added)}: ${stringify(value2, indent)}`,
        ];
      case 'nested':
        return [
          `${addPrefix(key, indent)}: ${openSymbol}`,
          ...iter(children, depth + offset),
          addPrefix(closeSymbol, indent),
        ];
      default:
        throw new Error(`Unexpected node type: ${type}`);
    }
  });
  return [openSymbol, ...iter(data, 1), closeSymbol].join('\n');
};
