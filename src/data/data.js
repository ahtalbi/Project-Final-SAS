export const students = [
    {
        id: 1,
        nomComplet: "Sara Dev",
        ville: "Nador",
        resultats: [
            { jour: 1, exercicesTermines: 18, totalExercices: 20, challengeTermine: true },
            { jour: 2, exercicesTermines: 14, totalExercices: 20, challengeTermine: false }
        ]
    },
    {
        id: 2,
        nomComplet: "Yassine Code",
        ville: "Oujda",
        resultats: [
            { jour: 1, exercicesTermines: 12, totalExercices: 20, challengeTermine: false }
        ]
    },
    {
        id: 3,
        nomComplet: "Ahmed Talbi",
        ville: "Oujda",
        resultats: []
    },
    {
        id: 4,
        nomComplet: "Imane Alaoui",
        ville: "Rabat",
        resultats: [
            { jour: 1, exercicesTermines: 19, totalExercices: 20, challengeTermine: true },
            { jour: 2, exercicesTermines: 20, totalExercices: 20, challengeTermine: true },
            { jour: 3, exercicesTermines: 17, totalExercices: 20, challengeTermine: true },
            { jour: 4, exercicesTermines: 18, totalExercices: 20, challengeTermine: false }
        ]
    },
    {
        id: 5,
        nomComplet: "Karim Benali",
        ville: "Marrakech",
        resultats: [
            { jour: 1, exercicesTermines: 8, totalExercices: 20, challengeTermine: false },
            { jour: 2, exercicesTermines: 10, totalExercices: 20, challengeTermine: false },
            { jour: 3, exercicesTermines: 7, totalExercices: 20, challengeTermine: false }
        ]
    }
];

let id = (students.length > 0) ? students[students.length - 1].id : 0;

export function getNextId() {
    return ++id;
}