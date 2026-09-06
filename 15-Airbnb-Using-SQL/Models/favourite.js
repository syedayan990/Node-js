// // core module
// const fs = require("fs");
// const path = require("path");
// const rootDir = require("../utils/PathUtil");

// const favouriteDataPath = path.join(rootDir, "Data", "favourites.json");

// // ✅ Server start hote hi purana data file se load karo
// // let registeredhomes = [];
// // Fake database for registered homes
// try {
//   const fileData = fs.readFileSync(favouriteDataPath);
//   registeredhomes = JSON.parse(fileData);
// } catch (err) {
//   // File exist nahi karti ya khaali hai (pehli baar chalane pe) — theek hai, khaali array se shuru karo
//   registeredhomes = [];
// }

// module.exports = class favorite {

//     static addToFavourite(homeId, callback) {
//       favourite.getFavourite((favourite) => {
//          registeredhomes.push(this); 
//          if (favourite.includes(homeId)) {
//           console.log("Home already in favourites");
//          }else{
//           favourite.push(homeId); 
//             fs.writeFile(favouriteDataPath, JSON.stringify(favourites), (callback) );
//          }
  
//      });
//     }

//      static getFavourite  (callback) {
//         fs.readFile(favouriteDataPath, (err, data) => {
//             if (err) {
//               return callback([]); 
//             } else {
//               callback(JSON.parse(data));
//             }
//           });
//      }

// };

  
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/PathUtil");

const favouriteDataPath = path.join(rootDir, "Data", "favourites.json");

module.exports = class Favourite {
  static addToFavourite(homeId, callback) {
    this.getFavourite((favouritesList) => {

      if (favouritesList.includes(homeId)) {
        // callback("Home already in favourites");
        console.log("Home already in favourites");
        return callback(); // pehle se hai, phir bhi respond zaroor karo
      }
      favouritesList.push(homeId);
      fs.writeFile(favouriteDataPath, JSON.stringify(favouritesList), callback);
    });
  }

  static getFavourite(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      if (err) {
        return callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }
  static deleteById(delhomeId, callback) {
      Favourite.getFavourite((homeIds) => {
        homeIds = homeIds.filter(homeId => delhomeId !== homeId);
        fs.writeFile(favouriteDataPath, JSON.stringify(homeIds),callback);
      });
    }
};