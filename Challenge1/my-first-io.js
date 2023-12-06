let fs = require('fs');
let newlines = fs.readFileSync(process.argv[2]).toString().split("\n").length;
console.log(newlines - 1);