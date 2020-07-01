export default (obj) => JSON.stringify(obj, null, 2)
  .replace(/,\n/gi, '\n')
  .replace(/"/gi, '')
  .replace(/\+\+/gi, '+ ')
  .replace(/--/gi, '- ')
  .trim();

/* const getStringFromObject = (obj) => {
  const entries = Object.entries(obj);
  const reducer = (acc, entry) => {
    const [key, value] = entry;
    if (value.constructor.name !== 'Object') {
      return `${acc}\n    ${key}:  ${value}`;
    }
    return `${acc}\n  ${key}:  ${getStringFromObject(value)}`;
  };
  const result = entries.reduce(reducer, '');
  return result;
}; */
