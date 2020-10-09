const { Util } = require('jsql');

class Controller {
    #self;
    #model;
    #service;

    constructor(config = {}) {
        this.#self = this.constructor;
        this.#service = config.service;
        this.#model = config.model;
        console.log('this.name:', this.constructor.name)
    }
    parent() {
        return this.#self;
    }
    
    async get(req, res) {
        console.log(this.parent().name + '.get');
        try {
            const data = await this.getService().select();
            return res.send({ sucess: true, data });
        } catch (e) {
            return res.send({ success: false, error: e.message });
        }
    }
    async post(req, res) {
        console.log(this.parent().name + '.post');
        try {
            const data = await this.getService().insert();
            return res.send({ sucess: true, data });
        } catch (e) {
            return res.send({ success: false, error: e.message });
        }
    }
    async put(req, res) {
        console.log(this.parent().name + '.put');
        try {
            const data = await this.getService().update();
            return res.send({ sucess: true, data });
        } catch (e) {
            return res.send({ success: false, error: e.message });
        }
    }
    async delete(req, res) {
        console.log(this.parent().name + '.delete');
        try {
            const data = await this.getService().delete();
            return res.send({ sucess: true, data });
        } catch (e) { 
            return res.send({ success: false, error: e.message }); 
        } 
    }

    getService() {
        return this.#service;
    }
    getModel() {
        return this.#model;
    }
}

module.exports = Controller;