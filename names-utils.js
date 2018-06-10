// const fs = require("fs");
const path = require("path");

exports.getNames = getNames;
// number,name/symbol,details
function getNames(filePath) {
  console.log(`getNames dir is ${filePath}`);
  let namesFile = filePath;
  if (!namesFile) {
    namesFile = "names.txt";
  }
  namesArr = [];

  fs.readFile(path.join(__dirname, namesFile), "utf-8", function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var nameArr = data.split("\n");
      for (var i = 0; i < nameArr.length; i++) {
        let name = nameArr[i];
        namesArr.push(name);
      }
      console.log(names);
    }
  });

  return namesArr;
}
