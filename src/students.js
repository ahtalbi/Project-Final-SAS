import promptSync from 'prompt-sync';
import { getNextId, students } from "./data/data.js";
import { normaliserNom, validateId, validateVille } from './helpers/validators.js';

// Constants
const prompt = promptSync();

function ajouterApprenant() {
    let nomComplet = normaliserNom(prompt("Entrez le nom complet : "));
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
    
}

function calculerProgression() {
    
}

function filtrerParNiveau() {
    
}

function trierParProgression() {
    
}

function enregistrerResultat() {
    let id = validateId(prompt("Identifiant de l'apprenant : "));
    if (id === null) {
        console.log("Invalid Id");
        return;
    }

    let student = students.find(s => s.id === id);
    if (!student) {
        console.log("Apprenant introuvable.");
        return;
    }

    console.log(`Apprenant trouvé : ${student.nomComplet}`);

    let jour = prompt("Jour (1 à 7) : ");
    if (typeof jour !== "string") {
        console.log("Jour invalid.");
        return;
    }

    jour = Number(jour.trim());
    if (isNaN(jour) || jour < 1 || jour > 7) {
        console.log("Jour invalid.");
        return;
    }

    let totalExercices = prompt("Total d'exercices proposés : ");
    if (typeof totalExercices !== "string") {
        console.log("Le Nomere total des exercise invalid.");
        return;
    }
    
    totalExercices = Number(totalExercices.trim());
    if (totalExercices < 0) {
        console.log("Le Nomere total des exercise invalid.");
        return;
    }
    
    let exercicesTermines = prompt("Exercices terminés : ");
    if (typeof exercicesTermines !== "string") {
        console.log("Les exercises tremines invalid.");
        return;
    }
    
    exercicesTermines = Number(exercicesTermines.trim());
    if (exercicesTermines < 0 || exercicesTermines > totalExercices) {
        console.log("Les exercises tremines > totalExersices.");
        return;
    }

    let challengeTermine = prompt("L'etudiant finir le challenge (oui ou non): ");
    if (typeof challengeTermine !== "string") {
        console.log("le challenge input et oui ou non.");
        return;
    }

    challengeTermine = challengeTermine.trim().toLowerCase();
    if (challengeTermine !== "oui" && challengeTermine !== "non") {
        console.log("le challenge input et oui ou non.");
        return;
    }

    challengeTermine = (challengeTermine === "oui") ? true : false;

    let existDay = student.resultats.find(r => r.jour === jour);
    if (existDay) {
        existDay.exercicesTermines = exercicesTermines;
        existDay.totalExercices = totalExercices;
        existDay.challengeTermine = challengeTermine;
    } else {
        student.resultats.push({ jour, exercicesTermines, totalExercices, challengeTermine });
    }

    let totalExercicesSum = student.resultats.reduce((sum, r) => sum + r.totalExercices, 0);
    let exercicesTerminesSum = student.resultats.reduce((sum, r) => sum + r.exercicesTermines, 0);

    console.log(`Résultat du jour ${jour} enregistré.`);
    console.log(`${student.nomComplet} : ${exercicesTerminesSum} / ${totalExercicesSum} exercices, progression ${totalExercicesSum > 0 ? Math.round((exercicesTerminesSum / totalExercicesSum) * 100) : 0} %.`);
    console.log(`${student.resultats.length} journées renseignées, ${student.resultats.filter(r => r.challengeTermine).length} challenges terminés.`);
}

export {
    ajouterApprenant,
    rechercherApprenant,
    calculerProgression,
    filtrerParNiveau,
    trierParProgression,
    enregistrerResultat
};