const pinelabs = require("pinelabs_node").default("106600", "bcf441be-411b-46a1-aa88-c6e852a7d68c", "9A7282D0556544C59AFE8EC92F5C85F6", true);

pinelabs.payment.fetch("650acb67d3752", 3).then((data) => {
  console.log(data)
});
