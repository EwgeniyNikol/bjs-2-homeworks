"use strict"
function solveEquation(a, b, c) {
  let arr = [];
  let discriminant = b ** 2 - 4 * a * c;
 if (discriminant === 0) {
    let root = -b / (2 * a);
    arr.push(root);
  } 
  else if (discriminant > 0) {
    let sqrtD = Math.sqrt(discriminant);
    let root1 = (-b + sqrtD) / (2 * a);
    let root2 = (-b - sqrtD) / (2 * a);
    arr.push(root1, root2);
  }
  
  return arr;
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  let monthlyPercent = percent / 100 / 12;
  let loanBody = amount - contribution;
  let monthlyPayment = loanBody * (monthlyPercent + monthlyPercent / (Math.pow(1 + monthlyPercent, countMonths) - 1));
  let totalAmount = monthlyPayment * countMonths;
  return Number(totalAmount.toFixed(2));
}