const { Util } = require('jsql');

class Database {
    static run;
    static total;
    static query;

    #self;

    run;
    total;
    query;

    constructor(config = {}) {
        this.#self = this.constructor;
        this.run   = this.run   || config.run   || this.parent().run   || this.empty;
        this.total = this.total || config.total || this.parent().total || this.empty;
        this.query = this.query || config.query || this.parent().query || this.empty;
        console.log(this);
    }

    parent() {
        return this.#self;
    }

    empty() {
        throw new Error('Database Violates Interface Requirements. run, total and query must be assigned methods.');
    }
}

module.exports = Database;