##BeagleJS

Release a Beagle dog to scrape a web site for you.

The intention of this library is to get the relevant information of a site, like title, image and description.

### How it works?

Scraping the meta-data and falling-back in this order:
1. Facebook OpenGraph:
  og:title | og:image | og:description
2. Metas 
  meta[name] | meta[image_src] | meta[description]
3. Looking into DOM (needs to be improved)

### How to use it?

```bash
npm install beagle
```

### Scraping a WebSite

#### With an URL
```javascript
  var beagle = require('beagle');

  beagle.scrap("http://fernetjs.com", function(err, bone){
    console.log(bone.title);
  });
```

#### With a Response object
```javascript
  var beagle = require('beagle'),
    request = require('request');

  request("http://fernetjs.com", function (error, response, body) {
    if (error) {
      return;
    }

    beagle.scrap(response, function(err, bone){
      console.log(bone.preview);
    });
  });
```

#### Bone properties
```javascript
{
  title: [string], //site title
  images: [array:string], //url of images found
  preview: [string] //site brief description (max 250c) 
  
  url: [string], // called url
  origin: [string] //protocol + host + port of url
  body: [string] //response body
  
  uri: {
    protocol: [string],
    host: [string],
    port: [string],
    path: [string]
  }
}
```

## License 

(The MIT License)

Copyright (c) 2012 Pablo Novas &lt;pjnovas@gmail.com&gt;
Copyright (c) 2012 Matias Arriola &lt;matias.arriola@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.