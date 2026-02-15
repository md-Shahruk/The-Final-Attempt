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
### NoN-primitive
- mutable
- work by reference
```js
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
```

### Shallow and Deep copy
```js

In reference type , when copy- here copy the the reference not the actual object.

let obj1 = { name: "Shahruk" };
let obj2 = obj1;

obj2.name = "Rahim";

console.log(obj1.name); // Rahim - obj1 and obj2 point the same memory location
This is where shallow and deep copy matters

### Shallow copy
   - A shallow copy copies only the first level
   - Nested objects are still share same reference.
   let user1 = {
    name: "Shahruk",
    address:{
        city: "Dhaka",
    }
    };

    let user2 = {...user1};
    user2.name = "Rahim";
    user2.address.city = "Sylhet";
    console.log(user1.name); // still: Shahruk not change to Rahim
    console.log(user1.address.city); // but this change Dhaka to Sylhet cause: user1.address === user2.address // true 

### Deep copy
   - deep copy creates a completely new object, including all nested levels.
   - no shared references
    let user3 = structuredClone(user1);
    user3.address.city = "Chittagong";
    console.log(user1.address.city); // actuall output: Dhaka cause: user1.address === user3.address // false

```

### Nullish Coalescing
- The nullish coalescing operator (??) returns the right-hand value only if the left hand value is **null** and **undefined**.
- let result = value ?? defaultvalue; if value is null or undefined use defaultvalue
  
```js
### before ?? developers use 
   value || defaultvalue
   # Problem
   let count = 0;
   let res = count || 10;
   console.log(res) // 10 because- || check only falsy not nullish and 0 is falsy value in js, but 0 is valid value not missing

   Now with ??:
   let count = 0;
   let res = count ?? 10;
   console.log(res) // 0

```

### Optional chaining ?.
- Optional chaining lets safely access deeply nested properties without crashing if something is null or undefined

```js
 ### Without optional chaining
    user.address.city; if address undefined- runtime error because js assume address exists

    With optional chaining
    user?.address?.city; if address undefined - return undefined no crash
```

### Type Coercion
- Type Coercion = JavaScript automatically converting one type to another.
- Implicit coercion - JS converts automatically
- Explicit coercion - You convert manually 
- Js tries to convert values into one of three primities types:
  - String
  - Number
  - Boolean
```js
### String coercion
   '5' + 2     // "52"
   true + "3"  // "true3"

### Number Coercion
    '5' - 2      // 3
    '10' * '2'   // 20
    true + 1     // 2
    false + 1    // 1

    Number("5")        // 5
    Number("")         // 0
    Number("abc")      // NaN
    Number(null)       // 0
    Number(undefined)  // NaN
    Number(true)       // 1
    Number(false)      // 0

### == vs ===
   ==: allow coercion
   ===: strict comparision no coercion
    5 == "5"     // true
    5 === "5"    // false

    null == undefined   // true
    null === undefined  // false

    '' == 0     // true
    '' === 0    // false

### weired cases
    [] + []         // ""
    [] + {}         // "[object Object]"
    {} + []         // 0   (context dependent)
    true + true     // 2

### || and && don’t return boolean.
   0 || "Hello"      // "Hello"
   "Hi" && 5         // 5

   || → returns first truthy value
   && → returns first falsy value (or last truthy)

    '5' + 3 // 53
    '5' - 3 // 2
    true + '2' //true2
    null + 1 // 1
    undefined + 1 // NaN
    [] + 1 // 1
    [1] + 1 // 11
    [1,2] + 1 // 1,21


```

### Interesting Stuff
```js
 console.log(5 > 3 > 2) // false
 - js check left to right so 5>3 true, true = 1 > 2 false

 console.log("10" < "9") // true
 - Both "10" and "9" are strings, not numbers.
 - When using < with strings, JavaScript does lexicographical (dictionary) comparison, not numeric   comparison.

```

### Scope(block, function, global)
#### Global Scope
- global scope means variables that accessiable anywhere in code, from any function or block.
```js
    //  global scope
    let userName = "Shahruk";

    function sayHello() {
    console.log("Hello " + userName);
    }

    function changeName() {
    // can also change here
    userName = "Shatil";
    }

    sayHello();    // Hello Shahruk
    changeName();
    sayHello();    // Hello Shatil
    
    # Problem:
      - everything can change everything
      - global variable stay in memory forever
```

#### Local Scope
- Local scope means variables that are only accessiable inside a specific function or block. They are private and can't be seen from outsise.
- Two types of local scope
   - function scope using(var, let,const)
   - block scope (let, const, inside{}) , **var** ignore block scope

```js
  ## Function scope
    function greet() {
    let message = "Hello!";  // Local variable
    console.log(message);    // Hello
    }

    greet();
    console.log(message);      // show error not accessiable
 
 ## block scope
    if (true) {
    let age = 25;  // block scope      
    const name = "Shahruk";  // block scope
    var oldWay = "Oops"; //
    
    console.log(age); // 25  
    }

    console.log(age);  // error   
    console.log(name);  // error   
    console.log(oldWay); // work , var ignore block scope  

## Why local scope:
  - no naming conflict
  - automatic cleanup
  - better security
    
```

### Lexical Scope
- Lexical scope also called static scope means that where a variable is accessiable depends on where it is written in the code, not where it is called from.
```js
    let level = 0;  // 0 global

    function level1() {
    let level = 1;  //1
    
    function level2() {
        let level = 2;  // 2
        
        function level3() {
        let level = 3;  // l 3
        console.log(level);  // 3 
        }
        
        function level3_other() {
        console.log(level);  // 2 
        }
        
        level3();        // 3
        level3_other();  // 2
    }
    
    level2();
    }

    level1();
```
