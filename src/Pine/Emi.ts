import {product_details} from "./Interfaces";
import axios from "axios";

/**
 * calculateEmi:
 * Method for fetching EMIs for a product
 * @param txnData Transaction data
 * @param productsDetails Product details for which the EMI data needs to be fetched
 * @returns unknown
 */
export async function calculateEmi(txnData: { amount_in_paisa: string; }, productsDetails: Array<product_details> = []): Promise<unknown> {
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
    }
    const endpoint = this.is_test ? "https://uat.pinepg.in/api/" : 'https://pinepg.in/api/';
    const url = endpoint + "v2/emi/calculator";
    const data = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data.data;
  } catch (error) {
    throw new Error(JSON.stringify(error?.response?.data ?? error));
  }
}
