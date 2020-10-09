const { Util } = require('jsql');
const express = require('express');
const Route = require('./Route');

class Router {
    static Route = Route;

    #self;

    #path;
    #router;
    #routes;
    #controller;

    constructor(config = {}) {
        this.#self       = this.constructor;
        this.#path       = config.path       || this.path        || this.parent().path;
        this.#controller = config.controller || this.controller  || this.parent().controller;
        const routes     = config.routes     || this.#routes;
        this.#router     = express();
        this.#routes = new Map();

        routes.forEach(route => {
            let handlers = Util.isArray(route.handlers) ? route.handlers : [ route.handlers ];
            handlers = handlers.map(fn => {
                console.log(fn)
                if (Util.isString(fn)) {
                    return this.controller()[fn].bind(this.controller());
                } else {
                    return fn;
                }
            });
            this[Util.lower(route.method)](route.path, ...handlers)
        });
    }
    parent() {
        return this.#self;
    }
    router() {
        return this.#router;
    }
    controller() {
        return this.#controller;
    }

    getPath() {
        return this.#path;
    }
    getRoutes() {
        return this.#routes;
    }
    routeExists(route) {
        const id = route.id || `${route.method}-${route.path}`;
        return this.#routes.has(id);
    }
    addRoute(route) {
        route = new Route(route);
        if (this.routeExists(route)) {
            throw new Error('Route already exists');
        }
        this.#routes.set(route.id, route);
        return this;
    }
    
    // calls express router but with checks if routes already exist.
    use() {
        this.router().use.call(this.#router, ...arguments);
        return this;
    }
    route() {
        this.addRoute({ method: 'all', path, handlers });
        this.#router.route.call(this.#router, ...arguments);
        return this;
    }
    get(path, ...handlers) {
        this.addRoute({ method: 'get', path, handlers });
        this.router().get.call(this.#router, ...arguments);
        return this;
    }
    post(path, ...handlers) {
        this.addRoute({ method: 'post', path, handlers });
        this.router().post.call(this.#router, ...arguments);
        return this;
    }
    put(path, ...handlers) {
        this.addRoute({ method: 'put', path, handlers });
        this.router().put.call(this.#router, ...arguments);
        return this;
    }
    delete(path, ...handlers) {
        this.addRoute({ method: 'delete', path, handlers });
        this.router().delete.call(this.#router, ...arguments);
        return this;
    }
    
    listen() {
        this.router().listen.call(this.#router, ...arguments);
        return this;
    }
}

module.exports = Router;