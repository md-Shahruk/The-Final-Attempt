

///------------------------------------------------------- Data Types -------------------------------------------------------------
/// Primitive 
// Number - special number values
let infinity = Infinity;
let negInfinity = -Infinity;
let notNumber = NaN; // Types is number but means not a number
console.log(notNumber); // Output: NaN
console.log(typeof notNumber); // ouput: number


/// Boolean
Boolean(""); // false
Boolean("shahruk")// true


///Undefined
let a;
console.log(a); // undefined
function f (){

}
console.log(f()); // undefined

// NULL
let e = null; // represent intentional absence of any object value
console.log(typeof null); // object (historical bug)

/// Symbol
let name1 = Symbol('Shahruk');
let name2 =  Symbol('Shahruk');
console.log(name1 === name2); // false , always unique

let name3 = Symbol.for('Shahruk');
let name4 =  Symbol.for('Shahruk');
console.log(name3 === name4); // true , Symbol.for() check the global registry (same key = same symbol)

/// BigInt
let big = 100n;
let big2 = BigInt(90000000000012);


/// Reference (objects)
// object plain objcet
// Collection of key-value pairs
let person = {
  name: "Shahruk",          
  age: 25,               
  "full name": "John Doe", // Multi-word key needs quotes
  123: "numeric key",    // Numeric keys get converted to strings
  isAdmin: true,         
  address: {             // Nested object
    city: "Dhaka",
    zip: 10001
  },
  sayHello: function() { // Function as value (method)
    return "Hello!";
  }
};
console.log(person.name);
console.log(person["full name"]);
console.log(person[123]);

/// Array 

let arr = [1, "hello", true, null, {x: 10}];
console.log(Array.isArray(arr)); // proper way to check


// Function
function h(){
    return "Shahruk";
}
console.log(h instanceof Object); // true

/// other build in object
new Date();
new Error();
new RangeError();
new Map();
new Set();


/// Type Detection Methods
console.log(Object.prototype.toString.call([])); // [object Array]
Object.prototype.toString.call({});        // "[object Object]"
Object.prototype.toString.call(null);      // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(123n);      // "[object BigInt]"

/// Special values and Edge cases
// NaN (Not-a-Number)
// NaN is the only value in js that is not equal to itself
console.log(0/0); // NaN
console.log(Infinity / Infinity); // NaN
console.log("s" * 5); // NaN
isNaN(NaN);             // true
isNaN("hello");         // true (converts to NaN)
Number.isNaN(NaN);      // true 
Number.isNaN("hello");  // false 
// function for check NaN
function isNaN(x){
    return x !== x;
}

// Infinity 

let posInf = Infinity;
let negInf = -Infinity;

console.log(1 / 0);          // Infinity
console.log(-1 / 0);         // -Infinity
console.log(1 / Infinity);   // 0
console.log(-1 / Infinity);   // -0
console.log(Infinity / Infinity); // NaN (indeterminate)
console.log(0 * Infinity);      // NaN (indeterminate)
console.log( 0 / Infinity); // 0

typeof Infinity;        // number
Infinity > 1000000;     // true
-Infinity < -1000000;   // true

/// Null vs Undefined Comparison
// (==) when  lose equality
null == undefined;   // true 
null == 0;           // false
null == "";          // false
undefined == 0;      // false

// Strict equality (===) 
null === undefined;  // false
null === null;       // true
undefined === undefined; // true


Number(null);        // 0
Number(undefined);   // NaN

null + 10;           // 10 - because null becomes 0
undefined + 10;      // NaN

/// PRACTICAL EXAMPLES
console.log(1 + "2" + 3); // 123
console.log(1 + + "2" + 3) // 6

let aa = "hello";
let bb = "hello";
console.log(aa === bb); // true 

let obj1 = {x: 1};
let obj2 = {x: 1};
console.log(obj1 === obj2); // false - different references

let obj3 = obj1;
console.log(obj1 === obj3); // true (same reference)

///// Arrays are object in the javascript

let ar = [1, 2, 3];
ar.prop = "a property"; // Arrays can have properties!
console.log(ar.prop);        // "I'm a property"
console.log(ar.length);      // 3 length ignore properties

// The quirks (unexpected behaviors)
typeof null  // "object"  (BUG!)
// Should return: "null" 
typeof []  // "object"  (Technically correct but misleading)
// Should return: "array"  (but would break compatibility)
// Use: Array.isArray([]) // true
typeof NaN  // "number"  (Technically correct but confusing)
// It's technically a number value, just "Not a Number"
// Should conceptually be: "nan" 
typeof function(){}  // "function"  (Special treatment!)
// But functions ARE objects:

typeof Function  // "function"
typeof Object    // "function" (constructors are functions)
typeof new Date()  // "object" 
// Should return: "date" 
// Check with: date instanceof Date

//  better use Object.prototype.toString.call() for check

console.log([] + []); //  " " empty array become empty string
console.log([] + {});
console.log({} + []); // {} treate code block

// Use !! to quickly convert any value to a proper boolean:
console.log(!!"hello");    // true
console.log(!!"");         // false
console.log(!!0);          // false
console.log(!!1);          // true

// (??) Only treats null and undefined as "nullish"
let namee = "";
console.log(namee || "Guest");  // "Guest"  (empty string is falsy)
console.log(namee ?? "Guest");  // ""  (keeps empty string) 


/// ------------------- Shallow and Deep Clones -----------------------------------------------------------

// First understand the problem

let match = {
  team: "Bangladesh",
  scores: [150,200,250],
  venu:{
    city: "Dhaka",
    area: "Mirpur",
  }
}

let copy = match; // copies the reference not the object
//copy.team = "Australia";
console.log(match.team); // Output: Australia - orginal changed

// Solution_01: Shallow clone: shallow clone create a new object and copies only the top level properties
function shallowClone(ob){
  return {...ob};
}

let shallowCopy =  shallowClone(match);
shallowCopy.name = "England";
shallowCopy.scores.push(350);
console.log(match.team); // Ouput: Bangladesh 
console.log(match.scores); // here [150, 200, 250, 350] so, affected orginal
/*
Limitations: nested object / array still share referrences
*/

// Solution_02: Deep clone: deep clone creates a complete independent copy, including all nested objects.

function deepClone(ob){
  // for primitive value handle
  if(ob === null || typeof ob !== 'object'){
    return ob;
  }
  
  // handles array
  if(Array.isArray(ob)){
    return ob.map(item => deepClone(item));
  }

  // handle object
  const cloneObject = {};
  for(let key in ob){
    if(ob.hasOwnProperty(key)){
      cloneObject[key] = deepClone(ob[key]);
    }
  }
  return cloneObject;
  
}

let deepCloneCopy = deepClone(match);
deepCloneCopy.name = "England";
deepCloneCopy.scores.push(400);
console.log(match.team); // Ouput: Bangladesh 
console.log(match.scores); // here no add 400 output: [150, 200, 250, 350]



// ---------------------------------------------Scope (block, function, global, lexical )----------------------------------------------

// block scope where let and const work but var ignoers
if (true){
  let letVar = "I am let";
  const constVAr = "I am const";
  var varVAr = "I am var";

  console.log(letVar); // works
  console.log(constVAr); // works
  console.log(varVAr); // works
}
//console.log(letVar); // error
//console.log(constVAr); // error
//console.log(varVAr); // works


let aaa = 1;

function second() {
    let aaa = 2;
    first(); 
}

function first() {
    console.log(aaa); // output: 1, because function look for variables where they are defined, not where they are called.
}

second(); 

// but scope resolution order: when a variable is refferenced 
// current function - outer function - continue up the chain - global - not fine( reference error)

// let aaaa = 1;

// function second() {
//     let aaaa = 2;
//     function first() {
//     console.log(aaaa); // output: 2,
//   }
//     first(); 
// }

// second(); 


// The classic for loop problem (let vs var)

 for (var i = 0; i<4; i++){
  setTimeout(()=>console.log(i), 100);
 } 
 // output: 4,4,4,4

 for (let i = 0; i < 4; i ++){
  setTimeout(()=>console.log(i),100);
 }
 // output: 0,1,2,3
  
/* var -- one box (function scope)
   let --  each loop round new box (block scope)

   For var: 
   - until loop finish cant execute setTimeout()
   - that means after finish loop then execute console.log()
   - but var i has one variable, whatever happens in loop i is the only variable throughout the entire loop
   - in loop:
       i = 0, i = 1, i = 2, i = 3, i = 4 (stop loop)
   - since i is only one and present value = 4 thats why print 4,4,4,4

   For let:
   - let - block scope
   - each iteration js create new i 
     iter_1: let i = 0
     iter_2: let i = 1
     iter_3: let i = 2
     iter_4: let i = 3
   - go to next iteration the previous i becomes completely new
   - and setTimeout() keeps each iteration i
   - each setTime maintaince its own copy of i
   so output: 0,1,2,3

   var - does not create separate i in the loop - all callbacks take the last value.
   let - separate scope in each iteration - callback takes its own value.

   let - everyone has their own i - different result
   var - everyone sees the same i - same result

*/



