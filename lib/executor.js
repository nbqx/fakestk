var detector = require('./detector'),
    fs = require('fs'),
    exec = require('child_process').exec,
    EventEmitter = require('events').EventEmitter,
    Mustache = require('mustache'),
    tmp = require('temporary');

var scpt_tpl = fs.readFileSync(__dirname+'/../resources/tpl.scpt').toString();

// create jsx as temporary file
function createJsx(code){
  var jsx = new tmp.File();
  jsx.writeFileSync(code);
  return jsx
};

// create applescript as temporary file
function createAppleScript(code){
  var scpt = new tmp.File();
  scpt.writeFileSync(code);
  return scpt
};

// execute script (osx only)
module.exports = function(code,done){
  var code = (typeof 'string' === code)? code : code.toString();
  var info = detector(code);
  
  if(info===null && done!==undefined) return done(new Error('Application Unknown'));
  if(info===null){
    console.log('Applications Unknown');
    process.exit(1);
  }
  
  var name = info.name,
      ver = info.version,
      cs_version = info.cs_version;
  var cs_name, run_script;
  
  if(code==='') return null;
  
  var jsx = createJsx(code);
  
  // tell application
  if(name==='Illustrator'){
    cs_name = "/Applications/Adobe Illustrator "+cs_version+"/Adobe Illustrator.app";
  }else{
    cs_name = ['Adobe',name,cs_version].join(' ');
  }

  // temporary log file (overwrite $.write, $.writeln)
  var log_file = new tmp.File();
  var _pre_tpl = [
    "var __log = new File('{{{ logfile }}}');",
    "__log.encoding='UTF8';",
    "__log.open('e');",
    "$.write=function(){__log.seek(0,2);__log.write(arguments[0])};",
    "$.writeln=function(){__log.seek(0,2);__log.writeln(arguments[0])};"
  ].join('');
  var _pre = Mustache.render(_pre_tpl, {logfile: log_file.path});
  var _post = '__log.close();';
  
  // run_script
  if(name==='Photoshop' || name==='Illustrator'){
    run_script = "do javascript \""+_pre+" $.evalFile('"+jsx.path+"'); "+_post+"\"";
  }else{
    run_script = "do script \""+_pre+" $.evalFile('"+jsx.path+"'); "+_post+"\" language javascript";
  }

  // templating
  var scpt_code = Mustache.render(scpt_tpl,{app_name: cs_name, run_script: run_script});
  var scpt = createAppleScript(scpt_code);
  
  // execute osascript
  var cmd = ['osascript',scpt.path].join(' ');

  if(done){
    exec(cmd,function(err,stdout,stderr){
      if(err) return done(err);
      if(stderr) return done(stderr);

      var ret = log_file.readFileSync();
      
      jsx.unlink();
      log_file.unlink();
      scpt.unlink();
      
      done(null, ret.toString());
    });
  }
  else{
    var ev = new EventEmitter;
    exec(cmd,function(err,stdout,stderr){
      if(err) return ev.emit('error',err);
      if(stderr) return ev.emit('error',stderr);

      var ret = log_file.readFileSync();
      
      jsx.unlink();
      log_file.unlink();
      scpt.unlink();

      ev.emit('data',ret.toString());
    });
    return ev
  }
  
}
