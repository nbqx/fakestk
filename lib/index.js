var executor = require('./executor');

// with callback
function withCallback(script,cb){
  executor(script,cb);
};

// without callback
function withoutCallback(script){
  return executor(script);
};

exports.run = function(){
  var args = Array.prototype.slice.call(arguments);
  if(args.length==2){
    return withCallback(args[0],args[1]);
  }else{
    return withoutCallback(args[0]);
  }
};

