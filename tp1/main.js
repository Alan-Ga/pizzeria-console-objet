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
pizzas.push(new Pizza(0,"PEP","Pépéroni",12.50));
pizzas.push(new Pizza(1,"MAR","Margherita",14.00));
pizzas.push(new Pizza(2,"REIN","La Reine",11.50));
pizzas.push(new Pizza(3,"FRO","La 4 fromages",12.00));
pizzas.push(new Pizza(4,"CAN","La cannibale",12.50));
pizzas.push(new Pizza(5,"SAV","La savoyarde",13.00));
pizzas.push(new Pizza(6,"ORI","L’orientale",13.50));
pizzas.push(new Pizza(7,"IND","L’indienne",14.00));
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
    selectCode();
}

function selectCode(){
    rl.question(update !== true ? 'Veuillez saisir le code : ' : 'Code '+pizzaSelect.code +" Veuillez saisir le nouveau code :", (answer) => {
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
    rl.question(update !== true ? 'Veuillez saisir le nom (sans espace) : ' : 'Nom '+pizzaSelect.libelle +" Veuillez saisir le nouveau nom (sans espace):", (answer) => {
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
    rl.question(update !== true ? 'Veuillez saisir le prix : ' : 'Prix '+pizzaSelect.prix+" Veuillez saisir le nouveau nom (sans espace) :", (answer) => {
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
        selectCode();
    }
}

function selectPizza(isUpdate){
    let tabCode = [];
        console.log("\n ### SELECTIONNER UNE PIZZA ###");
    pizzas.forEach(x => {console.log(x.toString()); tabCode.push(x.code)});
    rl.question('Veuillez choisir le code de la pizza à modifier : ', (answer) => {
        if ( !tabCode.includes(answer)) {
            console.log("/!\\ valeur incorrect!!");
            selectPizza(isUpdate);
        }else {
            pizzaSelect = pizzas[tabCode.indexOf(answer)];
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
