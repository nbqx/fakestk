var executor = require('./executor');

// with callback
exports.run = function(script,cb){
  executor(script,cb);
}

// without callback
exports.runSync = function(script){
  return executor(script);
}

