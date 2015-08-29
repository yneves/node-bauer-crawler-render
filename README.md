# node-bauer-plugin-render
Plugin for `bauer` to render templates.

## Installation

```
npm install bauer-plugin-render
```

## Usage

The popular `underscore` module is used internally to compile templates.

```js
module.exports = function(promise) {
  
  return promise.render(__dirname + "/template.jst",{
    values: {
      name: "Yuri Neves",
      age: "30"
    },
    target: "output.html"
  })
  .then(function(file) {
    // file === output.html
  });
};
```

```js
module.exports = function(promise) {
  
  return promise.return({
    values: {
      name: "Yuri Neves",
      age: "30"
    },
    target: "output.html"
  })
  .render(__dirname + "/template.jst")
  .then(function(file) {
    // file === output.html
  });
};
```

```js
module.exports = function(promise) {
  
  return promise.return(__dirname + "/template.jst")
    .return({
    values: {
      name: "Yuri Neves",
      age: "30"
    },
    target: "output.html"
  })
  .then(function(file) {
    // file === output.html
  });
};
```

## Configuration

```js
{
  workers: 1,
  slots: 1,
  delay: 0,
  options: { // default options for underscore.templateSettings
    
  }
}
```

## API Summary

* `Promise`
  * `.render(source String) :Promise`
  * `.render(options Object) :Promise`
  * `.render(source String, options Object) :Promise`


## License

[MIT](./LICENSE)


  
