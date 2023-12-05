const pinelabs = require("pinelabs_node").default("106600", "bcf441be-411b-46a1-aa88-c6e852a7d68c", "9A7282D0556544C59AFE8EC92F5C85F6", true);

const response = {
  ppc_MerchantID: '106600',
  ppc_MerchantAccessCode: 'bcf441be-411b-46a1-aa88-c6e852a7d68c',
  ppc_PinePGTxnStatus: '7',
  ppc_TransactionCompletionDateTime: '20/09/2023 04:07:52 PM',
  ppc_UniqueMerchantTxnID: '650acb67d3752',
  ppc_Amount: '1000',
  ppc_TxnResponseCode: '1',
  ppc_TxnResponseMessage: 'SUCCESS',
  ppc_PinePGTransactionID: '12069839',
  ppc_CapturedAmount: '1000',
  ppc_RefundedAmount: '0',
  ppc_AcquirerName: 'BILLDESK',
  ppc_PaymentMode: '3',
  ppc_Parent_TxnStatus: '4',
  ppc_ParentTxnResponseCode: '1',
  ppc_ParentTxnResponseMessage: 'SUCCESS',
  ppc_CustomerMobile: '7737291210',
  ppc_UdfField1: '',
  ppc_UdfField2: '',
  ppc_UdfField3: '',
  ppc_UdfField4: '',
  ppc_AcquirerResponseCode: '0300',
  ppc_AcquirerResponseMessage: 'NA'
};

const isSame = pinelabs.hash.verify("D640CFF0FCB8D42B74B1AFD19D97A375DAF174CCBE9555E40CC6236964928896", response);
console.log(isSame);
