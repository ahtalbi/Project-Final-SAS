import promptSync from 'prompt-sync';
import { getNextId, students } from "./data/data.js";
import { normaliserNom, validateId, validateVille } from './helpers/validators.js';

// Constants
const prompt = promptSync();

function afficherLeTableau() {
    if (students.length === 0) {
        console.log("Aucun apprenant enregistré.");
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

    console.log("\n=== TABLEAU DE BORD ===");
    console.log(`Total apprenants : ${students.length}`);
    console.log(`Progression moyenne du groupe : ${moyenne}%`);
    console.log(`Solide : ${solide} | En progression : ${enProgression} | À renforcer : ${aRenforcer}`);
    console.log("\n--- Classement par progression ---");

    for (let student of students) {
        let [totalExercicesSum, exercicesTerminesSum, progression] = calculerProgression(student);
        let joursManquants = [1, 2, 3, 4, 5, 6, 7].filter(j => !student.resultats.map(r => r.jour).includes(j));
        let challengesManquants = student.resultats.filter(r => !r.challengeTermine).map(r => r.jour);

        console.log(`\n${student.nomComplet} (id ${student.id}) : ${progression}% (${exercicesTerminesSum}/${totalExercicesSum})`);
        console.log(`  Journées non renseignées : ${joursManquants.length ? joursManquants.join(", ") : "aucune"}`);
        console.log(`  Challenges non terminés : ${challengesManquants.length ? challengesManquants.join(", ") : "aucune"}`);
    }
    console.log("\n");
}

function afficherLaListeDesApprenants() {
    if (students.length === 0) {
        console.log("Aucun apprenant enregistré.");
        return;
    }

    console.log("\n");
    for (let student of students) {
        let [, , progression] = calculerProgression(student);
        console.log(`id ${student.id} : ${student.nomComplet} (${student.ville}) - ${student.resultats.length} journée(s) renseignée(s) - ${progression}%`);
    }
    console.log("\n");
}

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

function rechercherApprenantId() {
    let id = validateId(prompt("Identifiant de l'apprenant : "));
    if (id === null) {
        console.log("Identifiant invalide.");
        return;
    }
    
    let student = students.find(s => s.id === id);
    if (!student) {
        console.log("Apprenant introuvable.");
        return;
    }
    
    let [totalExercicesSum, exercicesTerminesSum, progression] = calculerProgression(student);
    console.log("============================================================");
    console.log(`Apprenant : ${student.nomComplet} (id ${student.id})`);
    console.log(`Exercices : ${exercicesTerminesSum} / ${totalExercicesSum}`);
    console.log(`Progression : ${progression}%`);
    console.log("============================================================");
}

function rechercherApprenantNom() {
    let nom = prompt("Entrez le nom complet : ");
    if (typeof nom !== "string" || nom.length === 0 || nom.length > 50) {
        console.log("Nom invalide : Lettres (A-Z) uniquement, 1 à 50 caractères.");
        return;
    }

    let matches = students.filter(s => s.nomComplet.toLowerCase().includes(nom));
    if (matches.length === 0) {
        console.log("Aucun apprenant trouvé.");
        return;
    }

    for (let student of matches) {
        let [totalExercicesSum, exercicesTerminesSum, progression] = calculerProgression(student);
        console.log("============================================================");
        console.log(`Apprenant : ${student.nomComplet} (id ${student.id})`);
        console.log(`Exercices : ${exercicesTerminesSum} / ${totalExercicesSum}`);
        console.log(`Progression : ${progression}%`);
        console.log("============================================================");
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

    let niveaux = ["solide", "en progression", "a renforcer"];
    if (!niveaux.includes(niveau)) {
        console.log("Niveau invalide.");
        return;
    }

    let studendsFiltered = students.filter(s => {
        let [, , progression] = calculerProgression(s);
        if (niveau === "solide") return progression >= 80;
        if (niveau === "en progression") return progression >= 50 && progression < 80;
        return progression < 50;
    });

    if (studendsFiltered.length === 0) {
        console.log("Aucun apprenant dans ce niveau.");
        return;
    }

    console.log("\n");
    for (let student of studendsFiltered) {
        console.log("================================================================")
        let [totalExercicesSum, exercicesTerminesSum, progression] = calculerProgression(student);
        console.log(`${student.nomComplet} : ${progression}%`);
        console.log("================================================================")
    }
    console.log("\n");
}

function trierParProgressionDecroissante() {
    if (students.length === 0) {
        console.log("Aucun apprenant enregistré.");
        return;
    }

    students.sort((a, b) => {
        let [, , progA] = calculerProgression(a);
        let [, , progB] = calculerProgression(b);
        return progB - progA;
    });

    console.log("\n");
    for (let student of students) {
        let [totalExercicesSum, exercicesTerminesSum, progression] = calculerProgression(student);
        console.log(`${student.nomComplet} : ${progression}%`);
    }
    console.log("\n");
}

function trierParOrdreAphabetique() {
    if (students.length === 0) {
        console.log("Aucun apprenant enregistré.");
        return;
    }

    students.sort((a, b) => a.nomComplet.localeCompare(b.nomComplet));

    console.log("\n");
    for (let student of students) {
        let [totalExercicesSum, exercicesTerminesSum, progression] = calculerProgression(student);
        console.log(`${student.nomComplet} : ${progression}%`);
    }
    console.log("\n");
}

function enregistrerResultat() {
    let id = validateId(prompt("Identifiant de l'apprenant : "));
    if (id === null) {
        console.log("Identifiant invalide.");
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
        console.log("Jour invalide.");
        return;
    }

    jour = Number(jour.trim());
    if (isNaN(jour) || jour < 1 || jour > 7) {
        console.log("Jour invalide.");
        return;
    }

    let totalExercices = prompt("Total d'exercices proposés : ");
    if (typeof totalExercices !== "string") {
        console.log("Le nombre total d'exercices est invalide.");
        return;
    }
    
    totalExercices = Number(totalExercices.trim());
    if (totalExercices < 0) {
        console.log("Le nombre total d'exercices est invalide.");
        return;
    }
    
    let exercicesTermines = prompt("Exercices terminés : ");
    if (typeof exercicesTermines !== "string") {
        console.log("Le nombre d'exercices terminés est invalide.");
        return;
    }
    
    exercicesTermines = Number(exercicesTermines.trim());
    if (exercicesTermines < 0 || exercicesTermines > totalExercices) {
        console.log("Le nombre d'exercices terminés ne peut pas dépasser le nombre d'exercices proposés.");
        return;
    }

    let challengeTermine = prompt("L'etudiant finir le challenge (oui ou non): ");
    if (typeof challengeTermine !== "string") {
        console.log("La réponse doit être oui ou non.");
        return;
    }

    challengeTermine = challengeTermine.trim().toLowerCase();
    if (challengeTermine !== "oui" && challengeTermine !== "non") {
        console.log("La réponse doit être oui ou non.");
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

    console.log(`Résultat du jour ${jour} enregistré.`);
    console.log(`${student.nomComplet} : ${exercicesTerminesSum} / ${totalExercicesSum} exercices, progression ${progression} %.`);
    console.log(`${student.resultats.length} journées renseignées, ${student.resultats.filter(r => r.challengeTermine).length} challenges terminés.`);
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
    enregistrerResultat
};