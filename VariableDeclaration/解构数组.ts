//创建变量first，second
let input = [1, 2];
let [first, second] = input;
console.log(first, second); //1,2

//交换变量 swap variables
[first, second] = [second, first];

//剩余变量
let [first, ...rest] = [1, 2, 3, 4];
