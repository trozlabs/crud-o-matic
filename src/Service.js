const { Util } = require('jsql');

class Service {
    #self;
    #model;
    #database;

    constructor(config = {}) {
        this.#self = this.constructor;
        this.#database = config.database;
        this.#model = config.model;
        console.log('this.name:', this.constructor.name)
    }
    parent() {
        return this.#self;
    }

    async select(params) {
        console.log(this.parent().name + '.select');
        try {
            return {
                total: 200,
                page: 1,
                limit: 5,
                rows: [
                    { id: 1, name: 'One' },
                    { id: 2, name: 'Two' },
                    { id: 3, name: 'Three' },
                    { id: 4, name: 'Four' },
                    { id: 5, name: 'Five' },
                ]
            }
        } catch (e) {

        } 
    }
    async insert(params) {
        console.log(this.parent().name + '.insert');
        
        try {
            return {
                id: 6,
                name: 'Six' 
            };
        } catch (e) {
            return false;
        }
    }
    async update(params) {
        console.log(this.parent().name + '.update');
        
        try {
            return true;
        } catch (e) {
            return false;
        }
    }
    async delete(params) {
        console.log(this.parent().name + '.delete');
        
        try {
            return true;
        } catch (e) { 
            return false; 
        } 
    }

    getDatabase() {
        return this.#database;
    }
    getModel() {
        return this.#model;
    }
}

module.exports = Service;