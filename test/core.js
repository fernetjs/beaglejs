var expect = require('expect.js'),
  beagle = require('../lib/beagle.js'),
  Bone = require('../lib/bone.js'),
  testMeta = require('./utils/testMeta.js');

describe('BeagleJS', function(){

  describe('#scrap()', function(){

    it('should have a function named scrap()', function(){
      expect(beagle.scrap).to.be.a('function');
    });

    it('should return an object type of Bone', function(done){
      
      beagle.scrap("http://fernetjs.com", function(err, bone){

        expect(err).to.be(null);
        expect(bone).to.be.a(Bone);
        
        done();
      });

    });

    describe('Bone', function(){

      it('should have a property uri with URL properties', function(done){
        var url = "http://fernetjs.com/2012/07/nodejs-en-la-nube-con-nodejitsu-y-nodester/",
          host = "fernetjs.com";

        beagle.scrap(url, function(err, bone){
          
          expect(bone.uri).to.not.be(undefined);
          
          var keys = ["protocol","host","port","path"];
          for(var i=0; i < keys.length; i++){
            expect(bone.uri[keys[i]]).to.not.be(undefined);
          }

          expect(bone.uri.host).to.be.equal(host);

          done();
        });

      });

      it('should have a property images with an Array of urls', function(done){
        var url = "http://fernetjs.com/2012/07/nodejs-en-la-nube-con-nodejitsu-y-nodester/";

        function test(err, info){

          beagle.scrap(url, function(err, bone){

            expect(bone.images).to.not.be(undefined);
            expect(bone.images).to.be.an('array');

            for(var i=0; i< info.images.length; i++){
              expect(info.images[i]).to.be.equal(bone.images[i]);
            }

            done();
          });
        }

        testMeta.getInfo(url, test);
      });

      it('should have a property title with the site title', function(done){
        var url = "http://fernetjs.com/2012/07/nodejs-en-la-nube-con-nodejitsu-y-nodester/";

        function test(err, info){

          beagle.scrap(url, function(err, bone){

            expect(bone.title).to.not.be(undefined);
            expect(bone.title).to.be.a('string');

            expect(bone.title).to.be.equal(info.title);

            done();
          });
        }

        testMeta.getInfo(url, test);
      });

      it('should have a property preview with a brief description of the site', function(done){
        var url = "http://fernetjs.com/2012/07/nodejs-en-la-nube-con-nodejitsu-y-nodester/";

        function test(err, info){

          beagle.scrap(url, function(err, bone){

            expect(bone.preview).to.not.be(undefined);
            expect(bone.preview).to.be.a('string');

            expect(bone.preview).to.be.equal(info.preview);

            done();
          });
        }

        testMeta.getInfo(url, test);
      });
      
    });
    
  });

});