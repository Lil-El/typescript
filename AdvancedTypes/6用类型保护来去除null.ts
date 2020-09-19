function f(sn: string | null): string {
  if (sn == null) {
    return "default";
  } else {
    return sn;
  }
}
//这里很明显地去除了null，你也可以使用短路运算符：

function f(sn: string | null): string {
  return sn || "default";
}
//如果编译器不能够去除null或undefined，你可以使用类型断言手动去除。 语法是添加!后缀：identifier!从identifier的类型里去除了null和undefined：

function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + ".  the " + epithet; // error, 'name' is possibly null
  }
  name = name || "Bob";
  return postfix("great");
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + ".  the " + epithet; // ok
  }
  name = name || "Bob";
  return postfix("great");
}
