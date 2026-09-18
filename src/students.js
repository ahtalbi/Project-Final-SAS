import promptSync from 'prompt-sync';
import { getNextId, students } from "./data/data.js";
import { validateName, validateVille } from './helpers/validators.js';

// Constants
const prompt = promptSync();

function ajouterApprenant() {
    let nomComplet = validateName(prompt("Entrez le nom complet : "));
    if (nomComplet === null) {
        console.log("Nom invalide : Lettres (A-Z) uniquement, 1 à 50 caractères.");
        return;
    }

    let ville = validateVille(prompt("Entrez la ville : "));
    if (ville === null) {
        console.log("Ville invalide : Lettres (A-Z) uniquement, 1 à 195 caractères.");
        return;        
    }

    students.push({
        id: getNextId(),
        nomComplet,
        ville,
        resultats: []
    });

    console.log("Utilisateur ajouté avec succès !");
}

function rechercherApprenant() {
    // ...
}

function calculerProgression() {
    // ...
}

function filtrerParNiveau() {
    // ...
}

function trierParProgression() {
    // ...
}

function enregistrerResultat() {
    // ...
}

export {
    ajouterApprenant,
    rechercherApprenant,
    calculerProgression,
    filtrerParNiveau,
    trierParProgression,
    enregistrerResultat
};