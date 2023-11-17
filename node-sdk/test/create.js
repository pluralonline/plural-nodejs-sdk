const pinelabs = require("pinelabs_node").default("106600", "bcf441be-411b-46a1-aa88-c6e852a7d68c", "9A7282D0556544C59AFE8EC92F5C85F6", true);


const txn_data = {
  txn_id: "4324324234322243342432",
  callback: 'https://httpbin.org/post',
  amount_in_paisa: '10000',
}

const customer_data = {
  email_id: "ramsharan@mcsam.in",
  first_name: "Ramsharan",
  last_name: "Yadav",
  mobile_no: "7737291210",
  customer_id: "43243242423242432",
}

const billing_data = {
  address1: "",
  address2: "",
  address3: "",
  pincode: "",
  city: "",
  state: "",
  country: "",
}

const shipping_data = {
  first_name: "",
  last_name: "",
  mobile_no: "",
  address1: "",
  address2: "",
  address3: "",
  pincode: "",
  city: "",
  state: "",
  country: "",
}

const udf_data = {
  udf_field_1: "",
  udf_field_2: "",
  udf_field_3: "",
  udf_field_4: "",
  udf_field_5: "",
}

const payment_mode = {
  netbanking: true,
  cards: true,
  emi: true,
  upi: true,
  cardless_emi: true,
  wallet: true,
  debit_emi: true,
  prebooking: true,
  bnpl: true,
  paybypoints: false,
}

const product_details = [
  {
    "product_code": "testSKU1",
    "product_amount": 500000
  },
  {
    "product_code": "testSKU1",
    "product_amount": 500000
  }
]


pinelabs.payment.create(txn_data, payment_mode, customer_data, billing_data, shipping_data, udf_data, product_details).then((data) => {
  console.log(data)
});
