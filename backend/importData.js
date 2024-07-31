//db.js 
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')

dotenv.config()

// Connection URL
const url = process.env.DATABASE_URL ;
const client = new MongoClient(url);

// Database Name
const dbName = 'energyData';

async function connectDB(){

  await client.connect();
  console.log('Connected successfuly')
  return client.db(dbName)
}



module.exports=connectDB
