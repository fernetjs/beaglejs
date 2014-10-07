var Scraper = require('./scraper.js');

function Bone(response) {

  this.uri = response.request.uri;
  this.url = this.uri.href;
  this.origin = this.uri.protocol + '//' + this.uri.host;

  this.body = response.body;

  this.title = '';
  this.images = [];
  this.preview = '';
  this.favicon = '';
   
  this.fillInfo();
};

module.exports = Bone;

Bone.prototype = {

  fillInfo: function() {
    var scraper = new Scraper(this.origin, this.body);
    
    this.title = scraper.getTitle();
    this.images = scraper.findImages();
    this.preview = scraper.getPreview();
    this.favicon = scraper.getFavicon();
  }

};
