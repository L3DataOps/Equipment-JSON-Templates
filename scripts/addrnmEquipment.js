const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

// File paths
const filePath = "./results/rnmEquipment.json";
const customerFilePath = "./mongo/test2.rnmCustomers.json";
const siteFilePath = "./mongo/test2.rnmSites.json";

const userOptions = JSON.parse(
  fs.readFileSync("./results/users.json", "utf8")
).filter(user => user.role === "admin");

const customerOptions = JSON.parse(
  fs.readFileSync(customerFilePath, "utf8")
);

const siteOptions = JSON.parse(
  fs.readFileSync(siteFilePath, "utf8")
);

// =======================
// LOAD EXISTING EQUIPMENT DATA
// =======================

let data = [];

if (fs.existsSync(filePath)) {
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error("Invalid JSON in rnmEquipment.json.");
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

const selectedCustomer = customerOptions.find(
  customer => customer._id.$oid === customerSelection.$oid
);

// =======================
// SELECT SITE
// =======================

// Only show sites belonging to the selected customer
const customerSites = siteOptions.filter(
  site => site.customer.$oid === customerSelection.$oid
);

if (customerSites.length === 0) {
  console.error("\nNo sites found for the selected customer.");
  process.exit(1);
}

console.log("\n=======================");
console.log("SELECT RNM SITE");
console.log("=======================\n");

const siteSelection = selectFromList(
  customerSites,
  "Enter site: ",
  "siteName",
  "_id",
  { multi: false }
);

// =======================
// EQUIPMENT INFORMATION
// =======================

const type = prompt("Enter equipment type (Channel or NWS. If not either, hit enter to leave this null): ").trim();
const caseType = "Remote";
const collection = "RNM Equipment";
const equipmentName = prompt("Enter equipment name: ").trim();
const equipmentID = prompt("Enter equipment ID (S11U1CHN, etc.): ").trim();
const orderNumber = prompt("Enter the order number that the equipment is in: ").trim();
const notes = prompt("Enter notes (Special instructions, quirks, etc.): ").trim();

const email = selectedCustomer.email;

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
  site: siteSelection,
  type: type,
  caseType,
  collection,
  email,
  notes,
  equipmentName,
  equipmentID,
  orderNumber,
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

console.log("\n✅ RNM equipment added successfully!");
console.log(newEntry);