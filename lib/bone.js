var parseUri = require('./parseUri').parseUri,
  scraper = require('./scraper.js');

function Bone(url){
  this.url = url;
  this.uri = parseUri(url);

  this.title = '';
  this.images = [];
  this.preview = '';
};

module.exports = Bone;

Bone.prototype = {

  fillInfo: function(response) {
    var reqUri = response.request.uri,
      origin = reqUri.protocol + '//' + reqUri.host + ':' + reqUri.port;

    this.title = scraper.getTitle(response.body);
    this.images = scraper.findImages(origin, response.body);
    this.preview = scraper.getPreview(response.body);
  }

};
