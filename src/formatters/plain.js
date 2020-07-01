const unfoldObject = (object) => {
  const entries = Object.entries(object);
  const iter = (entry, path) => {
    const [key, value] = entry;
    const updatedPath = path === '' ? key : `${path}.${key}`;
    if (value.constructor.name !== 'Object') {
      const obj = {};
      obj[updatedPath] = value;
      return obj;
    }
    const prefix = key.slice(0, 2);
    if (prefix !== '  ') {
      const obj = {};
      obj[updatedPath] = '[complex value]';
      return obj;
    }
    const children = Object.entries(value);
    return children.flatMap((child) => iter(child, updatedPath));
  };
  return entries.flatMap((entry) => iter(entry, ''));
};

const makePlainOutput = (object) => {
  const array = unfoldObject(object);
  const getPreviousValue = (key, items) => {
    const previousKey = key.replace(/\+/i, '-');
    const entry = items.filter((element) => previousKey in element);
    return entry[0][previousKey];
  };
  const parseEntry = (entry) => {
    const shiftKeyPrefixToTheBeginning = (key) => {
      if (!key.includes('.')) {
        return key;
      }
      const items = key.split('.');
      const f = (acc, item) => {
        if (item.startsWith('+') || item.startsWith('-')) {
          const prefix = item.slice(0, 2);
          const mainPartOfKey = item.slice(2);
          return acc === '' ? `${prefix}${mainPartOfKey}` : `${prefix}${acc}.${mainPartOfKey}`;
        }
        return acc === '' ? item.trim() : `${acc}.${item.trim()}`;
      };
      return items.reduce(f, '');
    };

    const restoreOriginalValueType = (value) => {
      if (value === 'true') {
        return true;
      }
      if (value === 'false') {
        return false;
      }
      if (value === '[complex value]') {
        return value;
      }
      return (Number.isNaN(parseInt(value, 10))) ? `'${value}'` : parseInt(value, 10);
    };

    const item = Object.entries(entry);
    const [[key, value]] = item;
    const normalizedKey = shiftKeyPrefixToTheBeginning(key);
    const prefix = normalizedKey.slice(0, 2);
    const mainPartOfKey = normalizedKey.slice(2);
    switch (prefix) {
      case '++':
        return `Property '${mainPartOfKey}' was added with value: ${restoreOriginalValueType(value)}`;
      case '--':
        return `Property '${mainPartOfKey}' was removed`;
      case '+ ':
        return `Property '${mainPartOfKey}' was updated. From ${restoreOriginalValueType(getPreviousValue(key, array))} to ${restoreOriginalValueType(value)}`;
      default:
        return '';
    }
  };
  return array.map(parseEntry).filter((item) => item !== '').join('\n');
};

export default makePlainOutput;
