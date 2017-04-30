const fs         = require('fs');
const express    = require('express');
const bodyParser = require('body-parser');
const swig       = require('swig-templates');

module.exports = (port, options) => {
    options = options || {};
    if (typeof options === 'string') {
        options = {
            controller_path: options,
            template_path:   './theme'
        };
    }

    const app = new express();

    app.disable('x-powered-by');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use("/", (req, res) => {
        if(!options.cache) {
            swig.invalidateCache();
        }

        let args = req.path.substr(1).split('/').filter(n => n);

        let component = "index";
        let method    = req.method.toLowerCase() + "Index";
        let template = 'index';

        if (args.length >= 1) {
            component = args.shift();
        }
        if (args.length >= 1) {
            template = args.shift();
            method = (req.method.toLowerCase() + template.substr(0, 1).toUpperCase() + template.substr(1).toLowerCase()) || req.method.toLowerCase() + "Index";
        }

        if (!fs.existsSync(options.controller_path + '/' + component + '.js')) {
            console.log(`Component ${component} not found`);
            return res.send({
                'code':      404,
                'component': component,
            });
        }
        delete require.cache[require.resolve(options.controller_path + '/' + component)];
        let cmp = require(options.controller_path + '/' + component);

        if (!cmp.hasOwnProperty(method)) {
            console.log(`Method ${method} not found!`);
            return res.send({
                'code':      404,
                'component': component,
                'method':    method,
            });
        }

        args.unshift(res);
        args.unshift(req);

        if (typeof cmp[method] === 'function') {

            let data = cmp[method].apply(cmp[method], args);

            if(data.constructor.name === 'ServerResponse') {
                return;
            }

            // auto template
            if(fs.existsSync(`${options.template_path}/${component}/${template}.swig.html`)) {
                return res.send(swig.compileFile(`${options.template_path}/${component}/${template}.swig.html`)(data));
            }

            return res.send(data);
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

                let data = cmp[method].method.apply(cmp[method].method, args);


                // custom defined template
                if (cmp[method].hasOwnProperty('template')) {
                    return res.send(swig.compileFile(`${options.template_path}/${cmp[method].template}.swig.html`)(data));
                }

                // auto template
                if(fs.existsSync(`${options.template_path}/${component}/${template}.swig.html`)) {
                    return res.send(swig.compileFile(`${options.template_path}/${component}/${template}.swig.html`)(data));
                }

                // no template
                return data;
            }
        }

    });

    app.listen(port, () => {
        console.log('Server running on port ' + port);
    });

};
