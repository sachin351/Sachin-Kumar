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

// let markMass = 78;
// let markHeight = 1.69;
// let johnMass = 92;
// let johnHeight = 1.95;
// let markBMI = (markMass / markHeight ** 2);
// let johnBMI = (johnMass / johnHeight ** 2);
// console.log(markBMI, johnBMI);
// let markhigherBMI = markBMI > johnBMI;
// console.log(markhigherBMI);

// const firstName = "Sachin";
// const job =  "Software Engg";
// const birthYear = 1998;
// console.log("I am " + firstName + " a " + job + " and my birthdate is " + birthYear);
// // called template string
// sachinNew = `I am ${firstName} a ${job} and my birthdate is ${birthYear}.`;
// console.log(sachinNew);
// console.log(`this is\n\ multiple line`);

// let age = 18;
// let isEnough = age <= 18;
// if (isEnough === true) {
//     console.log("Yor are Eligible");
// }
// else {
//     console.log("You are not eligible");
// }
// if (markBMI > johnBMI) {
//     console.log(`mark BMI is greater than jhon BMI. The diffrence is ${markBMI - johnBMI}`);
// }
// else {
//     console.log(`john BMI is greater than mark BMI. The diffrence is ${johnBMI - markBMI}`);
// }
// // Type conversion
// const inputYear = '1991';
// console.log(Number(inputYear) + 18);
// console.log(inputYear + 18);
// n = '10' + 2;
// console.log(n);

/*
There are two gymnastics teams, Dolphins and Koalas. They compete against each other 3 times.
The winner with the highest average score wins the a trophy!
1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition, and print it to the console.
Don't forget that there can be a draw, so test for that as well (draw means they have the same average score).
3. BONUS 1: Include a requirement for a minimum score of 100. With this rule, a team only wins if it has a
higher score than the other team, and the same time a score of at least 100 points. HINT: Use a logical
operator to test for minimum score, as well as multiple else-if blocks 😉
4. BONUS 2: Minimum score also applies to a draw! So a draw only happens when both teams have the same
score and both have a score greater or equal 100 points. Otherwise, no team wins the trophy.
TEST DATA: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
TEST DATA BONUS 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
TEST DATA BONUS 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
GOOD LUCK 😀
*/
// let dolphins = (97 + 112 + 89) / 3;
// let koalas = (109 + 95 + 123) / 3;
// console.log(dolphins, koalas);
// if (dolphins > koalas) {
//     console.log(`Dolphins socre is higher ${dolphins - koalas} than Koalas.`);
// }
// else if (koalas > dolphins) {
//     console.log(`Koalas socre is higher ${koalas - dolphins} than Dolphins.`);
// }
// else {
//     console.log(`Match is draw.`);
// }
// // Bouns 1
// if (dolphins > koalas && dolphins >= 100) {
//     console.log(`Dolphins win the trophy`);
// } else if (koalas > dolphins && koalas >= 100) {
//     console.log(`Koalas win the trophy`);
// }
// else {
//     console.log(`No one is winner`);
// }
// const age = 23;
// age >= 18 ? console.log('I like to drink wine') : console.log('I like to drink water');
// drink = age >= 18 ? 'wine' : 'water';
// console.log(drink);

// #4
// let billamount = 275;
// let tip;
// if (billamount >= 50 && billamount <= 300) {
//     tip = billamount * 0.15;
// } else {
//     tip = billamount * 0.20;
// }
// let totalBill = (billamount + tip);
// console.log(`The bill was ${billamount},the tip was ${tip} and the total value is ${totalBill}.`);

let billamount = 275;
const tip = billamount >= 50 && billamount <= 300 ? billamount * 0.15 : billamount * 0.20;
let totalBill = (billamount + tip);
console.log(`The bill was ${billamount},the tip was ${tip} and the total value is ${totalBill}.`); 
