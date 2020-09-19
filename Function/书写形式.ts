let myAdd: (x: number, y: number) => number = function(
  x: number,
  y: number
): number {
  return x + y;
};
/**
 * 只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确。
    第二部分是返回值类型。 对于返回值，我们在函数和返回值类型之前使用(=>)符号，使之清晰明了。
 */
