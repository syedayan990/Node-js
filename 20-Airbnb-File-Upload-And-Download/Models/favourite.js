const mongoose = require("mongoose");

const favouriteSchema = mongoose.Schema({
  houseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Favourite',favouriteSchema);
// module.exports = class Favourite {
//   constructor(homeId) {
//     this.homeId = homeId;
//   }

//   save() {
//     const db = getDb();
//     return db
//       .collection("favourites")
//       .findOne({ homeId: this.homeId })
//       .then((existingFav) => {
//         if (!existingFav) {
//           return db.collection("favourites").insertOne(this);
//         }
//         return Promise.resolve();
//       });
//   }

//   static getFavourite() {
//     const db = getDb();
//     return db.collection("favourites").find().toArray();
//   }

//   static deleteById(homeId) {
//     const db = getDb();
//     return db.collection("favourites").deleteOne({ homeId: homeId });
//   }
// };
