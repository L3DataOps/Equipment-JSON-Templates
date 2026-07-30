const { count, time } = require("console");
const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

// File path
const filePath = "./results/siteupdate.json";
const userOptions = JSON.parse(
    fs.readFileSync("./results/users.json", "utf8")
  ).filter(user => user.role === "admin");
const vendorOptions = JSON.parse(fs.readFileSync("./mongo/test2.vendors.json", "utf8"));
const dispatchOptions = JSON.parse(fs.readFileSync("./mongo/test2.dispatchCenters.json", "utf8"));

/*
**************************************************    TEMPLATE      *******************************************

{
        "siteName": "Enter Site Name",
        "altSiteName":"Alt SiteName",
        "siteNumber": "Enter ROOT site number",
        "network": "SLERS or SLERS 2",
        "address": "    ",
        "city": "   ",
        "state": "FL",
        "zip": "    ",
        "county": " ",
        "region": " ",
        "imc": "    ",
        "latitude": 0,
        "longitude": 0,
        "asrNumber": "  ",
        "towerOwner": " ",
        "gateCode": "   ",
        "channelCount": 0,
        "isMicrowaveOnly": false,
        "additionalInfo": " ",
        "timezone": "Central or Eastern",
        "defaultVendor":{ "$oid": "Enter ObjectID from MOngoDB Here" },
        "tanks": { "$oid": "Enter ObjectID from MOngoDB Here" }, 
        "dispatch": { "$oid": "Enter ObjectID from MOngoDB Here" },
        "lastEditedBy":{ "$oid": "Enter ObjectID from MOngoDB Here" },
        "lastEditedTimestamp": null
    },


*/

// Step 1: Read existing JSON
let data = [];

if (fs.existsSync(filePath)) {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  try {
    data = JSON.parse(fileContent);
  } catch (err) {
    console.error("Invalid JSON format.");
    process.exit(1);
  }
}

// Step 2: Prompt user for input

// Helper functions
const toInt = (val) => parseInt(val, 10) || 0;
const toFloat = (val) => parseFloat(val) || 0;
const toBool = (val) => val.toLowerCase() === "true";

function selectFromList(options, question, displayKey, valueKey, { multi = true, allowEmpty = false } = {}) {

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
if (allowEmpty && input === "") {
  return multi ? [] : null;
}
  
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

// Prompts
const siteName = prompt("Enter Site Name: ").trim();
let altSiteName = prompt("Enter SLERS name: ").trim();
if (altSiteName === "") altSiteName = null;
const siteNumber = prompt("Enter SLERS2 site number: ").trim();
const address = prompt("Enter site address (No zip code or city): ").trim();
const city = prompt("Enter city: ").trim();
const state = "FL";
const zipCode = prompt("Enter zip code: ").trim();
const county = prompt("Enter county: ").trim();
const additionalInfo = prompt("Enter any additional info for the site: ").trim();
const latitude = toFloat(prompt("Enter Latitude: "));
const longitude = toFloat(prompt("Enter Longitude: "));
const asrNumber = prompt("Enter ASR Number: ").trim();
const towerOwner = prompt("Enter the Tower Owner: ").trim();
const gateCode = prompt("Enter gate code: ").trim();
const channelCount = toInt(prompt("Enter channel count: "));
let network = prompt("Network => Press Enter for SLERS: ").trim().toUpperCase();
if (network === "") network = "SLERS";
let region = prompt("Enter region (Press Enter for R305 LKW/MIA): ").trim();
if (region === "") region = "R305 LKW/MIA";
let imc = prompt("Enter IMC (Press Enter for Miami):").trim();
if (imc === "") imc = "Miami";
let isMicrowaveOnly = toBool(prompt("Is the site microwave only? (true/false): "));
if (isMicrowaveOnly === "") network = toBool("false");
let timezone = prompt("Eastern or Central timezone?: ").trim();
if (timezone === "") timezone = "Eastern";
const vendor = selectFromList(vendorOptions, "Enter default vendor separated by commas: ", "vendorName", "_id", { multi: false, allowEmpty: true });
const dispatch = selectFromList(dispatchOptions, "Enter dispatch separated by commas: ", "dispatchName", "_id", { multi: true });
const siteType = prompt("Enter site type (multisite or simulcast): ").trim();
const imagePath = "";
const reserveField1 = "";
  const reserveField2 = "";
  const reserveField3 = "";
  const reserveField4 = "";
  const reserveField5 = "";
const lastEditedBy = selectFromList(userOptions, "Enter user: ", "username", "_id", { multi: false });
const lastEditedTimestamp = new Date().toISOString()



// Step 3: Create new object
const newEntry = {
    siteName : siteName,
    altSiteName : altSiteName,
    siteNumber : siteNumber,
    network : network,
    address : address,
    city : city,
    state : state,
    zip : zipCode,
    county : county,
    region : region,
    imc : imc,
    latitude : latitude,
    longitude : longitude,
    asrNumber : asrNumber,
    towerOwner : towerOwner,
    gateCode : gateCode,
    channelCount : channelCount,
    isMicrowaveOnly : isMicrowaveOnly,
    additionalInfo : additionalInfo,
    timezone : timezone,
    defaultVendor : vendor,
    dispatch : dispatch,
    siteType : siteType,
    imagePath,
    reserveField1,
    reserveField2,
    reserveField3,
    reserveField4,
    reserveField5,
    lastEditedBy : lastEditedBy,
    lastEditedTimestamp : lastEditedTimestamp
};

Object.keys(newEntry).forEach(key => {
  if (newEntry[key] === "") {
    newEntry[key] = null;
  }
});

// Step 4: Append to array
data.push(newEntry);

// Step 5: Write back to file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log("✅ Entry added successfully!");



/*

SBA Towers NOC 24/7 888-950-7483



American Tower Corporation NOC 24/7 877-518-6937



Crown Castle NOC 24/7 800-788-7011

Crown Castle Pinnacle NOC 24/7 888-748-3482

AT&T Corporation 770-708-6541
*/