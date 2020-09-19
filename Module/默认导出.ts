//1
export default class ZipCodeValidator {
  static numberRegexp = /^[0-9]+$/;
  isAcceptable(s: string) {
    return s.length === 5 && ZipCodeValidator.numberRegexp.test(s);
  }
}
import validator from "./ZipCodeValidator";

let myValidator = new validator();
//2
export default function(s: string) {
  return s.length === 5 && numberRegexp.test(s);
}

import validate from "./StaticZipCodeValidator";

let strings = ["Hello", "98052", "101"];
strings.forEach(s => {
  console.log(`"${s}" ${validate(s) ? " matches" : " does not match"}`);
});

//default导出也可以是一个值;

export default "123";

import num from "./OneTwoThree";

console.log(num); // "123"
