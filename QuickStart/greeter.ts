//使用 tsc 文件名 编译ts文件
//TypeScript里的类型注解是一种轻量级的为函数或变量添加约束的方式
function greeter(person: string) {
  //添加string类型注解
  return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);
