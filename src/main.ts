import {createOrder} from "./Pine/CreateOrder";
import {fetchOrder} from "./Pine/FetchOrder";
import {verifyHash} from "./Pine/HashGenerator";
import {calculateEmi} from "./Pine/Emi";

export default (merchant_id: string, merchant_access_code: string, merchant_secret: string, is_test: boolean) => {
  const defaultConfig = {
    merchant_id: merchant_id,
    merchant_access_code: merchant_access_code,
    merchant_secret: merchant_secret,
    is_test: is_test,
  };
  return ({
    payment: {
      /**
       * createOrder:
       * Method for creating order from pinelabs using provided parameters
       * @param txn_data Transaction details (Mandatory)
       * @param payment_modes Payment methods which needs to be shown on the checkout (Mandatory)
       * @param customer_data Basic customer info (Optional)
       * @param billing_data Billing address (Optional)
       * @param shipping_data Shipping address (Optional)
       * @param udf_data Optional data (Optional)
       * @returns unknown
       * @throws
       */
      create: createOrder.bind(defaultConfig),

      /**
       * fetchOrder:
       * Method for fetching order details using the `unique merchant transaction id` and `transaction type`
       * @param txnId `unique merchant transaction id` of the transaction for which the details needs to be fetched
       * @param txnType `transaction type` type of the transaction
       * @returns unknown
       * @throws
       */
      fetch: fetchOrder.bind(defaultConfig),
    },
    emi: {
      /**
       * calculate:
       * Method for fetching EMIs for a product
       * @param txnData Transaction data
       * @param productsDetails Product details for which the EMI data needs to be fetched
       * @returns unknown
       */
      calculate: calculateEmi.bind(defaultConfig),
    },
    hash: {
      /**
       * verify
       * @param hash {string} Value of dia_secret from response
       * @param request {unknown} Response data not including both `dia_secret` and `dia_secret_type`
       * @returns boolean
       * @throws
       */
      verify: verifyHash.bind(defaultConfig)
    }
  })
};
