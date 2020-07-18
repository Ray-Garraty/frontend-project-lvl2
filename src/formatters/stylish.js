import _ from 'lodash';

const createIndent = (n) => '    '.repeat(n); // я здесь выставил шаг именно 4 пробела, потому что
// по условию задачи при переходе на следующий уровень глубины идёт сдвиг именно на 4 пробела.
// Так что если выставить шаг в 2 пробела, то для покрытия отступов в 4 пробела придётся
// использовать магическое число * 2, что может вызвать дополнительные вопросы к коду.
export default (data) => {
  const margin = '  '; // по-другому задать начальный отступ не получается, ибо
  // по условию задачи начальный отступ = 2 пробела, что меньше 1 шага функции createIndent.
  // Это продиктовано условием задачи (структурой expected-файла), здесь я не могу ничего сделать.
  const formatValue = (value, depth) => {
    if (!_.isPlainObject(value)) {
      return value;
    }
    const indent1 = createIndent(depth);
    const indent2 = margin + indent1; // я ничего лучше тут придумать не могу, сами отступы заданы
    // условием задачи, неизвестно из каких соображений, это вопрос к разработчикам :-)
    const entries = Object.entries(value);
    // я не знаю, как здесь обойтись без Object.entries.
    // По-другому эффективно извлечь название ключа и его значение из объекта у меня не получается.
    return entries.map(([key, val]) => `{\n${indent2}  ${key}: ${val}\n${indent1}}`).join('\n');
    /* Я думал о том, чтобы перенести это выражение в состав функции iter, но тогда нарушается
    порядок вызова iter => formatNode => обход значения-объекта. Насколько вообще это критично? */
  };

  const formatNode = (node, depth) => {
    const {
      name,
      type,
      value,
      value1,
      value2,
    } = node;
    const indent = margin + createIndent(depth);
    const increasedDepth = depth + 1;
    const val = formatValue(value, increasedDepth);
    const val1 = formatValue(value1, increasedDepth);
    const val2 = formatValue(value2, increasedDepth);
    switch (type) {
      case 'added':
        return `${indent}+ ${name}: ${val}`;
      case 'removed':
        return `${indent}- ${name}: ${val}`;
      case 'same':
        return `${indent}  ${name}: ${val}`;
      case 'differs': {
        return `${indent}- ${name}: ${val1}\n${indent}+ ${node.name}: ${val2}`;
      }
      default:
        throw new Error(`Unexpected node type: ${type}`);
    }
  };

  const iter = (tree, depth) => tree.flatMap((node) => {
    const { name, type, children } = node;
    if (type !== 'parent') {
      return formatNode(node, depth); // здесь у меня не получилось сделать так, как ты посоветовал,
      // чтобы был возврат в виде "ключ: значение", потому что непонятно,
      // как обрабатывать ситуацию type = 'differs', при которой надо выводить 2 строки вместо одной
    }
    const indent = margin + createIndent(depth);
    const increasedDepth = depth + 1;
    const increasedIndent = createIndent(increasedDepth);
    return `${indent}  ${name}: {\n${iter(children, increasedDepth).join('\n')}\n${increasedIndent}}`;
    // здесь ничего лучше придумать не получается. Если оставить голый рекурсивный вызов iter,
    // то теряется название текущего ключа, а это недопустимо.
  });
  return `{\n${iter(data, 0).join('\n')}\n}`;
};
