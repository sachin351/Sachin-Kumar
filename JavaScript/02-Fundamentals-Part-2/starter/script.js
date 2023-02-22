'use strict';
// function name(){
//     console.log('I am Sachin Kumar');
// }
// name();

// function fruits(apple, orange){
//     console.log(5, 0);
//     const juice = `This is ${apple} apple juice and ${orange} orange juice.`;
//     return(juice);
// }
// console.log(fruits(5, 0));
// console.log(fruits(4,5));

// function declaration
// function calcAge(birthyear) {
//     const age = 2022 - birthyear;
//     return age;
// }
// console.log(calcAge(1997));
// let age;

// const calcAge2 =  function (birthyear){
//     const age = 2022 - birthyear;
//     return age;
// }
// const age2 = calcAge2(1998);
// console.log(age2);

// Arrow Function
// const age = birthYear => 2022 - birthYear;
// const ageYear =  age(1998);
// console.log(ageYear);
// const untilRetierment = (birthyear, firstName) => {
//     const birthage = 2022 - birthyear;
//     const retiermentAge = 65 - birthage;
//     return `${firstName} retires in ${retiermentAge} years.`;
// }
// console.log(untilRetierment(1998, 'Sachin'));
// console.log(untilRetierment(1995, 'Manish'));



// // coding challenge #1
// const calcAverage = (a, b, c) => (a + b + c) / 3;
// const scoreDolhins = calcAverage(44, 23, 71);
// const scoreKoalas = calcAverage(65, 54, 49);
// console.log(scoreDolhins, scoreKoalas);

// const perOne = (frnd1, callfrnd) => {
//     console.log(callfrnd);
//     console.log('Friend one is calling');
//     callfrnd();
// }
// const perTwo = (frnd2) => {
//     console.log('friend two is calling');
// }
// perOne('Sachin', perTwo);

// array function
// const calcTip = function (bill) {
//     return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
// }
// let bills = [125, 555, 44];
// let tips;
// for (tips = 0; tips < bills.length; tips++) {
//     console.log( `This is tip amount ${calcTip(bills[tips])}`);
//     console.log(`This is total bill amount ${calcTip(bills[tips]) + bills[tips]}`);
// }
// const objectOne = {
//     firstName : 'Sachin',
//     lastName : 'Kumar',
//     age : 2022 - 1998,
//     job : 'Software Enggineer',
//     friends : ['Manish', 'Ayush'],
//     fullName : function (){
//         return (`${this.firstName} ${this.lastName}`)
//     }
// }
// console.log(objectOne);
// console.log(objectOne.lastName);
// console.log(objectOne['lastName']);

// const nameKey = 'Name';
// // 
// console.log(objectOne['first' + nameKey]);
// console.log(objectOne.fullName());

// const interestIn = prompt('What do you want to know about Sachin?');
// console.log(interestIn);
// if(objectOne[interestIn]){
//     console.log(objectOne[interestIn]);
// }
// else{
//     console.log('Worng Request');
// }

// objectOne.address =  'Meerut';
// console.log(objectOne);

// challenge 3
// const mark = {
//     fullName : 'Mark Miller',
//     mass: 78,
//     height: 1.69,
//     calcBMI : function(){
//         this.bmi = this.mass / this.height ** 2;
//         return this.bmi;
//     }
// };
// const john ={
//     fullName : 'John Smith',
//     mass : 92,
//     height : 1.69,
//     calcBMI : function(){
//         this.bmi = this.mass / this.height ** 2;
//         return this.bmi;
//     }
// };
// mark.calcBMI();
// john.calcBMI();
// console.log(mark.bmi, john.bmi);
// if(john.bmi > mark.bmi){
//     console.log(`"John Smith's BMI (${john.bmi}) is higher than Mark Miller (${mark.bmi})!"`);
// }
// else{
//     console.log(`"Mark Miller BMI (${john.bmi}) is higher than John Smith's (${mark.bmi})!"`);
// }
// for(let rep = 1; rep <= 10; rep++){
//     console.log(`Lifting weight repetition ${rep}`);
// }
// const objectOne = [
//     'Sachin',
//     'Kumar',
//     2022 - 1998,
//     'Software Enggineer',
//      ['Manish', 'Ayush'],
// ];
// for(let i=0; i< 4; i++){
//     console.log(objectOne[i]);
// }

// const calcAverage = (a,b,c) => (a+b+c)/2;
// const scoreDolhins = calcAverage(44, 23, 71);
// const scoreKoalas = calcAverage(65, 54, 49);
// console.log(scoreDolhins, scoreKoalas);
// const checkWinner =  function (avgDolphins, avgKoalas){
//     if (avgDolphins >= 2*avgKoalas){
//         console.log(`Dophins win (${avgDolphins} vs. ${avgKoalas})`);
//     }
//     else if (avgKoalas >= 2*avgDolphins){
//         console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
//     }
//     else{
//         console.log('No Teams Wins..');
//     }
// }
// checkWinner(scoreDolhins, scoreKoalas);

// function calcTip(bill){
//     return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
// }
// let bills = [125, 555, 44];
// let tips;
// for (tips = 0; tips < bills.length; tips++) {
//     console.log( `This is tip amount ${calcTip(bills[tips])}`);
//     console.log(`This is total bill amount ${calcTip(bills[tips]) + bills[tips]}`);
// }
// const joans = {
//     firstName:'Sachin',
//     lastName: 'Kumar',
//     job: 'Software Engginner',
//     birthYear: 1998,
//     calcAge : function(birthYear){
//         return 2023 - birthYear;
//     }
// }
// const calcAge = function(birthYear){
//     return 2023 - birthYear;
// }
// console.log(joans.calcAge([1998]));
// console.log(calcAge(1998));
// console.log(`${joans.firstName} is`);