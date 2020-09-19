//默认为Public
class Animal {
  public name: string;
  private sex: string;
  public constructor(theName: string) {
    this.name = name;
  }
  public move(distanceInMeters: number) {
    console.log(`${this.name}`);
  }
}

new Animal("Cat").sex; //error,is private

//protected
//与private修饰符的行为很相似，但有一点不同，protected成员在派生类中仍然可以访问
class Person {
  protected name: string;
  constructor(name: string) {
    //构造函数也可以被标记成protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。
    this.name = name;
  }
}

class Employee extends Person {
  private department: string;
  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }
  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`; //protected属性，不可以在外部使用，但是可以在子类中调用
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 错误
