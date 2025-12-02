
# **Data Types**
### **Two Main Categories**

#### **1. PRIMITIVE TYPES (Value Types)**

**Characteristics:**

- Immutable (cannot be changed after creation) 
- Stored directly in memory (stack)
- Compared by **value** 
- When copied, a **new value** is created 
- Number, String, Boolean, Undefined, Null, Symbol, BigInt 
  
**falsy values:**false, 0, -0, 0n (BigInt zero), "" (empty string), null, undefined, NaN

#### **2. REFERENCE TYPES (Objects)**

**Characteristics:**

- Mutable (can be modified after creation)
- Stored in heap, accessed via reference
- Compared by **reference** (memory address)
- When copied, only the **reference** is copied

#### **Special values and Edge cases:**

**NaN**
```js
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
- NaN === NaN return false? NaN represents an undefined or unrepresentable value. Since NaN could come from different undefined operations, they're considered unequal by definition.
```
**Infinity**
```js

let posInf = Infinity;
let negInf = -Infinity;

console.log(1 / 0);          // Infinity
console.log(-1 / 0);         // -Infinity
console.log(1 / Infinity);   // 0
console.log(Infinity / Infinity); // NaN (indeterminate)
console.log(0 * Infinity);      // NaN (indeterminate)
console.log( 0 / Infinity); // 0

typeof Infinity;        // number
Infinity > 1000000;     // true
-Infinity < -1000000;   // true 
```
**Null vs Undefined Comparison**
```js
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
```
#### **Memory model for Data Types**
**Primitive in memory**
```js
let a = 42;      //  42 stored in stack
let b = a;       // new copy of 42 created
b = 100;         // b changed, a unaffected
console.log(a);  // 42
console.log(b);  // 100

STACK MEMORY
Address   | Variable | Value
---------|----------|------
0x001    | a        | 42
0x002    | b        | 42 (copy of value)
```

**Objects in memory**
```js
let obj1 = { x: 10, y: 20 }; // Object in heap, reference in stack
let obj2 = obj1;              // Copy REFERENCE, not object
obj2.x = 100;                 // Modifies the shared object
console.log(obj1.x);          // 100 (both affected)

STACK           | HEAP
Variable | Reference  | Address | Object
--------|------------|---------|------
obj1    | 0x100      | 0x100   | {x: 10, y: 20}
obj2    | 0x100      |         | 
```
---

# **Shallow and Deep Clones**
```js
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
  cloneObject = {}
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


```