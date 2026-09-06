const { mongoConnect, getDb } = require("./DabaBaseUtils");

mongoConnect(async () => {
  const db = getDb();
  const result = await db.collection("homes").deleteMany({
    _id: { $type: "string" }   // sirf wahi documents delete karo jinka _id String type hai
  });
  console.log("Deleted corrupted docs:", result.deletedCount);
  process.exit(0);
});