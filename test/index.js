const express = require('express');
const API = require('../src');

class UserDatabase extends API.Database {
    constructor(config) { super(config) }

    run   = async () => {}
    total = async () => {}
    query = async () => {}
}
class UserModel extends API.Model {
    constructor(config) { super(config) }
}
class UserRouter extends API.Model {
    constructor(config) { super(config) }
}
class UserController extends API.Controller {
    constructor(config) { super(config) }
}
class UserService extends API.Service {
    constructor(config) { super(config) }
}

// class UserAPI extends API {
//     constructor(config) { super(config) }
//     static database   = UserDatabase;
//     static model      = UserModel;
//     static service    = UserService;
//     static controller = UserController;
//     static router     = UserRouter;
// }
// const userAPI = new UserAPI();

class AppAPI extends API {
    path = '/';
    routes = [
        { method: 'GET', path: '/', handlers: ['get'] },
        // { method: 'POST',   path: '/',    handlers: ['post'] },
        // { method: 'PUT',    path: '/:id', handlers: ['put'] },
        // { method: 'DELETE', path: '/:id', handlers: ['delete'] }
    ];
    constructor(config) {
        super(config);
    }
}

const appAPI = new AppAPI();

// appAPI.getRouter().use('/users', userAPI.getRouter(true))

// console.log(userAPI);

const req = {
    user: { id: 1, email: 'admin@example.com', role: 'admin' },
    params: { id: 4 },
    query: { name: 'Four', page: 1, limit: 25, sort: 'name', dir: 'desc' },
    body: { name: 'Six' }
};
const res = {
    code: 200,
    status(code) {
        this.code = code;
    },
    send(data) {
        const json = JSON.stringify({
            status: this.code,
            payload: data
        }, null, 4);
        // console.log('response:', json);
        return json;
    }
};

// userAPI.getController().get(req, res).then(console.log).catch(console.error);
// appAPI.getController().get(req, res).then(console.log).catch(console.error);
// userAPI.getController().get(req, res).then(console.log).catch(console.error);
// userAPI.getController().put(req, res).then(console.log).catch(console.error);
// userAPI.getController().post(req, res).then(console.log).catch(console.error);
// userAPI.getController().delete(req, res).then(console.log).catch(console.error);
// userAPI.getService().select().then(console.log).catch(console.error);

// appAPI.getRouter().get('/', (req, res) => {
//     res.send({
//         message: 'It Works!'
//     })
// });

appAPI.getRouter().listen(8000)

// console.log(module.exports)