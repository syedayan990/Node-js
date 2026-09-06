// // =========================================
// // core module
// // const db = require("../utils/DabaBaseUtils");
// const { ObjectId } = require("mongodb");

// module.exports = class Home {
//   constructor(houseName, Price, Location, Rating, PhotoUrl, Description, _id) {
//     this.houseName = houseName;
//     this.Price = Price;
//     this.Location = Location;
//     this.Rating = Rating;
//     this.PhotoUrl = PhotoUrl;
//     this.Description = Description;
//     if (_id) {
//       this._id = _id;
//     }
//   }

//   save() {

//     const db = getDb();

//     if(this._id){ // upadte

//       const updateFields = {
//         houseName : this.houseName,
//         Price: this.Price,
//         Location: this.Location,
//         Rating: this.Rating,
//         PhotoUrl: this.PhotoUrl,
//         Description: this.Description
//       };

//      return db
//       .collection("homes").updateOne({_id: new ObjectId(String(this._id))} , {$set: updateFields});
//     }else{ // insert
//       return db
//       .collection("homes")
//       .insertOne(this);
//     }
//       // .then((result) => {
//       //   console.log(result);
//       // });
//   }

//   //   static find() {
//   static find(callback) {
//     // return registeredhomes; // ✅ ab yahan return karo
//     // return db.execute("SELECT * FROM homes");
//     const db = getDb();
//     return db.collection("homes").find().toArray(); //it is returning promise that convert into array
//   }

//   static findById(id) {
//     const db = getDb();

//     return db
//       .collection("homes")
//       .find({ _id: new ObjectId(String(id)) })
//       .next();
//   }

//   static deleteById(homeId, callback) {
//     // return db.execute("DELETE FROM homes WHERE id=?", [homeId]);
//     const db = getDb();
//     return db.collection('homes').deleteOne({_id: new ObjectId(String(homeId))});
//   }
// };

// using mongoose----------=============

const mongoose = require("mongoose");
const Favourite = require("./favourite");

const homeSchema = mongoose.Schema({
  houseName: {
    type: String,
    require: true,
  },
  Price: {
    type: Number,
    require: true,
  },
  Location: {
    type: String,
    require: true,
  },
  Rating: {
    type: Number,
    require: true,
  },
  PhotoUrl: String,
  Description: String,
});

homeSchema.pre('findOneAndDelete', async function () {
  const homeId = this.getQuery()._id;
  await Favourite.deleteMany({ houseId: homeId });
});

module.exports = mongoose.model("Home", homeSchema);
