interface StringArray {
  //interface具有索引签名。 这个索引签名表示了当用number去索引StringArray时会得到string类型的返回值
  readonly [index: number]: string; //将索引设置为只读，可以避免给他赋值
  //   共有支持两种索引签名：字符串和数字
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
