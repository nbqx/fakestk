#!/usr/bin/env node
var fakestk = require('./index');
var path = require('path');

if(process.stdin.isTTY){
  var argv = require('minimist')(process.argv.slice(2),{ alias:{target:'t',help:'h'} }),
      fs = require('fs');

  if(argv.help){
    return fs.createReadStream(__dirname+'/resources/usage.txt').pipe(process.stdout);
  }

  if(argv._.length!==0){
    var script = path.resolve(argv._[0]);
    fakestk.run(script,argv.target,function(err,result){
      if(err) return console.log(err.toString());
      if(result!==''){
        console.log(result);
      }
    });
  }

}else{
  var input = '';
  process.stdin.on('data',function(c){ input += c });
  process.stdin.on('end',function(){
    fakestk.run(input,function(err,result){
      if(err) return console.log(err.toString());
      if(result!==''){
        console.log(result);
      }
    });
  });
}
