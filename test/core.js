var expect = require('expect.js'),
  request = require('request'),
  beagle = require('../lib/beagle.js'),
  Bone = require('../lib/bone.js'),
  testMeta = require('./utils/testMeta.js');

describe('BeagleJS', function(){

  describe('#scrape()', function(){

    it('should have a function named scrape()', function(){
      expect(beagle.scrape).to.be.a('function');
    });

    it('should allow to call it with an URL', function(done){
      beagle.scrape("http://fernetjs.com", function(err, bone){

        expect(err).to.be(null);
        expect(bone).to.not.be(undefined);
        
        done();
      });
    });

    it('should allow to call it with request options', function(done){
      beagle.scrape({
        url: "http://fernetjs.com",
        headers: {'User-Agent': 'Mozilla/7'}
      }, function(err, bone){

        expect(err).to.be(null);
        expect(bone).to.not.be(undefined);
        
        done();
      });
    });

    it('should allow to call it with a Response object', function(done){
      
      request("http://fernetjs.com", function (error, response, body) {
        if (error) {
          callback(error);
          return;
        }

        beagle.scrape(response, function(err, bone){

          expect(err).to.be(null);
          expect(bone).to.not.be(undefined);
          
          done();
        });
      });
    });

    it('should return an object type of Bone', function(done){
      
      beagle.scrape("http://fernetjs.com", function(err, bone){

        expect(err).to.be(null);
        expect(bone).to.be.a(Bone);
        
        done();
      });

    });

    describe('Bone', function(){
      var info = {},
        url = "http://fernetjs.com/2012/07/nodejs-en-la-nube-con-nodejitsu-y-nodester/";

      before(function (done){
        testMeta.getInfo(url, function (err, _info){
          info = _info;
          done();
        });
      });
  
      it('should have a property uri with URL properties', function(done){
        var host = "fernetjs.com";

        beagle.scrape(url, function(err, bone){
          
          expect(bone.uri).to.not.be(undefined);
          
          var keys = ["protocol", "host", "port", "path"];
          for(var i=0; i < keys.length; i++){
            expect(bone.uri[keys[i]]).to.not.be(undefined);
          }

          expect(bone.uri.host).to.be.equal(host);

          done();
        });

      });

      it('should have a property images with an Array of urls', function(done){
        beagle.scrape(url, function(err, bone){

          expect(bone.images).to.not.be(undefined);
          expect(bone.images).to.be.an('array');

          for(var i=0; i< info.images.length; i++){
            expect(bone.images[i]).to.be.equal(info.images[i]);
          }

          done();
        });
      });

      it('should have a property title with the site title', function(done){
        beagle.scrape(url, function(err, bone){

          expect(bone.title).to.not.be(undefined);
          expect(bone.title).to.be.a('string');

          expect(bone.title).to.be.equal(info.title);

          done();
        });

      });

      it('should have a property preview with a brief description of the site', function(done){
        beagle.scrape(url, function(err, bone){

          expect(bone.preview).to.not.be(undefined);
          expect(bone.preview).to.be.a('string');

          expect(bone.preview).to.be.equal(info.preview);

          done();
        });
      });
      
    });
    
  });

});