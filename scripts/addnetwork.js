const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

// File path
const filePath = "./results/network.json";
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
  "Add Switches",
  "Add Routers",
  "Add Servers",
  "Add IEA",
  "Add GPS",
  "Add Clocks",
  "Add Network Sentry",
  "Add MiniMe",
  "Add Vida Edge"
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



// =======================
// PROMPTS
// =======================

switch (userSelect) {
  case "1":{
    const type = "Switch";
    const caseType = "Ticket";
    const collection = "Network"
  
    const switchType = prompt(
  "Enter the switch name (Ex. Switch 1, 7705 MPLS Switch, CEC Switch, Network Switch, Stand Alone Switch...): "
).trim();

const equipmentName = `${siteName} ${switchType}`;

const equipmentSuffix = prompt(
  "Enter the equipment ID suffix (R850S103XXXXX, x404XXXX): "
).trim();

const equipmentID = network == "SLERS"
  ? `${selectedSite.altSiteName}${equipmentSuffix}`
  : `${selectedSite.siteNumber}${equipmentSuffix}`;
  
    const serialNumber = prompt("Enter the serial number:")
    const make = prompt("Enter the manufacturer:")
    const model = prompt("Enter the model or model number:")
  
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
    case "2":{
    const type = "Router";
    const caseType = "Ticket";
    const collection = "Network"
  
    const routerType = prompt(
  "Enter the router name (Ex. Router 1, Wide Area Router...): "
).trim();

const equipmentName = `${siteName} ${routerType}`;

const equipmentSuffix = prompt(
  "Enter the equipment ID suffix (R850S103XXXXX, x404XXXX): "
).trim();

const equipmentID = network == "SLERS"
  ? `${selectedSite.altSiteName}${equipmentSuffix}`
  : `${selectedSite.siteNumber}${equipmentSuffix}`;
  
    const serialNumber = prompt("Enter the serial number:")
    const make = prompt("Enter the manufacturer:")
    const model = prompt("Enter the model or model number:")
  
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
    
    case "3":{
    const type = "Servers";
    const caseType = "Ticket";
    const collection = "Network"

    const serverType = prompt(
  "Enter the server name (Ex. Network Switching Center, Network Switching Server, BeOn Server...): "
).trim();

const equipmentName = `${siteName} ${serverType}`;

const equipmentSuffix = prompt(
  "Enter the equipment ID suffix (R850S103XXXXX, x404XXXX): "
).trim();

const equipmentID = network == "SLERS"
  ? `${selectedSite.altSiteName}${equipmentSuffix}`
  : `${selectedSite.siteNumber}${equipmentSuffix}`;
  
    const serialNumber = prompt("Enter the serial number:")
    const make = prompt("Enter the manufacturer:")
    const model = prompt("Enter the model or model number:")
  
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
    const type = "IEA";
    const caseType = "Ticket";
    const collection = "Network"
  
    const equipmentName = `${siteName} IEA Computer`;
    const equipmentSuffix = prompt(
  "Enter the equipment ID suffix (R850S103XXXXX, x404XXXX): "
).trim();

const equipmentID = network == "SLERS"
  ? `${selectedSite.altSiteName}${equipmentSuffix}`
  : `${selectedSite.siteNumber}${equipmentSuffix}`;
    const serialNumber = prompt("Enter the serial number:")
    const make = prompt("Enter the manufacturer:")
    const model = prompt("Enter the model or model number:")
    const hostname = prompt("Enter the host name:")
    const ipaddress = prompt("Enter the IP address:")

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
      hostname,
      ipaddress,
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
    const type = "GPS";
    const caseType = "Ticket";
    const collection = "Network"
  
   const gpsType = prompt(
  "Enter the server name (Ex. GPS Receiver 1, GPS Distribution Map...): "
).trim();

const equipmentName = `${siteName} ${gpsType}`;

const equipmentSuffix = prompt(
  "Enter the equipment ID suffix (R850S103XXXXX, x404XXXX): "
).trim();

const equipmentID = network == "SLERS"
  ? `${selectedSite.altSiteName}${equipmentSuffix}`
  : `${selectedSite.siteNumber}${equipmentSuffix}`;
    const serialNumber = prompt("Enter the serial number:")
    const make = prompt("Enter the manufacturer:")
    const model = prompt("Enter the model or model number:")
  
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
    const type = "Clocks";
    const caseType = "Ticket";
    const collection = "Network"
  
    const clockType = prompt("Enter the server name (Ex. Clock 1, Network Clock, Tremble Clock...): ").trim();
const equipmentName = `${siteName} ${clockType}`;
const equipmentSuffix = prompt("Enter the equipment ID suffix (R850S103XXXXX, x404XXXX): ").trim();
const equipmentID = network == "SLERS"
  ? `${selectedSite.altSiteName}${equipmentSuffix}`
  : `${selectedSite.siteNumber}${equipmentSuffix}`;
    const serialNumber = prompt("Enter the serial number:")
    const make = prompt("Enter the manufacturer:")
    const model = prompt("Enter the model or model number:")
  
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
    case "7":{
    const type = "Network Sentry";
    const caseType = "Ticket";
    const collection = "Network"
  
    const equipmentName = `${siteName} Network Sentry`;
    const equipmentSuffix = prompt("Enter the equipment ID suffix (R850S103XXXXX, x404XXXX): ").trim();
    const equipmentID = network == "SLERS"
    ? `${selectedSite.altSiteName}${equipmentSuffix}`
    : `${selectedSite.siteNumber}${equipmentSuffix}`;
    const serialNumber = prompt("Enter the serial number:")
    const make = prompt("Enter the manufacturer:")
    const model = prompt("Enter the model or model number:")
  
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
    case "8":{
    const type = "MiniMe";
    const caseType = "Ticket";
    const collection = "Network"
  
    const equipmentName = `${siteName} Mini Me`;
    const equipmentSuffix = prompt("Enter the equipment ID suffix (R850S103XXXXX, x404XXXX): ").trim();
    const equipmentID = network == "SLERS"
    ? `${selectedSite.altSiteName}${equipmentSuffix}`
    : `${selectedSite.siteNumber}${equipmentSuffix}`;
    const serialNumber = prompt("Enter the serial number:")
    const make = prompt("Enter the manufacturer:")
    const model = prompt("Enter the model or model number:")
  
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
    case "9":{
    const type = "Vida Edge";
    const caseType = "Ticket";
    const collection = "Network"
  
const equipmentName = `${siteName} Vida Edge`;
const equipmentSuffix = prompt("Enter the equipment ID suffix (R850S103XXXXX, x404XXXX): ").trim();
const equipmentID = network == "SLERS"
  ? `${selectedSite.altSiteName}${equipmentSuffix}`
  : `${selectedSite.siteNumber}${equipmentSuffix}`;
    const serialNumber = prompt("Enter the serial number:")
    const make = prompt("Enter the manufacturer:")
    const model = prompt("Enter the model or model number:")
  
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