console.log("my name is ayan");

const fs = require("fs");

fs.writeFile("output.text", "writing file", (err) => {
  if (err) console.lo("error occred");
  else console.log("File written successfully");
});
