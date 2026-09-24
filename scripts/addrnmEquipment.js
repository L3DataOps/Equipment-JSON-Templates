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
// EMAIL MANAGEMENT
// =======================

function manageEmails(customerEmails) {

  // Make a copy so we don't modify the customer's original emails
  let emails = [...customerEmails];

  while (true) {

    console.log("\n=======================");
    console.log("CURRENT EMAIL LIST");
    console.log("=======================\n");

    if (emails.length === 0) {
      console.log("No emails currently assigned.");
    } else {
      emails.forEach((email, index) => {
        console.log(`${index + 1}. ${email}`);
      });
    }

    console.log("\n1. Confirm this list");
    console.log("2. Make an edit");

    const choice = prompt("\nEnter selection: ").trim();

    // =======================
    // CONFIRM CURRENT LIST
    // =======================

    if (choice === "1") {
      console.log("\n✅ Email list confirmed.");
      return emails;
    }

    // =======================
    // EDIT EMAIL LIST
    // =======================

    if (choice === "2") {

      while (true) {

        console.log("\n=======================");
        console.log("EDIT EMAIL LIST");
        console.log("=======================\n");

        console.log("1. Add");
        console.log("2. Delete");
        console.log("3. Confirm");

        const editChoice = prompt("\nEnter selection: ").trim();

        // =======================
        // ADD EMAILS
        // =======================

        if (editChoice === "1") {

          const input = prompt(
            "\nEnter email(s) to add, separated by commas: "
          ).trim();

          const emailsToAdd = input
            .split(",")
            .map(email => email.trim())
            .filter(email => email !== "");

          if (emailsToAdd.length === 0) {
            console.log("\n❌ No valid emails entered.");
            continue;
          }

          // Add emails while preventing duplicates
          emailsToAdd.forEach(email => {
            if (!emails.includes(email)) {
              emails.push(email);
            } else {
              console.log(`\n⚠️ ${email} is already on the list.`);
            }
          });

          console.log("\n=======================");
          console.log("UPDATED EMAIL LIST");
          console.log("=======================\n");

          emails.forEach((email, index) => {
            console.log(`${index + 1}. ${email}`);
          });

          continue;
        }

        // =======================
        // DELETE EMAILS
        // =======================

        if (editChoice === "2") {

          if (emails.length === 0) {
            console.log("\n❌ There are no emails to delete.");
            continue;
          }

          console.log("\n=======================");
          console.log("SELECT EMAIL(S) TO DELETE");
          console.log("=======================\n");

          emails.forEach((email, index) => {
            console.log(`${index + 1}. ${email}`);
          });

          const deleteInput = prompt(
            "\nEnter the number(s) to delete, separated by commas: "
          ).trim();

          const indexesToDelete = [
            ...new Set(
              deleteInput
                .split(",")
                .map(num => parseInt(num.trim(), 10) - 1)
                .filter(
                  index =>
                    index >= 0 &&
                    index < emails.length
                )
            )
          ];

          if (indexesToDelete.length === 0) {
            console.log("\n❌ No valid email selections.");
            continue;
          }

          // Delete from highest index to lowest
          indexesToDelete
            .sort((a, b) => b - a)
            .forEach(index => {
              emails.splice(index, 1);
            });

          console.log("\n=======================");
          console.log("UPDATED EMAIL LIST");
          console.log("=======================\n");

          if (emails.length === 0) {
            console.log("No emails currently assigned.");
          } else {
            emails.forEach((email, index) => {
              console.log(`${index + 1}. ${email}`);
            });
          }

          continue;
        }

        // =======================
        // CONFIRM EDITS
        // =======================

        if (editChoice === "3") {

          console.log("\n=======================");
          console.log("FINAL EMAIL LIST");
          console.log("=======================\n");

          if (emails.length === 0) {
            console.log("No emails currently assigned.");
          } else {
            emails.forEach((email, index) => {
              console.log(`${index + 1}. ${email}`);
            });
          }

          const confirm = prompt(
            "\nConfirm this email list? (1 = Yes, 2 = Go back): "
          ).trim();

          if (confirm === "1") {
            console.log("\n✅ Email list confirmed.");
            return emails;
          }

          if (confirm === "2") {
            continue;
          }

          console.log("\n❌ Invalid selection.");
          continue;
        }

        console.log("\n❌ Invalid selection.");
      }
    }

    console.log("\n❌ Invalid selection.");
  }
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

let orderNumber;
while (true) {
  const input = prompt("Enter the order number that the equipment is in: ").trim();
  if (/^\d+$/.test(input)) {
    orderNumber = parseInt(input, 10);
    break;
  }
  console.log("❌ Please enter a valid whole number.");
}

const notes = prompt("Enter notes (Special instructions, quirks, etc.): ").trim();

const email = manageEmails(selectedCustomer.email);


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