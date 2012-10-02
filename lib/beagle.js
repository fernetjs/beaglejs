var Bone = require('./bone.js'),
  request = require('request');

module.exports = {
  scrap: function(url, callback){

    request({
      url: url,
      headers: {'User-Agent': 'Chrome/21'}
    }, function (error, response, body) {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, new Bone(url, response));
    });

  }
};

