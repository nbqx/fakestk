var fs = require('fs');

// Detect Adobe Application's Name and Version from ExtendScript code

// Application name and version info
var app_info = JSON.parse(fs.readFileSync(__dirname+'/../resources/versions.json'));

// return adobe application's name and version from ExtendScript source.
// argument `code` is String or Buffer. return Object or null.
module.exports = function(code){

  var code = (typeof 'string' === code)? code : code.toString();
  // run both with BOM and without BOM
  var re = /(?=^|[\r\n])(\uFEFF?\/*[\#@]target )(['"a-z]*)(?:\s|\-)?(['"a-z0-9\.\-]*)(?=[;\n\r]|$)/im;

  if(code.match(re)){
    var m = re.exec(code);
    var _name = (m[2]).toLowerCase().replace(/['|"|;]/,'');
    var _version = (m[3]).replace(/['|"|;]/,'');
    if(_version === '') _version = "Open";

    var app = app_info[_name];
    if(app!==undefined){
      return {
        name: app.name,
        version: _version,
        cs_version: app.versions[_version]
      }
    }else{
      return null
    }
  }else{
    return null
  }
};
