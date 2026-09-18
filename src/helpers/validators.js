export function validateChoice(str) {
    if (typeof str !== "string") return false;
    str = str.trim();
    return /^[0-9]$/.test(str);
}

export function normaliserNom(nomComplet) {
    if (typeof nomComplet !== "string") return null;
    nomComplet = nomComplet.trim();
    if (nomComplet.length === 0 || nomComplet.length > 50) return null;
    return nomComplet.split(" ")
                     .filter(word => word !== "")
                     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                     .join(" ");
}

export function validateVille(ville) {
    if (typeof ville !== "string") return null;
    ville = ville.trim();
    if (ville.length === 0 || ville.length > 195) return null;
    return ville.split(" ")
                .filter(word => word !== "")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(" ");
}

export function validateId(id) {
    if (typeof id !== "string") return null;
    id = id.trim();
    if (!/^[0-9]+$/.test(id)) return null;
    return Number(id);
}