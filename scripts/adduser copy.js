
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

async function seedUsers() {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();
  const db = client.db("test2");

  const users = [
    //*****************************************************************************  ADMIN  *************************************************************************** */
    { username: "dtoolsee", password: await bcrypt.hash("admin123", 10), role: "admin" , firstname: "Daniel", lastname: "Toolsee", email: "daniel.toolsee@l3harris.com"},
    { username: "mperez", password: await bcrypt.hash("admin123", 10), role: "admin", firstname: "Marcos", lastname: "Perez", email: "marcos.perez@l3harris.com" },
    { username: "ogarcia", password: await bcrypt.hash("admin123", 10), role: "admin", firstname: "Ozzy", lastname: "Garcia", email: "ozzy.garcia@l3harris.com" },
    { username: "scrouch", password: await bcrypt.hash("password", 10), role: "admin", firstname: "Steve", lastname: "Crouch", email: "steve.crouch@l3harris.com" },
    { username: "bstewart", password: await bcrypt.hash("password", 10), role: "admin", firstname: "Brandon", lastname: "Stewart", email: "brandon.stewart@l3harris.com" },
    { username: "cford", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Chandler", lastname: "Ford", email: "chandler.ford@l3harris.com" },
    { username: "ldobbins", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Lucas", lastname: "Dobbins", email: "lucas.dobbins@l3harris.com" },

    //***************************************************************************  NOC USERS  *************************************************************************** */
    { username: "jcannon", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Jeff", lastname: "Cannon", email: "jeff.cannon@l3harris.com" },
    { username: "kwhite", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Kevin", lastname: "White", email: "kevin.r.white@l3harris.com" },
    { username: "tobriant", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Terry", lastname: "OBriant", email: "terry.obriant@l3harris.com" },
    { username: "tjohnson", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Terry", lastname: "Johnson", email: "terry.johnson@l3harris.com" },
    { username: "smorris", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Shawn", lastname: "Morris", email: "shawn.g.morris@l3harris.com" },
    { username: "rbeckler", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Roger", lastname: "Beckler", email: "roger.beckler@l3harris.com" },
    { username: "bblankenship", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Brian", lastname: "Blankenship", email: "brian.blankenship@l3harris.com" },
    { username: "jschley", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Joshua", lastname: "Schley", email: "josh.schley@l3harris.com" },
    { username: "ksmallwood", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Keith", lastname: "Smallwood", email: "keith.smallwood@l3harris.com" },
    { username: "lnatta", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Leo", lastname: "Natta", email: "leo.natta@l3harris.com" },
    { username: "adionicio", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Alvin", lastname: "Dionicio", email: "alvin.dionicio@l3harris.com" },
    { username: "rmambru", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Raudy", lastname: "Mambru", email: "raudy.mambru@l3harris.com" },
    { username: "ddominguez", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Dixie", lastname: "Dominguez", email: "dixie.dominguez@l3harris.com" },
    { username: "sdaniel", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Shadia", lastname: "Daniel", email: "shadia.daniel@l3harris.com" },
    { username: "liletsin", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Lens", lastname: "Iletsin", email: "lens.iletsin@l3harris.com" },
    { username: "csanchez", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Carlos", lastname: "Sanchez", email: "carlos.sanchez@l3harris.com" },
    { username: "bpurvis", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Bret", lastname: "Purvis", email: "bret.purvis@l3harris.com" },
    { username: "aarjona", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Andrew", lastname: "Arjona", email: "andrew.arjona@l3harris.com" },
    { username: "mblair", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Mac", lastname: "Blair", email: "christian.blair@l3harris.com" },
    { username: "jdalton", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Joey", lastname: "Dalton", email: "joseph.dalton@l3harris.com" },
    { username: "mlewis", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Myles", lastname: "Lewis", email: "myles.lewis@l3harris.com" },

    //*****************************************************************************  OFFICE  *************************************************************************** */
    { username: "kbehanna", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Kevin", lastname: "Behanna", email: "kevin.behanna@l3harris.com" },
    { username: "kratliff", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Kevin", lastname: "Ratliff", email: "kevin.ratliff@l3harris.com" },
    { username: "vmarzello", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Vinny", lastname: "Marzello", email: "vinny.marzello@l3harris.com" },
    { username: "ftorres", password: await bcrypt.hash("password", 10), role: "noc", firstname: "Felix", lastname: "Torres", email: "felix.torres@l3harris.com" },
    
    //*****************************************************************************  TECHS  *************************************************************************** */

    

  ];

  await db.collection("users").insertMany(users);
  console.log("Users inserted");

  await client.close();
}

seedUsers().catch(console.error);