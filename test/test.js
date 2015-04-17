var fs = require('fs'),
    should = require('should');

var detector = require(__dirname+'/../lib/detector');
describe('detecotor test',function(){
  
  it('Adobe InDesign CS5',function(done){
    var v = ['#target indesign-7.0','alert("ok");'].join("\n");
    detector(v).should.have.property('name','InDesign');
    detector(v).should.have.property('version','7.0');
    detector(v).should.have.property('cs_version','CS5');
    done();
  });

  it('Adobe InDesign CC',function(done){
    var v = ['#target indesign-9.2','alert("ok");'].join("\n");
    detector(v).should.have.property('name','InDesign');
    detector(v).should.have.property('version','9.2');
    detector(v).should.have.property('cs_version','CC');
    done();
  });

  it('Adobe Illustrator CS6',function(done){
    var v = ['#target "illustrator 16.0"','alert("ok");'].join("\n");
    detector(v).should.have.property('name','Illustrator');
    detector(v).should.have.property('version','16.0');
    detector(v).should.have.property('cs_version','CS6');
    done();
  });

  it('Adobe photoshop CS6',function(done){
    var v = ["#target 'Photoshop-13.0'",'alert("ok");'].join("\n");
    detector(v).should.have.property('name','Photoshop');
    detector(v).should.have.property('version','13.0');
    detector(v).should.have.property('cs_version','CS6');
    done();
  });

  it('UnKnown Application name and version',function(done){
    var v = ["#target 'hoge-22.0'",'alert("ok");'].join("\n");
    (detector(v) === null).should.be.true;
    done();
  });
});

var executor = require(__dirname+'/../lib/executor');
describe('executor test',function(){

  it('runs indesign cs5 with callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cs5.jsx');
    executor(jsx,function(e,r){
      r.should.eql("ok\r\n");
      done();
    });
  });

  it('runs indesign cs5 without callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cs5.jsx');
    var exe = executor(jsx);
    exe.on('data',function(d){
      d.should.eql("ok\r\n");
      done();
    });
  });

  it('runs indesign cc with callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cc.jsx');
    executor(jsx,function(e,r){
      r.should.eql("ok\r\n");
      done();
    });
  });

  it('runs indesign cc without callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cc.jsx');
    var exe = executor(jsx);
    exe.on('data',function(d){
      d.should.eql("ok\r\n");
      done();
    });
  });

  it('runs photoshop cs5 with callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ps_cs5.jsx');
    executor(jsx,function(e,r){
      r.should.eql("ok\r\n");
      done();
    });
  });

  it('runs illustrator cs5 with callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ill_cs5.jsx');
    executor(jsx,function(e,r){
      r.should.eql("ok\r\n");
      done();
    });
  });

  it('runs indesign cs5 without callback and contains #include in jsx',function(done){
    var cont = ["#target InDesign-7.0","#include \""+__dirname+"/fixtures/inc.jsx\"","inc();"].join("\n");
    var exe = executor(cont);
    exe.on('data',function(d){
      d.should.eql("this is inc\r\n");
      done();
    });
  });
});

var fakestk = require(__dirname+'/../lib');
describe('command line action',function(){
  it('with callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cs5.jsx');
    fakestk.run(jsx,function(err,r){
      r.should.eql("ok\r\n");
      done();
    });
  });

  it('without callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cs5.jsx');
    var exe = fakestk.run(jsx);
    exe.on('data',function(d){
      d.should.eql("ok\r\n");
      done();
    });
  });
});
