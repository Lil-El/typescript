type types = String | Number;
let str: types = 123;

function test(): Number {
  /**
   * return str; 报错
   */
  // 因为str有可能是数字也可能是字符串；所以这里要强转或判断
  // 1
  if (typeof str === "number") return str;
  // 2
  return <Number>str;
}
