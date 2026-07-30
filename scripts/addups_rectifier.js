const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

// File path
const filePath = "./results/ups_rectifier.json";
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
  "Add UPS",
  "Add Rectifier",
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
        "type": "UPS",
        "caseType": "Work Order",
        "siteid": { "$oid": "Enter ObjectID from MOngoDB Here" }, 
        "equipmentName": "SiteName UPS",
        "equipmentID": "Enter AMMS equipment number here",
        "serialNumber": "",
        "make": "Manufacturer",
        "model": "Model Number",
        "fuelType": "Propane or Diesel",
        "capacity": "Enter KW value here",
        "dateInstalled": "",
        "batteryDate": "",
        "additionalInfo": "",
        "pmFrequency": "",
        "pmReminder": null,
        "pmNeeded": true,
        "lastPM": [
            {
                "completionDate": "",
                "caseNumber": null
            }
        ],
        "defaultVendor": { "$oid": "Enter ObjectID from MOngoDB Here" },
        "email": { "$oid": "Enter ObjectID from MOngoDB Here" },
        "lastEditedBy":{ "$oid": "Enter ObjectID from MOngoDB Here" },
        "lastEditedTimestamp": null
    },
    {
        "type": "Rectifier",
        "caseType": "Work Order",
        "siteid": { "$oid": "Enter ObjectID from MOngoDB Here" }, 
        "equipmentName": "SiteName Rectifier",
        "equipmentID": "Enter AMMS equipment number here",
        "serialNumber": "",
        "make": "Manufacturer",
        "model": "Model Number",
        "dateInstalled": "",
        "batteryDate": "",
        "additionalInfo": "",
        "defaultVendor": { "$oid": "Enter ObjectID from MOngoDB Here" },
        "email":{ "$oid": "Enter ObjectID from MOngoDB Here" },
        "lastEditedBy":{ "$oid": "Enter ObjectID from MOngoDB Here" },
        "lastEditedTimestamp": null
    }

   
*/

// =======================
// PROMPTS
// =======================

switch (userSelect) {
  case "1":{
    const type = "UPS";
    const caseType = "Work Order";
    const collection = "UPS/Rectifier"
  
    const equipmentName = `${siteName} UPS`;
    const equipmentID = network == "SLERS" ? `${selectedSite.altSiteName}XU` : `${selectedSite.siteNumber}XU`;
    const serialNumber = prompt("Enter the UPS serial number:")
    const make = prompt("Enter the UPS manufacturer:")
    const model = prompt("Enter the UPS model or model number:")
    const capacity = prompt("Enter the UPS size/capacity:")
    const dateInstalled = prompt("Enter the UPS installed date (MM/DD/YYYY):")
    const batteryDate = prompt("Enter the UPS battery installed date (MM/DD/YYYY): ")
  
    let additionalInfo = prompt("Additional Info: ").trim();
    if (additionalInfo == ""){
      additionalInfo = selectedSite.additionalInfo
    }

    const hostName = prompt("Host Name: ").trim();
    const ipAddress = prompt("IP Address: ").trim();
    const upsURL = prompt("Enter the UPS URL link: ")
    const pmNeeded = true;
  const pmType = "UPS";
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
      capacity,
      dateInstalled,
      batteryDate,
      hostName,
      ipAddress,
      upsURL,
      pmType,
    pmNeeded,
    pmHistory,
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
    const type = "Rectifier";
    const caseType = "Work Order";
    const collection = "UPS/Rectifier"
  
    const equipmentName = `${siteName} Rectifier Rack`;
    const equipmentID = network == "SLERS" ? `${selectedSite.altSiteName}MR` : `${selectedSite.siteNumber}MR`;
    const serialNumber = prompt("Enter the Rectifier serial number:")
    const make = prompt("Enter the Rectifier manufacturer:")
    const model = prompt("Enter the Rectifier model or model number:")
    const capacity = prompt("Enter the Rectifier size/capacity:")
    const dateInstalled = prompt("Enter the Rectifier installed date (MM/DD/YYYY):")
    const batteryDate = prompt("Enter the Rectifier battery installed date (MM/DD/YYYY): ")
  
    let additionalInfo = prompt("Additional Info: ").trim();
    if (additionalInfo == ""){
      additionalInfo = selectedSite.additionalInfo
    }

    const pmNeeded = true;
  const pmType = "Rectifier";
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
      capacity,
      dateInstalled,
      batteryDate,
      pmType,
    pmNeeded,
    pmHistory,
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