import makePlainOutput from './plain.js';
import makeJsonLikeOutput from './json.js';
import makeStylishOutput from './stylish.js';

export default (tree, format) => {
  switch (format) {
    case 'plain':
      return makePlainOutput(tree);
    case 'json':
      return makeJsonLikeOutput(tree);
    case 'stylish':
      return makeStylishOutput(tree);
    default:
      throw new Error(`Unknown output format: ${format}`);
  }
};
