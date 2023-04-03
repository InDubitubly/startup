const {MongoClient} = require('mongodb');

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

  //Actually retrieve spells
  async function getAllSpells() {
    const spellList = spellDB.find().sort({"level":1, "name":1});
    return spellList.toArray();
  }

  module.exports = {getAllSpells};