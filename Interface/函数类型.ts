//使用接口表示函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(src: string, subString: string) {
  //函数参数不需要和接口定义的名字匹配,但是类型一定要匹配
  let result = src.search(subString);
  return result > -1; //返回类型也一定要匹配
};
