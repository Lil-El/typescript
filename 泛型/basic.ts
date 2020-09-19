//基础形式
function identity<T>(arg: T): T {
  return arg;
}
let myIdentity: <T>(arg: T) => T = identity;
let o = identity<string>("yxd"); //调用

//数组
function identity2<T>(args: T[]): T[] {
  console.log(args.length);
  return args;
}

//同上
function identit3y<T>(args: Array<T>): Array<T> {
  return args;
}
