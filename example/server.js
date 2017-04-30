const webby = require('../index');

webby(8081, {
    controller_path: __dirname + '/controllers',
    template_path:   __dirname + '/theme',
});
