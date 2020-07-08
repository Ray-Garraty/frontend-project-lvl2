import ini from 'ini';
import _ from 'lodash';
import yaml from 'js-yaml';

const parseFile = (fileContents, fileExtension) => {
  switch (fileExtension) {
    case '.yml':
      return yaml.safeLoad(fileContents);
    case '.ini':
      return ini.parse(fileContents);
    case '.json':
      return JSON.parse(fileContents);
    case '':
      return fileContents.trim();
    default:
      throw new Error(`Unknown input file extension: ${fileExtension}`);
  }
};

const parseValue = (value) => {
  if (_.isBoolean(value)) {
    return value;
  }
  if (!Number.isNaN(Number(value))) {
    return Number(value);
  }
  if (_.isPlainObject(value)) {
    const entries = Object.entries(value);
    const f = (acc, entry) => {
      const [key, val] = entry;
      acc[key] = parseValue(val);
      return acc;
    };
    return entries.reduce(f, {});
  }
  return value;
};

export { parseFile, parseValue };
