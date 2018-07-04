var executor = require('./executor');

exports.run = function(){
  return executor(...arguments);
};
