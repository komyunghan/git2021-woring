// any 타입
const obj: any = {};
obj.name = "hong";
obj["phone"] = "01012341234";
delete obj.name;
console.log(obj);

// 배열
const arr: any[] = [];
arr.push({ name: "hong", phone: "01012341234" });
console.log(arr);

let var1: any;
