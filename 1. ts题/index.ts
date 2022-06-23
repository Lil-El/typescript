// 转换为大写
type a1 = CapitalizeString<'handler'>       // Handler
type a2 = CapitalizeString<'parent'>        // Parent
type a3 = CapitalizeString<233>             // 233

type CapitalizeString<T extends string> = T extends `${infer L}${infer R}` ? `${Uppercase<L>}${R}` : T;

// FirstChar 获取首字母
type b1 = FirstChar<'GEE'>
type b2 = FirstChar<'dev'>
type b3 = FirstChar<''>
type FirstChar<T extends string> = T extends `${infer L}${infer R}` ? `${L}` : never;

// LastChar 获取最后字母
type c1 = LastChar<'BFE'> // 'E'
type c2 = LastChar<'dev'> // 'v'
type c3 = LastChar<''> // never
type LastChar<T extends string> = T extends `${infer L}${infer R}` ? R extends '' ? L : LastChar<R> : never;

// 字符串转换为元组类型
type d1 = StringToTuple<'BFE.dev'> // ['B', 'F', 'E', '.', 'd', 'e','v']
type d2 = StringToTuple<''> // []
type StringToTuple<T extends string, A extends string[] = []> = T extends `${infer L}${infer R}` ? StringToTuple<R, [...A, L]> : A;

// 元祖转字面量
type e1 = TupleToString<['a', 'b', 'c']> // 'abc'
type e2 = TupleToString<[]>              // ''
type e3 = TupleToString<['a']>           // 'a'
type TupleToString<T, A extends string = ""> = 
    T extends [infer L, ...infer R] ? TupleToString<R, `${A}${L}`> : A;

// 重复字面量
type f1 = RepeatString<'a', 3> // 'aaa'
type f2 = RepeatString<'a', 0> // ''

type RepeatString<T extends string, C extends number, S extends string[] = []> = 
    C extends 0 ? "" :
    S["length"] extends C ? TupleToString<S> : RepeatString<T, C, [...S, T]>;

type RepeatString2<T extends string, C, A extends any[] = [], Prev extends string = ''> =
    C extends A["length"] ? Prev : RepeatString2<T, C, [...A, true], `${Prev}${T}`>

// 字面量分割
type g1 = SplitString<'handle-open-flag', '-'>        // ["handle", "open", "flag"]
type g2 = SplitString<'open-flag', '-'>               // ["open", "flag"]
type g3 = SplitString<'handle.open.flag', '.'>        // ["handle", "open", "flag"]
type g4 = SplitString<'open.flag', '.'>               // ["open", "flag"]
type g5 = SplitString<'open.flag', '-'>               // ["open.flag"]
// type SplitString<T extends string, S extends string, C extends string = "", A extends string[] = []> = 
    // T extends `${infer L}${infer R}` ? (L extends S ? SplitString<R, S, "", [...A, `${C}`]> : SplitString<R, S, `${C}${L}`, A>) : [...A, `${C}`];
type SplitString<T, S extends string, A extends any[] = []> = T extends `${infer L}${S}${infer R}`?  
    SplitString<R, S, [...A, L]>: [...A, T] // NOTE: `${infer L}${S}${infer R}` 按照 S 分出左右两侧字面量

// LengthOfString 
type A = LengthOfString<'BFE.dev'> // 7
type B = LengthOfString<''> // 0
type LengthOfString<T extends string, A extends string[] = []> = 
    T extends `${infer L}${infer R}` ? LengthOfString<R, [...A, L]> : A["length"];

// KebabCase 驼峰命名转横杠命名
type h1 = KebabCase<'HandleOpenFlag'>           // handle-open-flag
type h2 = KebabCase<'OpenFlag'>                 // open-flag
type KebabCase<T, A extends string = ""> = T extends `${infer L}${infer R}` ? (L extends Lowercase<L> ? KebabCase<R, `${A}${L}`> : KebabCase<R, `${A}-${Lowercase<L>}`>) : A extends `-${infer RR}` ? RR : "";

// CamelCase 横杠命名转化为驼峰命名
type i1 = CamelCase<'handle-open-flag'>         // HandleOpenFlag
type i2 = CamelCase<'open-flag'>                // OpenFlag
type CamelCase<T, A extends string = ""> = T extends `${infer L}-${infer R}` 
    ? L extends `${infer LL}${infer RR}` ? CamelCase<R, `${A}${Uppercase<LL>}${RR}`> : "" 
    : T extends `${infer LL}${infer RR}` ? `${A}${Uppercase<LL>}${RR}` : "";

// 去除空格
type j1 = Trim<' BFE.dev'> // 'BFE'
type j2 = Trim<' BFE. dev  '> // 'BFE. dev'
type j3 = Trim<'       BFE .   dev  '> // 'BFE .   dev'
type Trim<T extends string> = T extends ` ${infer R}` 
    ? Trim<R>
    : T extends `${infer L} ` ? Trim<L> : T

// 类型是否相等
type k1 = Equal<any, any> // true
type k2 = Equal<1, any> // false
type k21 = Equal<any, 1> // false
type k3 = Equal<never, never> // true
type k4 = Equal<'BFE', 'BFE'> // true
type k5 = Equal<'BFE', string> // false
type k6 = Equal<1 | 2, 2 | 1> // true
type k7 = Equal<{a : number}, {a: number}> // true
// Tip: [] 避免类型分布；keyof 将 any 转为 string | number | boolean 等
type Equal<T1, T2> = [T1] extends [T2]
    ? [T2] extends [T1] 
        ? keyof T1 extends keyof T2 
            ? keyof T2 extends keyof T1 ? true : false
            : false 
        : false
    : false;

// 寻找下标
type lA = [any, never, 1, '2', true]
type l1 = FindIndex<lA, 1> // 2
type l2 = FindIndex<lA, 3> // never
type FindIndex<T extends any[], K> = T extends [...infer left, infer last] 
    ? Equal<K, last> extends true ? left["length"]
    : FindIndex<left, K> : never

// type FindIndex<A extends any[], T, C extends any[] = []> = A extends [infer L, ...infer R] 
//     ? Equal<T, L> extends true ? C['length'] : FindIndex<R, T, [...C, L]>
//     : never;

// ObjectAccessPaths 得到对象中的值访问字符串
    // 完成 createI18n 函数中的 ObjectAccessPaths<Schema>，限制函数i18n的参数为合法的属性访问字符串
    function createI18n<Schema>(schema: Schema): ((path: ObjectAccessPaths<Schema>) => string) {return [{schema}] as any}
    
    // i18n函数的参数类型为：home.topBar.title | home.topBar.welcome | home.bottomBar.notes | login.username | login.password
    const i18n = createI18n({
        home: {
            topBar: {
                title: '顶部标题',
                welcome: '欢迎登录'
            },
            bottomBar: {
                notes: 'XXX备案，归XXX所有',
            },
        },
        login: {
            username: '用户名',
            password: '密码'
        }
    })
    
    i18n('home.topBar.title')           // correct
    i18n('home.topBar.welcome')         // correct
    i18n('home.bottomBar.notes')        // correct
    i18n('home.login.abc')              // error
    i18n('home.topBar')                 // error   没到最后一个属性
    
// home.1.2 | home.2
type ObjectAccessPaths<T extends Record<string, any>, P extends string = '', K = keyof T> = K extends string 
    ? T[K] extends Record<string, any> ? ObjectAccessPaths<T[K], `${P}.${K}`> : (`${P}.${K}` extends `.${infer R}` ? R : never)
    : never;

// Push 
type o1 = Push<[1,2,3], 4> // [2,3]
type o2 = Push<[1], 2> // [1, 2]
type o3 = Push<[], string> // [string]
type Push<T extends any[], I> = T extends Array<any> ? [...T, I] : never;

// Repeat
type p1 = Repeat<number, 3> // [number, number, number]
type p2 = Repeat<string, 2> // [string, string]
type p3 = Repeat<1, 1> // [1]
type p4 = Repeat<0, 0> // []
type Repeat<T, I extends number, A extends Array<T> = []> = A["length"] extends I 
    ? A
    : Repeat<T, I, [...A, T]>

// Filter
type q1 = Filter<[1,'BFE', 2, true, 'dev'], number> // [1, 2]
type q2 = Filter<[1,'BFE', 2, true, 'dev'], string> // ['BFE', 'dev']
type q3 = Filter<[1,'BFE', 2, any], string> // ['BFE', any, 'dev']
type Filter<T extends any[], F, A extends any[] = []> = T["length"] extends 0
    ? A
    : T extends [infer L, ...infer R]
        ? [L] extends [F]
            ? Filter<R, F, [...A, L]>
            : Filter<R, F, [...A]>
        : never

// LargeThan
type r1 = LargerThan<0, 1> // false
type r2 = LargerThan<1, 0> // true
type r3 = LargerThan<10, 9> // true
type LargerThan<N1 extends number, N2 extends number, A extends any[] = []> = N1 extends N2
    ? false
    : A["length"] extends N1 
        ? false
        : A["length"] extends N2
            ? true
            : LargerThan<N1, N2, [...A, ""]>

// Add
type s1 = Add<1, 2> // 3
type s2 = Add<0, 0> // 0
type Add<N1 extends number, N2 extends number, A extends any[] = [], B extends any[] = []> = A["length"] extends N1
    ? B["length"] extends N2 ? [...A, ...B]["length"] : Add<N1, N2, A, [...B, ""]>
    : Add<N1, N2, [...A, ""], B>

// ToNumber
type t1 = ToNumber<'12'>;
type ToNumber<T extends string, A extends any[] = []> = `${A["length"]}` extends T ? A["length"] : ToNumber<T, [...A, ""];

// TODO: UnionToTuple
type m1 = UnionToTuple<1 | number | string>; // [1, number, string]
type UnionToTuple<T, A extends any[] = []> = [T] extends [any] ? T : never;

// Note: T extends any 为了使T进行类型分发，通过Exclude将每一个分别剔除；
// UnionToIntersection
type u1 = UnionToIntersection<{a: string} | {b: string} | {c: string}> // {a: string} & {b: string} & {c: string}
type UnionToIntersection<T extends any> = 
    (T extends any ? ((t: T) => void) : never) extends ((r: infer R) => any) ? R : never;

type MessageStringType = "info" | "error" | "warn";
type OneMessageTypes = UnionToBooleanProps<MessageStringType>
type Props = OneMessageTypes & { id: string; }
const ss: OneMessageTypes = {info: true} 
// function Component(props: Props) {
//     return <></>
// }
// const a = <Component id="abc" info/>           //correct
// const b = <Component id="abc" success/>        //correct
// const c = <Component id="abc"/>                //wrong
// const d = <Component id="abc" info success/>   //wrong
// 组件Component所接收的属性，有且只有一个 "info" | "success" | "warning" | "error" 中的值；
// Note: T extends any 为了使T进行类型分发，通过Exclude将每一个分别剔除；
type UnionToBooleanProps<T extends string, TT extends string = T> =
    T extends any ?
        { [k in Exclude<TT, T>]?: void } & { [k in T]: boolean; }
        : never

// TODO: Redux Connect

type v1 = PickAndRequired<{ name?: string, age?: number, flag?: boolean, id: object }, 'name' | 'flag' | 'id'>
// {name:string, age:number, id:object}

type PickAndRequired<T extends Record<string, any>, U extends string> = {
    [K in U]: T[K]
}

type v2 = ValueTypeFromMap<{ name: string, age: number, flag?: boolean }> // string|number|boolean|undefined
type ValueTypeFromMap<T> = {[K in keyof T]: T[K]}[keyof T];
// type ValueTypeFromMap<T> = T[keyof T];

// Tip: unknown 只能赋值给 unknown 和 any
type v3 = IsAny<string> // false
type v4 = IsAny<any> // true
type v5 = IsAny<unknown> // false
type v6 = IsAny<never> // false
type IsAny<T> = [unknown] extends [T]
    ? [T] extends [string] ? true : false
    : false;

// Shift
type v7 = Shift<[1, 2, 3]> // [2,3]
type v8 = Shift<[1]> // []
type v9 = Shift<[]> // []
type Shift<T> = T extends [infer L, ...infer R] ? R : []

// Tip: 原始数据类型不可以赋值给另一个原始数据类型 number不可以赋值给object
//      包装数据类型可以赋值给原始数据类型，比如 Number可以赋值给object
// IsEmptyType
type w1 = IsEmptyType<string> // false
type w2 = IsEmptyType<{ a: 3 }> // false
type w3 = IsEmptyType<{}> // true
type w4 = IsEmptyType<any> // false
type w5 = IsEmptyType<object> // false
type w6 = IsEmptyType<Object> // false
type w7 = IsEmptyType<unknown> // false
// type IsEmptyType<T> = number extends T
//     ? keyof T extends never
//         ? T extends {}
//             ? true
//             : false
//         : false
//     : false

// Tip: string => {}    string !=> object
type IsEmptyType<T> = T extends object
    ? keyof T extends never
        ? string extends T
            ? true : false
        : false
    : false;

// TODO: UnionPop
type w9 = UnionPop<1 | 2 | 3>;       // 3
type UnionPop<U> = (((fn:((x: U) => any)) => any) extends ((k: infer I) => any) ? I : never) extends ((a: infer A) => any) ? A : never;

// TupleToUnion
// Note: 
type x1 = TupleToUnion<[string, number, boolean]> // string | number | boolean
type TupleToUnion<T extends any[], X extends any = any> = T[number]

type x2 = Flat<[1, 2, 3]> // [1,2,3]
type x3 = Flat<[1, [2, 3], [4, [5, [6]]]]> // [1,2,3,4,5,6]
type x4 = Flat<[]> // []
type x5 = Flat<[1]> // [1]
type Flat<T extends any[], A extends any[] = []> = T extends [infer L, ...infer R]
    ? L extends number
        ? Flat<R, [...A, L]>
        : L extends any[]
            ? Flat<R, Flat<L, A>>
            : A
    : A

// ReverseTuple
type x6 = ReverseTuple<[string, number, boolean]> // [boolean, number, string]
type x7 = ReverseTuple<[1, 2, 3]> // [3,2,1]
type x8 = ReverseTuple<[]> // []
type ReverseTuple<T extends any[], A extends any[] = []> = T extends [...infer L, infer R]
    ? ReverseTuple<L, [...A, R]>
    : A

// UnwrapPromise
type x9 = UnwrapPromise<Promise<string>> // string
type x10 = UnwrapPromise<Promise<null>> // null
// type C = UnwrapPromise<null> // Error
type UnwrapPromise<T extends Promise<any>> = T extends Promise<infer L> ? L : never;
// Tip: 进阶 - L 如果仍然为Promise类型，递归调用UnwrapPromise

// LengthOfTuple
type y1 = LengthOfTuple<['B', 'F', 'E']> // 3
type y2 = LengthOfTuple<[]> // 0
type LengthOfTuple<T> = T extends any[] ? T["length"] : never;

// LastItem
type y3 = LastItem<[string, number, boolean]> // boolean
type y4 = LastItem<['B', 'F', 'E']> // 'E'
type y5 = LastItem<[]> // never
type LastItem<T extends any[]> = T extends [...infer L, infer R] ? R : never;

// IsNever
type y6 = IsNever<never> // true
type y7 = IsNever<string> // false
type y8 = IsNever<undefined> // false
type y9 = IsNever<any> // false
type IsNever<T> = [T] extends [never] ? true : false;

// MyNonNullable
type y10 = 'a' | 'b' | null | undefined
type y11 = MyNonNullable<y10> // 'a' | 'b'
type MyNonNullable<T> = T extends string ? T : null

// isTrue
type ab1 = isTrue<true>          // true
type ab2 = isTrue<any>           // false
type ab3 = isTrue<false>         // false
type ab4 = isTrue<boolean>       // false
type ab5 = isTrue<never>         // false
type ab6 = isTrue<null>          // false
type ab7 = isTrue<unknown>       // false
type ab8 = isTrue<{}>            // false
type ab9 = isTrue<object>        // false
type isTrue<T> = IsAny<T> extends true ? false : [true] extends [T] ? [T] extends [true] ? true : false : false;



// 实现 ComponentEmitsType<Emits> 类型，将
/*
{
    'handle-open': (flag: boolean) => true,
    'preview-item': (data: { item: any, index: number }) => true,
    'close-item': (data: { item: any, index: number }) => true,
}
*/
// 转化为类型
/*
{
    onHandleOpen?: (flag: boolean) => void,
    onPreviewItem?: (data: { item: any, index: number }) => void,
    onCloseItem?: (data: { item: any, index: number }) => void,
}
*/

function createComponent<Emits extends Record<string, any>>(emits: Emits): ComponentEmitsType<Emits> {return [{emits}] as any}

// 最后返回的 Component变量类型为一个合法的React组件类型，并且能够通过`on事件驼峰命名`的方式，监听定义的事件，并且能够自动推导出事件的参数类型
const Component = createComponent({
    'handle-open': (flag: boolean) => true,
    'preview-item': (data: { item: any, index: number }) => true,
    'close-item': (data: { item: any, index: number }) => true,
})

// Tip: 定义组件的props类型方式为 { (props: Partial<Convert<Emits>>): any }
type ComponentEmitsType<T> = {
    [K in keyof T as `on${CamelCase<K>}`] ?: T[K] extends ((...args: infer A) => any) ? (...args: A) => void : T[K];
}

// IF
type ac1 = IF<1 extends 1 | 2 ? true : false, 'aaa', 'bbb'>           // aaa
type ac2 = IF<3 extends 1 | 2 ? true : false, 'aaa', 'bbb'>           // bbb
type IF<E extends boolean, F, L> = E extends true ? F : L;

// Replace
type ad1 = Replace<'types are fun! it is so fun!', 'fun', 'awesome'> // expected to be 'types are awesome! it is so awesome!'
type Replace<O extends string, S extends string, T extends string> = O extends `${infer L}${S}${infer R}` 
    ? Replace<`${L}${T}${R}`, S, T> 
    : O;

// Merge Note:
type obj1 = {
    el: string,
    age: number
}
type obj2 = {
    el: HTMLElement,
    flag: boolean
}
type obj3 = Merge<obj1, obj2>   // {el:HtmlElement,age:number,flag:boolean}
const a = {...{} as obj3}
type Merge<T, K> = { [k in Exclude<keyof T, keyof K>]: T[k] } & K;

// 默认情况下，枚举对象中的值就是元素中某个类型的字面量类型
type ae1 = TupleToEnum<["MacOS", "Windows", "Linux"]>
// -> { readonly MacOS: "MacOS", readonly Windows: "Windows", readonly Linux: "Linux" }
// 如果传递了第二个参数为true，则枚举对象中值的类型就是元素类型中某个元素在元组中的index索引，也就是数字字面量类型
type ae2 = TupleToEnum<["MacOS", "Windows", "Linux"], true>
// -> { readonly MacOS: 0, readonly Windows: 1, readonly Linux: 2 }
type TupleToEnum<T extends string[], N extends boolean = false> = {
    readonly [K in T[number]] : N extends true ? FindIndex<T, K> : K
};

// OptionalKeys Note: 
type af1 = OptionalKeys<{ foo: number, bar?: string, flag: boolean }>        // bar
type af2 = OptionalKeys<{ foo: number, bar?: string }>                       // bar
type af3 = OptionalKeys<{ foo: number, flag: boolean }>                      // never
type af4 = OptionalKeys<{ foo?: number, flag?: boolean }>                    // foo|flag
type af5 = OptionalKeys<{}>

type OptionalKeys<T, K = keyof T> = K extends keyof T ? Omit<T, K> extends T ? K : never : never;

// RequiredKeys
type ag1 = RequiredKeys<{ foo: number, bar?: string, flag: boolean }>        
type ag2 = RequiredKeys<{ foo: number, bar?: string }>                       
type ag3 = RequiredKeys<{ foo: number, flag: boolean }>                      
type ag4 = RequiredKeys<{ foo?: number, flag?: boolean }>                    
type ag5 = RequiredKeys<{}>

type RequiredKeys<T, K = keyof T> = K extends keyof T ? Omit<T, K> extends T ? never : K : never;

// PickRequired
type ah1 = PickRequired<{ foo: number, bar?: string, flag: boolean }>        // {foo:number,flag:boolean}
type ah2 = PickRequired<{ foo: number, bar?: string }>                       // {foo:number}
type ah3 = PickRequired<{ foo: number, flag: boolean }>                      // {foo:number,flag:boolean}
type ah4 = PickRequired<{ foo?: number, flag?: boolean }>                    // {}
type ah5 = PickRequired<{}>  
type PickRequired<T> = {
    [K in RequiredKeys<T>] : T[K]
}

// PickOptional
type ai1 = PickOptional<{ foo: number, bar?: string, flag: boolean }>        // {bar?:string}
type ai2 = PickOptional<{ foo: number, bar?: string }>                       // {bar?:string}
type ai3 = PickOptional<{ foo: number, flag: boolean }>                      // {}
type ai4 = PickOptional<{ foo?: number, flag?: boolean }>                    // {foo?:number,flag?:boolean}
type ai5 = PickOptional<{}>                                                  // {}
type PickOptional<T> = {
    [K in OptionalKeys<T>] : T[K]
}

// StringToUnion
type aj1 = StringToUnion<"123">; // expected to be "1" | "2" | "3"
type StringToUnion<T> = T extends `${infer L}${infer R}` 
    ? L | StringToUnion<R>
    : never;

// IsUnion
type ak1 = IsUnion<string>  // false
type ak2 = IsUnion<string|number>  // true
type ak3 = IsUnion<[string|number]>  // false
// Note: 利用类型分发的原理，判断T是否为union类型
type IsUnion<T, U = T> = T extends any
        ? [U] extends [T] ? false : true 
        : false

// Diff
type al1 = Diff<{a: 1, b: 1}, {a: 1, c: 1}>
type toObject<T> = {
    [K in keyof T]: T[K]
}
type Diff<T, U> = toObject<Omit<T, keyof U> & Omit<U, keyof T>>

// AppendToObject
type am1 = AppendToObject<{id: 1}, "name", "Mino">
type AppendToObject<T, K extends string, V, R = T & { [P in K]: V }> = {
    [P in keyof R]: R[P]
}

// Absolute
type an1 = Absolute<-100>; // expected to be "100"
type Absolute<T extends number, A extends any[] = []> = `${A["length"]}` extends `${T}`
    ? T
    : `-${A["length"]}` extends `${T}`
        ? `${A["length"]}`
        : Absolute<T, [...A, void]>

// ReplaceKeys
type NodeA = {
    type: 'A'
    name: string
    flag: number
}

type NodeB = {
    type: 'B'
    id: number
    flag: number
}

type NodeC = {
    type: 'C'
    name: string
    flag: number
}
type Nodes = NodeA | NodeB | NodeC
type ReplacedNodes = ReplaceKeys<Nodes, 'name' | 'flag', {name: number, flag: string}> // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} // would replace name from string to number, replace flag from number to string.
type ReplacedNotExistKeys = ReplaceKeys<Nodes, 'name', {aa: number}> // {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number} // would replace name to never        
type ReplaceKeys<T, K, V> = 
    T extends any
        ? {
            [P in keyof T]: P extends K
                ? P extends keyof V
                    ? V[P]
                    : never
                : T[P]
        }
        : never

// RemoveIndexSignature
type ao1 = RemoveIndexSignature<{
    [key: string]: any;
    foo: string;
}>  // expected { foo(): void }
type RemoveIndexSignature<T> = { // 索引的类型为string | number
    [P in keyof T as (string extends P ? never : number extends P ? never : P)]: T[P];
}
                

// PromiseAll
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});
const p1 = Promise.all([promise1, promise2, promise3] as const) // expected to be `Promise<[number, number, string]>`
// Note: as const 为类型断言，断言为自己的类型；不加的话结果为number，number，string；加了就是number，42，string

// Note:  函数重载、函数声明、Promise<{...}> 这里 {} 中的转出来的为数组
function PromiseAll<T extends readonly any[]>(values: readonly [...T]): Promise<{
    [P in keyof T]: T[P] extends Promise<infer R> ? R : T[P]
}>
function PromiseAll(values){
    return Promise.all(values)
}

// AppendArgument
type Fn = (a: number, b: string) => number
type Result = AppendArgument<Fn, boolean>  // 期望是 (a: number, b: string, x: boolean) => number
type AppendArgument<T, U> = T extends (...args: infer P)=>infer R ? (...args: [...P, U])=>R : never;

// Note:
type perm = Permutation<'A' | 'B' | 'C'>;  // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
type Permutation<T, U = T> = [T] extends [never] // 防止类型分发，并且Exclude结果可能会使never，所以要判断一下
    ? []
    : T extends any // 类型分发，递归调用Permutation
        ? [T, ...Permutation<Exclude<U, T>>]
        : []




