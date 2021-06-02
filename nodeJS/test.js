// 함수도 data이기 때문에 배열과 객체에도 담을 수 있다.

var test = () => {
  console.log("test");
  return "yap";
};

var k = [test];
k[0]();
k[0];

var j = { function: test };
console.log(j.function);
console.log(j.function());
j.function();

var moduleTest = require("./moduleTest.js");
moduleTest();
