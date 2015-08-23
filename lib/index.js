/*!
**  bauer-crawler-render -- Plugin for bauer-crawler to render content.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-crawler-render>
*/
// - -------------------------------------------------------------------- - //

"use strict";

module.exports = {
  
  name: "render",
  
  config: {
    workers: 1,
    cache: {
      json: false,
      expires: 0,
      file: {
        dir: ".",
        ext: "txt"
      }
    }
  },
  
  worker: __dirname + "/worker.js",
  promise: __dirname + "/promise.js"
  
};

// - -------------------------------------------------------------------- - //
