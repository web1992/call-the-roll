// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var utils = require("./helper.js");
var fs = require("fs");
var path = require("path");
var names = [];

document.getElementById("startBtn").addEventListener("click", () => {
  utils.sayHello("vscode");
  fs.readFile(path.join(__dirname, "names.txt"), "utf-8", function(err, data) {
    names = [];
    if (err) {
      console.log(err);
    } else {
      var nameArr = data.split("\n");
      for (var i = 0; i < nameArr.length; i++) {
        let name = nameArr[i];
        names.push(name);
      }
      console.log(names);
    }
  });
});
