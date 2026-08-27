const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

async function seedUsers() {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();
  const db = client.db("test2");

  const users = [
    
    // *****************************************************************************  TEMPLATE  ************************************************************************
    // { username: "", password: await bcrypt.hash("password", 10), role: "admin/noc/vendortech", firstname: "", lastname: "", email: "" ,company:new ObjectId(""), imagePath: null},


    //*****************************************************************************  TECHS  *************************************************************************** */

    //Peak Power
    { username: "", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "", lastname: "", email: "" ,company:new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null},
    
    { username: "daccime", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Daniel", lastname: "Accime", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "cchacon", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Carlos", lastname: "Chacon", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "adavis", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Arthur", lastname: "Davis", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "ddeese", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "David", lastname: "Deese", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "wdever", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "William", lastname: "Dever", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "dgeisler", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "David", lastname: "Geisler", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "agibson", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Albert Hugh", lastname: "Gibson", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "aharper", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Austin", lastname: "Harper", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "cjankowski", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Caleb", lastname: "Jankowski", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "gjavier", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Gary", lastname: "Javier", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "jkiner", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Joshua", lastname: "Kiner", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "jmato", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Juan", lastname: "Mato", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "dneal", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "David", lastname: "Neal", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "jneal", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Joshua", lastname: "Neal", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "eortiz", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Edwin", lastname: "Ortiz", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "spuddie", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Stephen", lastname: "Puddie", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "gramos", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Gabriel", lastname: "Ramos", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "ssaetern", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Sou", lastname: "Saetern", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "svanzel", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Vanzel", lastname: "Simmons", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "ssnipes", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Sammy Lewis Jr.", lastname: "Snipes", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "mstine", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Michael L.", lastname: "Stine", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "swalkero'sullivan", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Shane O'Sullivan", lastname: "Walker", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
    //WMS Tallahassee / Quincy
    { username: "", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "", lastname: "", email: "" ,company:new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null},
    { username: "cwillis", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Clayton", lastname: "Willis", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "twhiddon", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Tal", lastname: "Whiddon", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "pwalstead", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Pat", lastname: "Walstead", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "dstowe", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Dave", lastname: "Stowe", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "ashakh", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Asom", lastname: "Shakh", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "jrusso", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Joe", lastname: "Russo", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "trushin", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Tyvone", lastname: "Rushin", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "rrice", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Richard (Ben)", lastname: "Rice", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "bposton", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Bryant", lastname: "Poston", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "bperry", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Brandon", lastname: "Perry", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "bnorris", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Brian", lastname: "Norris", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "anegron", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Anthony", lastname: "Negron", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "smccadden", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Steven", lastname: "McCadden", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "jmajors", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Jerod", lastname: "Majors", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "gkustel", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Gregory", lastname: "Kustel", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "jknauer", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Josh", lastname: "Knauer", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "zjohnson", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Zachary", lastname: "Johnson", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "tjohnson", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Terrence", lastname: "Johnson", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "mhoepner", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Matt", lastname: "Hoepner", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "whertweck", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "William", lastname: "Hertweck", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "nfetlyaeV", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Nusret", lastname: "Fetlyaev", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "jbaxley", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "John", lastname: "Baxley", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
  ];

  await db.collection("users").insertMany(users);
  console.log("Users inserted");

  await client.close();
}

seedUsers().catch(console.error);