
// typeof null === "object"
let x = null;
console.log(typeof x);
console.log(x === null);

// proof functions are object
function g(){};
console.log(typeof g); // function
// but 
g.name = "Shahruk";
s = g instanceof Object;
console.log(s);// true



// [] is array but show object
a = []
console.log(typeof a); // object
console.log(Array.isArray(a)); // true

// 
console.log("Symbol");
const sm1= Symbol(123);
const sm2 = Symbol(123);
console.log(sm1 === sm2); // false

// why need to use symbol
hostel = {}
hostel.locker = "Shahruk Books";
hostel.locker = "Rahim books";
console.log(hostel.locker); // Rahim books but shahruk data lost
// so if use symbol here create uniqueness

const shrukbook = Symbol('locker');
const rahimbook = Symbol('locker');
hostel2 = {}

hostel2[shrukbook] = "Shahruk books";
hostel2[rahimbook] = "Rahim books";
console.log(hostel2[shrukbook]); // Shahurk books



// Big Int
console.log("Big Int");
console.log(Number.MAX_SAFE_INTEGER); //9007199254740991
console.log(Number.MIN_SAFE_INTEGER); //-9007199254740991

// if one increase
let bigNumber = 9007199254740992; 
console.log(bigNumber);   // ok 

let bigger = 9007199254740993;  
console.log(bigger); // look same

let safeNumber = 9007199254740993n;  // 'n' add BigInt
console.log(safeNumber);  // 9007199254740993n 

// non-primitive
console.log("Non-primitive");
// object
// Object literal
const student = {
    name: "Shahruk",
    age: 20,
    subjects: ["Math", "Biology"],
    address: {
        city: "Dhaka",
        area: "Mirpur"
    },
    study: function() {
        console.log("Study...");
    }
};

// Access 
console.log(student.name);       
console.log(student["age"]);      
console.log(student.address.city); 
student.study();                   

// shallow copy & deep copy
console.log("Shallow copy and Deep copy");
/**
 In reference type , when copy- here copy the the reference not the actual object.

let obj1 = { name: "Shahruk" };
let obj2 = obj1;

obj2.name = "Rahim";

console.log(obj1.name); // Rahim - obj1 and obj2 point the same memory location
This is where shallow and deep copy matters

 */

console.log("Shallow copy")
let user1 = {
    name: "Shahruk",
    address:{
        city: "Dhaka",
    }
};

let user2 = {...user1};
user2.name = "Rahim";
//user2.address.city = "Sylhet";
console.log(user1.name); // still: Shahruk not change to Rahim
console.log(user1.address.city); // but this change Dhaka to Sylhet cause: user1.address === user2.address // true 

console.log("Deep copy");
let user3 = structuredClone(user1);
user3.address.city = "Chittagong";
console.log(user1.address.city); // actuall output: Dhaka cause: user1.address === user3.address // false

// nullish
console.log("nullish");

let count = 0;
let res = count || 10;
console.log(res);
let ress = count ?? 10;
console.log(ress);

