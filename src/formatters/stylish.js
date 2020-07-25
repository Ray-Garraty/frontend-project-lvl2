import _ from 'lodash';

const offset = 2;
const separator = '  ';
const openSymbol = '{';
const closingSymbol = '}';
const lineBreakSymbol = '\n';
const keyMarkers = {
  same: '',
  parent: '',
  added: '+',
  removed: '-',
};

const createIndent = (n) => '  '.repeat(n);

const createPrefix = (name, type, depth) => {
  const indent = createIndent(depth);
  const marker = keyMarkers[type].padEnd(2, ' ');
  return `${indent}${marker}${name}`;
};

const createEnding = (depth) => {
  const indent = createIndent(depth);
  return [indent, closingSymbol].join(separator);
};

const formatValue = ([key, value], depth) => {
  const indent = createIndent(depth);
  if (!_.isPlainObject(value)) {
    return key === null
      ? value
      : [indent, `${key}: ${value}`].join(separator);
  }
  const ending = createEnding(depth);
  const [entry] = Object.entries(value);
  return [
    openSymbol,
    formatValue(entry, depth + offset),
    ending,
  ].join(lineBreakSymbol); // здесь без join() никак, потому что как я потом
  // в самом конце залезу внутрь значений, чтобы их склеить, да и нужно ли это?
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
    const ending = createEnding(depth);
    switch (type) {
      case 'added':
      case 'removed':
      case 'same': {
        return `${createPrefix(name, type, depth)}: ${formatValue([null, value], depth)}`;
      }
      case 'differs': {
        const firstEntry = `${createPrefix(name, 'removed', depth)}: ${formatValue([null, value1], depth)}`;
        const secondEntry = `${createPrefix(name, 'added', depth)}: ${formatValue([null, value2], depth)}`;
        return [firstEntry, secondEntry];
      }
      case 'parent':
        return [
          `${createPrefix(name, type, depth)}: ${openSymbol}`,
          ...iter(children, depth + offset),
          ending,
        ];
      default:
        throw new Error(`Unexpected node type: ${type}`);
    }
  });
  return [openSymbol, iter(data, 1).join(lineBreakSymbol), closingSymbol].join(lineBreakSymbol);
};
