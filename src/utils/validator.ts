export const isValidString = (str: String) => {
    if (typeof str === 'string' && String(str).trim() !== '') return true
    return false;
}