import renderJson from './json.js';
import renderPlain from './plain.js';
import renderStylish from './stylish.js';

export default (tree, format) => {
  switch (format) {
    case 'plain':
      return renderPlain(tree);
    case 'json':
      return renderJson(tree);
    case 'stylish':
      return renderStylish(tree);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
