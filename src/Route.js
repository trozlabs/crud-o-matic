const { Util } = require('jsql');

class Route {
    #self;
    #id;
    #method;
    #path;
    #handlers;
    #scope;

    constructor(config = {}) {
        this.#self      = this.constructor;

        this.#id        = `${config.method}-${config.path}`;
        this.#method    = (config.method  || 'get').toLowerCase();
        this.#path      = config.path     || '/';
        this.#handlers  = Util.isArray(config.handlers) ? config.handlers : [ config.handlers ];
        this.#scope     = config.scope;
        
        console.log('this.name:', config)
    }
    parent() {
        this.#self;
    }

    get id() {
        return this.#id;
    }
    get method() {
        return this.#method;
    }
    get path() {
        return this.#path;
    }
    get handlers() {
        return this.#handlers;
    }
    get scope() {
        return this.#scope;
    }

}

module.exports = Route;