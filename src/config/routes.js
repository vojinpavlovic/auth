const Config = {
    auth_required : {
        endpoint: '/auth/required',
        method: 'get',
        handler: require('../routes/auth-required')
    },
    auth_redunant : {
        endpoint: '/auth/redunant',
        method: 'get',
        handler: require('../routes/auth-redunant')
    },
    login: {
        endpoint: '/auth/login',
        method: 'get',
        handler: require('../routes/login')
    },
    register: {
        endpoint: '/auth/register',
        method: 'post',
        handler: require('../routes/register')
    }
}

module.exports = Config