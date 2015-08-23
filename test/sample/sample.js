// - -------------------------------------------------------------------- - //

"use strict";

var fs = require("fs");
var assert = require("assert");
var Crawler = require("bauer-crawler");

var crawler = new Crawler({
  config: {
    render: {
      cache: {
        file: {
          dir: __dirname
        }
      }
    }
  }
});

crawler.loadPlugin(__dirname + "/../../");

crawler.start(function() {
  
  return this.promise()
    .render(__dirname + "/sample.html",{
      target: {
        dir: __dirname,
        name: "target",
        ext: "html"
      },
      values: {
        one: 1,
        two: 2
      }
    })
    .then(function(file) {
      var output = fs.readFileSync(file).toString();
      var compare = fs.readFileSync(__dirname + "/compare.html").toString();
      assert.deepEqual(output,compare);
      fs.unlinkSync(file);
    });
});

// - -------------------------------------------------------------------- - //
