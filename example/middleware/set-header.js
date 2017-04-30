module.exports = (req, res, next) => {

    res.header('X-Test-Header', 'Success');

    return next();
};