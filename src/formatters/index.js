import makePlainOutput from './plain.js';
import stylish from './stylish.js';

const chooseFormatter = (format) => {
  switch (format) {
    case 'plain':
      return makePlainOutput;
    default:
      return stylish;
  }
};
export default chooseFormatter;
