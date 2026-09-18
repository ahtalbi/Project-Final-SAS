import { students } from '../src/data/data.js';
import {
    calculerProgression,
    afficherLaListeDesApprenants,
    afficherLeTableau,
    trierParProgressionDecroissante,
    trierParOrdreAphabetique
} from '../src/students.js';

console.log("=== Test 1 : Calculer la progression ===");
const [total, termines, prog] = calculerProgression(students[0]);
console.log(`Sara Dev : ${termines}/${total} exercices, ${prog}%\n`);

console.log("=== Test 2 : Afficher la liste des apprenants ===");
afficherLaListeDesApprenants();

console.log("=== Test 3 : Trier par progression décroissante ===");
trierParProgressionDecroissante();

console.log("=== Test 4 : Trier par ordre alphabétique ===");
trierParOrdreAphabetique();

console.log("=== Test 5 : Afficher le tableau de bord ===");
afficherLeTableau();
