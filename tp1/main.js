const readline = require('readline');
let Pizza = require('./Pizza.js').Pizza;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let id;
let libelle;
let code;
let prix;
let pizzaSelect = null;
let pizzas = [];
let update = false;
pizzas.push(new Pizza(1,"code","libelle",15.5));
pizzas.push(new Pizza(2,"code2","libelle2",14.5));
pizzas.push(new Pizza(3,"code3","libelle3",13.5));
menu();

function menu(){
    pizzaSelect = null;
    update = false;
    console.log("\n***** Pizzeria Administration *****");
    console.log("1- Lister les pizzas");
    console.log("2- Ajouter une nouvelle pizza");
    console.log("3- Mettre à jour une pizza");
    console.log("4- Supprimer une pizza");
    console.log("99- Quitter");

    rl.question('Choisir une option ', (answer) => {
        if(answer == 99) {
            console.log("Au revoir !!!");
            rl.close();
            return;
        }
        if (answer < 1 || answer > 4) {
            menu();
        }else {
            if (answer == 1) {
                listPizza();
            }else if (answer == 2){
                ajoutPizza();
            }else if (answer == 3){
                miseAJourPizza();
            }else if (answer == 4){
                supprimerPizza();
            }else{
                menu();
            }
        }
    });
}

function listPizza(){
    console.log("\n Liste des pizzas :");
    pizzas.forEach(x => console.log(x.toString()));
    menu();
}

function ajoutPizza() {
    id = null;
    libelle = null;
    prix = null;
    code = null;

    console.log("\n Ajout d'une pizzas :");
    selectId()
}

function selectId(){
    rl.question(update !== true ? 'Entrer un id (optionnel): null ' : 'Id '+pizzaSelect.id +" entrer une nouvelle valeur :", (answer) => {
        if (answer !== null && answer !== undefined && answer !== "") {
            if (isNaN(answer)) {
                selectId();
            } else {
                id = parseInt(answer);
                selectCode();
            }
        }else {
            selectCode();
        }
    });
}

function selectCode(){
    rl.question(update !== true ? 'Entrer un code : ' : 'Code '+pizzaSelect.code +" entrer une nouvelle valeur :", (answer) => {
        if (answer !== null && answer !== undefined && answer.trim() !== "") {
            code = answer;
            selectLibelle();
        }else {
            if (update === true ){
                selectLibelle();
                return;
            }
            console.log("/!\\ valeur incorrect!!")
            selectCode();
        }
    });
}

function selectLibelle(){
    rl.question(update !== true ? 'Entrer un libelle : ' : 'Libelle '+pizzaSelect.libelle +" entrer une nouvelle valeur :", (answer) => {
        if (answer !== null && answer !== undefined && answer !== "") {
            libelle = answer;
            selectPrix();
        }else {
            if (update === true ){
                selectPrix();
                return;
            }
            console.log("/!\\ valeur incorrect !!")
            selectLibelle();
        }
    });
}

function selectPrix(){
    rl.question(update !== true ? 'Entrer un prix : ' : 'Prix '+pizzaSelect.prix+" entrer une nouvelle valeur :", (answer) => {
        if (!isNaN(answer) && answer !== null && answer !== undefined && answer !== "") {
            prix = parseFloat(answer);
            finishCreateUpdate()
        }else {
            if (update === true ){
                finishCreateUpdate();
                return;
            }
            console.log("/!\\ valeur incorrect!!")
            selectPrix();
        }
    });
}

function finishCreateUpdate(){
    if (update === false){
        pizzas.push(new Pizza(id,code,libelle,prix));
    }else {
        pizzaSelect.update(id,code,libelle,prix);
    }
    menu();
}

function miseAJourPizza(){
    if (pizzaSelect === null){
        selectPizza(true);
    }else {
        id =pizzaSelect.id;
        libelle = pizzaSelect.libelle;
        code = pizzaSelect.code;
        prix = pizzaSelect.prix;

        console.log("\nMise a jour de la pizzas :");
        console.log(pizzaSelect.toString());

        console.log("\nFaite entrer pour ne pas changer la valeur !");
        update = true;
        selectId()
    }
}

function selectPizza(isUpdate){
    console.log(pizzas.toString());
    console.log("\n ### SELECTIONNER UNE PIZZA ###");
    for(let i = 0; i < pizzas.length; i++){
        console.log(i+"- "+pizzas[i].toString())
    }
    rl.question('Entrer un numéro de pizza : ', (answer) => {
        if ( answer === "" || isNaN(answer) || (answer < 0 || answer >= pizzas.length)) {
            console.log("/!\\ valeur incorrect!!");
            selectPizza(isUpdate);
        }else {
            pizzaSelect = pizzas[parseInt(answer)];
            if (isUpdate === true) {
                miseAJourPizza();
            }else{
                supprimerPizza();
            }
        }
    });

}
function supprimerPizza(){
    if (pizzaSelect === null){
        selectPizza(false   );
    }else {
        var index = pizzas.indexOf(pizzaSelect);
        pizzas.splice(index,1);
        menu();
    }
}
