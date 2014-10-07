var cheerio = require('cheerio');

function Scraper(origin, body){
  this.origin = origin;
  this.$ = cheerio.load(body);
}

module.exports = Scraper;

Scraper.prototype = {

  getTitle: function(){

    var $ = this.$;

    var title = getTagValue($, "meta", "property", "og:title", "content");
    if (!title) title = getTagValue($,  "meta", "name", "title", "content");
    if (!title) title = getTagValue($,  "meta", "name", "Description", "content");
    if (!title) title = getTagValue($,  "meta", "name", "description", "content");
    if (!title) title = getTagValue($,  "meta", "name", "rnews:description", "content");
    if (!title) title = $('title').text();
    
    return title;
  },

  getFavicon: function(){
    var $ = this.$;
    var self = this;

    var favicon = getTagValue($, "link", "rel", "icon", "href");
    if (!favicon) favicon = getTagValue($,  "link", "rel", "shortcut icon", "href");
    if (!favicon) favicon = 'http://www.google.com/s2/favicons?domain=' + self.origin;
    return fixProtocol(favicon);
  },

  getPreview: function(){

    var $ = this.$;

    var preview = getTagValue($, "meta", "property", "og:description", "content");
    if (!preview) {
      preview = getTagValue($,  "meta", "name", "description", "content");
      if (!preview) 
        preview = $('p').first().text(); //TODO: improve!
    }

    return preview.substr(0, 250);
  },

  findImages: function() {

    var $ = this.$;
    var self = this;
    var images = [];

    function addImg(image){
      if (image) {
        if(image.charAt(0) === '/' && image.charAt(1) !== '/'){
          image = self.origin + '/' + image;
        }
        images.push(fixProtocol(image));
        return true;
      }
      return false;
    }

    if (!addImg(getTagValue($, "meta", "property", "og:image", "content"))) {

      if (!addImg(getTagValue($, "link", "rel", "image_src", "href"))) {

        var imagesFound = $('img');
        for(var i=0; i < imagesFound.length && images.length < 10; i++){
          addImg(imagesFound.eq(i).attr('src'));
        }

        if (!addImg(getTagValue($, "link", "rel", "shortcut", "href"))){
          addImg(getTagValue($, "link", "rel", "icon", "href"));
        }
      }
    }

    return images;
  }
};

function getTagValue($, tagName, property, name, attr) {
  var value = $(tagName + "[" + property + "*='" + name + "']");

  if (value.length > 0){
    return value['0'].attribs[attr];
  }

  return null;
}


function fixProtocol(url) {
    if (url.charAt(0) === '/' && url.charAt(1) === '/') url = "http:" + url;
    return url;
}
