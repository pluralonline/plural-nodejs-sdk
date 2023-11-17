export interface txn_data {
    txn_id: string;
    callback: string;
    amount_in_paisa: string;
}
export interface customer_data {
    email_id?: string;
    first_name?: string;
    last_name?: string;
    mobile_no?: string;
    customer_id?: string;
}
export interface billing_data {
    address1?: string;
    address2?: string;
    address3?: string;
    pincode?: string;
    city?: string;
    state?: string;
    country?: string;
}
export interface shipping_data {
    first_name?: string;
    last_name?: string;
    mobile_no?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    pincode?: string;
    city?: string;
    state?: string;
    country?: string;
}
export interface udf_data {
    udf_field_1?: string;
    udf_field_2?: string;
    udf_field_3?: string;
    udf_field_4?: string;
    udf_field_5?: string;
}
export interface payment_mode {
    netbanking: boolean;
    cards: boolean;
    emi: boolean;
    upi: boolean;
    cardless_emi: boolean;
    wallet: boolean;
    debit_emi: boolean;
    prebooking: boolean;
    bnpl: boolean;
    paybypoints: boolean;
}
export interface product_details {
    product_code: string;
    product_amount: number;
}
