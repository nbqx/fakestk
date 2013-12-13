## Fakestk

Fakestk(Fake ESTK) Adobe ExtendScript(JSX) simple command runner.

* auto detection CS application name and version
* accept stdin
* from $.write and $.writeln output to stdout
* currently OSX only

### Usage

    $ npm install -g fakestk

then

    $ fakestk /path/to/script.jsx

or

    $ less /path/to/script.jsx
    $ echo "#target indesign-7.0;alert('hello!');" | fakestk

or

    $ npm install fakestk

then

``` js
var fakestk = require('fakestk');
 
// script => filepath or script-content
 
// with callback
fakestk.run(script,function(err,result){
  if(err) return console.log(err.toString());
  if(result!==""){
    console.log(result);
  }
});
 
// without callback
var exec = fakestk.runSync(script);
exec.on('error',function(err){ console.log(err) });
exec.on('data', function(data){ console.log(data) });
```
