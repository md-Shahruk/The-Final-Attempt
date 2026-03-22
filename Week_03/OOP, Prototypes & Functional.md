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