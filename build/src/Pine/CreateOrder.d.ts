import { billing_data, customer_data, payment_mode, shipping_data, txn_data, udf_data, product_details } from "./Interfaces";
export declare function createOrder(txn_data: txn_data, payment_modes: payment_mode, customer_data?: customer_data, billing_data?: billing_data, shipping_data?: shipping_data, udf_data?: udf_data, product_detail?: Array<product_details>): Promise<unknown>;
