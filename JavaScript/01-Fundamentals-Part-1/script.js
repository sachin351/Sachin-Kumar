// let a = "Hello";
// if (a === "Hello") {
//     alert("Working");
// }
// let age = 30;
// age = 31;
// console.log(age);
// now = 2037;
// const ageme = now - 1998;
// const ageyou = now - 2000;
// console.log(ageyou > ageme);
// console.log(now - 2000 < now - 1998);
// Coding Challenge #1
// Mark and John are trying to compare their BMI (Body Mass Index), which is
// calculated using the formula:
// BMI = mass / height ** 2 = mass / (height * height) (mass in kg
// and height in meter).
// Your tasks:
// 1. Store Mark's and John's mass and height in variables
// 2. Calculate both their BMIs using the formula (you can even implement both
// versions)
// 3. Create a Boolean variable 'markHigherBMI' containing information about
// whether Mark has a higher BMI than John.
// Test data:
// § Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
// m tall.
// § Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
// m tall.

let markMass = 78;
let markHeight = 1.69;
let johnMass = 92;
let johnHeight = 1.95;
let markBMI = (markMass / markHeight ** 2);
let johnBMI = (johnMass / johnHeight ** 2);
console.log(markBMI, johnBMI);
let markhigherBMI = markBMI > johnBMI;
console.log(markhigherBMI);

const firstName = "Sachin";
const job =  "Software Engg";
const birthYear = 1998;
console.log("I am " + firstName + " a " + job + " and my birthdate is " + birthYear);
// called template string
sachinNew = `I am ${firstName} a ${job} and my birthdate is ${birthYear}.`;
console.log(sachinNew);
console.log(`this is\n\ multiple line`);
