import promptSync from 'prompt-sync';
import { messages } from './data/messages.js';
import { validateChoice } from './helpers/validators.js';
import { ajouterApprenant } from './students.js';
import { students } from './data/data.js';

// Constants
const prompt = promptSync();

while (true) {
    console.log(messages.welcomeMessage);
    let input = prompt("Votre choix : ");
    
    // check the input if its valid or no
    while (!validateChoice(input)) {
        input = prompt("invalid choice your choice need to be 0 => votre choix <= 9: ");
    }
    
    input = Number(input.trim());

    // switch case for the main app
    switch (input) {
        case 1:
            // 1. Afficher le tableau de bord
            break;
        case 2:
            // 2. Afficher la liste des apprenants
            break;
        case 3:
            // 3. Ajouter un apprenant
            ajouterApprenant();
            break;
        case 4:
            // 4. Consulter un apprenant par identifiant
            break;
        case 5:
            // 5. Ajouter ou modifier le résultat d'une journée
            break;
        case 6:
            // 6. Rechercher un apprenant par nom
            break;
        case 7:
            // 7. Filtrer les apprenants par niveau
            break;
        case 8:
            // 8. Trier les apprenants par progression décroissante
            break;
        case 9:
            // 9. Trier les apprenants par ordre alphabétique
            break;
        default:
            // 0. Quitter
            process.exit();
    }

    console.log(students);  
}