// Ye file test ke liye hai — project ke root folder mein rakh
// (14-Airbnb-Dynamic-Path-Model/test-db.js)

const db = require("./utils/DabaBaseUtils");

async function run() {
  try {
    console.log("1) Connection test shuru...");
    const [rows] = await db.execute("SELECT * FROM homes");
    console.log("2) SELECT kaam kar gaya. Total rows:", rows.length);
    console.log(rows);

    console.log("3) Ab test INSERT try kar rahe hain...");
    const [result] = await db.execute(
      "INSERT INTO homes (houseName, Price, Location, Rating, PhotoUrl, Description) VALUES (?, ?, ?, ?, ?, ?)",
      ["TEST HOUSE", 100, "TEST CITY", 4.5, "/image/house1.png", "test description"]
    );
    console.log("4) INSERT kaam kar gaya! Naya id:", result.insertId);

    console.log("5) Ab dobara SELECT karke confirm karte hain...");
    const [rows2] = await db.execute("SELECT * FROM homes");
    console.log("Total rows ab:", rows2.length);
    console.log(rows2);

    process.exit(0);
  } catch (err) {
    console.log("❌ ERROR AAYA:");
    console.log(err);
    process.exit(1);
  }
}

run();
