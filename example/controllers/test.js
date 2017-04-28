/**
 * Created by Yme-Jan on 28-4-2017.
 */
module.exports = {
    getIndex: (req, res) => {

        res.send({
            'welcome':     'to the test page!',
            'description': 'The main function in controllers are \'getIndex\'\n' +
                           'This naming convention is very important\n' +
                           'the lowercast \'get\' is the method that can be used to call the function\n' +
                           'for example \'getCookie\' allowes a get request to /test/cookie\n' +
                           'where \'postCookie\' would require the post method to be used\n' +
                           'As you probably noticed I prefixed that path with /test, this is because the first part\n' +
                           'of any path is the name of the controller, to keep things nice and clean\n' +
                           'The name of this controller is \'test\', if there is a controller file called\n' +
                           '\'bakery.js\' the first part would be /bakery, with methods like \'getCookie\', \'postCookie\' etc',
            'read_more':   'See /test/more for more!'
        });
    },

    getMore: (req, res) => {

        res.send(
            'The output does not require to be json or anything.<br>' +
            'You might as well use plain html, or even templates<br>' +
            'Functions are defined as follows: <code>getIndex(req, res);</code><br>' +
            'for eample is the Index of this controller, the first parameter is an express request object,<br>' +
            'where the second parameter is the express response object, if you are already firmiliar with express<br>' +
            'you probably already know how to use it..<br><br><a href="/test/even/more/stuff/to/talk/about">Click here to continue</a>');
    },

    getEven: (req, res, arg1, arg2, arg3, arg4, arg5) => {

        res.send({
            'summary': 'You can add as many arguments to any function you wish<br>' +
                       'they will be populated with whatever is put in the url',
            arguments: {
                arg1: arg1,
                arg2: arg2,
                arg3: arg3,
                arg4: arg4,
                arg5: arg5,
            },
            'What now?': 'Go ahead and try to post some data to /test/post (url encoded or json body)'
        });
    },

    postPost: (req, res) => {
        res.send({
            you: 'posted',
            data: req.body,
            "And that kids": "is how easy it is!"
        });
    }
};