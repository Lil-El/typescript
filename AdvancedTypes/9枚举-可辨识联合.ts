//声明了将要联合的接口
interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}

//每个接口都有kind属性但有不同的字符串字面量类型,但是各个接口间是没有联系的。 下面我们把它们联合到一起
type Shape = Square | Rectangle | Circle;
//现在我们使用可辨识联合:

function area(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
  }
}
