// Write a JavaScript program to display the current day and time in the following format.
// Today is : Tuesday.
// Current time is : 10 PM : 30 : 38

const date = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day =  days[date.getDay()];
// const time =  get.Time();
console.log(`Today is ${day}`);
console.log(`Current time is ${date.getTime()}`);

// Write a JavaScript program to get the current date
console.log(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);

// Write a JavaScript program to find the area of a triangle where lengths of the three of its sides are 5, 6, 7.
const a = 5;
const b = 6;
const c = 7;
const triangle =  (a+b+c) / 2;
console.log(triangle);
// Write a JavaScript program to rotate the string 'w3resource' in right direction by periodically removing one letter from the end of the string and attaching it to the front.
function reverseString(str) {
   let newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}
console.log(reverseString('hello'));

let cabOne = 30;
let cabTwo =  65;
if (cabOne < cabTwo){
    console.log('Chef book cab one');
}
else{
    console.log('Chef book cab two');
}