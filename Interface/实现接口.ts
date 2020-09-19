//与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}

/*********************** */

// 当一个类实现了一个接口时，只对其实例部分进行类型检查。constructor存在于类的静态部分，所以不在检查的范围内。
// 因此，我们应该直接操作类的静态部分。 看下面的例子，我们定义了两个接口，ClockConstructor为构造函数所用和ClockInterface为实例方法所用。 为了方便我们定义一个构造函数createClock，它用传入的类型创建实例。

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick();
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(hour: number, minute: number) {}
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface {
  constructor(hour: number, minute: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17); //第一个参数是ClockConstructor类型，会自动检查digitalclock的类型
let analog = createClock(AnalogClock, 7, 32);
