import _ from 'lodash';

const createIndent = (n) => '  '.repeat(n);

const iter = (node, depth) => {
  const {
    name,
    type,
    value,
    value1,
    value2,
    children,
  } = node;
  const prefixes = {
    added: '+ ',
    removed: '- ',
    same: '  ',
  };
  const increment = 2;
  const indent = createIndent(depth);
  const closingSequence = `\n${indent}  }`;
  if (!type) {
    const result = [];
    _.forOwn(node, (val, key) => result.push(`\n${indent}${prefixes.same}${key}: ${val}`));
    return result;
  }
  const formatValue = (val) => (_.isPlainObject(val) ? `{${iter(val, depth + increment)}${closingSequence}` : val);
  switch (type) {
    case 'added':
    case 'removed':
    case 'same':
      return `${indent}${prefixes[type]}${name}: ${formatValue(value)}`;
    case 'differs': {
      const firstLine = `${indent}${prefixes.removed}${name}: ${formatValue(value1)}`;
      const secondLine = `${indent}${prefixes.added}${name}: ${formatValue(value2)}`;
      return [firstLine, secondLine].join('\n');
    }
    case 'parent':
      return `${indent}${prefixes.same}${name}: {\n${children.flatMap((child) => iter(child, depth + increment)).join('\n')}${closingSequence}`;
    default:
      throw new Error(`Unexpected node type: ${type}`);
  }
};

export default (data) => `{\n${data.flatMap((node) => iter(node, 1)).join('\n')}\n}`;
