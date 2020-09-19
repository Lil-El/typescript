//1
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
//2创建一个包含.length属性的接口，使用这个接口和extends关键字还实现约束
//现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：

loggingIdentity(3); // Error, number doesn't have a .length property
//3我们需要传入符合约束类型的值，必须包含必须的属性：

loggingIdentity({ length: 10, value: 3 });
//4你可以声明一个类型参数，且它被另一个类型参数所约束。
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
