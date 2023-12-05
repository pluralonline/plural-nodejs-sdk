"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEmi = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
async function calculateEmi(txnData, productsDetails = []) {
    try {
        const body = {
            merchant_data: {
                merchant_id: this.merchant_id,
                merchant_access_code: this.merchant_access_code
            },
            payment_data: {
                amount_in_paisa: txnData?.amount_in_paisa ?? null
            },
            product_details: productsDetails
        };
        const endpoint = this.is_test ? "https://uat.pinepg.in/api/" : 'https://pinepg.in/api/';
        const url = endpoint + "v2/emi/calculator";
        const data = await axios_1.default.post(url, body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data.data;
    }
    catch (error) {
        throw new Error(JSON.stringify(error?.response?.data ?? error));
    }
}
exports.calculateEmi = calculateEmi;
