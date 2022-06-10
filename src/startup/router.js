const routes = require("../config/routes")

module.exports = app => {
    for (const key in routes) {
        const route = routes[key]
        app[route.method.toLowerCase()](route.endpoint, route.handler)
        console.log(`Route established for ${key} with endpoint ${route.endpoint}, method ${route.method}`)
    }
}