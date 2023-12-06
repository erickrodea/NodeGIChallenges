let fs = require('fs');
let str = fs.readFile(process.argv[2], 'utf8', function (err, data) {
    let len = data.split("\n").length;
    console.log(len - 1);
});