const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

// File path
const filePath = "./results/tower.json";
const vendorOptions = JSON.parse(fs.readFileSync("./mongo/test2.vendors.json", "utf8"));
const userOptions = JSON.parse(
    fs.readFileSync("./results/users.json", "utf8")
  ).filter(user => user.role === "admin");

// Receive selected site from previous script
const selectedSite = JSON.parse(process.argv[2]);
//==================================================================================
const network = selectedSite.network
const networkName = network === "SLERS" ? "SLERS" : "SLERS 2";


const siteName = selectedSite.siteName;

const siteid = selectedSite._id
const options = [
  "Add Tower",
  "Add Tower Lights",
  "Add Combiner",
  "Add Tower Top Amplifier (TTA)",
  "Add Multicoupler",
  "Add Dehydrator"
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
        "type": "Tower",
        "caseType": "Work Order",
        "siteid": { "$oid": "Enter ObjectID from MongoDB Here" }, 
        "equipmentName": "SiteName Tower",
        "equipmentID": "Enter AMMS equipment number here",
        "additionalInfo": "",
        "defaultVendor": { "$oid": "Enter ObjectID from MongoDB Here" },
        "lastEditedBy":{ "$oid": "Enter ObjectID from MongoDB Here" },
        "lastEditedTimestamp": null
    },
    {
    "type": "Tower Lights",
    "caseType": "Work Order",
    "siteid": {
      "$oid": "Enter ObjectID from MongoDB Here"
    },
    "equipmentName": "SiteName Tower Lights",
    "equipmentID": "Enter AMMS equipment number here",
    "additionalInfo": "",
    "defaultVendor": {
      "$oid": "Enter ObjectID from MongoDB Here"
    },
    "lastEditedBy": {
      "$oid": "Enter ObjectID from MongoDB Here"
    },
    "lastEditedTimestamp": null
  },
    {
        "type": "Combiner",
        "caseType": "Ticket",
        "siteid": { "$oid": "Enter ObjectID from MongoDB Here" }, 
        "equipmentName": "SiteName Combiner",
        "equipmentID": "Enter AMMS equipment number here",
        "additionalInfo": "",
        "defaultVendor": { "$oid": "Enter ObjectID from MongoDB Here" },
        "lastEditedBy":{ "$oid": "Enter ObjectID from MongoDB Here" },
        "lastEditedTimestamp": null
    },
    {
        "type": "Tower Top Amplifier",
        "caseType": "Ticket",
        "siteid": { "$oid": "Enter ObjectID from MongoDB Here" }, 
        "equipmentName": "SiteName TTA",
        "equipmentID": "Enter AMMS equipment number here",
        "additionalInfo": "",
        "defaultVendor": { "$oid": "Enter ObjectID from MongoDB Here" },
        "lastEditedBy":{ "$oid": "Enter ObjectID from MongoDB Here" },
        "lastEditedTimestamp": null
    },
    {
        "type": "Multicoupler",
        "caseType": "Ticket",
        "siteid": { "$oid": "Enter ObjectID from MongoDB Here" }, 
        "equipmentName": "SiteName Multicoupler",
        "equipmentID": "Enter AMMS equipment number here",
        "additionalInfo": "",
        "ipAddress": null,
        "defaultVendor": { "$oid": "Enter ObjectID from MongoDB Here" },
        "lastEditedBy":{ "$oid": "Enter ObjectID from MongoDB Here" },
        "lastEditedTimestamp": null
    },
    {
        "type": "Dehydrator",
        "caseType": "Ticket",
        "siteid": { "$oid": "Enter ObjectID from MongoDB Here" }, 
        "equipmentName": "SiteName Dehydrator",
        "equipmentID": "Enter AMMS equipment number here",
        "additionalInfo": "",
        "defaultVendor": { "$oid": "Enter ObjectID from MongoDB Here" },
        "lastEditedBy":{ "$oid": "Enter ObjectID from MongoDB Here" },
        "lastEditedTimestamp": null
    }

   
*/

// =======================
// PROMPTS
// =======================

switch (userSelect) {
  case "1":{
    const type = "Tower";
    const caseType = "Ticket";
    const collection = "Tower"
  
    const equipmentName = `${siteName} Tower`;
    const equipmentID = network == "SLERS" ? `${selectedSite.altSiteName}XT` : `${selectedSite.siteNumber}XT`;
    const serialNumber = prompt("Enter the Tower serial number:")
    const make = prompt("Enter the Tower manufacturer:")
    const model = prompt("Enter the Tower model or model number:")
  
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
  "kevin.behana@l3harris.com",
  "dan.keppel@l3harris.com",
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
      serialNumber,
      make,
      model,
      reserveField1,
      reserveField2,
      reserveField3,
      reserveField4,
      reserveField5,
      additionalInfo,
      defaultVendor,
      imagePath,
      lastEditedBy,
      email,
      lastEditedTimestamp: new Date().toISOString()
    };

Object.keys(newEntry).forEach(key => {
  if (newEntry[key] === "") {
    newEntry[key] = null;
  }
});

    data.push(newEntry);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    console.log("\n✅ Entry added successfully!");
    console.log(newEntry);
  break
    }
   case "2":{
    const type = "Tower Lights";
    const caseType = "Work Order";
    const collection = "Tower"
  
    const equipmentName = `${siteName} Tower Lights`;
    const equipmentID = network == "SLERS" ? `${selectedSite.altSiteName}XTL` : `${selectedSite.siteNumber}XTL`;
    const serialNumber = prompt("Enter the Tower Lights serial number:")
    const make = prompt("Enter the Tower Lights manufacturer:")
    const model = prompt("Enter the Tower Lights model or model number:")
  
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
  "kevin.behana@l3harris.com",
  "dan.keppel@l3harris.com",
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
      serialNumber,
      make,
      model,
      reserveField1,
      reserveField2,
      reserveField3,
      reserveField4,
      reserveField5,
      additionalInfo,
      defaultVendor,
      imagePath,
      lastEditedBy,
      email,
      lastEditedTimestamp: new Date().toISOString()
    };

Object.keys(newEntry).forEach(key => {
  if (newEntry[key] === "") {
    newEntry[key] = null;
  }
});

    data.push(newEntry);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    console.log("\n✅ Entry added successfully!");
    console.log(newEntry);
  break
    }
    case "3":{

    const type = "Combiner";
    const caseType = "Ticket";
    const collection = "Tower"
  
    const num = prompt(
  "Enter which Combiner number (Press Enter if there is only one): "
).trim();

const equipmentName = num
  ? `${siteName} Combiner ${num}`
  : `${siteName} Combiner`;

// const equipmentID = network == "SLERS"
//   ? `${selectedSite.altSiteName}SC${num}`
//   : `${selectedSite.siteNumber}SC${num}`;

  const equipmentID = network == "SLERS" ? `${selectedSite.altSiteName}SC${num}` : `${selectedSite.siteNumber}U${num}CMB`;

const serialNumber = prompt("Enter the Combiner serial number:");
const make = prompt("Enter the Combiner manufacturer:");
const model = prompt("Enter the Combiner model or model number:");
  
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
      serialNumber,
      make,
      model,
      reserveField1,
      reserveField2,
      reserveField3,
      reserveField4,
      reserveField5,
      additionalInfo,
      defaultVendor,
      imagePath,
      lastEditedBy,
      email,
      lastEditedTimestamp: new Date().toISOString()
    };

Object.keys(newEntry).forEach(key => {
  if (newEntry[key] === "") {
    newEntry[key] = null;
  }
});

    data.push(newEntry);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    console.log("\n✅ Entry added successfully!");
    console.log(newEntry);
  break
    }
    case "4":{
    const type = "Tower Top Amplifier";
    const caseType = "Ticket";
    const collection = "Tower"
  
    const equipmentName = `${siteName} Tower Top Amplifier`;
    const equipmentID = network == "SLERS" ? `${selectedSite.altSiteName}ST` : `${selectedSite.siteNumber}UT`;
    const serialNumber = prompt("Enter the TTA serial number:")
    const make = prompt("Enter the TTA manufacturer:")
    const model = prompt("Enter the TTA model or model number:")
  
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
      serialNumber,
      make,
      model,
      reserveField1,
      reserveField2,
      reserveField3,
      reserveField4,
      reserveField5,
      additionalInfo,
      defaultVendor,
      imagePath,
      lastEditedBy,
      email,
      lastEditedTimestamp: new Date().toISOString()
    };

Object.keys(newEntry).forEach(key => {
  if (newEntry[key] === "") {
    newEntry[key] = null;
  }
});

    data.push(newEntry);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    console.log("\n✅ Entry added successfully!");
    console.log(newEntry);
  break
    }
    case "5":{
    const type = "Multicoupler";
    const caseType = "Ticket";
    const collection = "Tower"
  
    const equipmentName = `${siteName} Multicoupler`;
    const equipmentID = network == "SLERS" ? `${selectedSite.altSiteName}SM` : `${selectedSite.siteNumber}U1RXC`;
    const serialNumber = prompt("Enter the Multicoupler serial number:")
    const make = prompt("Enter the Multicoupler manufacturer:")
    const model = prompt("Enter the Multicoupler model or model number:")
  
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
      serialNumber,
      make,
      model,
      reserveField1,
      reserveField2,
      reserveField3,
      reserveField4,
      reserveField5,
      additionalInfo,
      defaultVendor,
      imagePath,
      lastEditedBy,
      email,
      lastEditedTimestamp: new Date().toISOString()
    };

Object.keys(newEntry).forEach(key => {
  if (newEntry[key] === "") {
    newEntry[key] = null;
  }
});

    data.push(newEntry);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    console.log("\n✅ Entry added successfully!");
    console.log(newEntry);
  break
    }
    case "6":{
    const type = "Dehydrator";
    const caseType = "Ticket";
    const collection = "Tower"
  
    const equipmentName = `${siteName} Dehydrator`;
    const equipmentID = network == "SLERS" ? `${selectedSite.altSiteName}MD` : `${selectedSite.siteNumber}MD`;
    const serialNumber = prompt("Enter the Dehydrator serial number:")
    const make = prompt("Enter the Dehydrator manufacturer:")
    const model = prompt("Enter the Dehydrator model or model number:")
  
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
      serialNumber,
      make,
      model,
      reserveField1,
      reserveField2,
      reserveField3,
      reserveField4,
      reserveField5,
      additionalInfo,
      defaultVendor,
      imagePath,
      lastEditedBy,
      email,
      lastEditedTimestamp: new Date().toISOString()
    };

Object.keys(newEntry).forEach(key => {
  if (newEntry[key] === "") {
    newEntry[key] = null;
  }
});

    data.push(newEntry);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    console.log("\n✅ Entry added successfully!");
    console.log(newEntry);
  break
    }
 
 
}