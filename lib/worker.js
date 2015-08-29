/*!
**  bauer-plugin-render -- Plugin for bauer-crawler to render content.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-plugin-render>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var fs = require("fs");
var path = require("path");
var Cache = require("bauer-cache");
var factory = require("bauer-factory");
var underscore = require("underscore");

// - -------------------------------------------------------------------- - //

// TODO: base directory for templates

module.exports = function(worker,config) {
  
  worker.on("request",function(options,response) {
    
    var input = new Cache({ file: options.source });
      
    var outputFile = { file: options.target };
    var outputOptions = factory.merge(options.cache,outputFile,config.cache);
    var output = new Cache(outputOptions);
    
    output.validate(function(error,valid) {
      if (error) {
        response.sendError(error);
      } else if (valid) {
        response.sendOk({ file: output.getFile() });
      } else {
        
        input.exists(function(error,exists) {
          if (error) {
            response.sendError(error);
          } else if (exists) {
            input.read(function(error,content) {
              if (error) {
                response.sendError(error);
              } else {
                
                var values = factory.merge(options.values);
                
                values.include = function(includeFile) {
                  var baseFile = input.getFile();
                  var includePath = path.resolve(path.dirname(baseFile),includeFile);
                  var includeContent = fs.readFileSync(includePath,"utf8");
                  var includeCompiled = underscore.template(includeContent);
                  return includeCompiled(values);
                };
                
                var compiled = underscore.template(content);
                var rendered = compiled(values);
                
                output.write(rendered,function(error) {
                  if (error) {
                    response.sendError(error);
                  } else {
                    response.sendOk({ file: output.getFile() });
                  }
                });
              }
            });
          } else {
            response.sendError(new Error("input not found"));
          }
        });
        
      }
    });
  });
  
  worker.sendReady();
  
};

// - -------------------------------------------------------------------- - //
