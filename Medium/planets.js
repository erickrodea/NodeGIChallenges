const fs = require('fs');
//add library

//readfile from txt
const dataBuffer = fs.readFileSync("planets.txt")
//convert to string
console.log(dataBuffer.toString())
