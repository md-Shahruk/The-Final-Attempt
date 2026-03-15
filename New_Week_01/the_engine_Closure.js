
// // closure
// function makeCounter(){
//   let count = 0;
//   function inner(){
//     count ++;
//     return count;
//   }
//   return inner
// }

// const fn = makeCounter();
// //console.log(fn()); // 1
// //console.log(fn()); // 2

// for(var i = 0; i < 5; i++){}
//  // console.log(i) 

//  for (var i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), i * 1000);
// }


////// Exercise
//console.log("Closure Exercise");
//console.log("Exercise one");
// Write a counter with private state using closure
// function createCounter(){
//    let count = 0;

//   function increment(){
//      return count ++;
//   }
//   function getCount(){
//    return count;
//   }

//   return {increment, getCount};
  
// }
// //const counter = createCounter();
// counter.increment();
// counter.increment();
// //console.log(counter.getCount());

// console.log("Make multiplier function");
// function makeMultiplier(multiplier) {
//   function multi(x){
//     return x * multiplier;
//   }
//   return multi;
// }

// const double = makeMultiplier(2);
// const triple = makeMultiplier(3);

/*
   5  closure project
   1. Counter
   2. Greeting Generator
   3. Calculator
   4. Login attempt limiter
   5. Rate Limiter
*/

console.log("1.Counter Project");
// increment, decrement, reset, getCount
function makeCounter(){
  let count = 0;

  function increment(){
     return ++count;
  }
  function decrement(){
    return -- count;
  }
  function reset(){
    count = 0;
  }
  function getCount(){
     return count;
  }

  return {increment, decrement, reset, getCount};
}

const counter = makeCounter();
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
counter.reset();
console.log(counter.getCount());


console.log("2. Greeting Generator");
function makeGreeter(greeting){
  return function(name){
    return `${greeting} ${name}`;

  };
}

const sayHello = makeGreeter("Hello");

console.log(sayHello("Shahruk"));


console.log("3. Make Calculator");
function makeCalculator(){
  let result = 0;

  return{
    add: function(n){ 
      result = n + result;
      return result;
      
    },
    subtract: function(n){
      result = result - n;
      return result;
    },
    multiply: function(n){
      result = result * n;
      return result;
    },
    getRes: function(){ return result},
  };
}


console.log("4. Make loginLimiter");
function makeLoginLimiter(maxAttemps){
  let attemps = 0;
  return function(password){
      if(attemps >= maxAttemps){
        console.log("Account lock!");
        return;
        
      }

      if(password === "hello123"){
        console.log("Login Successful!");
        
      }else{
        attemps ++;
        console.log(`${maxAttemps - attemps} attempts left`);
        
      }
  };
}

const loging = makeLoginLimiter(2);
loging("sdd");
loging("dd");
loging("hello123");




console.log("5.Build a rate limiter function using closures");


function createRateLimiter(maxCalls, windowMs) {
  let countCall = 0;
  let windowStart = Date.now();

  return function(fn){
    const now = Date.now();
    if (now - windowStart > windowMs){
      countCall = 0;
      windowStart = now;
    }
    if(countCall < maxCalls){
      countCall ++;
      fn();
    }
  }
}

const limiter = createRateLimiter(3, 1000);
limiter(() => console.log("called")); 
limiter(() => console.log("called")); 
limiter(() => console.log("called")); 
limiter(() => console.log("called")); 




