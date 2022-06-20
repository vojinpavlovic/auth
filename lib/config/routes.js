const Config = {
    auth_required : {
        endpoint: '/auth/required',
        method: 'get',
        handler: require('../routes/auth-required')
    },
    login: {
        endpoint: '/login',
        method: 'post',
        handler: require('../routes/login')
    },
    register: {
        endpoint: '/register',
        method: 'post',
        handler: require('../routes/register')
    },
    newCode: {
        endpoint: '/newCode',
        method: 'get',
        handler: require('../routes/new-code')
    },
    codeVerify: {
        endpoint: '/verifyCode',
        method: 'get',
        handler: require('../routes/verify-code')
    },
    passReset: {
        endpoint: '/passReset',
        method: 'get',
        handler: require('../routes/pass-reset')
    },
}

module.exports = Config