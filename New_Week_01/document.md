# Data Types
- Primitive: Store the actual value in the variable
- Non-primitive: store a reference where the variable is stored
- Primitive value copy
- Object reference copy 

### Number
- NaN for failed math operation
```js
console.log(5 / 0) // infinity
console.log(-5 / 0) // -infinity

console.log(0 / 0) //NaN
console.log(infinity - infinity) // NaN
console.log(infinity*0) //NaN

// Wired
(NaN === NaN) // false
isNaN or Number.isNaN(NaN) // true 

// trap tpyeof null === 'object'.
let x = null;
console.log(typeof x); // object (js quirks)
console.log(x === null); // true


// proof functions are object
// function is not only object it is callable object
function g(){};
console.log(typeof g); // function
// but 
g.name = "Shahruk";
s = g instanceof Object;
console.log(s);// true
```
### Falsy value in Js
```js
false, 0, -0, 0n, "", null, undefined, NaN
```
### null & undefined
```js
undefined - variable declared but not assign, js default behaviour
null - intentional empty value, developer sets it

null == undefined // true (both represent empty)
null === undefined // fasle (different types)
null + 5 // 5 --- null converts to 0
undefined + 5 // NaN --- undefined convert NaN
!null // true
!undefined // true
```

### Symbol
```js
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
````

### break 
```js
```

### Big Int
```js
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
```
