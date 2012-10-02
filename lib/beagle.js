var Bone = require('./bone.js'),
	request = require('request');

module.exports = {
	scrap: function(url, callback){

		var aBone = new Bone(url);

		request({
	    url: url,
	    headers: {'User-Agent': 'Chrome/21'}
	  }, function (error, response, body) {
	    if (error) {
	      callback(error, null);
	      return;
	   	}

	    aBone.fillInfo(response);
			callback(null, aBone);
	  });
	  
	}
};

