// from 3 to 20 characters, Latin, may contain numbers, but not consist of them,
// no spaces, no special characters (hyphens and underscores are acceptable).
export const validateLogin = (value: string) => {
    if (value.length === 0) return `Login can not be blank`;
    if (value.length < 3) {
        return 'Login must have minimum 3 characters'
    }
    if (value.length > 20) {
        return 'Login must have maximum 20 characters'
    }
    if (!value.match(/(?=.*[a-z])/)) {
        return 'Login must have letters'
    }
    if (!value.match(/^[a-z0-9_-]{3,}$/)) {
        return 'Login must be a single word and can include latin characters in lower case, numerals, dash and underscore'
    }
    return '';
}



// from 8 to 40 characters, at least one capital letter and number are required.
export const validatePassword = (value: string) => {
    if (value.length === 0) return `Password can not be blank`;
    if (value.length < 8) {
        return 'Password must have minimum 8 characters'
    }
    if (value.length > 40) {
        return 'Password must have maximum 40 characters'
    }
    if (!value.match(/(?=.*[A-Z])/)) {
        return 'Password must have uppercase letters'
    }
    if (!value.match(/(?=.*[a-z])/)) {
        return 'Password must have lower letters'
    }
    if (!value.match(/(?=.*[0-9])/)) {
        return 'Password must have number'
    }
    return '';
}