interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });
//way1:colour拼写错误，但是程序的输出结果不需要这个，只是没有了color属性，多了一个额外的colour属性，要是想要避免这种错误，可以使用类型断言
let mySquare1 = createSquare({ color: "white", width: 1 } as SquareConfig);
//way2:如果你的参数真的需要一些额外的参数，可以在interface中加入[propName: string]: any;
//way3:这可能会让你感到惊讶，它就是将这个对象赋值给一个另一个变量： 因为squareOptions不会经过额外属性检查，所以编译器不会报错
let squareOptions = { colour: "red", width: 100 };
let mySquare2 = createSquare(squareOptions);
