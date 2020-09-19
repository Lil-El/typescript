//--strictNullChecks标记可以解决此错误：当你声明一个变量时，它不会自动地包含null或undefined。 你可以使用联合类型明确的包含它们：
let s = "foo";
s = null; // 错误, 'null'不能赋值给'string'
let sn: string | null = "bar";
sn = null; // 可以

sn = undefined; // error, 'undefined'不能赋值给'string | null'
//注意，按照JavaScript的语义，TypeScript会把null和undefined区别对待。
//string | null，string | undefined和string | undefined | null是不同的类型。
