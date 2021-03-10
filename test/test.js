var fs = require('fs'),
    should = require('should');

var detector = require(__dirname+'/../lib/detector');
describe('detector test',function(){

  it('Adobe InDesign Running',function(done){
    var v = ['#target indesign','alert("ok");'].join("\n");
    detector(v).should.have.property('name','InDesign');
    detector(v).should.have.property('version','Open');
    detector(v).should.have.property('cs_version','');
    done();
  });

  it('Adobe InDesign CS5',function(done){
    var v = ['#target indesign-7.0','alert("ok");'].join("\n");
    detector(v).should.have.property('name','InDesign');
    detector(v).should.have.property('version','7.0');
    detector(v).should.have.property('cs_version','CS5');
    done();
  });

  it('Adobe InDesign CS6',function(done){
    var v = ['//@target indesign-8.0','alert("ok");'].join("\n");
    detector(v).should.have.property('name','InDesign');
    detector(v).should.have.property('version','8.0');
    detector(v).should.have.property('cs_version','CS6');
    done();
  });

  it('Adobe InDesign CC',function(done){
    var v = ['#target indesign-9.2','alert("ok");'].join("\n");
    detector(v).should.have.property('name','InDesign');
    detector(v).should.have.property('version','9.2');
    detector(v).should.have.property('cs_version','CC');
    done();
  });

  it('Adobe InDesign CC 2017',function(done){
    var v = ['#target indesign-12','alert("ok");'].join("\n");
    detector(v).should.have.property('name','InDesign');
    detector(v).should.have.property('version','12');
    detector(v).should.have.property('cs_version','CC 2017');
    done();
  });

  it('Adobe InDesign CC 2018',function(done){
    var v = ['#target indesign-13','alert("ok");'].join("\n");
    detector(v).should.have.property('name','InDesign');
    detector(v).should.have.property('version','13');
    detector(v).should.have.property('cs_version','CC 2018');
    done();
  });

  it('Adobe InDesign 2020',function(done){
    var v = ['#target indesign-15','alert("ok");'].join("\n");
    detector(v).should.have.property('name','InDesign');
    detector(v).should.have.property('version','15');
    detector(v).should.have.property('cs_version','2020');
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

  it('runs indesign cs6 with callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cs6.jsx');
    executor(jsx,function(e,r){
      r.should.eql("ok\r\n");
      done();
    });
  });

  it('runs indesign cs6 without callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cs6.jsx');
    var exe = executor(jsx);
    exe.on('data',function(d){
      d.should.eql("ok\r\n");
      done();
    });
  });

  it('runs indesign cs6 without callback and contains #include in jsx',function(done){
    var cont = ["#target InDesign-8.0","#include \""+__dirname+"/fixtures/inc.jsx\"","inc();"].join("\n");
    var exe = executor(cont);
    exe.on('data',function(d){
      d.should.eql("this is inc\r\n");
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

  it('runs indesign cc 2017 with callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cc2017.jsx');
    executor(jsx,function(e,r){
      r.should.eql("ok\r\n");
      done();
    });
  });

  it('runs indesign cc 2017 without callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cc2017.jsx');
    var exe = executor(jsx);
    exe.on('data',function(d){
      d.should.eql("ok\r\n");
      done();
    });
  });

  it('runs indesign cc 2017 without callback and contains #include in jsx',function(done){
    var cont = ["#target InDesign-12","#include \""+__dirname+"/fixtures/inc.jsx\"","inc();"].join("\n");
    var exe = executor(cont);
    exe.on('data',function(d){
      d.should.eql("this is inc\r\n");
      done();
    });
  });

  it('runs indesign cc 2018 with callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cc2018.jsx');
    executor(jsx,function(e,r){
      r.should.eql("ok\r\n");
      done();
    });
  });

  it('runs indesign cc 2018 without callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cc2018.jsx');
    var exe = executor(jsx);
    exe.on('data',function(d){
      d.should.eql("ok\r\n");
      done();
    });
  });

  it('runs indesign cc 2018 without callback and contains #include in jsx',function(done){
    var cont = ["#target InDesign-13","#include \""+__dirname+"/fixtures/inc.jsx\"","inc();"].join("\n");
    var exe = executor(cont);
    exe.on('data',function(d){
      d.should.eql("this is inc\r\n");
      done();
    });
  });
  
  it('runs indesign cc 2018 on target override with callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cs5.jsx');
    executor(jsx,"InDesign-13",function(e,r){
      r.should.eql("ok\r\n");
      done();
    });
  });

  it('runs indesign cc 2020 with callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cc2020.jsx');
    executor(jsx,function(e,r){
      r.should.eql("ok\r\n");
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

});

var fakestk = require(__dirname+'/../lib');
describe('command line action',function(){
  it('runs indesign cs6 with callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cs6.jsx');
    fakestk.run(jsx,function(err,r){
      r.should.eql("ok\r\n");
      done();
    });
  });

  it('runs indesign cs6 without callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cs6.jsx');
    var exe = fakestk.run(jsx);
    exe.on('data',function(d){
      d.should.eql("ok\r\n");
      done();
    });
  });

  it('runs indesign cs6 with callback +BOM',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cs6withbom.jsx');
    fakestk.run(jsx,function(err,r){
      r.should.eql("with BOM");
      done();
    });
  });

  it('runs indesign cs6 without callback +BOM',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cs6withbom.jsx');
    var exe = fakestk.run(jsx);
    exe.on('data',function(d){
      d.should.eql("with BOM");
      done();
    });
  });

  it('runs indesign cc 2017 with callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cc2017.jsx');
    fakestk.run(jsx,function(err,r){
      r.should.eql("ok\r\n");
      done();
    });
  });

  it('runs indesign cc 2017 without callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cc2017.jsx');
    var exe = fakestk.run(jsx);
    exe.on('data',function(d){
      d.should.eql("ok\r\n");
      done();
    });
  });

  it('runs indesign cc 2017 with callback +BOM',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cc2017withbom.jsx');
    fakestk.run(jsx,function(err,r){
      r.should.eql("with BOM");
      done();
    });
  });

  it('runs indesign cc 2017 without callback +BOM',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cc2017withbom.jsx');
    var exe = fakestk.run(jsx);
    exe.on('data',function(d){
      d.should.eql("with BOM");
      done();
    });
  });

  it('runs indesign cc 2018 with callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cc2018.jsx');
    fakestk.run(jsx,function(err,r){
      r.should.eql("ok\r\n");
      done();
    });
  });

  it('runs indesign cc 2018 without callback',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cc2018.jsx');
    var exe = fakestk.run(jsx);
    exe.on('data',function(d){
      d.should.eql("ok\r\n");
      done();
    });
  });

  it('runs indesign cc 2018 with callback +BOM',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cc2018withbom.jsx');
    fakestk.run(jsx,function(err,r){
      r.should.eql("with BOM");
      done();
    });
  });

  it('runs indesign cc 2018 without callback +BOM',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cc2018withbom.jsx');
    var exe = fakestk.run(jsx);
    exe.on('data',function(d){
      d.should.eql("with BOM");
      done();
    });
  });

  it('runs open indesign application with callback +BOM',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_cc2018withbom.jsx');
    fakestk.run(jsx,function(err,r){
      r.should.eql("with BOM");
      done();
    });
  });

  it('runs open indesign application without callback +BOM',function(done){
    var jsx = fs.readFileSync(__dirname+'/fixtures/ind_openwithbom.jsx');
    var exe = fakestk.run(jsx);
    exe.on('data',function(d){
      d.should.eql("with BOM");
      done();
    });
  });

});
