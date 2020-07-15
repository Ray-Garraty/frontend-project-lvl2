import doPlain from './plain.js';
import doJson from './json.js';
import doStylish from './stylish.js';

export default (tree, format) => {
  switch (format) {
    case 'plain':
      return doPlain(tree);
    case 'json':
      return doJson(tree);
    case 'stylish':
      return doStylish(tree);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
