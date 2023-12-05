import {billing_data, customer_data, payment_mode, shipping_data, txn_data, udf_data, product_details} from "./Interfaces";
import axios from "axios";
import { generateCreateOrderHash } from "./HashGenerator";

/**
 * createOrder:
 * Method for creating order from pinelabs using provided parameters
 * @param txn_data Transaction details (Mandatory)
 * @param customer_data Basic customer info (Mandatory)
 * @param billing_data Billing address (Optional)
 * @param shipping_data Shipping address (Optional)
 * @param udf_data Optional data (Optional)
 * @param payment_modes Payment methods which needs to be shown on the checkout (Mandatory)
 * @param product_detail Product details for multi-cart
 */
export async function createOrder(txn_data: txn_data, payment_modes: payment_mode, customer_data: customer_data = {}, billing_data: billing_data = {}, shipping_data: shipping_data = {}, udf_data: udf_data = {}, product_detail: Array<product_details> = []): Promise<unknown> {
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
    const hash = generateCreateOrderHash(base64Data, this?.merchant_secret);
    const data = await axios.post(url, {
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
  } catch (error) {
    throw new Error(JSON.stringify(error?.response?.data));
  }
}

/**
 * getPaymentMethods:
 * Method for getting payment mode array for pinelabs
 * @param methods Methods selected by the merchant to be shown on checkout
 * @returns array<number>
 */
function getPaymentMethods(methods: payment_mode): Array<number> {
  const modes = [];
  const conditions = [
    {condition: () => methods?.cards === true, value: 1},
    {condition: () => methods?.netbanking === true, value: 3},
    {condition: () => methods?.emi === true, value: 4},
    {condition: () => methods?.cardless_emi === true, value: 19},
    {condition: () => methods?.upi === true, value: 10},
    {condition: () => methods?.wallet === true, value: 11},
    {condition: () => methods?.debit_emi === true, value: 14},
    {condition: () => methods?.prebooking === true, value: 16},
    {condition: () => methods?.bnpl === true, value: 17},
    {condition: () => methods?.paybypoints === true, value: 20},
  ];
  conditions.forEach((param: { condition: () => boolean, value: number }) => {
    if (param.condition()) {
      modes.push(param.value);
    }
  })
  return modes;
}
