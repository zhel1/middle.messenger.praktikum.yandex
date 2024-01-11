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

// Latin or Cyrillic, the first letter must be capitalized, no spaces, no numbers,
// no special characters (only a hyphen is allowed).
export const validateName = (value: string) => {
    if (value.length === 0) return `Name can not be blank`;
    if (value.length < 2) {
        return 'Name must have minimum 2 characters'
    }
    if (value.length > 140) {
        return 'Name must have maximum 140 characters'
    }
    if (!value.match(/^[A-Z]+/)) {
        return 'Name must have first uppercase letter'
    }
    if (!value.match(/[a-z-]$/)) {
        return 'Name must have only letters and dash'
    }
    return '';
}

// Latin, can include numbers and special characters like hyphens and underscores,
// there must be a “dog” (@) and a dot after it, but there must be letters before the dot
export const validateEmail = (value: string) => {
    if (value.length === 0) return `Email can not be blank`;

    if (!value.match(/^\S+@\S+\.\S+$/)) {
        return 'Invalid email'
    }
    return '';
}

// from 10 to 15 characters, consists of numbers, may begin with a plus
export const validatePhone = (value: string) => {
    if (value.length === 0) return `Phone can not be blank`;

    if (!value.match(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/)) {
        return 'Invalid Phone, example +123-456-789-1234'
    }
    return '';
}
