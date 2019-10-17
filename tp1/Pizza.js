const Pizza = class Pizza {

    constructor(id,code,libelle,prix){
        this.id = id;
        this.code = code;
        this.libelle = libelle;
        this.prix = prix;
    }

    toString(){
             return this.code + " -> " + this.libelle + "(" + this.prix+"€)";
    }
    update(id,code,libelle,prix){
        this.id = id;
        this.code = code;
        this.libelle = libelle;
        this.prix = prix;
    }
};

module.exports = { Pizza };
