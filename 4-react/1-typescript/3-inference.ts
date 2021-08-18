// 타입 추론
// type inference

// 첫번째 대입값에 따라서 형식을 자동변환
let firstname = "John"; // let firstname: string = "John"
console.log(firstname.toUpperCase());

// firstname = 1; // type error

// 첫번째 글자를 대문자로 변환하는 함수
function capitalize1(str: string) {
  // IDE(intergrated development evironment)에서 매개변수가 문자인것을 인지함
  // 해당 형식에 맞는 함수나 속성을 자동완성하여 사용할 수 있게됨
  return str[0].toUpperCase() + str.substr(1);
}

console.log(capitalize1("javascript"));