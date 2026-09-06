// // it is for MySQL -----
// // const mysql = require('mysql2');

// // const pool = mysql.createPool({
// //     host: "localhost",
// //     user: 'root',
// //     password: 'Hackerspider10#',
// //     database: 'Airbnb',
// // });

// // module.exports = pool.promise();

// // It is for mongodb----
// const { MongoClient } = require("mongodb");
// const DB_PATH = process.env.MONGO_URI;

// let _db;

// const mongoConnect = (callback) => {
//   MongoClient.connect(MONGO_URL)
//     .then((client) => {
//       console.log("MongoDB connected successfully");
//       _db = client.db('Airbnb');   // pehle _db set karo
//       callback(client);            // phir callback ko client pass karo
//     })
//     .catch((err) => {
//       console.log("Error while connecting to MongoDB:", err);
//     });
// };

// const getDb = () => {
//     if(!_db){
//         throw new Error('Mongo not connected');
//     }
//     return _db;
// }

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;



const { MongoClient } = require("mongodb");
const MONGO_URI = process.env.MONGO_URI;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URI)
    .then((client) => {
      console.log("MongoDB connected successfully");
      _db = client.db('Airbnb');
      callback(client);
    })
    .catch((err) => {
      console.log("Error while connecting to MongoDB:", err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error('Mongo not connected');
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;