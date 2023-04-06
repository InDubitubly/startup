const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

// Validate and make connection to MongoDB
if (!userName) {
    throw Error('Database not configured. Set environment variables');
}
  
  const url = `mongodb+srv://${userName}:${password}@${hostname}`;
  
  const client = new MongoClient(url);
  const spellDB = client.db('startup').collection('spells');
  const userAuth = client.db('startup').collection('userAuth');

  //Actually retrieve spells
async function getAllSpells() {
  const spellList = spellDB.find().sort({"level":1, "name":1});
  return spellList.toArray();
}

async function getRandomSpell(){
  const numDocs = await spellDB.estimatedDocumentCount();
  const num = Math.floor(Math.random() * numDocs);
  const luckySpell = spellDB.find({}, {limit:1}).skip(num);
  console.log (luckySpell);
  return luckySpell.toArray();
}


//Auth stuff
function getUser(name) {
  return userAuth.findOne({ name: name });
}
  
function getUserByToken(token) {
  return userAuth.findOne({ token: token });
}

async function createUser(name, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    name: name,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userAuth.insertOne(user);

  return user;
}



module.exports = {
  getAllSpells,
  getRandomSpell,
  getUser,
  getUserByToken,
  createUser,
};