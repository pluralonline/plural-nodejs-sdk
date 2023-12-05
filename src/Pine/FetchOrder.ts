import axios from "axios";
import { generateFetchOrderHash } from "./HashGenerator";

/**
 * fetchOrder:
 * Method for fetching order details using the `unique merchant transaction id` and `transaction type`
 * @param txnId `unique merchant transaction id` of the transaction for which the details needs to be fetched
 * @param txnType `transaction type` type of the transaction
 * @returns unknown
 * @function
 */
export async function fetchOrder(txnId: string, txnType: number = 3): Promise<unknown> {
  try {
    const body = {
      "ppc_MerchantID": this.merchant_id,
      "ppc_MerchantAccessCode": this.merchant_access_code,
      "ppc_TransactionType": txnType,
      "ppc_UniqueMerchantTxnID": txnId,
    };
    const endpoint = this.is_test ? "https://uat.pinepg.in/api/" : 'https://pinepg.in/api/';
    const url = endpoint + "PG/V2";
    const data = await axios.post(url, httpBuildQuery({
      ...body,
      "ppc_DIA_SECRET": generateFetchOrderHash(body, this?.merchant_secret),
      "ppc_DIA_SECRET_TYPE": "sha256"
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return data.data;
  } catch (error) {
    throw new Error(JSON.stringify(error?.response?.data));
  }
}

/**
 * httpBuildQuery:
 * Http param query builder
 * @param params Parameters using which the query will be generated
 * @returns string
 */
function httpBuildQuery(params): string {
  const queryParts = [];

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      if (Array.isArray(value)) {
        for (const item of value) {
          queryParts.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(item));
        }
      } else {
        queryParts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
      }
    }
  }

  return queryParts.join('&');
}
