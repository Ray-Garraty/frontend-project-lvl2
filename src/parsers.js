import ini from 'ini';
import _ from 'lodash';
import yaml from 'js-yaml';

const normalizeStringNumbers = (object) => _.mapValues(object, (value) => {
  if (!_.isPlainObject(value)) {
    return parseFloat(value) || value;
  }
  return normalizeStringNumbers(value);
});

export default (data, format) => {
  switch (format) {
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini':
      return normalizeStringNumbers(ini.parse(data));
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Unknown data format: ${format}`);
  }
};
