const fs         = require('fs');
const express    = require('express');
const bodyParser = require('body-parser');

module.exports = (port, controller_path) => {

    const app = new express();

    app.disable('x-powered-by');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use("/", (req, res) => {
        let args = req.path.substr(1).split('/').filter(n => n);

        let component = "index";
        let method    = req.method.toLowerCase() + "Index";

        if (args.length >= 1) {
            component = args.shift();
        }
        if (args.length >= 1) {
            method = args.shift();
            method = (req.method.toLowerCase() + method.substr(0, 1).toUpperCase() + method.substr(1).toLowerCase()) || req.method.toLowerCase() + "Index";
        }

        if (!fs.existsSync(controller_path + '/' + component + '.js')) {
            console.log('Component not found');
            return res.send({
                'code':      404,
                'component': component,
            });
        }
        delete require.cache[require.resolve(controller_path + '/' + component)];
        let cmp = require(controller_path + '/' + component);

        if (!cmp.hasOwnProperty(method)) {
            console.log('Method not found!');
            return res.send({
                'code':      404,
                'component': component,
                'method':    method,
            });
        }

        args.unshift(res);
        args.unshift(req);

        if (typeof cmp[method] === 'function') {
            return cmp[method].apply(cmp[method], args);
        }

        if (typeof cmp[method] === 'object') {

            if (cmp[method].hasOwnProperty('level')) {
                if (cmp[method].level > 100) {
                    return res.send({
                        'code':      401,
                        'component': component,
                        'method':    method,
                    });
                }
            }

            if (cmp[method].hasOwnProperty('method')) {
                return cmp[method].method.apply(cmp[method].method, args);
            }
        }

    });

    app.listen(port, () => {
        console.log('Server running on port ' + port);
    });

};
