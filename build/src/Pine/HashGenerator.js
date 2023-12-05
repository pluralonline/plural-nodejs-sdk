"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHash = exports.generateFetchOrderHash = exports.generateCreateOrderHash = void 0;
const crypto_1 = require("crypto");
function generateCreateOrderHash(request, secret) {
    return (0, crypto_1.createHmac)("sha256", Buffer.from(secret, 'hex')).update(request).digest("hex").toUpperCase();
}
exports.generateCreateOrderHash = generateCreateOrderHash;
function generateFetchOrderHash(request, secret) {
    const sortedKeys = Object.keys(request).sort();
    const dataString = sortedKeys
        .map((key) => `${key}=${request[key]}`)
        .join('&');
    return (0, crypto_1.createHmac)('sha256', Buffer.from(secret, 'hex'))
        .update(dataString)
        .digest('hex')
        .toUpperCase();
}
exports.generateFetchOrderHash = generateFetchOrderHash;
function verifyHash(hash, request) {
    try {
        const sortedKeys = Object.keys(request).sort();
        const dataString = sortedKeys
            .map((key) => `${key}=${request[key]}`)
            .join('&');
        const newHash = (0, crypto_1.createHmac)('sha256', Buffer.from(this.merchant_secret, 'hex'))
            .update(dataString)
            .digest('hex')
            .toUpperCase();
        return newHash === hash;
    }
    catch (error) {
        console.log(error);
        throw new Error('Failed to verify hash');
    }
}
exports.verifyHash = verifyHash;
