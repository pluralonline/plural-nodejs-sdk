"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const HashGenerator_1 = require("./HashGenerator");
async function createOrder(txn_data, payment_modes, customer_data = {}, billing_data = {}, shipping_data = {}, udf_data = {}, product_detail = []) {
    try {
        const methods = getPaymentMethods(payment_modes);
        const body = {
            merchant_data: {
                merchant_id: this?.merchant_id,
                merchant_access_code: this?.merchant_access_code,
                unique_merchant_txn_id: txn_data?.txn_id,
                merchant_return_url: txn_data?.callback,
            },
            payment_data: {
                amount_in_paisa: txn_data?.amount_in_paisa,
            },
            txn_data: {
                navigation_mode: 2,
                payment_mode: methods.join(','),
                transaction_type: 1
            },
            customer_data: {
                ...customer_data,
                billing_data: billing_data,
                shipping_data: shipping_data
            },
            udf_data: udf_data,
            product_details: product_detail
        };
        const endpoint = this.is_test ? "https://uat.pinepg.in/api/" : 'https://pinepg.in/api/';
        const url = endpoint + "v2/accept/payment";
        const base64Data = Buffer.from(JSON.stringify(body)).toString("base64");
        const hash = (0, HashGenerator_1.generateCreateOrderHash)(base64Data, this?.merchant_secret);
        const data = await axios_1.default.post(url, {
            request: base64Data,
        }, {
            headers: {
                "Content-Type": "application/json",
                "X-VERIFY": hash
            }
        });
        return {
            status: true,
            url: data.data.redirect_url,
            token: data.data.token
        };
    }
    catch (error) {
        throw new Error(JSON.stringify(error?.response?.data));
    }
}
exports.createOrder = createOrder;
function getPaymentMethods(methods) {
    const modes = [];
    const conditions = [
        { condition: () => methods?.cards === true, value: 1 },
        { condition: () => methods?.netbanking === true, value: 3 },
        { condition: () => methods?.emi === true, value: 4 },
        { condition: () => methods?.cardless_emi === true, value: 19 },
        { condition: () => methods?.upi === true, value: 10 },
        { condition: () => methods?.wallet === true, value: 11 },
        { condition: () => methods?.debit_emi === true, value: 14 },
        { condition: () => methods?.prebooking === true, value: 16 },
        { condition: () => methods?.bnpl === true, value: 17 },
        { condition: () => methods?.paybypoints === true, value: 20 },
    ];
    conditions.forEach((param) => {
        if (param.condition()) {
            modes.push(param.value);
        }
    });
    return modes;
}
