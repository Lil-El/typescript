class Animal {
  constructor(private name: string) {} //在构造函数里使用private name: string参数来创建和初始化name成员。 我们把声明和赋值合并至一处
  move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
