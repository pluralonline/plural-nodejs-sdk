"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchOrder = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const HashGenerator_1 = require("./HashGenerator");
async function fetchOrder(txnId, txnType = 3) {
    try {
        const body = {
            "ppc_MerchantID": this.merchant_id,
            "ppc_MerchantAccessCode": this.merchant_access_code,
            "ppc_TransactionType": txnType,
            "ppc_UniqueMerchantTxnID": txnId,
        };
        const endpoint = this.is_test ? "https://uat.pinepg.in/api/" : 'https://pinepg.in/api/';
        const url = endpoint + "PG/V2";
        const data = await axios_1.default.post(url, httpBuildQuery({
            ...body,
            "ppc_DIA_SECRET": (0, HashGenerator_1.generateFetchOrderHash)(body, this?.merchant_secret),
            "ppc_DIA_SECRET_TYPE": "sha256"
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return data.data;
    }
    catch (error) {
        throw new Error(JSON.stringify(error?.response?.data));
    }
}
exports.fetchOrder = fetchOrder;
function httpBuildQuery(params) {
    const queryParts = [];
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const value = params[key];
            if (Array.isArray(value)) {
                for (const item of value) {
                    queryParts.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(item));
                }
            }
            else {
                queryParts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            }
        }
    }
    return queryParts.join('&');
}
