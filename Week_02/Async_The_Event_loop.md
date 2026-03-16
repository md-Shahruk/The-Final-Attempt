# Topics will be covered:
- Event Loop
- Call Stack
- Web APIs
- callback queue
- microtask queue

### Event Loop
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

### microtask
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