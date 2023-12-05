"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateOrder_1 = require("./Pine/CreateOrder");
const FetchOrder_1 = require("./Pine/FetchOrder");
const HashGenerator_1 = require("./Pine/HashGenerator");
const Emi_1 = require("./Pine/Emi");
exports.default = (merchant_id, merchant_access_code, merchant_secret, is_test) => {
    const defaultConfig = {
        merchant_id: merchant_id,
        merchant_access_code: merchant_access_code,
        merchant_secret: merchant_secret,
        is_test: is_test,
    };
    return ({
        payment: {
            create: CreateOrder_1.createOrder.bind(defaultConfig),
            fetch: FetchOrder_1.fetchOrder.bind(defaultConfig),
        },
        emi: {
            calculate: Emi_1.calculateEmi.bind(defaultConfig),
        },
        hash: {
            verify: HashGenerator_1.verifyHash.bind(defaultConfig)
        }
    });
};
