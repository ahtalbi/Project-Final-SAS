export function validateChoice(str) {
    if (typeof str !== "string") return false;
    str = str.trim();
    return /^[0-9]$/.test(str);
}