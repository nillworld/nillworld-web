interface Human {
    name: string;
    age: number;
    gender: string;
};

class Human2 {
    public name: string;
    public age: number;
    public gender: string;

    constructor(name: string, age: number, gender?: string){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
};

const nill = new Human2("Nill", 25, "male");

const person = { 
    name: "Nill",
    age: 22,
    gender: "male"
};

const sayHi = (person:Human):void =>{
    console.log(`Hello ${person.name}, you are ${person.age}, you are a ${person.gender}`)
};

const sayHi2 = (name: string, age: number, gender?:string): void => {
    if (gender == undefined){
        gender = "undefined gender person"
    }
    console.log(`Hello ${name}, you are ${age}, you are a ${gender}`)
}
sayHi2("Nill", 18);

sayHi(person);



export{}
