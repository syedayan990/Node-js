//==========================================================
// core module
// const db = require("../utils/DabaBaseUtils");
const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/DabaBaseUtils");
module.exports = class Home {
  constructor(houseName, Price, Location, Rating, PhotoUrl, Description, _id) {
    this.houseName = houseName;
    this.Price = Price;
    this.Location = Location;
    this.Rating = Rating;
    this.PhotoUrl = PhotoUrl;
    this.Description = Description;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    // if (this.id) {
    //   // edit home case
    //   return db.execute(
    //     "UPDATE homes SET houseName=?, Price=?, Location=?, Rating=?, PhotoUrl=?, Description=? WHERE id=?",
    //     [
    //       this.houseName,
    //       this.Price,
    //       this.Location,
    //       this.Rating,
    //       this.PhotoUrl,
    //       this.Description,
    //       this.id,
    //     ],
    //   );
    // } else {
    //   // add home case
    //   return db.execute(
    //     "INSERT INTO homes (houseName, Price, Location, Rating, PhotoUrl, Description) VALUES (? , ? , ? , ? , ? , ?)",
    //     [
    //       this.houseName,
    //       this.Price,
    //       this.Location,
    //       this.Rating,
    //       this.PhotoUrl,
    //       this.Description,
    //     ],
    //   );
    // }
    const db = getDb();

    if(this._id){ // upadte
 
      const updateFields = {
        houseName : this.houseName,
        Price: this.Price,
        Location: this.Location,
        Rating: this.Rating,
        PhotoUrl: this.PhotoUrl,
        Description: this.Description  
      };

     return db
      .collection("homes").updateOne({_id: new ObjectId(String(this._id))} , {$set: updateFields});
    }else{ // insert
      return db
      .collection("homes")
      .insertOne(this);
    }
      // .then((result) => {
      //   console.log(result);
      // });
  }

  //   static fetchall() {
  static fetchall(callback) {
    // return registeredhomes; // ✅ ab yahan return karo
    // return db.execute("SELECT * FROM homes");
    const db = getDb();
    return db.collection("homes").find().toArray(); //it is returning promise that convert into array
  }

  static findById(id) {
    const db = getDb();

    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(id)) })
      .next();
  }

  static deleteById(homeId, callback) {
    // return db.execute("DELETE FROM homes WHERE id=?", [homeId]);
    const db = getDb();
    return db.collection('homes').deleteOne({_id: new ObjectId(String(homeId))});
  }
};
