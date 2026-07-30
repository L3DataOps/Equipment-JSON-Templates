const { count, time } = require("console");
const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

// File path
const filePath = "./dispatch.json";

// Username imports for reference
const userOptions = JSON.parse(
    fs.readFileSync("./users.json", "utf8")
  ).filter(user => user.role === "admin");

/*
**************************************************    TEMPLATE      *******************************************

{
        "name": string,
        "altname" : string,
        "number": string,
        "extension": string,
        "email": string,
        "lastEditedBy": ref,
        "lastEditedTimestamp": timestampz
}

****************************************************************************************************************/

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

// Prompts
const lastEditedBy = selectFromList(userOptions, "Enter user: ", "username", "_id", { multi: false });
const name = prompt("Enter Dispatch Name: ").trim();

const number = prompt("Enter dispatch phone number: ").trim();
let altname = prompt("Enter alt name like TRCC FHP or hit enter to pass:")
if (altname === "") {
    altname = null;
}
let ext = prompt("Enter extension number: ").trim();
if (ext === "") {
    ext = null;
}
let email = prompt("Enter dispatch email or hit enter to pass: ").trim();
if (email === "") {
    email = null;
}

const lastEditedTimestamp = new Date().toISOString();
const imagePath = "";
const reserveField1 = "";
  const reserveField2 = "";
  const reserveField3 = "";
  const reserveField4 = "";
  const reserveField5 = "";



// Step 3: Create new object
const newEntry = {
    dispatchName : name,
    dispatchAltName : altname,
    dispatchPhoneNumber : number,
    disptachExtension : ext,
    dispatchEmail : email,
    lastEditedBy : lastEditedBy,
    lastEditedTimestamp : lastEditedTimestamp,
    imagePath,
    reserveField1,
    reserveField2,
    reserveField3,
    reserveField4,
    reserveField5
};

// Step 4: Append to array
data.push(newEntry);

// Step 5: Write back to file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log("✅ Entry added successfully!");