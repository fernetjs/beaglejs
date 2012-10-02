var cheerio = require('cheerio'),
  request = require('request'),
  parseUri = require('./parseUri').parseUri;

module.exports.getInfo = function (url, callback){

  request({
    url: url,
    headers: {'User-Agent': 'Chrome/21'}
  }, function (error, response, body) {
    if (error) {
      callback({
        error: error,
        code: 500
      });
      return;
    }
    if (response.statusCode != 200) {
      callback({
        error: error,
        code: response.statusCode
      });
      return;
    }

    var $ = cheerio.load(body);

    var pageTitle = getMetaValue($, "property", "og:title");
    if (!pageTitle) {
      pageTitle = getMetaValue($, "name", "name");
      if (!pageTitle)
        pageTitle = $('title').text();
    }

    var host = parseUri(url);
    if (host.port)
      host = host.protocol + '://' + host.host + ':' + host.port;
    else 
      host = host.protocol + '://' + host.host;

    var images = [];

    var image = getMetaValue($, "property", "og:image");
    if (image) {
      if(image.indexOf('http') == -1) {
        image = host + image;
      }
      images.push(image);
    }
    else {
      image = getImageLink($);
      if (image) {
        if(image.indexOf('http') == -1) {
          image = host + image;
        } 
        images.push(image);
      }
      else {
        var imagesFound = $('img');
        if (imagesFound.length > 0) {
          for(var i=0; i<imagesFound.length; i++){
            image = imagesFound.eq(i).attr('src');
            if (image) {
              if(image.indexOf('http') == -1) {
                image = host + image;
              }

              images.push(image);
              if (images.length === 10)
                break;
            }
          }
        }
      }
    }

    image = getFavicon($);
    if (image) {
      if(image.indexOf('http') == -1) {
        image = host + image;
      }
      images.push(image);
    }

    var desc = getMetaValue($, "property", "og:description");
    if (!desc) {
      desc = getMetaValue($, "name", "description");
      if (!desc) 
        desc = $('p').first().text();
    }
    
    var link = {
      url: url,
      title: pageTitle,
      preview: desc.substr(0, 250),
      images: images
    };

    if (link.images.length > 0)
      link.imageIndex = 0;

    callback(null, link);
  });

}

function getMetaValue($, property, name){
  var property = $("meta[" + property + "='" + name + "']");

  if (property.length > 0){
    return property['0'].attribs.content;
  }
  
  return null;
}

function getFavicon($){
  var shortcut = $("link[rel*=shortcut]"),
    icon = $("link[rel*=icon]");

  if (icon.length > 0){
    return icon['0'].attribs.href;
  }
  else if (shortcut.length > 0){
    return shortcut['0'].attribs.href;
  }
  
  return null;
}

function getImageLink($){
 var image = $("link[rel=image_src]");

  if (image.length > 0){
    return image['0'].attribs.href;
  }
  
  return null;
}
