export default (object) => JSON.stringify(object, null, 0).replace(/\+\+/gi, '+ ').replace(/--/gi, '- ');
