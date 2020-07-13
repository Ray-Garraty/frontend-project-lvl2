import ini from 'ini';
import _ from 'lodash';
import yaml from 'js-yaml';

const parseIni = (fileContents) => {
  const normalizeValue = (value) => (
    _.isBoolean(value) || Number.isNaN(Number(value)) ? value : Number(value)
  );
  const parseObject = (object) => _.mapValues(object, (value) => (
    _.isPlainObject(value) ? parseObject(value) : normalizeValue(value)
  ));
  return parseObject(ini.parse(fileContents));
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
