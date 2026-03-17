# Topics will be covered:
- Event Loop
- Call Stack
- Web APIs
- callback queue
- microtask queue
- Promise Construction and Chaining
- Error Propagation

## Event Loop
- Js is single-threaded means (one thing at a time), but it needs to handle timers, network request, etc without freezing. The event loop makes this possible.

- The 4 pieces:
  - Call stack: code actually runs here, functions go in, execute, come out
  - Web APIs: browers handle waiting task (timer, fetchs,etc), js dosent wait
  - Callback Queue: when a web api task finishes, its callback lines up here.
  - Event Loop: wathces the stack. if empty- moves next callback from queue into stack

```js
    console.log("Start");
    setTimeout(() => console.log("Timeout"), 0);
    console.log("End");

    CALLBACK-----------------------------WEBAPIS---------------------------CALLBACK QUEUE
 S1: Start
 S2: setTimeout -- js handle the timer to - timer(0ms)
 S3: End                                 timer still in webapis
     Now empty   the 0ms done so webapi move callback into callback queue - callback:log("Timeout")
 S4: callback:log("Timeout") stack is empty, queue has something, callback moves into the call stack,this is the event loop entire job
    print timeout and everything is done
 
 
   Console Output
   after S1: print("Start")
   after S3: print("End")
   after S4: print("Timeout")
```

**Final**- The event loop continuously checks if the Call Stack is empty. When it is, it takes the first callback queue and push it onto the stack.

**setTimeOut(...,0)** dosent mean run immediately, It means *run as soon as the call stack emtpy*.

## microtask
- after every macrotask finishes the entires microtask queue drains completely before the next macrotask runs.
```js
    Synchronous code
        ↓
    Microtasks (Promise.then, await, queueMicrotask)
        ↓
    Browser Render
        ↓
    Macrotasks (setTimeout, setInterval, I/O)
```

- Microtask Queue - *Promise .then(), async/await, queueMicrotaskHigher* — runs first
- Macrotask Queue - *setTimeout, setInterval, DOM eventsLower* — runs after 


## Promise Construction and Chaining 
- **A promise object represent the completion or failure of an asynchronous operation**.
- three exclusive states:
  - pending (start but not finish)
  - rejected (operation failed) if failed, have an error
  - fulfiled (operation complete) it worked, have a value

```js
    console.log("Promises");
    // new promises(...) create the token
    const foodOrder = new Promise((resolve, reject)=>{

    const isFoodReady = true;
    if(isFoodReady){
        resolve("Here is your food");
    }else{
        reject("Sorry.....");
    }

    });

    // .then when the order is ready do this
    // whatever return inside .then becomes the input of next .then 
    foodOrder.then(food =>{
    console.log(food);
    return food + " + sauce";
    })
    .then(foodwithSauce =>{
    console.log(foodwithSauce);
    // the chain pauses at the step, waits for the inner promises finish , then move to next .then()
    return new Promise(resolve =>{
        setTimeout(()=> resolve("here is your drink"), 5000);
    });
    
    })
    .then(drink =>{
    console.log(drink);
    
    })
    .then(()=>{
    console.log("Now you can eat.");
    
    })
    // .then runs when things going right
    // .catch runs when things going wrong
    .catch(error =>{
    console.log(error);
    
    });

```

## Why promises resolve before setTimeout at 0ms?
 - After the call stack finish all microtasks are executed before macrotask.
 - Event loop:
   - First: flush microtasks (promises)
   - Then: take one macrotask (timeout)
 - setTimeout(f, 0) means: Run this after at least 0ms, but when the event loop gets to macrotask.
 - Microtask queue and Macrotask queue are FIFO
```js
   setTimeout(() => console.log("A"), 0);

    Promise.resolve().then(() => {
    console.log("B");
    setTimeout(() => console.log("C"), 0);
    });
    console.log("D");
    Ans: D,B,A,C

console.log("D");
```

## Error Propagation
A promise chain carries **one thing** at a time:
- either value ________
- or error _______

**Rule 1** - normal flow
- if nothing goes wrong:
  ```js
    Promise.resolve("ok")
    .then(v => console.log(v));
    output: ok
  ```
**Rule 2** - error skips then
  ```js
         Promise.reject("fail")
        .then(() => console.log("A"))
        .catch(e => console.log("caught:", e)); // error jumps .then()
        output: caught: fail
  ```

**Where does error come from?**
**Two ways:**
- 1. throw
  ```js
     .then(() => {
        throw "boom";
     })
  ```
- 2. Promise.reject();
  ```js
     return Promise.reject("error");
  ```
 ### Promise only controls what is returned/thrown - not random async code
    ```js
       return value  → go to next .then()
       throw error   → go to next .catch()
    ```
  ```js
     Example:
     Promise.resolve()
    .then(() => {
        console.log("A");
        throw "err";
    })
    .then(() => {
        console.log("B");
    })
    .catch(e => {
        console.log("C:", e);
    })
    .then(() => {
        console.log("D");
    });

    output:A, C:err, D
  ```

  ```js
    Tricky:
    Promise.resolve()
    .then(() => {
        
        setTimeout(() => reject("boom"), 0);
        
    })
    .catch(err => console.log("caught:", err));
    output: uncaught error because here settime macrotask and catch don't see 
   
    Promise.resolve()
    .then(() => {
        return new Promise((_, reject) => {
        setTimeout(() => reject("boom"), 0);
        });
    })
    .catch(err => console.log("caught:", err));
    
    output: caught:boom because pause the chain until this promises finishes
  ```