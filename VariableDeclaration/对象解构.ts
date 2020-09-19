//定义变量a,b 为o的a和b, c忽略
let o = {
  a: "foo",
  b: 12,
  c: "bar"
};
let { a, b } = o;

//属性重命名
let { a: newName1, b: newName2 } = o;

//类型指定
let { a, b }: { a: string; b: number } = o;
