//导出声明
export interface StringValidator {
  isAcceptable(s: string): boolean;
}
//导出语句
class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };
//重新导出,,,导出原先的验证器但做了重命名
export {
  ZipCodeValidator as RegExpBasedZipCodeValidator
} from "./ZipCodeValidator";
export * from "./StringValidator";
