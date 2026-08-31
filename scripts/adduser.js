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

    // { username: "", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "", lastname: "", phone: "", email: "" ,company:new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null},
    
    { username: "daccime", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Daniel", lastname: "Accime", phone: "813-255-3207", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "cchacon", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Carlos", lastname: "Chacon", phone: "656-223-7045", email: "cchacon@peakpowerservices.com", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "adavis", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Arthur (John)", lastname: "Davis", phone: "813-732-0841", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "ddeese", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "David", lastname: "Deese", phone: "813-362-1135", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "wdever", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "William", lastname: "Dever", phone: "850-698-3473", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "dgeisler", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "David", lastname: "Geisler", phone: "813-635-6390", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "agibson", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Albert Hugh", lastname: "Gibson", phone: "813-310-0347", email: "agibson@peakpowerservices.com", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "aharper", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Austin", lastname: "Harper", phone: "656-650-4655", email: "aharper@peakpowerservices.com", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "cjankowski", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Caleb", lastname: "Jankowski", phone: "813-428-1218", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "gjavier", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Gary", lastname: "Javier", phone: "813-503-5726", email: "gjavier@peakpowerservices.com", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "jkiner", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Joshua", lastname: "Kiner", phone: "813-482-2170", email: "jkiner@peakpowerservices.com", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "jmato", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Juan", lastname: "Mato", phone: "656-266-0166", email: "JMato@peakpowerservices.com", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "dneal", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "David", lastname: "Neal", phone: "352-978-1937", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "jneal", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Joshua", lastname: "Neal", phone: "315-247-3016", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "eortiz", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Edwin", lastname: "Ortiz", phone: "215-313-7538", email: "eortizpr92@gmail.com", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "spuddie", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Stephen", lastname: "Puddie", phone: "813-482-2761", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "gramos", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Gabriel", lastname: "Ramos", phone: "656-244-3989", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "ssaetern", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Sou", lastname: "Saetern", phone: "", email: "", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "vsimmons", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Vanzel", lastname: "Simmons", phone: "813-466-8918", email: "vsimmons@peakpowerservices.com", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "ssnipes", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Sammy Lewis Jr.", lastname: "Snipes", phone: "813-428-1218", email: "ssnipes@peakpowerservices.com", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "mstine", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Michael L.", lastname: "Stine", phone: "656-209-7065", email: "mstine@peakpowerservices.com", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
{ username: "swalker", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Shane O'Sullivan", lastname: "Walker", phone: "656-223-9196", email: "swalker@peakpowerservices.com", company: new ObjectId("6a394d727d89a2c17023feeb"), imagePath: null },
    
//WMS Tallahassee / Quincy
    // { username: "", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "", lastname: "", phone: "", email: "" ,company:new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null},

    { username: "cwillis", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Clayton", lastname: "Willis", phone: "850-251-6761", email: "CWILLIS@WMSCOM.COM", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "twhiddon", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Tal", lastname: "Whiddon", phone: "850-728-7698", email: "TWHIDDON@WMSCOM.COM", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "pwalstead", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Pat", lastname: "Walstead", phone: "850-688-0027", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "dstowe", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Dave", lastname: "Stowe", phone: "850-545-4223", email: "DSTOWE@WMSCOM.COM", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "ashakh", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Asom", lastname: "Shakh", phone: "", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "jrusso", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Joe", lastname: "Russo", phone: "850-228-8541", email: "JRUSSO@WMSCOM.COM", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "trushin", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Tyvone", lastname: "Rushin", phone: "850-544-6456", email: "trushin@wmscom.com", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "rrice", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Richard (Ben)", lastname: "Rice", phone: "850-879-6252", email: "brice@wmscom.com", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "bposton", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Bryant", lastname: "Poston", phone: "850-559-2029", email: "BPOSTON@WMSCOM.COM", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "bperry", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Brandon", lastname: "Perry", phone: "", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "bnorris", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Brian", lastname: "Norris", phone: "850-328-8757", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "anegron", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Anthony", lastname: "Negron", phone: "", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "smccadden", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Steven", lastname: "McCadden", phone: "850-728-8564", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "jmajors", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Jerod", lastname: "Majors", phone: "850-933-1645", email: "JMAJORS@WMSCOM.COM", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "gkustel", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Gregory", lastname: "Kustel", phone: "850-254-5966", email: "GKUSTEL@WMSCOM.COM", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "jknauer", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Josh", lastname: "Knauer", phone: "", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "zjohnson", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Zachary", lastname: "Johnson", phone: "850-518-9509", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "tjohnson", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Terrence", lastname: "Johnson", phone: "850-251-3209", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "mhoepner", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Matt", lastname: "Hoepner", phone: "448-248-1733", email: "mhoepner@wmscom.com", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "whertweck", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "William", lastname: "Hertweck", phone: "850-420-3780", email: "BHERTWECK@WMSCOM.COM", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "nfetlyaev", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "Nusret", lastname: "Fetlyaev", phone: "571-285-9646", email: "nfetlyaev@wmscom.com", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
{ username: "jbaxley", password: await bcrypt.hash("password", 10), role: "vendortech", firstname: "John", lastname: "Baxley", phone: "850-459-0980", email: "", company: new ObjectId("69fca8e57d89a2c17023fbfc"), imagePath: null },
  ];

  await db.collection("users").insertMany(users);
  console.log("Users inserted");

  await client.close();
}

seedUsers().catch(console.error);