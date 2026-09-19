import promptSync from 'prompt-sync';
import { messages } from './data/messages.js';
import { validateChoice } from './helpers/validators.js';
import { afficherLaListeDesApprenants, afficherLeTableau, ajouterApprenant, enregistrerResultat, filtrerParNiveau, rechercherApprenantId, rechercherApprenantNom, trierParOrdreAphabetique, trierParProgressionDecroissante } from './students.js';

// Constants
const prompt = promptSync({ sigint: true });
console.log(messages.logoMessage);

while (true) {
    console.log(messages.menuMessage);
    let input = prompt("Votre choix : ");

    while (!validateChoice(input)) {
        input = prompt("Choix invalide. Votre choix doit être compris entre 0 et 9 : ");
    }
    
    input = Number(input.trim());

    // switch case for the main app
    switch (input) {
        case 1:
            // 1. Afficher le tableau de bord
            afficherLeTableau();
            break;
        case 2:
            // 2. Afficher la liste des apprenants
            afficherLaListeDesApprenants();
            break;
        case 3:
            // 3. Ajouter un apprenant
            ajouterApprenant();
            break;
        case 4:
            // 4. Consulter un apprenant par identifiant
            rechercherApprenantId();
            break;
        case 5:
            // 5. Ajouter ou modifier le résultat d'une journée
            enregistrerResultat();
            break;
        case 6:
            // 6. Rechercher un apprenant par nom
            rechercherApprenantNom();
            break;
        case 7:
            // 7. Filtrer les apprenants par niveau
            filtrerParNiveau();
            break;
        case 8:
            // 8. Trier les apprenants par progression décroissante
            trierParProgressionDecroissante();
            break;
        case 9:
            // 9. Trier les apprenants par ordre alphabétique
            trierParOrdreAphabetique();
            break;
        default:
            // 0. Quitter
            console.log("\n\x1b[1m\x1b[32mFermeture de l'application. À bientôt !\x1b[0m\n");
            process.exit();
    }
}