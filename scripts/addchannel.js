const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

// File path
const filePath = "./results/channels.json";
const vendorOptions = JSON.parse(fs.readFileSync("./mongo/test2.vendors.json", "utf8"));
const userOptions = JSON.parse(
    fs.readFileSync("./results/users.json", "utf8")
  ).filter(user => user.role === "admin");

// Receive selected site from previous script
const selectedSite = JSON.parse(process.argv[2]);

const network = selectedSite.network
const networkName = network === "SLERS" ? "SLERS" : "SLERS 2";
const siteName = selectedSite.siteName;
const siteid = selectedSite._id


// Load existing data
let data = [];

if (fs.existsSync(filePath)) {
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error("Invalid JSON in channels file.");
    process.exit(1);
  }
}

function selectFromList(options, question, displayKey, valueKey, { multi = true } = {}) {

  /*///////////////////////////////////////////////
  const variable = selectFromList(
      arrayOptions,
      "Enter question here: ",
      "value you want displayed",
      "_id", <-- do not change
      { multi: true }
    );
  ///////////////////////////////////////////////*/


  // Display options
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

  // Build $oid objects
  const results = indexes.map(i => options[i][valueKey]);

  // Return single or array
  return multi ? results : results[0];
}

/*
      {
        "type": "Channel",
        "caseType": "Ticket",
        "siteid": {
          "$oid": "Enter ObjectID from MongoDB Here"
        },
        "equipmentName": "SiteName Channel X",
        "equipmentID": "Enter AMMS equipment number here",
        "additionalInfo": "",
        "hostName": "",
        "ipAddress": "",
        "frequency": "MHz",
        "defaultVendor": {
          "$oid": "Enter ObjectID from MongoDB Here"
        },
        "lastEditedBy": {
          "$oid": "Enter ObjectID from MongoDB Here"
        },
        "lastEditedTimestamp": null
      }

*/

// =======================
// PROMPTS
// =======================

if (network == "SLERS") {

  const type = "Channel";
  const caseType = "Ticket";
  const collection = "Channels";

  const num = prompt("Enter which number for the for the channel (Ex. 1 = Channel 1): ").trim();

  const equipmentName = `${siteName} Channel ${num}`;
  const equipmentSuffix = prompt(
  "Enter the equipment ID suffix (R850S103XXXXX, x404XXXX): "
).trim();
  const equipmentID = `${selectedSite.altSiteName}${equipmentSuffix}`;

  let additionalInfo = prompt("Additional Info: ").trim();
  if (additionalInfo == ""){
    additionalInfo = selectedSite.additionalInfo
  }
  const hostName = prompt("Host Name: ").trim();
  const ipAddress = prompt("IP Address: ").trim();
  const frequency = prompt("Frequency (MHz): ").trim();
  const reserveField1 = "";
  const reserveField2 = "";
  const reserveField3 = "";
  const reserveField4 = "";
  const reserveField5 = "";

  const vendorSelection = selectFromList(
  vendorOptions,
  "Enter default vendor separated by commas: ",
  "vendorName",
  "_id",
  { multi: false }
);

const selectedVendor = vendorOptions.find(
  v => v._id.$oid === vendorSelection.$oid
);

const defaultVendor = vendorSelection;

const imagePath = "";
const email = [
  "pspcsysops@l3harris.com",
  ...(Array.isArray(selectedVendor.vendorEmail)
    ? selectedVendor.vendorEmail
    : [selectedVendor.vendorEmail])
].filter(email => email);
  const lastEditedBy = selectFromList(userOptions, "Enter user: ", "username", "_id", { multi: false });

  // =======================
  // BUILD ENTRY
  // =======================

  const newEntry = {
    type,
    caseType,
    collection,
    network: networkName,
    siteid,
    equipmentName,
    equipmentID,
    additionalInfo,
    hostName,
    ipAddress,
    frequency,
    reserveField1,
    reserveField2,
    reserveField3,
    reserveField4,
    reserveField5,
    defaultVendor,
    imagePath,
    email,
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

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  console.log("\n✅ Entry added successfully!");
  console.log(newEntry);
}else{
  const type = "Channel";
  const caseType = "Ticket";
  const collection = "Channels";

  const num = prompt("Enter which number for the for the channel (Ex. 1 = Channel 1): ").trim();

  const equipmentName = `${siteName} Channel ${num}`;
  const equipmentSuffix = prompt(
  "Enter the equipment ID suffix (R850S103XXXXX, x404XXXX): "
).trim();
  const equipmentID = `${selectedSite.siteNumber}${equipmentSuffix}`;

  let additionalInfo = prompt("Additional Info: ").trim();
  if (additionalInfo == ""){
    additionalInfo = selectedSite.additionalInfo
  }
  const hostName = prompt("Host Name: ").trim();
  const ipAddress = prompt("IP Address: ").trim();
  const frequency = prompt("Frequency (MHz): ").trim();
  const reserveField1 = "";
  const reserveField2 = "";
  const reserveField3 = "";
  const reserveField4 = "";
  const reserveField5 = "";

  const vendorSelection = selectFromList(
  vendorOptions,
  "Enter default vendor separated by commas: ",
  "vendorName",
  "_id",
  { multi: false }
);

const selectedVendor = vendorOptions.find(
  v => v._id.$oid === vendorSelection.$oid
);

const defaultVendor = vendorSelection;

const imagePath = "";
const email = [
  "pspcsysops@l3harris.com",
  ...(Array.isArray(selectedVendor.vendorEmail)
    ? selectedVendor.vendorEmail
    : [selectedVendor.vendorEmail])
].filter(email => email);
  const lastEditedBy = selectFromList(userOptions, "Enter user: ", "username", "_id", { multi: false });

  // =======================
  // BUILD ENTRY
  // =======================

  const newEntry = {
    type,
    caseType,
    collection,
    network: networkName,
    siteid,
    equipmentName,
    equipmentID,
    additionalInfo,
    hostName,
    ipAddress,
    frequency,
    reserveField1,
    reserveField2,
    reserveField3,
    reserveField4,
    reserveField5,
    defaultVendor,
    imagePath,
    email,
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

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  console.log("\n✅ Entry added successfully!");
  console.log(newEntry);
}

