//Boolean
let isDone: boolean = false;
//Number
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
//String
let name: string = "bob";

let age: number = 37;
let sentence: string = `Hello, my name is ${name}.I'll be ${age +
  1} years old next month.`; //模板字符
//Array
//1
let list: number[] = [1, 2, 3];
//2
let list2: Array<number> = [1, 2, 3];

//元祖Tuple
let x: [string, number]; // Declare a tuple type
x = ["hello", 22]; // Initialize it
console.log(x[0].substr(1)); //ello

//Enum
enum Color {
  Red,
  Green,
  Bule
}
let c: Color = Color.Green;
//默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从1开始编号
enum Color {
  Red = 1,
  Green,
  Blue
}
let colorName: string = Color[2];
console.log(colorName); // 显示'Green'因为上面代码里它的值是2
//手动赋值
enum Color {
  Red = 1,
  Green = 2,
  Blue = 4
}
let c: Color = Color.Green;
//任意值
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

let list: any[] = [1, true, "free"]; //你有一个数组，它包含了不同的类型的数据：
list[1] = 100;
//空值
//某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是void：
function warnUser(): void {
  alert("This is my warning message");
}
let unusable: void = undefined; //声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
//Null/Undefined
let u: undefined = undefined;
let n: null = null;
/*默认情况下null和undefined是所有类型的子类型。 就是说你可以把null和undefined赋值给number类型的变量
 指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。 这能避免很多常见的问题。
 若你想传入一个string或null或undefined，你可以使用联合类型string | null | undefined
*/

//Never
/*表示的是那些永不存在的值的类型,never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 
变量也可能是never类型，当它们被永不为真的类型保护所约束时。*/
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {}
}

//类型断言有两种形式。 其一是“尖括号”语法：
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
//另一个为as语法：
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
//在TypeScript里使用JSX时，只有as语法断言是被允许的。
