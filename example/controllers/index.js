module.exports = {
    'middleware': [
        'set-header',
    ],
    'getIndex': {
        method: (req, res) => {
            return {
                'title': 'welcome',
                'body': 'Welcome to Avii\'s super simple expressjs framework.\n' +
                         'No bullshit, just get shit done!\n' +
                         'You can edit the controllers without needing to restart the server!\n' +
                         'How awesome is that!',
                'pages': [
                    '/test'
                ],
            };
        },
    }
};
