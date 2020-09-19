interface Counter {
  (start: number): string; //方法(检查参数)
  interval: number; //属性
  reset(): void; //方法(检查名字)
}

function getCounter(): Counter {
  let counter = <Counter>function(start: number) {};
  counter.interval = 123;
  counter.reset = function() {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
