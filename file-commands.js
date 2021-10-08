const os = require("os");
const fs = require("fs");
console.log("Hello, Guvi!!!");

const marks = [40, 50, 80, 10, 70];

console.log(Math.max(...marks));

function double(num){
    return num*2;
}

//console.log("The double is: ", double(num));

console.log(process.argv);

const num = process.argv[2];
console.log("The double is: ", double(num));

console.log("Free memory: " + os.freemem());
console.log("Total memory: " + os.totalmem());
console.log(os.arch());

fs.readFile("./nice.txt", "utf8", (err, data) => {
    console.log(data);
});