/*!
**  bauer-crawler-render -- Plugin for bauer-crawler to render content.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-crawler-render>
*/
// - -------------------------------------------------------------------- - //

"use strict";

// - -------------------------------------------------------------------- - //

module.exports = {
  
  render: {
    
    // .render(source String) :Promise
    s: function(source) {
      return this.then(function(options) {
        return this.promise().render(source,options);
      });
    },
    
    // .render(options Object) :Promise
    o: function(options) {
      return this.then(function(source) {
        return this.promise().render(source,options);
      });
    },
    
    // .render(source String, options Object) :Promise
    so: function(source,options) {
      options.source = source;
      return this.then(function() {
        return this.requestWorker("render",options).get("file");
      });
    }
    
  }
      
};

// - -------------------------------------------------------------------- - //
