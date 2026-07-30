const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

// File path
const filePath = "./results/mutualaid.json";
const vendorOptions = JSON.parse(fs.readFileSync("./mongo/test2.vendors.json", "utf8"));
const userOptions = JSON.parse(
    fs.readFileSync("./results/users.json", "utf8")
  ).filter(user => user.role === "admin");

// Receive selected site from previous script
const selectedSite = JSON.parse(process.argv[2]);

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
  "Add Mutual Aid Calling or TAC",
  "Add GPS",
  "Add Multiplexer",
  "Add Power Supply",
  "Add Sync Shelf",
  "Add Test Unit Radio"
];

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
        "type": "Channel",
        "caseType": "Ticket",
        "siteid": {
          "$oid": "Enter ObjectID from MongoDB Here"
        },
        "equipmentName": "SiteName Mutual Aid X",
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

switch (userSelect) {
  case "1":{
      const type = "Mutual Aid";
      const caseType = "Ticket";
      const collection = "Channels";
    
      const num = prompt("Enter which number for the for the mutual aid (Ex. 1 = Mutual Aid 1): ").trim();
    
      const equipmentName = `${siteName} Mutual Aid ${num}`;
      const num2 = prompt("Enter the number after the C in the equipment number for SLERS 1 EQ:")
      const equipmentID = `${siteEQ}C${num2}`;
    
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
    break}

  case "2":
      {
      const type = "Mutual Aid GPS";
      const caseType = "Ticket";
      const collection = "Channels";
    
      const num = prompt("Enter which number for the for the mutual aid GPS (Ex. 1 = Mutual Aid 1): ").trim();
    
      const equipmentName = `${siteName} Mutual Aid GPS ${num}`;
      const num2 = prompt("Enter the number after the CCG in the equipment number for SLERS 1 EQ:")
      const equipmentID = `${siteEQ}CCG${num2}`;
    
      let additionalInfo = prompt("Additional Info: ").trim();
      if (additionalInfo == ""){
        additionalInfo = selectedSite.additionalInfo
      }

      const modelNumber = prompt("Enter the Model Number:")
      const serialNumber = prompt("Enter Serial Number:")
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
        modelNumber,
        serialNumber,
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

  case "3":
      {
      const type = "Mutual Aid Multiplexer";
      const caseType = "Ticket";
      const collection = "Channels";
    
      const num = prompt("Enter which number for the for the mutual aid multiplexer (Ex. 1 = Mutual Aid 1): ").trim();
    
      const equipmentName = `${siteName} Mutual Aid Multiplexer ${num}`;
      const num2 = prompt("Enter the number after the CCM in the equipment number for SLERS 1 EQ:")
      const equipmentID = `${siteEQ}CCM${num2}`;
    
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
      break
    }
     

  case "4":{
      const type = "Mutual Aid Power Supply";
      const caseType = "Ticket";
      const collection = "Channels";
    
      const num = prompt("Enter which number for the for the mutual aid power supply (Ex. 1 = Mutual Aid 1): ").trim();
    
      const equipmentName = `${siteName} Mutual Aid Power Supply ${num}`;
      const num2 = prompt("Enter the number after the CCPS in the equipment number for SLERS 1 EQ:")
      const equipmentID = `${siteEQ}CCPS${num2}`;
    
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
    }
    break;

  case "5":
  {
      const type = "Mutual Aid Sync Shelf";
      const caseType = "Ticket";
      const collection = "Channels";
    
      const num = prompt("Enter which number for the for the mutual aid sync shelf (Ex. 1 = Mutual Aid 1): ").trim();
    
      const equipmentName = `${siteName} Mutual Aid Sync Shelf${num}`;
      const num2 = prompt("Enter the number after the CCS in the equipment number for SLERS 1 EQ:")
      const equipmentID = `${siteEQ}CCS${num2}`;
    
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
    }
    break;
  
    case "6":
  {
      const type = "Mutual Aid Test Unit Radio";
      const caseType = "Ticket";
      const collection = "Channels";
    
      const num = prompt("Enter which number for the for the mutual aid test unit radio (Ex. 1 = Mutual Aid 1): ").trim();
    
      const equipmentName = `${siteName} Mutual Aid Test Unit Radio${num}`;
      const num2 = prompt("Enter the number after the CCT in the equipment number for SLERS 1 EQ:")
      const equipmentID = `${siteEQ}CCT${num2}`;
    
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
    }
    break;

  default:
    console.log("Invalid selection.");
}




