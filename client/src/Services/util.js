export const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
export const REFRESH_TOKEN = process.env.REACT_APP_REFRESH_TOKEN;

export const getTokens = (key) => {
    return localStorage.getItem(key);
}

export const setTokens = (key, val) => {
    localStorage.setItem(key, val);
}

export const removeTokens = (key) => {
    localStorage.removeItem(key);
}