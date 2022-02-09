export const TOKENS = process.env.REACT_APP_TOKENS;

export const getTokens = (key) => {
    return localStorage.getItem(key);
}

export const setTokens = (key, val) => {
    localStorage.setItem(key, val);
}

export const removeTokens = (key) => {
    localStorage.removeItem(key);
}

export const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
}