export const strToBase64 = (str) => (
    new Buffer(str).toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
);

export const objectToBase64 = (obj) => (
    strToBase64(JSON.stringify(obj))
);