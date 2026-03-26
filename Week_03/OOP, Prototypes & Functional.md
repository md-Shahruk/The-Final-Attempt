# Topics will be covered:
-  Objects & the Prototype Chain
-  this Binding (4 Rules)
-  Functional Programming
-  Project Implement **map**, **filter**, **reduce** from scratch 
-  Custom Event Emitter (on, emit, off)

## Objects & the Prototype Chain 
### Topic-1: How Objects Work Under the Hood
#### In JS every object has a internal link to another object that link is called [[Prototype]].
```js

    const animal = {
        breathes: true,
    }
    const dog = {
        barks: true
    }
    dog.__proto__ = animal; // dog prototype is now animal
    console.log(dog.breathes); // true: not on dog but find from animal by  the chain
    console.log(dog.files); // undefined 

```

#### JS dosen't copy properties from one object to another, its link them, the chain is live, if the property changes, all objects link to it see the changes.

### Topic-2: Object.create 
```js
    const animal = {
    breathes: true,
    describe() {
        console.log("I am an animal");
    }
    };

    const dog = Object.create(animal); // dog prototype is animal

    dog.barks = true;
    // dog only has "barks" everything else comes through the chain
    console.log(dog.barks);    // true  - own property
    console.log(dog.breathes); // true  - inherited from animal
    dog.describe();            // I am an animal - inherited from animal
```
```js
   Modern Way to check the prototype:
         console.log(Object.getPrototypeOf(dog) === animal); // true
```

```js
   const bare = Object.create(null);
   console.log(bare.toString); // undefined  no Object.prototype in the chain
```

### Topic-3: The `new` keyword 
#### When call a function with `new` js doing 4 specific steps automatically
#### When write `new Foo()`, js does automatically:
- Create a new empty object `{}`
- Sets its [[Prototype]] to `Foo.prototype`
- Runs the function with `this` - pointing to that new object
- Returns the function
```js
  function Dog(name) {
  this.name = name;  // step 3 — 'this' is the new empty object
  this.barks = true;
    }

    const r = new Dog("Rexon");

    console.log(r.name);  // "Rexon"
    console.log(r.barks); // true
    console.log(Object.getPrototypeOf(r) === Dog.prototype); // true — step 2
```

```js
  Dog.prototype:
  - Every object created with new Dog() gets it [[Prototype]] linked to this one shared object.So if put a method on Dog.prototype, every instance inherits it — without copying it.

    Dog.prototype.describe = function() {
    console.log("I am " + this.name);
    };

    const rex = new Dog("Rex");
    const rex2 = new Dog("Rex2");

    rex.describe();  // "I am Rex"
    rex2.describe(); // "I am Rex2"

    - describe is not copied into rex or rex2. It lives on Dog.prototype 
    - Dog.prototype is a plain object that JS creates automatically. All instances made with new Dog() share it as their prototype.
```
#### What is `this` Doing Inside the Constructor?
#### When call a function with `new`, `this` inside the function refer to brand new empty object that `new` just created.
```js
    function Dog(name) {
    this.name = name;
    this.barks = true;
    }

    const rex = new Dog("Rex");
    

    When `new Dog("Rex")` runs, here's exactly what happens internally:
    
    Step 1: new creates {}  →  this = {}

    Step 2: this.name = "Rex"  →  this = { name: "Rex" }

    Step 3: this.barks = true  →  this = { name: "Rex", barks: true }

    Step 4: return this  →  rex = { name: "Rex", barks: true }
```
#### let see how new keyword work internally
```js

    // let see how new keyword work internally

    function myNew(Constructor, ...args){
        const obj = Object.create(Constructor.prototype);
        const result = Constructor.apply(obj,args);
        return result instanceof Object ? result : obj;
    }

    function Person(name){
        this.name = name; 
    }

    const hello =  myNew(Person , "Shahruk");
    console.log(hello.name);// Shahruk
    // new = object create + prototype linking + constructor call + return override logic

    
```

### Topic-4: `class` Syntax
#### `class` is the cleaner syntax of prototype linking + `new` keyword 

#### Constructor Function vs Class
```js
// OLD Way- constructor function
    function Dog(name){
        this.name = name;
        this.barks = true;
    }
    Dog.prototype.describe = function(){
        console.log("Hello" +  this.name);
        
    }
    const dogg = new Dog("Piku");

    // New way - class syntax
    class Dog{
        constructor(name){
            this.name = name;
            this.barks = true;

        }

        describe(){
            console.log("Hello" + this.name);
            
        }
    }
    const doggg = new Dog("Pikuu");
```
#### methods are defined once on the prototype, not copied into every instance. That's what makes it memory efficient.
#### The only things that live directly on rex are properties set via this inside the constructor:
```js
 constructor(name) {
  this.name = name;  // ← this lives on rex
  this.barks = true; // ← this lives on rex
}
```



## this Binding (4 Rules)
### Topic-1: Implicit Binding
#### When call a method through an object using the `dot` notation that is implicit binding.
> `this` = the object to the left of the dot at call time
```js
   const dog ={
    name: "Piku";
   }
   dog.name; // the object to the left of the dot is dog. so this = dog.
```
#### Losing implicit  binding
```js
   const dog = {
    name: "piku",
    describe (){
       console.log(this.name);
    }
   }

   const fnn = dog.describe; // just copying the function reference 
   fnn(); // " " 'this' is now the global object not dog
```

### Topic-2: Explicit Binding `(call, apply, bind)` 
#### Explicit Binding - When you run use this object as `this`.
#### `call` - Invoke immediately, Pass Args one by one
```js

    function introduce(city, country){
    console.log(this.name + " is form " + city + ", " + country);
    
    }
    const user = {name: "Shahruk"};

    introduce.call(user, "Dhaka", "Bangladesh.");

```
> First agr = what `this` should be. Rest = function arguments

#### `apply` - Invoke immediately, Pass Args as Array
```js
   introduce.call(user, ["Dhaka", "Bangladesh"]);
```

#### `bind` - return a new Function, dosent call immediately
```js
   const bindIntro = introduce.bind(user, "Dhaka", "Bangladesh");
   bindIntro();
```
> `bind` lock `this` permanently and reutn a new function. Call it later when need.

#### Let's fixing lost implicit binding with `bind`
```js
   const dog = {
    name: "piku",
    describe (){
       console.log(this.name);
    }
   }

   const fnn = dog.describe; // just copying the function reference 
   fnn(); // " " 'this' is now the global object not dog

   Solve:
   const fnn = dog.describe.bind(dog);
   fnn(); // piku
```

### Topic-3: Arrow Functions and `this`
#### Arrow function don't have theri own `this` insted they inherit `this` from surrounding scope why they were defined and this is called lexical this.
> Regular functions vs Arrow functions
```js
   const dog = {
    name: "piku",
    intro: function(){
        log(this.name); // this = dog
    }
   }
   dog.intro(); // piku

   const dog = {
    name: "piku",
    intro:()=>{
        log(this.name); // this = global object
    }
   }
   dog.intro(); // undefined
```
> arrow function doesn't get its own `this` it looks outside the scope where `dos` was defined that is the global scope.

#### Arrow functions shine - inside callbacks
```js
   The regular function inside setTimeout loses this.So, no longer called dog.
   const dog = {
    name: "piku",
    waitThenintro() {
        setTimeout(function() {
        console.log(this.name); // undefined — lost binding
        }, 1000);
    }
    };

    dog. waitThenintro();


    # Fix it with arrow function:
    const dog = {
    name: "piku",
    waitThenintro() {
        setTimeout(() => {
        console.log(this.name); // "Rex" ✅
        }, 1000);
    }
    };

    dog.waitThenintro();
```

> arrow ignores explicit binding
```js
  const greet = () => {
    console.log(this.name);
    };

    const user = { name: "Shahruk" };

   greet.call(user); //  undefined - arrow ignores explicit binding
```

## Functional Programming
### Topic-1: Pure Functions & Side Effects
#### Insted of telling JS how to do something step by step, focus on on functions that take input and return output - nothing else.
- Same input always gives same output.
- dosen't change anything outside itself 
```js
   function add(a,b){
    return a + b;
   }
   add(2, 5); // always 5 no matter what
```
>- What is side effect?
```js
  
    let total = 0;

    // Impure modifies outside variable total
    function addToTotal(n) {
    total += n;
    }

    // Impure console.log is a side effect
    function add(a, b) {
    console.log("adding");
    return a + b;
    }

    // Impure  depends on outside variable
    let tax = 0.1;
    function getPrice(price) {
    return price + price * tax; // result changes if tax changes
}
```
> Pure function = same input → same output + no side effects. doesn't read from or write to anything outside itself.

### Topic-2: Immutability
#### don't change existing data, create new data instead.
> Mutation - modifies the orginal array
```js
   const numbers = [1,2,3];
   function addNumber(arr, num){
    arr.push(num);
    return arr;
   }
   addNumber(numbers, 5);
   log(numbers) // 1,2,3,5 : orginal changed
```

> Immutable array - leaves orginal array alone
```js
   const numbers = [1,2,3];
   function addNumber(arr, num){
    return [...arr,num];
   }
   const newNumber = addNumber(numbers, 4);
   log(numbers); // 1,2,3
   log(addNumber); // 1,2,3,4 new array
```
