var Bone = require('./bone.js'),
  request = require('request');

function doRequest(options, callback){
  request(options, function (error, response, body) {
    if (error) {
      callback(error);
      return;
    }

    callback(null, response);
  });
}

function isValidResponse(obj){
  return (
    obj.hasOwnProperty('request')
    && obj.hasOwnProperty('body')
    ) ? true: false;
}

module.exports = {
  scrape: function(options, callback){

    if (isValidResponse(options)) {
      callback(null, new Bone(options));
      return;
    }
    else {
      if (typeof options === 'string') {
        options.url = options;
        options.headers = {'User-Agent': 'Chrome/21'};
      }
      else if (typeof options === 'object' && !options.url && !options.uri) {
        callback(new Error("cannot scrape that, expected property 'url' or 'uri'"));
        return;
      }

      doRequest(options, function(err, response){
        if (err) {
          callback(err);
          return;
        }
        callback(null, new Bone(response));
      });

      return;
    }

    callback(new Error('cannot scrape that, needing an URL or Response'));
  }
};
