"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const name = "Nill", age = 29, gender = "male";
const sayHi = (name, age, gender) => {
    if (gender == undefined) {
        gender = "undefined gender person";
    }
    console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
};
sayHi(name, age);
//# sourceMappingURL=index.js.map