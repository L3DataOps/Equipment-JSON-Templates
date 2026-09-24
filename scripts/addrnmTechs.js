const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

// File paths
const filePath = "./results/rnmTechs.json";
const vendorFilePath = "./mongo/test2.rnmVendors.json";

const userOptions = JSON.parse(
  fs.readFileSync("./results/users.json", "utf8")
).filter(user => user.role === "admin");

const vendorOptions = JSON.parse(
  fs.readFileSync(vendorFilePath, "utf8")
);

// =======================
// LOAD EXISTING TECH DATA
// =======================

let data = [];

if (fs.existsSync(filePath)) {
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error("Invalid JSON in rnmTechs.json.");
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
console.log("Select RNM Vendor to add a tech for:");
console.log("=======================\n");

const vendorSelection = selectFromList(
  vendorOptions,
  "Enter vendor: ",
  "vendorName",
  "_id",
  { multi: false }
);

// =======================
// TECH INFORMATION
// =======================

console.log("\n=======================");
console.log("Add RNM Tech");
console.log("=======================\n");

const collection = "RNM Techs";

const techName = prompt(
  "Enter tech name (Guy Sterling, etc.): "
).trim();

const techPhone = prompt(
  "Enter tech phone number (443-365-3492, etc.): "
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
  rnmVendor: vendorSelection,
  collection,
  techName,
  techPhone,
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

console.log("\n✅ RNM Tech added successfully!");
console.log(newEntry);