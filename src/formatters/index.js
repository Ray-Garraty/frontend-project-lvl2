import makePlainOutput from './plain.js';
import makeJsonLikeOutput from './json.js';
import makeStylishOutput from './stylish.js';

export default (format) => {
  switch (format) {
    case 'plain':
      return makePlainOutput;
    case 'json':
      return makeJsonLikeOutput;
    default:
      return makeStylishOutput;
  }
};
