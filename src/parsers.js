import ini from 'ini';
import _ from 'lodash';
import yaml from 'js-yaml';

const parseIni = (fileContents) => {
  const parsedFileContents = ini.parse(fileContents);
  const parseValuesInObject = (object) => {
    const array = Object.entries(object);
    const f = (acc, [key, value]) => {
      if (_.isBoolean(value)) {
        acc[key] = value;
        return acc;
      }
      if (!Number.isNaN(Number(value))) {
        acc[key] = Number(value);
        return acc;
      }
      if (_.isPlainObject(value)) {
        acc[key] = parseValuesInObject(value);
        return acc;
      }
      acc[key] = value;
      return acc;
    };
    return array.reduce(f, {});
  };
  return parseValuesInObject(parsedFileContents);
};

export default (fileContents, format) => {
  switch (format) {
    case 'yml':
      return yaml.safeLoad(fileContents);
    case 'ini':
      return parseIni(fileContents);
    case 'json':
      return JSON.parse(fileContents);
    default:
      throw new Error(`Unknown input file format: ${format}`);
  }
};
