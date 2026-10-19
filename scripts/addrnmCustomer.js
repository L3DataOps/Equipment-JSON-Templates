const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

// File paths
const filePath = "./results/rnmCustomers.json";
const vendorFilePath = "./mongo/test2.rnmVendors.json";

const userOptions = JSON.parse(
  fs.readFileSync("./results/users.json", "utf8")
).filter(user => user.role === "admin");

const vendorOptions = JSON.parse(
  fs.readFileSync(vendorFilePath, "utf8")
);

// =======================
// LOAD EXISTING CUSTOMER DATA
// =======================

let data = [];

if (fs.existsSync(filePath)) {
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error("Invalid JSON in rnmCustomers.json.");
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
// SELECT VENDOR
// =======================

console.log("\n=======================");
console.log("Select RNM Vendor associated with the customer you are adding:");
console.log("=======================\n");

const vendorSelection = selectFromList(
  vendorOptions,
  "Enter vendor: ",
  "vendorName",
  "_id",
  { multi: false }
);

// =======================
// CUSTOMER INFORMATION
// =======================

console.log("\n=======================");
console.log("Add RNM Customer");
console.log("=======================\n");

const customerName = prompt(
  "Enter customer name: "
).trim();

const state = prompt(
  "Enter state: "
).trim();

const county = prompt(
  "Enter county: "
).trim();

const timezone = prompt(
  "Enter timezone (Eastern/Central): "
).trim();

const emailInput = prompt(
  "Enter customer emails separated by commas: "
).trim();

const email = emailInput
  .split(",")
  .map(address => address.trim())
  .filter(address => address !== "");

const notes = prompt(
  "Enter notes (Special instructions, quirks, etc.): "
).trim();

const alarmMatrix = prompt(
  "Enter alarm matrix file path: "
).trim();

// =======================
// SCREEN NUMBER
// =======================

let screenNumber;

while (true) {

  const input = prompt(
    "Enter the RNM Screen Number (1, 2, 3, etc.): "
  ).trim();

  if (input === "") {
    screenNumber = null;
    break;
  }

  if (/^\d+$/.test(input)) {
    screenNumber = parseInt(input, 10);
    break;
  }

  console.log("❌ Please enter a valid whole number.");
}

const wallLocation = prompt(
  "Enter the RNM Screen Location (Right/Left): "
).trim();

const vpnInstructions = prompt(
  "Enter VPN instructions (add the character '~' where a line break is needed): "
).trim();

// =======================
// UPLOADING USER
// =======================

const lastEditedBy = selectFromList(
  userOptions,
  "Enter user: ",
  "username",
  "_id",
  { multi: false }
);

const reserveField1 = null;
const reserveField2 = null;

// =======================
// BUILD ENTRY
// =======================

const newEntry = {
  rnmVendor: vendorSelection,
  customerName,
  state,
  county,
  timezone,
  email,
  notes,
  alarmMatrix,
  screenNumber,
  wallLocation,
  vpnInstructions,
  reserveField1,
  reserveField2,
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
  JSON.stringify(data, null, 2
));

console.log("\n✅ Remote customer added successfully!");
console.log(newEntry);