var cheerio = require('cheerio');

module.exports = {
	getTitle: function(body){

		var $ = cheerio.load(body);

		var title = getTagValue($, "meta", "property", "og:title", "content");
    if (!title) {
      title = getTagValue($,  "meta", "name", "name", "content");
      if (!title)
        title = $('title').text();
    }

    return title;
	},
	getPreview: function(body){

		var $ = cheerio.load(body);

		var preview = getTagValue($, "meta", "property", "og:description", "content");
    if (!preview) {
    	preview = getTagValue($,  "meta", "name", "description", "content");
      if (!preview) 
        preview = $('p').first().text(); //TODO: improve!
    }

    return preview.substr(0, 250);
	},
	findImages: function(origin, body) {

		var $ = cheerio.load(body);
		
		var images = [];

		function addImg(image){
	    if (image) {
	      if(image.indexOf('http') == -1) {
	        image = origin + image;
	      }
	      images.push(image);
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
      }
    }

		if (!addImg(getTagValue($, "link", "rel", "shortcut", "href"))){
			addImg(getTagValue($, "link", "rel", "icon", "href"));
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


