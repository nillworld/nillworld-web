import * as CryptoJS from "crypto-js";

class Student {
  fullName: string;
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.textContent = greeter(user);

class nillsBlock {
  static calculateBlockHash = (index:number, previousHash: string, data:string, timeStamp: number): string =>
    CryptoJS.SHA256(index + previousHash + timeStamp, data).toString();

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timeStamp: number;



  constructor(index, hash, previousHash, data, timeStamp){
    this.index = index;

  }
}