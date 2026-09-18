export const students = [
    {
        id: 1,
        nomComplet: "Sara Dev",
        ville: "Nador",
        resultats: [
            {
                jour: 1, exercicesTermines: 18,
                totalExercices: 20, challengeTermine: true
            },
            {
                jour: 2, exercicesTermines: 14,
                totalExercices: 20, challengeTermine: false
            }
        ]
    },
    {
        id: 2,
        nomComplet: "Yassine Code",
        ville: "Oujda",
        resultats: [
            {
                jour: 1, exercicesTermines: 12,
                totalExercices: 20, challengeTermine: false
            }
        ]
    },
    {
        id: 3,
        nomComplet: "Ahmed",
        ville: "Oujda",
        resultats: []
    }
];

let id = (students.length > 0) ? students[students.length - 1].id : 0;

export function getNextId() {
    return ++id;
}