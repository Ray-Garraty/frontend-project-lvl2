import parseFile from './src/parsers.js';

const genDiff = (filepath1, filepath2) => {
  const objectBefore = parseFile(filepath1);
  const objectAfter = parseFile(filepath2);
  const keysBefore = Object.keys(objectBefore);
  const keysAfter = Object.keys(objectAfter);
  const diff = {};
  keysBefore.forEach((key) => {
    if (keysAfter.includes(key)) {
      if (objectBefore[key] === objectAfter[key]) {
        diff[`    ${key}`] = objectBefore[key];
      } else {
        const beforeKey = `  - ${key}`;
        const afterKey = `  + ${key}`;
        diff[afterKey] = objectAfter[key];
        diff[beforeKey] = objectBefore[key];
      }
    } else {
      const deletedKey = `  - ${key}`;
      diff[deletedKey] = objectBefore[key];
    }
  });
  keysAfter.forEach((key) => {
    if (!keysBefore.includes(key)) {
      const newKey = `  + ${key}`;
      diff[newKey] = objectAfter[key];
    }
  });
  const entries = Object.entries(diff);
  const newArray = [];
  entries.forEach((element) => newArray.push(element.join(': ')));
  const result = `{\n${newArray.join('\n')}\n}`;
  return result;
};

export default genDiff;
