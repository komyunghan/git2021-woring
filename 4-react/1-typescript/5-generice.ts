// generic: 제너릭, 제네릭, 쥐네릭
// 타입 매개변수
function identity<Type>(arg: Type): Type {
  return arg;
}

let output1 = identity<string>("Typescript");
let output2 = identity<number>(1);