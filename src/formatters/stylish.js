import _ from 'lodash';

const offset = 2;
const openSymbol = '{';
const closeSymbol = '}';
const keyMarkers = {
  added: '+',
  removed: '-',
};

const createIndent = (n) => '  '.repeat(n);

const addPrefix = (symbol, depth, marker = ' ') => `${createIndent(depth)}${marker} ${symbol}`;

const formatValue = (data, initIndent) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const lines = [
    openSymbol,
    ...(Object.entries(data)).map(([key, value]) => `${addPrefix(key, initIndent + offset)}: ${formatValue(value, initIndent + offset)}`),
    addPrefix(closeSymbol, initIndent),
  ];
  return lines.join('\n');
};

export default (data) => {
  const iter = (tree, depth) => tree.flatMap((node) => {
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
      case 'removed':
      case 'same': {
        return `${addPrefix(name, depth, keyMarkers[type])}: ${formatValue(value, depth)}`;
      }
      case 'differs': {
        const firstEntry = `${addPrefix(name, depth, '-')}: ${formatValue(value1, depth)}`;
        const secondEntry = `${addPrefix(name, depth, '+')}: ${formatValue(value2, depth)}`;
        return [firstEntry, secondEntry];
      }
      case 'parent':
        return [
          `${addPrefix(name, depth)}: ${openSymbol}`,
          ...iter(children, depth + offset),
          addPrefix(closeSymbol, depth),
        ];
      default:
        throw new Error(`Unexpected node type: ${type}`);
    }
  });
  return [openSymbol, ...iter(data, 1), closeSymbol].join('\n');
};
