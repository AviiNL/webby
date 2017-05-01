# WebbyJS

## What is WebbyJS
WebbyJS is a micro framework to quickly create simple web applications built on top of express.js

## Install
Just run `npm install webby.js --save` to install webby

## Example
```js
const webby = require('webby.js');
webby(8081, __dirname + '/controllers');
```
Thats all there is to it!

Look in the `example` directory for a fully working example and be amazed at it's simplicity!

## Controllers
Every `.js` file in the controllers directory is the first segment of the route.
For example `/controllers/bakery.js` will hold all routes like `http://localhost:8081/bakery`.

The only exception to this rule is `/controllers/index.js`.
This file will hold the root (`http://localhost:8081/`).

## Methods
Methods in the controllers are very specific in their naming.
They start with a lowercase _method_ followed by the route name with an uppercase.
For example `getCookie(req, res)` will serve the `/cookie` get request,
while the `postCookie(req, res)` will server the `/cookie` post request.
A post body can be filled either urlencoded or as application/json data

## Index
If you want the index of the `bakery.js` controller to be accessable as `/bakery` create an `getIndex(req, res)` method.
`index` is a special keyword that will always result in something without a name. The first controller will be `index.js`
with inside of it a `getIndex(req, res)` method to server the root of your website

## Additional Route Parameters
The first 2 parameters inside a controller functions are always express.js's reqest and response objects.
After that you can add an (in)finite amount of parameters to your controllers. eg. `getCookie(req, res, arg1, arg2, arg3)`
will allow the you to navigate to `http://localhost:8081/bakery/cookie/hello/world/test` and have the arguments populated
with the last three route segments., in this case:
```js
arg1 = "hello";
arg2 = "world";
arg3 = "test";
```

## Templating
Webby.js uses [swig](https://github.com/node-swig/swig-templates) as it's primary templating engine and can be used by defining the template_path in the options object.
```js
const webby = require('webby.js');
webby(8081, {
    controller_path: __dirname + '/controllers',
    template_path: __dirname + '/theme'
});
```
Templates use almost the same naming conventions as controllers and methods,
however with templates it's in the directory structure and filename.
For example, if you have a controller called bakery with a method called getCookie,
Webby will check if the file `{template_path}/bakery/cookie.swig.html` exists
and use that with the data returned from the controller.

A Template file can also be overridden in the controller with the following usage:
```js
module.exports = {
    'getIndex': {
        template: 'custom/template',
        method: (req, res) => {
            return {
                data: 'here',
            };
        }
    }
};
```
This will parse the `{template_path}/custom/template.swig.html` file with `{data: 'here'}` as it's data

## Middleware
Register the middleware path in the options object: `{middleware_path: __dirname + '/middleware'}`
Middlewares can ben defined on component and route level as follows:
```js
module.exports = {
    'middleware': [
        'set-header',
    ],
    'getIndex': {
        ...
```
will be ran on every method in the component, or
```js

module.exports = {
    'getIndex': {
        middleware: [
            'set-header',
        ],
        method: (req, res) => {
            ...
```
to run the middleware only on the getIndex method. `set-header` is the filename of the middleware.

The middleware file itself looks like:
```js
module.exports = (req, res, next) => {

    res.header('X-Test-Header', 'Success');

    return next();
};
```

### Static Content
Static content can be served by suppying the `options.static_path` to the second parameter of the webby function
```js
const webby = require('webby.js');
webby(8081, {
    controller_path: __dirname + '/controllers',
    static_path: __dirname + '/static'
});
```

## Sidenote
You never need to restart the server itself when working on the controllers.
They are dynamically loaded on each page request.
Just make your edits and refresh the page!
