// 1. 获取obj的key类型和value类型
type obj = {
    "a": 1;
    "b": 2;
    "c": 3;
};

type getKeyType = keyof obj;
type getValueType = obj[keyof obj];

// 2. Distributive conditional types - 类型分发
// 2.1
type basicType = string | number | boolean;
type isString1<T> = [T] extends [string] ? true : false; // 防止类型分发
type isString2<T> = T extends string ? true : false;
type t1 = isString1<basicType>
type t2 = isString2<number | boolean> // 类型分发 => (string extends ? true : false) | (number extends ? true : false) | (boolean extends ? true : false)
// 2.2
type isBasicType<T> = T extends [string | number] ? true : false;
type t3 = isBasicType<[string & number]>;
type t4 = isBasicType<boolean>;
