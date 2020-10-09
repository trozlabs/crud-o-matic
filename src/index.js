const { Util } = require('jsql');

const Route = require('./Route');
const Router = require('./Router');
const Controller = require('./Controller');
const Service = require('./Service');
const Database = require('./Database');
const Model = require('./Model');
const Field = require('./Field');

class API {

    static Route      = Route;
    static Router     = Router;
    static Controller = Controller;
    static Service    = Service;
    static Database   = Database;
    static Model      = Model;
    static Field      = Field;
    static cached     = false;
    static routes = [
        { method: 'GET',    path: '/',    handlers: ['get'] },
        { method: 'POST',   path: '/',    handlers: ['post'] },
        { method: 'PUT',    path: '/:id', handlers: ['put'] },
        { method: 'DELETE', path: '/:id', handlers: ['delete'] }
    ];

    #self;

    #router;
    #controller;
    #service;
    #database;
    #model;
    #routes = [];
    // routes = [];

    constructor(config = {}) {
        this.#self = this.constructor;

        const { Router, Controller, Service, Database, Model } = this.parent();

        console.log(this.routes)

        this.#model = config.model || Model;
        this.#database = config.database || new Database();
        this.#service = config.service || new Service({
            model: this.getModel(),
            database: this.getDatabase() 
        });
        this.#controller = config.controller || new Controller({
            model: this.getModel(),
            service: this.getService(),
            cached: config.cached || this.cached || this.parent().cached
        });
        this.#router = config.router || new Router({
            path: config.path,
            controller: this.getController(),
            routes: config.routes || this.routes || this.parent().routes,
        });
        console.log(this)
    }
    parent() {
        return this.#self;
    }
    
    // set routes(routes) {
    //     this.#routes = routes;
    // }
    // get routes() {
    //     return this.#routes;
    // }

    getRouter(internal) {
        if (internal) return this.#router.router();
        return this.#router;
    }
    getController() {
        return this.#controller;
    }
    getService() {
        return this.#service;
    }
    getDatabase() {
        return this.#database;
    }
    getModel() {
        return this.#model;
    }
}

module.exports = API;