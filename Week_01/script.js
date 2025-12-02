

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
