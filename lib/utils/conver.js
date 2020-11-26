"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToBase64 = exports.strToBase64 = void 0;
exports.strToBase64 = (str) => (new Buffer(str).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, ''));
exports.objectToBase64 = (obj) => (exports.strToBase64(JSON.stringify(obj)));
