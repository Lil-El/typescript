type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  //判断传入的参数是字符串还是函数
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}
//类型别名不能出现在声明右侧的任何地方。

type Yikes = Array<Yikes>; // error
//类型别名不能被extends和implements
