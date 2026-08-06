const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

// File path
const filePath = "./results/shelter.json";
const vendorOptions = JSON.parse(fs.readFileSync("./mongo/test2.vendors.json", "utf8"));
const userOptions = JSON.parse(
    fs.readFileSync("./results/users.json", "utf8")
  ).filter(user => user.role === "admin");

// Receive selected site from previous script
const selectedSite = JSON.parse(process.argv[2]);
//==================================================================================
const network = selectedSite.network
const networkName = network === "SLERS" ? "SLERS" : "SLERS 2";
let siteEQ = ""

if (network == "SLERS")
    siteEQ = selectedSite.altSiteName;
else{
    siteEQ = selectedSite.siteNumber
}
const siteName = selectedSite.siteName
const siteid = selectedSite._id
const options = [
  "Add Site Electricity",
  "Add Site Civil",
  "Add Site Telecom",
  "Add AC-DC Power Supply Module",
  "Add Vegetation Control",
  "Add Shelter"
];
//==================================================================================
for (let i = 0; i < options.length; i++) {
  console.log(`${i + 1}. ${options[i]}`);
}

let userSelect = prompt("Choose a number option: ");


console.log(`You selected: ${options[userSelect - 1]}`);


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
        "type": "Electric",
        "caseType": "Work Order",
        "siteid": { "$oid": "Enter ObjectID from MongoDB Here" },
        "equipmentName": "SiteName Site ELectric",
        "equipmentID": "Enter AMMS equipment number here",
        "accountNumber": null,
        "additionalInfo": "",
        "defaultVendor": { "$oid": "Enter ObjectID from MOngoDB Here" },
        "lastEditedBy":{ "$oid": "Enter ObjectID from MOngoDB Here" },
        "lastEditedTimestamp": null
    },
    {
        "type": "Civil",
        "caseType": "Work Order",
        "siteid": { "$oid": "Enter ObjectID from MongoDB Here" },
        "equipmentName": "SiteName Civil Work",
        "equipmentID": "Enter AMMS equipment number here",
        "additionalInfo": "",
        "defaultVendor": { "$oid": "Enter ObjectID from MOngoDB Here" },
        "lastEditedBy":{ "$oid": "Enter ObjectID from MOngoDB Here" },
        "lastEditedTimestamp": null
    },
    {
        "type": "Telecom",
        "caseType": "Work Order",
        "siteid": { "$oid": "Enter ObjectID from MongoDB Here" },
        "equipmentName": "SiteName Telecom",
        "equipmentID": "Enter AMMS equipment number here",
        "accountNumber": null,
        "circuitID": "",
        "circuitType": "Audio or Network",
        "additionalInfo": "",
        "defaultVendor": { "$oid": "Enter ObjectID from MOngoDB Here" },
        "lastEditedBy":{ "$oid": "Enter ObjectID from MOngoDB Here" },
        "lastEditedTimestamp": null
    },

   
*/

// =======================
// PROMPTS
// =======================

switch (userSelect) {
  case "1":{
    const type = "Electric";
    const caseType = "Ticket";
    const collection = "Shelter";

    const equipmentName = `${siteName} Site Electric`;
    const equipmentID = `${siteEQ}XE`;

    let additionalInfo = prompt("Additional Info: ").trim();
    if (additionalInfo == ""){
        additionalInfo = selectedSite.additionalInfo
    }

    const accountNumber = prompt("Enter the account number:")
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

    const newEntry = {
        type,
        caseType,
        collection,
        network: networkName,
        siteid,
        equipmentName,
        equipmentID,
        additionalInfo,
        accountNumber,
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
  break}
  case "2":{
    const type = "Civil";
    const caseType = "Work Order";
    const collection = "Shelter";

    const equipmentName = `${siteName} Civil Work`;
    const equipmentID = `${siteEQ}XC`;

    let additionalInfo = prompt("Additional Info: ").trim();
    if (additionalInfo == ""){
        additionalInfo = selectedSite.additionalInfo
    }

    const pmNeeded = true;
  const pmType = "Civil";
  const pmHistory = []

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

    const newEntry = {
        type,
        caseType,
        collection,
        network: networkName,
        siteid,
        equipmentName,
        equipmentID,
        additionalInfo,
        pmType,
    pmNeeded,
    pmHistory,
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
  break}
  case "3":{
    const type = "Telecom";
    const caseType = "Ticket";
    const collection = "Shelter";

    const equipmentName = `${siteName} Telecom`;
    const num = prompt("Enter the number after the XW in the equipment number for SLERS 1 EQ:")
    const equipmentID = `${siteEQ}XW${num}`;
    // const equipmentID = `${siteName}XE`;

    let additionalInfo = prompt("Additional Info: ").trim();
    if (additionalInfo == ""){
        additionalInfo = selectedSite.additionalInfo
    }

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

    const newEntry = {
        type,
        caseType,
        collection,
        network: networkName,
        siteid,
        equipmentName,
        equipmentID,
        additionalInfo,
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
  break}
  case "4":{
    const type = "AC-DC Power Supply Module";
    const caseType = "Ticket";
    const collection = "Shelter";

    const equipmentName = `${siteName} AC-DC Power Supply Module`;
    const equipmentID = `${siteEQ}U1PSM`;
    const serialNumber = prompt("Enter the AC-DC Power Supply Module serial number:")
    const make = prompt("Enter the AC-DC Power Supply Module manufacturer:")
    const model = prompt("Enter the AC-DC Power Supply Module model or model number:")

    let additionalInfo = prompt("Additional Info: ").trim();
    if (additionalInfo == ""){
        additionalInfo = selectedSite.additionalInfo
    }

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

    const newEntry = {
        type,
        caseType,
        collection,
        network: networkName,
        siteid,
        equipmentName,
        equipmentID,
        make,
        model,
        serialNumber,
        additionalInfo,
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
  break}
  case "5":{
    const type = "Vegetation Control";
    const caseType = "Work Order";
    const collection = "Shelter";

    const equipmentName = `${siteName} Vegetation Control`;
    const equipmentID = `${siteEQ}XCVEG`;

    let additionalInfo = prompt("Additional Info: ").trim();
    if (additionalInfo == ""){
        additionalInfo = selectedSite.additionalInfo
    }

    const pmNeeded = true;
  const pmType = "Vegetation";
  const pmHistory = []

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

    const newEntry = {
        type,
        caseType,
        collection,
        network: networkName,
        siteid,
        equipmentName,
        equipmentID,
        additionalInfo,
        pmType,
    pmNeeded,
    pmHistory,
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
  break}
  case "6":{
    const type = "Shelter";
    const caseType = "Work Order";
    const collection = "Shelter";

    const equipmentName = `${siteName} Shelter`;
    const equipmentID = `${siteEQ}XS`;

    let additionalInfo = prompt("Additional Info: ").trim();
    if (additionalInfo == ""){
        additionalInfo = selectedSite.additionalInfo
    }

    const serialNumber = prompt("Enter the shelter serial number:")
    const make = prompt("Enter the shelter manufacturer:")
    const model = prompt("Enter the shelter model or part number:")

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

    const newEntry = {
        type,
        caseType,
        collection,
        network: networkName,
        siteid,
        equipmentName,
        equipmentID,
        additionalInfo,
        serialNumber,
        make,
        model,
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
  break}
 
 
}

