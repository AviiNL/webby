# WebbyJS

## What is WebbyJS
WebbyJS is a micro framework to quickly create simple web applications built on top of express.js

## Install
just run `npm install webby.js` to install webby

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
  
## Sidenote
You never need to restart the server itself when working on the controllers.
They are dynamically loaded on each page request.
Just make your edits and refresh the page!