import { product_details } from "./Interfaces";
export declare function calculateEmi(txnData: {
    amount_in_paisa: string;
}, productsDetails?: Array<product_details>): Promise<unknown>;
