const Pizza = class Pizza {

    constructor(id,code,libelle,prix){
        this.id = id;
        this.code = code;
        this.libelle = libelle;
        this.prix = prix;
    }

    toString(){
             return "Id : " + this.id + "\ncode : " + this.code + "\nlibelle : " + this.libelle + "\nprix : " + this.prix+"\n";
    }

    update(id,code,libelle,prix){
        this.id = id;
        this.code = code;
        this.libelle = libelle;
        this.prix = prix;
    }
};

module.exports = { Pizza };
