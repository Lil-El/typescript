type types = String | Number;
let str: types = 123;

function isStr(param: types): param is String {
  return (param as any).match !== undefined;
}

function test(str: types): String {
  if (isStr(str)) {
    return str;
  }
}
