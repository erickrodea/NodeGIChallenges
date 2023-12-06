/*
    ['node', '/path/to/your/baby-steps.js', '1', '2', '3']  
   
  You'll need to think about how to loop through the number arguments so  
  you can output just their sum. The first element of the process.argv array  
  is always 'node', and the second element is always the path to your  
  baby-steps.js file, so you need to start at the 3rd element (index 2),  
  adding each item to the total until you reach the end of the array.  
   

*/
let lenghty = process.argv.length;
let sum = 0;
for (let i = 2; i < lenghty; i++) {
    sum += Number(process.argv[i]);
}
console.log(sum)
