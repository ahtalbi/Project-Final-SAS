import promptSync from 'prompt-sync';
import { getNextId, students } from "./data/data.js";
import { normaliserNom, validateId, validateVille } from './helpers/validators.js';

// Constants
const prompt = promptSync();

function afficherLeTableau() {
    if (students.length === 0) {
        console.log("\x1b[33mAucun apprenant enregistré.\x1b[0m");
        return;
    }

    let solide = 0, enProgression = 0, aRenforcer = 0;
    let progressionTotale = 0;

    students.sort((a, b) => {
        let [, , progA] = calculerProgression(a);
        let [, , progB] = calculerProgression(b);
        return progB - progA;
    });

    for (let student of students) {
        let [, , progression] = calculerProgression(student);
        progressionTotale += progression;
        if (progression >= 80) solide++;
        else if (progression >= 50) enProgression++;
        else aRenforcer++;
    }

    let moyenne = (progressionTotale / students.length).toFixed(2);

    console.log("\n\x1b[1m\x1b[36m=== TABLEAU DE BORD ===\x1b[0m");
    console.log(`\x1b[1mTotal apprenants :\x1b[0m \x1b[33m${students.length}\x1b[0m`);
    console.log(`\x1b[1mProgression moyenne du groupe :\x1b[0m \x1b[32m${moyenne}%\x1b[0m`);
    console.log(`\x1b[32mSolide : ${solide}\x1b[0m | \x1b[33mEn progression : ${enProgression}\x1b[0m | \x1b[31mÀ renforcer : ${aRenforcer}\x1b[0m`);
    console.log("\n\x1b[1m\x1b[34m--- Classement par progression ---\x1b[0m");

    for (let student of students) {
        let [totalExercicesSum, exercicesTerminesSum, progression] = calculerProgression(student);
        let joursManquants = [1, 2, 3, 4, 5, 6, 7].filter(j => !student.resultats.map(r => r.jour).includes(j));
        let challengesManquants = student.resultats.filter(r => !r.challengeTermine).map(r => r.jour);

        console.log(`\n\x1b[1m${student.nomComplet}\x1b[0m \x1b[2m(id ${student.id})\x1b[0m : \x1b[32m${progression}%\x1b[0m \x1b[2m(${exercicesTerminesSum}/${totalExercicesSum})\x1b[0m`);
        console.log(`  \x1b[33mJournées non renseignées :\x1b[0m ${joursManquants.length ? joursManquants.join(", ") : "aucune"}`);
        console.log(`  \x1b[35mChallenges non terminés :\x1b[0m ${challengesManquants.length ? challengesManquants.join(", ") : "aucun"}`);
    }
    console.log("\n");
}

function afficherLaListeDesApprenants() {
    if (students.length === 0) {
        console.log("\x1b[33mAucun apprenant enregistré.\x1b[0m");
        return;
    }

    console.log("\n");
    for (let student of students) {
        let [, , progression] = calculerProgression(student);
        console.log(`\x1b[1mid ${student.id}\x1b[0m : \x1b[36m${student.nomComplet}\x1b[0m \x1b[2m(${student.ville})\x1b[0m - \x1b[33m${student.resultats.length} journée(s) renseignée(s)\x1b[0m - \x1b[32m${progression}%\x1b[0m`);
    }
    console.log("\n");
}

function ajouterApprenant() {
    let nomComplet = normaliserNom(prompt("Entrez le nom complet : "));
    if (nomComplet === null) {
        console.log("\x1b[31mNom invalide : Lettres (A-Z) uniquement, 1 à 50 caractères.\x1b[0m");
        return;
    }

    let ville = validateVille(prompt("Entrez la ville : "));
    if (ville === null) {
        console.log("\x1b[31mVille invalide : Lettres (A-Z) uniquement, 1 à 195 caractères.\x1b[0m");
        return;        
    }

    students.push({
        id: getNextId(),
        nomComplet,
        ville,
        resultats: []
    });

    console.log("\x1b[32m✔ Utilisateur ajouté avec succès !\x1b[0m");
}

function rechercherApprenantId() {
    let id = validateId(prompt("Identifiant de l'apprenant : "));
    if (id === null) {
        console.log("\x1b[31mIdentifiant invalide.\x1b[0m");
        return;
    }
    
    let student = students.find(s => s.id === id);
    if (!student) {
        console.log("\x1b[33mApprenant introuvable.\x1b[0m");
        return;
    }
    
    let [totalExercicesSum, exercicesTerminesSum, progression] = calculerProgression(student);
    console.log("\x1b[36m============================================================\x1b[0m");
    console.log(`\x1b[1mApprenant :\x1b[0m \x1b[32m${student.nomComplet}\x1b[0m \x1b[2m(id ${student.id})\x1b[0m`);
    console.log(`\x1b[1mExercices :\x1b[0m \x1b[33m${exercicesTerminesSum} / ${totalExercicesSum}\x1b[0m`);
    console.log(`\x1b[1mProgression :\x1b[0m \x1b[36m${progression}%\x1b[0m`);
    console.log("\x1b[36m============================================================\x1b[0m");
}

function rechercherApprenantNom() {
    let nom = prompt("Entrez le nom complet : ");
    if (typeof nom !== "string" || nom.length === 0 || nom.length > 50) {
        console.log("\x1b[31mNom invalide : Lettres (A-Z) uniquement, 1 à 50 caractères.\x1b[0m");
        return;
    }

    let matches = students.filter(s => s.nomComplet.toLowerCase().includes(nom.toLowerCase().trim()));
    if (matches.length === 0) {
        console.log("\x1b[33mAucun apprenant trouvé.\x1b[0m");
        return;
    }

    for (let student of matches) {
        let [totalExercicesSum, exercicesTerminesSum, progression] = calculerProgression(student);
        console.log("\x1b[36m============================================================\x1b[0m");
        console.log(`\x1b[1mApprenant :\x1b[0m \x1b[32m${student.nomComplet}\x1b[0m \x1b[2m(id ${student.id})\x1b[0m`);
        console.log(`\x1b[1mExercices :\x1b[0m \x1b[33m${exercicesTerminesSum} / ${totalExercicesSum}\x1b[0m`);
        console.log(`\x1b[1mProgression :\x1b[0m \x1b[36m${progression}%\x1b[0m`);
        console.log("\x1b[36m============================================================\x1b[0m");
    }
}

function calculerProgression(student) {
    let totalExercicesSum = student.resultats.reduce((sum, r) => sum + r.totalExercices, 0);
    let exercicesTerminesSum = student.resultats.reduce((sum, r) => sum + r.exercicesTermines, 0);
    let progression = totalExercicesSum > 0 ? Math.round((exercicesTerminesSum / totalExercicesSum) * 100) : 0;

    return [totalExercicesSum, exercicesTerminesSum, progression];
}

function filtrerParNiveau() {
    let niveau = prompt("Niveau (Solide / En progression / A renforcer) : ");
    if (niveau === null) return;
    niveau = niveau.trim().toLowerCase();

    let niveaux = ["solide", "en progression", "a renforcer", "à renforcer"];
    if (!niveaux.includes(niveau)) {
        console.log("\x1b[31mNiveau invalide.\x1b[0m");
        return;
    }

    let niveauCle = niveau.replace("à", "a");
    let studendsFiltered = students.filter(s => {
        let [, , progression] = calculerProgression(s);
        if (niveauCle === "solide") return progression >= 80;
        if (niveauCle === "en progression") return progression >= 50 && progression < 80;
        return progression < 50;
    });

    if (studendsFiltered.length === 0) {
        console.log("\x1b[33mAucun apprenant dans ce niveau.\x1b[0m");
        return;
    }

    console.log("\n");
    for (let student of studendsFiltered) {
        console.log("\x1b[36m================================================================\x1b[0m");
        let [totalExercicesSum, exercicesTerminesSum, progression] = calculerProgression(student);
        console.log(`\x1b[1m${student.nomComplet}\x1b[0m : \x1b[32m${progression}%\x1b[0m`);
        console.log("\x1b[36m================================================================\x1b[0m");
    }
    console.log("\n");
}

function trierParProgressionDecroissante() {
    if (students.length === 0) {
        console.log("\x1b[33mAucun apprenant enregistré.\x1b[0m");
        return;
    }

    students.sort((a, b) => {
        let [, , progA] = calculerProgression(a);
        let [, , progB] = calculerProgression(b);
        return progB - progA;
    });

    console.log("\n\x1b[1m\x1b[34m--- Classement par progression décroissante ---\x1b[0m\n");
    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        let [totalExercicesSum, exercicesTerminesSum, progression] = calculerProgression(student);
        console.log(`  \x1b[33m${i + 1}.\x1b[0m \x1b[1m${student.nomComplet}\x1b[0m \x1b[2m(id ${student.id} - ${student.ville})\x1b[0m : \x1b[32m${progression}%\x1b[0m \x1b[2m(${exercicesTerminesSum}/${totalExercicesSum} exercices)\x1b[0m`);
    }
    console.log("\n");
}

function trierParOrdreAphabetique() {
    if (students.length === 0) {
        console.log("\x1b[33mAucun apprenant enregistré.\x1b[0m");
        return;
    }

    students.sort((a, b) => a.nomComplet.localeCompare(b.nomComplet));

    console.log("\n\x1b[1m\x1b[36m--- Liste des apprenants par ordre alphabétique ---\x1b[0m\n");
    for (let student of students) {
        let [totalExercicesSum, exercicesTerminesSum, progression] = calculerProgression(student);
        console.log(`  • \x1b[1m${student.nomComplet}\x1b[0m \x1b[2m(${student.ville} - id ${student.id})\x1b[0m : \x1b[32m${progression}%\x1b[0m \x1b[2m(${exercicesTerminesSum}/${totalExercicesSum} exercices)\x1b[0m`);
    }
    console.log("\n");
}

function enregistrerResultat() {
    let id = validateId(prompt("Identifiant de l'apprenant : "));
    if (id === null) {
        console.log("\x1b[31mIdentifiant invalide.\x1b[0m");
        return;
    }

    let student = students.find(s => s.id === id);
    if (!student) {
        console.log("\x1b[33mApprenant introuvable.\x1b[0m");
        return;
    }

    console.log(`\x1b[32mApprenant trouvé : ${student.nomComplet}\x1b[0m`);

    let jour = prompt("Jour (1 à 7) : ");
    if (typeof jour !== "string") {
        console.log("\x1b[31mJour invalide.\x1b[0m");
        return;
    }

    jour = Number(jour.trim());
    if (isNaN(jour) || jour < 1 || jour > 7) {
        console.log("\x1b[31mJour invalide.\x1b[0m");
        return;
    }

    let totalExercices = prompt("Total d'exercices proposés : ");
    if (typeof totalExercices !== "string") {
        console.log("\x1b[31mLe nombre total d'exercices est invalide.\x1b[0m");
        return;
    }
    
    totalExercices = Number(totalExercices.trim());
    if (totalExercices < 0) {
        console.log("\x1b[31mLe nombre total d'exercices est invalide.\x1b[0m");
        return;
    }
    
    let exercicesTermines = prompt("Exercices terminés : ");
    if (typeof exercicesTermines !== "string") {
        console.log("\x1b[31mLe nombre d'exercices terminés est invalide.\x1b[0m");
        return;
    }
    
    exercicesTermines = Number(exercicesTermines.trim());
    if (exercicesTermines < 0 || exercicesTermines > totalExercices) {
        console.log("\x1b[31mLe nombre d'exercices terminés ne peut pas dépasser le nombre d'exercices proposés.\x1b[0m");
        return;
    }

    let challengeTermine = prompt("L'etudiant finir le challenge (oui ou non): ");
    if (typeof challengeTermine !== "string") {
        console.log("\x1b[31mLa réponse doit être oui ou non.\x1b[0m");
        return;
    }

    challengeTermine = challengeTermine.trim().toLowerCase();
    if (challengeTermine !== "oui" && challengeTermine !== "non") {
        console.log("\x1b[31mLa réponse doit être oui ou non.\x1b[0m");
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

    let [totalExercicesSum, exercicesTerminesSum, progression] = calculerProgression(student);

    console.log(`\x1b[32m✔ Résultat du jour ${jour} enregistré.\x1b[0m`);
    console.log(`\x1b[1m${student.nomComplet}\x1b[0m : \x1b[33m${exercicesTerminesSum} / ${totalExercicesSum}\x1b[0m exercices, progression \x1b[32m${progression} %\x1b[0m.`);
    console.log(`\x1b[36m${student.resultats.length}\x1b[0m journées renseignées, \x1b[35m${student.resultats.filter(r => r.challengeTermine).length}\x1b[0m challenges terminés.`);
}

export {
    afficherLeTableau,
    afficherLaListeDesApprenants,
    ajouterApprenant,
    rechercherApprenantId,
    rechercherApprenantNom,
    filtrerParNiveau,
    trierParOrdreAphabetique,
    trierParProgressionDecroissante,
    enregistrerResultat,
    calculerProgression
};