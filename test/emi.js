const pinelabs = require("pinelabs_node").default("106600", "bcf441be-411b-46a1-aa88-c6e852a7d68c", "9A7282D0556544C59AFE8EC92F5C85F6", true);

const txn_data = {
  amount_in_paisa: '10000',
}

const productsDetail = [
  {
    "product_code": "testproduct02",
    "product_amount": 10000
  }
];


pinelabs.emi.calculate(txn_data, productsDetail).then((data) => {
  console.log(data)
});
