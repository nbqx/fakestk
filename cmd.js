#!/usr/bin/env node
var fakestk = require('./index');

if(process.stdin.isTTY){
  var argv = require('minimist')(process.argv.slice(2),{}),
      fs = require('fs');

  if(argv.h || argv.help){
    return fs.createReadStream(__dirname+'/resources/usage.txt').pipe(process.stdout);
  }
  
  if(argv._.length!==0){
    var script = fs.readFileSync(argv._[0]).toString();
    fakestk.run(script,function(err,result){
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
