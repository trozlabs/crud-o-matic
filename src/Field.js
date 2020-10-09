class Field {
    #self;

    database;
    table;
    column;
    alias;

    name;
    value;
    trim;
    editable;

    constructor(config = {}) {
        this.#self    = this.constructor;

        this.database = config.database;
        this.table    = config.table;
        this.column   = config.column;
        this.alias    = config.alias;
    
        this.name     = config.name;
        this.value    = config.value;
    
        this.trim     = config.trim;
        this.editable = config.editable;
    }

    parent() {
        return this.#self;
    }
}

module.exports = Field;