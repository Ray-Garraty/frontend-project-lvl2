import path from 'path';
import process from 'process';
import parseFile from './src/parsers.js';
import chooseFormatter from './src/formatters/index.js';

const parseFilePath = (somepath) => (somepath.startsWith('/') ? somepath : path.join(process.cwd(), somepath));

const createObjectFromFile = (name) => {
  const fullFilePath = parseFilePath(name);
  return parseFile(fullFilePath);
};

const genDiff = (filepath1, filepath2, format) => {
  const obj1 = createObjectFromFile(filepath1);
  const obj2 = createObjectFromFile(filepath2);

  const compareTwoObjects = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    const result1 = keys1.map((key) => {
      const name = key;
      const value1 = object1[key];
      const value2 = object2[key];
      if (!keys2.includes(key)) {
        // вносим запись, что этот ключ был удалён
        const type = 'removed';
        const value = value1;
        return { name, type, value };
      }
      if (object1[key].constructor.name === 'Object' && object2[key].constructor.name === 'Object') {
        // берём их детей и запускаем с ними функцию compareTwoObjects
        const children = compareTwoObjects(object1[key], object2[key]);
        const type = 'has children';
        return { name, type, children };
      }
      if (value1 === value2) {
        // вносим запись, что этот ключ присутствует в обоих файлах и имеет одинаковое значение
        const type = 'same in both files';
        const value = value1;
        return { name, type, value };
      }
      // вносим запись, что этот ключ присутствует в обоих файлах и имеет 2 разных значения (какие)
      const type = 'differs';
      return {
        name,
        type,
        value1,
        value2,
      };
    });
    const result2 = keys2
      .filter((key) => !keys1.includes(key))
      .map((key) => {
        const name = key;
        const type = 'added';
        const value = object2[key];
        return { name, type, value };
      });
    return [...result1, ...result2];
  };
  const result = compareTwoObjects(obj1, obj2);
  return chooseFormatter(format)(result);
};

export default genDiff;
