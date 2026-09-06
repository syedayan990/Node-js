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

// core module
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/PathUtil");
const Favourite = require("./favourite");

const homeDataPath = path.join(rootDir, "Data", "homes.json");

// ✅ Server start hote hi purana data file se load karo
// let registeredhomes = [];
// Fake database for registered homes
try {
  const fileData = fs.readFileSync(homeDataPath);
  registeredhomes = JSON.parse(fileData);
} catch (err) {
  // File exist nahi karti ya khaali hai (pehli baar chalane pe) — theek hai, khaali array se shuru karo
  registeredhomes = [];
}

module.exports = class Home {
  constructor(houseName, Price, Location, Rating, PhotoUrl, id) {
    this.id = id || Date.now().toString();
    this.houseName = houseName;
    this.Price = Price;
    this.Location = Location;
    this.Rating = Rating;
    this.PhotoUrl = PhotoUrl;
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
    Home.fetchall((registeredhomes) => {
      if (this.id) {
        //edit home case
        registeredhomes = registeredhomes.map((home) => { 
          if (home.id === this.id) {
            return this;
          }
          return home;
        });
      } else {
        // add home case
        this.id = Math.random().toString(); // Generate a unique ID for the home;
        registeredhomes.push(this); // ✅ ab yahan push karo
      }

      fs.writeFile(homeDataPath, JSON.stringify(registeredhomes), (err) => {
        // ✅ ab yahan write karo
        if (err) {
          console.error("Error writing home data:", err);
        }
      });
    });
  }

  //   static fetchall() {
  static fetchall(callback) {
    // ✅ Server start hote hi purana data file se load karo
    const homeDataPath = path.join(rootDir, "Data", "homes.json");
    fs.readFile(homeDataPath, (err, data) => {
      if (err) {
        return callback([]); // Agar file read karne me error aata hai, to empty array return karo
      } else {
        callback(JSON.parse(data));
      }
    });

    // return registeredhomes; // ✅ ab yahan return karo
  }

  static findById(id, callback) {
    Home.fetchall((registeredhomes) => {
      const homeFound = registeredhomes.find((h) => h.id === id);
      callback(homeFound);
    });
  }


  static deleteById(homeId, callback) {
    Home.fetchall((homes) => {
      homes = homes.filter(home => home.id !== homeId);
      
      fs.writeFile(homeDataPath, JSON.stringify(homes), error => {
        Favourite.deleteById(homeId, callback); 
      });
    });
  }
};
