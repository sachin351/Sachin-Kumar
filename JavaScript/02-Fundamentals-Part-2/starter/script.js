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
const untilRetierment = (birthyear, firstName) => {
    const birthage = 2022 - birthyear;
    const retiermentAge = 65 - birthage;
    return `${firstName} retires in ${retiermentAge} years.`;
}
console.log(untilRetierment(1998, 'Sachin'));
console.log(untilRetierment(1995, 'Manish'));



// call funtion to another function