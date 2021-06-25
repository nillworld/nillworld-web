// const name: string = "Nill",
//     age = 29,
//     gender = "male";

const sayHi = (name: string, age: number, gender?:string): void => {
    if (gender == undefined){
        gender = "undefined gender person"
    }
    console.log(`Hello ${name}, you are ${age}, you are a ${gender}`)
}

sayHi("Nill", 18);

export{}
