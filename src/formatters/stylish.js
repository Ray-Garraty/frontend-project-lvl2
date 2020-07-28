import _ from 'lodash';

const offset = 2;
const openSymbol = '{';
const closeSymbol = '}';
const keyMarkers = {
  added: '+',
  removed: '-',
  equal: ' ',
  nested: '  ',
};

const createIndent = (n) => '  '.repeat(n);

const addPrefix = (symbol, indent, marker = ' ') => `${indent}${marker} ${symbol}`;

const stringifyValue = (data, indent) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const currentIndent = createIndent(indent);
  const nestedIndent = createIndent(indent + offset);
  const lines = [
    openSymbol,
    ...(_.entries(data))
      .map(([key, value]) => `${addPrefix(key, nestedIndent)}: ${stringifyValue(value, indent + offset)}`),
    addPrefix(closeSymbol, currentIndent),
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
      case 'equal': {
        return `${addPrefix(key, indent, keyMarkers[type])}: ${stringifyValue(value, depth)}`;
      }
      case 'unequal': {
        const firstEntry = `${addPrefix(key, indent, keyMarkers.removed)}: ${stringifyValue(value1, depth)}`;
        const secondEntry = `${addPrefix(key, indent, keyMarkers.added)}: ${stringifyValue(value2, depth)}`;
        return [firstEntry, secondEntry];
      }
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
