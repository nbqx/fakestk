var executor = require('./executor');

// with callback
function withCallback(script,target,cb){
  executor(script,target,cb);
};

// without callback
function withoutCallback(script, target){
  return executor(script,target);
};

exports.run = function(){
  var args = Array.prototype.slice.call(arguments);
  if(args.length==1){
    return withoutCallback(args[0]);
  } else if(args.length==3){
    return withCallback(args[0],args[1],args[2]);
  }else if(args.length==2){
    if(typeof args[1] === 'function') {
      return withCallback(args[0], args[1]);
    } else {
      return withoutCallback(args[0],args[1]);
    }
  } 
};
