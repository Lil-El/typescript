function identity<T>(arg: T): T {
  return arg;
}
let myIdentity: { <T>(arg: T): T } = identity;

//接口形式:
interface GenericIdentityFn {
  <T>(arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;

//一个相似的例子，我们可能想把泛型参数当作整个接口的一个参数。
//这样我们就能清楚的知道使用的具体是哪个泛型类型（比如：Dictionary<string>而不只是Dictionary）。
// 这样接口里的其它成员也能知道这个参数的类型了。

interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
