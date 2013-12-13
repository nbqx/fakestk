var fs = require('fs');

// Detect Adobe Application's Name and Version from ExtendScript code

// Application name and version info
var app_info = JSON.parse(fs.readFileSync(__dirname+'/../resources/versions.json'));

// return adobe application's name and version from ExtendScript source.
// argument `code` is String or Buffer. return Object or null.
module.exports = function(code){
  
  var code = (typeof 'string' === code)? code : code.toString();
  var re = /^\#target (.*?)(?:\s|\-)(\S*)(?:\s|$)/gi;
  if(code.match(re)){
    var m = re.exec(code);
    var _name = (m[1]).toLowerCase().replace(/['|"|;]/g,''),
        _version = m[2].replace(/['|"|;]/g,'');

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

