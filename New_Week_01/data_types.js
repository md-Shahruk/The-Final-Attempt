
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