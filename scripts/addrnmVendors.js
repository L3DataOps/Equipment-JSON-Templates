const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

// File paths
const filePath = "./results/rnmVendors.json";
const customerFilePath = "./mongo/test2.rnmCustomers.json";

const userOptions = JSON.parse(
  fs.readFileSync("./results/users.json", "utf8")
).filter(user => user.role === "admin");

const customerOptions = JSON.parse(
  fs.readFileSync(customerFilePath, "utf8")
);

// =======================
// LOAD EXISTING VENDOR DATA
// =======================

let data = [];

if (fs.existsSync(filePath)) {
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error("Invalid JSON in rnmVendors.json.");
    process.exit(1);
  }
}

// =======================
// SELECT FROM LIST
// =======================

function selectFromList(
  options,
  question,
  displayKey,
  valueKey,
  { multi = true } = {}
) {
  options.forEach((opt, i) => {
    console.log(`${i + 1}. ${opt[displayKey]}`);
  });

  const input = prompt(question).trim();

  const indexes = [...new Set(
    input.split(",")
      .map(num => parseInt(num.trim(), 10) - 1)
      .filter(i => i >= 0 && i < options.length)
  )];

  if (indexes.length === 0) {
    console.error("No valid selection.");
    process.exit(1);
  }

  const results = indexes.map(i => options[i][valueKey]);

  return multi ? results : results[0];
}

// =======================
// SELECT CUSTOMER
// =======================

console.log("\n=======================");
console.log("SELECT RNM CUSTOMER");
console.log("=======================\n");

const customerSelection = selectFromList(
  customerOptions,
  "Enter customer: ",
  "customerName",
  "_id",
  { multi: false }
);

// =======================
// VENDOR INFORMATION
// =======================

console.log("\n=======================");
console.log("ADD RNM VENDOR");
console.log("=======================\n");


const vendorName = prompt(
  "Enter vendor name (by customer: Worcester Techs, NICC Techs, etc.): "
).trim();

const lastEditedBy = selectFromList(
  userOptions,
  "Enter user: ",
  "username",
  "_id",
  { multi: false }
);

// =======================
// BUILD ENTRY
// =======================

const newEntry = {
  customer: customerSelection,
  vendorName,
  lastEditedBy,
  lastEditedTimestamp: new Date().toISOString()
};

// =======================
// SAVE
// =======================

Object.keys(newEntry).forEach(key => {
  if (newEntry[key] === "") {
    newEntry[key] = null;
  }
});

data.push(newEntry);

fs.writeFileSync(
  filePath,
  JSON.stringify(data, null, 2)
);

console.log("\n✅ RNM Vendor added successfully!");
console.log(newEntry);