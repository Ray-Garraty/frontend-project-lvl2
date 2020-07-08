import makePlainOutput from './plain.js';
import makeJsonLikeOutput from './json.js';
import makeStylishOutput from './stylish.js';

export default (format) => {
  switch (format) {
    case 'plain':
      return makePlainOutput;
    case 'json':
      return makeJsonLikeOutput;
    case 'stylish':
      return makeStylishOutput;
    default:
      throw new Error(`Unknown output format: ${format}`);
  }
};
