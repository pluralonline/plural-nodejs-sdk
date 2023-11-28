const pinelab = require("pinelabs_node");
const ejs = require("ejs");
const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// base route
app.get("/", (req, res) => {
  res.render("form");
});

// get fetch page
app.get("/fetch", (req, res) => {
  res.render("fetch");
});

// get emi page
app.get("/emi", (req, res) => {
  res.render("emi");
});

// get hash page
app.get("/hash", (req, res) => {
  res.render("hash");
});

// create order
app.post("/submit", async (req, res) => {
  try {
    console.log("Request Object:", req.body);

    const merchant_id = req.body.merchant_id;
    const merchant_access_code = req.body.access_code;
    const is_test = req.body.pg_mode;
    const merchant_secret = req.body.secret;

    const txn_data = {
      txn_id: req.body.txn_id,
      callback: req.body.callback_url,
      amount_in_paisa: req.body.amount_in_paisa,
    };

    const customer_data = {
      email_id: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      mobile_no: req.body.phone,
      customer_id: req.body.customer_id,
    };

    const billing_data = {
      address1: req.body.address1,
      address2: req.body.address2,
      address3: req.body.address3,
      pincode: req.body.billing_pincode,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
    };

    const shipping_data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      mobile_no: req.body.mobile_no,
      address1: req.body.address1,
      address2: req.body.address2,
      address3: req.body.address3,
      pincode: req.body.billing_pincode,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
    };

    const udf_data = {
      udf_field_1: req.body.udf1,
      udf_field_2: req.body.udf2,
      udf_field_3: req.body.udf3,
      udf_field_4: req.body.udf4,
      udf_field_5: req.body.udf5,
    };

    const productData = req.body.response_data;

    const cleanedString = productData.replace(/\\r\\n/g, "");
    const product_details = JSON.parse(cleanedString);

    console.log(product_details);

    const payment_mode_array = req.body.payment_mode;

    const payment_mode = {};

    if (Array.isArray(payment_mode_array)) {
      payment_mode_array.forEach((mode) => {
        payment_mode[mode] = true;
      });
    } else if (payment_mode_array) {
      payment_mode[payment_mode_array] = true;
    }
    console.log(payment_mode);

    const pinelab_function = pinelab.default(
      merchant_id,
      merchant_access_code,
      merchant_secret,
      is_test
    );
    const create_order_response = await pinelab_function.payment.create(
      txn_data,
      payment_mode,
      customer_data,
      billing_data,
      shipping_data,
      udf_data,
      product_details
    );

    console.log(create_order_response);
    if (create_order_response && create_order_response.url) {
      res.redirect(create_order_response.url);
    } else {
      console.error("Invalid response or missing URL.");
      res.send("Invalid response or missing URL.");
    }
  } catch (error) {
    const errorMsg = JSON.parse(error.message);
    const responseMessage = errorMsg["respone_message"] ?? "UnKnown Error";               
    const responseCode = errorMsg["respone_code"] ?? -1;                                                        

    res.status(500).json({
      respone_message: responseMessage,
      respone_code: responseCode,
    });
  }
});

app.post("/callback", (req, res) => {
  try {
    console.log(req.body);
    res.status(200).send(req.body);
  } catch (error){
    const errorMsg = JSON.parse(error.message);
    const responseMessage = errorMsg["respone_message"] ?? "UnKnown Error";               
    const responseCode = errorMsg["respone_code"] ?? -1;                                                        

    res.status(500).json({
      respone_message: responseMessage,
      respone_code: responseCode,
    });
  }
});

// fetch
app.post("/fetch", async (req, res) => {
  try {
    console.log(req.body);

    const merchant_id = req.body.merchant_id;
    const merchant_access_code = req.body.access_code;
    const is_test = req.body.pg_mode;
    const merchant_secret = req.body.secret;
    const txn_id = req.body.txn_id;
    const txn_type = 3;

    const pinelab_function = pinelab.default(
      merchant_id,
      merchant_access_code,
      merchant_secret,
      is_test
    );

    const fetch_response = await pinelab_function.payment.fetch(
      txn_id,
      txn_type
    );

    res.status(200).send(fetch_response);
  } catch (error) {
    const errorMsg = JSON.parse(error.message);
    const responseMessage = errorMsg["respone_message"] ?? "UnKnown Error";               
    const responseCode = errorMsg["respone_code"] ?? -1;                                                        

    res.status(500).json({
      respone_message: responseMessage,
      respone_code: responseCode,
    });
  }
});

// hash verify
app.post("/hashVerify", async (req, res) => {
  try {
    console.log(req.body);

    const merchant_id = req.body.merchant_id;
    const merchant_access_code = req.body.access_code;
    const is_test = req.body.pg_mode;
    const merchant_secret = req.body.secret;
    const hashData = req.body.response_data;

    const cleanedString = hashData.replace(/\\r\\n/g, "");
    const jsonData = JSON.parse(cleanedString);

    console.log(jsonData);

    const {
      ppc_DIA_SECRET,
      ppc_DIA_SECRET_TYPE,
      dia_secret,
      dia_secret_type,
      ...remainingKeys
    } = jsonData;
    const hash = ppc_DIA_SECRET || dia_secret;

    const response = {
      ...remainingKeys,
    };

    const pinelab_function = pinelab.default(
      merchant_id,
      merchant_access_code,
      merchant_secret,
      is_test
    );

    const isSame = pinelab_function.hash.verify(hash, response);

    res.status(200).send(isSame);
  } catch (error) {
    const errorMsg = JSON.parse(error.message);
    const responseMessage = errorMsg["respone_message"] ?? "UnKnown Error";               
    const responseCode = errorMsg["respone_code"] ?? -1;                                                        

    res.status(500).json({
      respone_message: responseMessage,
      respone_code: responseCode,
    });
  }
});

//emi
app.post("/emi", async (req, res) => {
  try {
    console.log(req.body);

    const merchant_id = req.body.merchant_id;
    const merchant_access_code = req.body.access_code;
    const is_test = req.body.pg_mode;
    const merchant_secret = req.body.secret;
    const productData = req.body.response_data;

    const cleanedString = productData.replace(/\\r\\n/g, "");
    const productsDetail = JSON.parse(cleanedString);

    console.log(productsDetail);

    const txn_data = {
      amount_in_paisa: req.body.amount_in_paisa,
    };

    const pinelab_function = pinelab.default(
      merchant_id,
      merchant_access_code,
      merchant_secret,
      is_test
    );
    const emi_response = await pinelab_function.emi.calculate(
      txn_data,
      productsDetail
    );
    res.status(200).send(emi_response);
  } catch (error) {
    const errorMsg = JSON.parse(error.message);
    const responseMessage = errorMsg["respone_message"] ?? "UnKnown Error";               
    const responseCode = errorMsg["respone_code"] ?? -1;                                                        

    res.status(500).json({
      respone_message: responseMessage,
      respone_code: responseCode,
    });
  }
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
