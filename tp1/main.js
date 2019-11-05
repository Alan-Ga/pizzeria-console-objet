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
    menu();
}

function ajoutPizza() {
    console.log("\n Ajout d'une pizzas :");
    menu();
}


function miseAJourPizza(){
    console.log("\nMise a jour de la pizzas :");
    menu();

}

function supprimerPizza(){
    console.log("\nSuppression d’une pizza :");
    menu();
}
