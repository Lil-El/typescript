function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  //第一个操作符keyof T，索引类型查询操作符
  return names.map(n => o[n]);
}

interface Person {
  name: string;
  age: number;
}
let person: Person = {
  name: "Jarid",
  age: 35
};
let strings: string[] = pluck(person, ["name"]); // ok, string[]

/*
*let personProps: keyof Person; // 'name' | 'age'
 keyof Person是完全可以与'name' | 'age'互相替换的
  */

//第二个操作符是T[K]，索引访问操作符。 在这里，类型语法反映了表达式语法
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]; // o[name] is of type T[K]
}
let name: string = getProperty(person, "name");
let age: number = getProperty(person, "age");
let unknown = getProperty(person, "unknown"); // error, 'unknown' is not in 'name' | 'age'
