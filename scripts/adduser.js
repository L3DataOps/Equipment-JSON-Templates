const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

async function seedUsers() {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();
  const db = client.db("test2");

  const users = [
    
    //*****************************************************************************  TECHS  *************************************************************************** */

    //WMS Quincy
    { username: "jrusso", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Joe", lastname: "Russo", email: "joe.russo@wmscom.com" ,company:new ObjectId("69fca8e57d89a2c17023fbfb"), imagePath: null},
    { username: "jmajors", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Jerod", lastname: "Majors", email: "jerod.majors@wmscom.com" ,company:new ObjectId("69fca8e57d89a2c17023fbfb"), imagePath: null},
    { username: "mhendricksion", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Matthew", lastname: "Hendrickson", email: "matthew.hendrickson@wmscom.com" ,company:new ObjectId("69fca8e57d89a2c17023fbfb"), imagePath: null},
    { username: "pwalstead", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Pat", lastname: "Walstead", email: "pat.walstead@wmscom.com" ,company:new ObjectId("69fca8e57d89a2c17023fbfb"), imagePath: null},

  ];

  await db.collection("users").insertMany(users);
  console.log("Users inserted");

  await client.close();
}

seedUsers().catch(console.error);