// // core module
// const fs = require("fs");
// const path = require("path");
// const rootDir = require("../utils/PathUtil");

// const homeDataPath = path.join(rootDir, "Data", "homes.json");

// // ✅ Server start hote hi purana data file se load karo
// // let registeredhomes = [];
// // Fake database for registered homes
// try {
//   const fileData = fs.readFileSync(homeDataPath);
//   registeredhomes = JSON.parse(fileData);
// } catch (err) {
//   // File exist nahi karti ya khaali hai (pehli baar chalane pe) — theek hai, khaali array se shuru karo
//   registeredhomes = [];
// }

// module.exports = class Home {
//  constructor(houseName, price, location, rating, photoUrl, id) {
//   this.id = id || Date.now().toString();
//   this.houseName = houseName;
//   this.Price = price;
//   this.Location = location;
//   this.Rating = rating;
//   this.PhotoUrl = photoUrl;
// }

// //   save() {
// //     registeredhomes.push(this); // ✅ ab yahan push karo
// //     fs.writeFile(homeDataPath, JSON.stringify(registeredhomes), (err) => {
// //       // ✅ ab yahan write karo
// //       if (err) {
// //         console.error("Error writing home data:", err);
// //       }
// //     });
// //   }

//  save() {
//    this.id = Math.random().toString(); // Generate a unique ID for the home;
//     Home.fetchall(registeredhomes => {
//          registeredhomes.push(this); // ✅ ab yahan push karo
//     fs.writeFile(homeDataPath, JSON.stringify(registeredhomes), (err) => {
//       // ✅ ab yahan write karo
//       if (err) {
//         console.error("Error writing home data:", err);
//       }
//     });
//     });

//   }

//   //   static fetchall() {
//   static fetchall(callback) {
//     // ✅ Server start hote hi purana data file se load karo
//     const homeDataPath = path.join(rootDir, "Data", "homes.json");
//     fs.readFile(homeDataPath, (err, data) => {
//       if (err) {
//         return callback([]); // Agar file read karne me error aata hai, to empty array return karo
//       } else {
//         callback(JSON.parse(data));
//       }
//     });

//     // return registeredhomes; // ✅ ab yahan return karo
//   }
// };



//==========================================================
// core module
const db = require("../utils/DabaBaseUtils");
// const fs = require("fs");
// const path = require("path");
// const rootDir = require("../utils/PathUtil");
// const Favourite = require("./favourite");

// const homeDataPath = path.join(rootDir, "Data", "homes.json");  // 15.9 adding db in models

// ✅ Server start hote hi purana data file se load karo
// let registeredhomes = [];
// Fake database for registered homes


module.exports = class Home {
  constructor(houseName, Price, Location, Rating, PhotoUrl, Description ,id) {
    this.id = id;
    this.houseName = houseName;
    this.Price = Price;
    this.Location = Location;
    this.Rating = Rating;
    this.PhotoUrl = PhotoUrl;
    this.Description = Description;
  }

  //   save() {
  //     registeredhomes.push(this); // ✅ ab yahan push karo
  //     fs.writeFile(homeDataPath, JSON.stringify(registeredhomes), (err) => {
  //       // ✅ ab yahan write karo
  //       if (err) {
  //         console.error("Error writing home data:", err);
  //       }
  //     });
  //   }

  save() {
    // Home.fetchall((registeredhomes) => {
    //   if (this.id) {
    //     //edit home case
    //     registeredhomes = registeredhomes.map((home) => {
    //       if (home.id === this.id) {
    //         return this;
    //       }
    //       return home;
    //     });
    //   } else {
    //     // add home case
    //     this.id = Math.random().toString(); // Generate a unique ID for the home;
    //     registeredhomes.push(this); // ✅ ab yahan push karo
    //   }
    //   fs.writeFile(homeDataPath, JSON.stringify(registeredhomes), (err) => {
    //     // ✅ ab yahan write karo
    //     if (err) {
    //       console.error("Error writing home data:", err);
    //     }
    //   });
    // });
    // return db.execute(`INSERT INTO homes (houseName, Price, Location, Rating, PhotoUrl, Description) VALUES ('${this.houseName}',${this.Price},'${this.Location}',${this.Rating},'${this.PhotoUrl}','${this.Description}')`); this is use for sql injection for hacker so we need something else 

      if (this.id) {
        // edit home case
        return db.execute(
            'UPDATE homes SET houseName=?, Price=?, Location=?, Rating=?, PhotoUrl=?, Description=? WHERE id=?',
            [this.houseName, this.Price, this.Location, this.Rating, this.PhotoUrl, this.Description, this.id]
        );
    }
    else{
    // add home case
    return db.execute(
        'INSERT INTO homes (houseName, Price, Location, Rating, PhotoUrl, Description) VALUES (? , ? , ? , ? , ? , ?)',
        [this.houseName, this.Price, this.Location, this.Rating, this.PhotoUrl, this.Description]
    );
  }
  }

  //   static fetchall() {
  static fetchall(callback) {
    // ✅ Server start hote hi purana data file se load karo
    // const homeDataPath = path.join(rootDir, "Data", "homes.json");
    // fs.readFile(homeDataPath, (err, data) => {
    //   if (err) {
    //     return callback([]); // Agar file read karne me error aata hai, to empty array return karo
    //   } else {
    //     callback(JSON.parse(data));
    //   }
    // });

    // return registeredhomes; // ✅ ab yahan return karo
    return db.execute('SELECT * FROM homes');
      
  }

  static findById(id, callback) {
    // Home.fetchall((registeredhomes) => {
    //   const homeFound = registeredhomes.find((h) => h.id === id); 
    //   callback(homeFound);
    // });
       return db.execute('SELECT * FROM homes WHERE id=?', [id]);

  }

  static deleteById(homeId, callback) {
    // Home.fetchall((homes) => {
    //   homes = homes.filter(home => home.id !== homeId);
    //   fs.writeFile(homeDataPath, JSON.stringify(homes), error => {
    //     Favourite.deleteById(homeId, callback);
    //   });
    // });
     return db.execute('DELETE FROM homes WHERE id=?', [homeId]);
  }
};  
