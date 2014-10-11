
require("blanket")(["/lib/scraper.js", "/lib/bone.js", "/lib/beagle.js"]);

var expect = require('expect.js'),
  request = require('request'),
  beagle = require('../lib/beagle.js'),
  Bone = require('../lib/bone.js');

var host = "http://localhost:3000/";

describe('BeagleJS', function(){

  describe('#scrape()', function(){

    it('should have a function named scrape()', function(){
      expect(beagle.scrape).to.be.a('function');
    });

    it('should throw an error if options are wrong', function(done){
      beagle.scrape("htt://", function(err, bone){
        expect(err).to.be.ok();

        beagle.scrape({ urlNot: "test" }, function(err, bone){
          expect(err).to.be.ok();
          expect(err.message).to.be.equal("cannot scrape that, expected property 'url' or 'uri'");
          done();
        });
      });
    });

    it('should allow to call it with an URL', function(done){
      beagle.scrape(host, function(err, bone){

        expect(err).to.be(null);
        expect(bone).to.not.be(undefined);
        
        done();
      });
    });

    it('should allow to call it with request options', function(done){
      beagle.scrape({
        url: host,
        headers: {'User-Agent': 'Mozilla/7'}
      }, function(err, bone){

        expect(err).to.be(null);
        expect(bone).to.not.be(undefined);
        
        done();
      });
    });

    it('should allow to call it with a Response object', function(done){
      
      request(host, function (error, response, body) {
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
      
      beagle.scrape(host, function(err, bone){

        expect(err).to.be(null);
        expect(bone).to.be.a(Bone);
        
        done();
      });

    });

    describe('Bone', function(){

      it('should have a property uri with URL properties', function(done){
        beagle.scrape(host + "opengraph", function(err, bone){
          
          expect(bone.uri).to.not.be(undefined);
          
          var keys = ["protocol", "host", "port", "path"];
          for(var i=0; i < keys.length; i++){
            expect(bone.uri[keys[i]]).to.not.be(undefined);
          }

          done();
        });

      });

      it('should get correctly Open Graph data if it is present', function(done){
        beagle.scrape(host + "opengraph", function(err, bone){

          expect(bone.title).to.be.equal('OG-Title');
          
          expect(bone.images).to.be.an('array');
          expect(bone.images.length).to.be.equal(1);
          expect(bone.images[0]).to.be.equal(host + 'OG-Image');

          expect(bone.preview).to.be.equal('OG-Description');

          done();
        });
      });

      it('should get correctly Meta data if it is present', function(done){
        beagle.scrape(host + "metadata", function(err, bone){

          expect(bone.title).to.be.equal('META-Title');
          
          expect(bone.images).to.be.an('array');
          expect(bone.images.length).to.be.equal(1);
          expect(bone.images[0]).to.be.equal(host + 'META-Image');

          expect(bone.preview).to.be.equal('META-Description');

          done();
        });
      });

      it('should get data from DOM as downfall for OG & META', function(done){
        beagle.scrape(host + "dom", function(err, bone){

          expect(bone.title).to.be.equal('DOM-Title');
          
          expect(bone.images).to.be.an('array');
          expect(bone.images.length).to.be.equal(4);
          
          for(var i=0; i < 2; i++){
            expect(bone.images[i]).to.be.equal(host + 'DOM-Image' + i);
          }

          expect(bone.images[2]).to.be.equal("http://example.com/DOM-Image2");
          expect(bone.images[3]).to.be.equal("http://www.example.com/DOM-Image3");

          expect(bone.preview).to.be.equal('DOM-Description');

          done();
        });
      });

      it('should get correctly Image of favicon', function(done){
        beagle.scrape(host + "favicon", function(err, bone){
          expect(bone.favicon).to.be.an('string');
          expect(bone.favicon).to.be.equal('http://example.com/someicon.png');
          done();
        });
      });


    });
    
  });

});