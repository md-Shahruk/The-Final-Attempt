# Topics will be covered:
- JS execution model
- The memory heap 
- Hoisting
- TDZ (Temporal Dead Zone)


### JS execution model
*Js runs on a single thread. one thing at a time always*
- The four moving part:
  - Call Stack: code actually run, functions get pushed on ,popped off.
  - Web ApIs : the browser runtime handles async work(timers, fetch, event) outside the stack. Js hands off the work and forgets about it.
  - Callback Queue: async work finish, its call back waits here and only enter the stack when the stack is **completly empty**.
  - The Event Loop: constantly checks - is the stack empty? is there anything in the queue? If yes to both- move the next callback on to stack.

- Microtask Queue - *Promise .then(), async/await, queueMicrotaskHigher* — runs first
- Macrotask Queue - *setTimeout, setInterval, DOM eventsLower* — runs after

```js
    console.log("start");

    setTimeout(() => console.log("timeout 1"), 0);

    Promise.resolve()
      .then(() => {
        console.log("promise 1");
        setTimeout(() => console.log("timeout 2"), 0);
      })
      .then(() => console.log("promise 2"));

    setTimeout(() => console.log("timeout 3"), 0);

    console.log("end");
    //Output: start, end, pro1, pro2,time1,time3,time2
```
```js
  What Interviewers Actually Ask
  "What does 'non-blocking' mean in JS?" — Async work is offloaded to the runtime; the stack stays free to do other things.
  "Can JS run code in parallel?" — No (on the main thread). Web Workers are a separate thread with no shared memory, no DOM access.
```

### The Memory Heap
Js memory split into two places:
- call stack: stores primitive values(number, string, bool, null,undefined) and references.
- heap: a large and unstructured region of memory where objects and functions are stored means when writes {},[] or function(){} it goes here.

```js
function replace(obj) {
  obj = { x: 99 }; // creates a new object in heap
}

let thing = { x: 1 };
replace(thing);
console.log(thing.x); // 1

- Mutation (obj.x = 99) — follows the pointer and changes what's inside. Affects everyone pointing there.
- Reassignment (obj = { x: 99 }) — changes where your pointer points. Nobody else's pointer moves.

"Why did mutating this object affect another variable?" — Two variables pointing to the same heap object.
"What is garbage collection?" — When nothing on the stack points to a heap object anymore, the JS engine eventually frees that memory.
```

### Hoisting
- Pre-registration - The engine registers declearations executing anything.
```js
      console.log(name); // undefined not error
      var name = "Shahruk";
      console.log(name); // "Shahruk"

      ## function declearations vs expression
      greet();   //  "Hello" 
      farewell(); //  TypeError: farewell is not a function

      function greet() { console.log("Hello"); }
      var farewell = function() { console.log("Bye"); };
```

### TDZ (Temporal Dead Zone)
-  The period between let/const hoisted and its line being executed. Reference error
```js
let x = 1;

function test() {
  console.log(x); //  ReferenceError — NOT 1
  let x = 2;
}

test();

is let hoisted? yes, but without intialization
```