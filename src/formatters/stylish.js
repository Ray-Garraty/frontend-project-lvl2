import _ from 'lodash';

const offset = 2;
const keyMarkers = {
  same: '  ',
  parent: '  ',
  added: '+ ',
  removed: '- ',
};

const createIndent = (n) => '  '.repeat(n);

const createPrefixOrPostfix = (symbol, depth, name, type = 'same') => {
/* Меня сбило с толку слово "префикс", в моём семантическом понимании оно относится
только к тому, что расположено в начале собираемой строки.
Всё, что будет находиться в конце собираемой строки, логичнее назвать "окончание" или "постфикс". */
  const indent = createIndent(depth);
  const marker = keyMarkers[type];
  switch (symbol) {
    case '{':
      return type === 'parent'
        ? `${indent}${marker}${name}: {`
        : `${indent}${marker}${name}: `;
    case '}':
      return `${indent}${marker}}`;
    default:
      throw new Error(`Unexpected symbol: ${symbol}`);
  }
};

const formatValue = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const postfix = createPrefixOrPostfix('}', depth);
  const lines = [
    '{',
    ...(_.entries(data)).map(([key, value]) => `${createPrefixOrPostfix('{', depth + offset, key)}${value}`),
    postfix,
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
    const ending = createPrefixOrPostfix('}', depth);
    switch (type) {
      case 'added':
      case 'removed':
      case 'same': {
        return `${createPrefixOrPostfix('{', depth, name, type)}${formatValue(value, depth)}`;
      }
      case 'differs': {
        const firstEntry = `${createPrefixOrPostfix('{', depth, name, 'removed')}${formatValue(value1, depth)}`;
        const secondEntry = `${createPrefixOrPostfix('{', depth, name, 'added')}${formatValue(value2, depth)}`;
        return [firstEntry, secondEntry];
      }
      case 'parent':
        return [
          `${createPrefixOrPostfix('{', depth, name, type)}`,
          ...iter(children, depth + offset),
          ending,
        ];
      default:
        throw new Error(`Unexpected node type: ${type}`);
    }
  });
  return ['{', ...iter(data, 1), '}'].join('\n');
};
