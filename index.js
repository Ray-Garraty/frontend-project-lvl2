import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fs = require('fs');
const path = require('path');
const process = require('process');

const genDiff = (filepath1, filepath2) => {
  const workingDir = process.cwd();
  const filePath1Resolved = filepath1.startsWith('.') ? path.resolve(workingDir, filepath1) : path.resolve(filepath1);
  const filePath2Resolved = filepath2.startsWith('.') ? path.resolve(workingDir, filepath2) : path.resolve(filepath2);
  const objectBefore = JSON.parse(fs.readFileSync(filePath1Resolved));
  const objectAfter = JSON.parse(fs.readFileSync(filePath2Resolved));
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
