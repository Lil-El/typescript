//枚举成员具有一个数字值，它可以是常数或是计算得出的值
enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = "123".length
}
//当访问枚举值时，为了避免生成多余的代码和间接引用，可以使用常数枚举。 常数枚举是在enum关键字前使用const修饰符
const enum Enum {
  A = 1,
  B = A * 2
}
//外部枚举
declare enum Enum {
  A = 1,
  B,
  C = 2
}
//外部枚举和非外部枚举之间有一个重要的区别，在正常的枚举里，没有初始化方法的成员被当成常数成员。 对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的。
