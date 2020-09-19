function f({ a, b } = { a: "", b: 12 }): void {
  //...
}
f(); //ok, default to {a:"",b:12}
