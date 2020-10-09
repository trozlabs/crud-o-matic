const { Util } = require('jsql');

const Field = require('./Field');

class Model {
    static Field = Field;

    static DATABASE;
    static TABLE;
    static PK;
    static ID;

    #self;

    id;

    constructor(config = {}) {
        this.#self = this.constructor;
        this.id = new Field({ name: 'id', value: 0 });
        console.log('this.name:', this.constructor.name)
    }
    
    parent() {
        return this.#self;
    }
}

module.exports = Model;