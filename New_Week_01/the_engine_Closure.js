
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
console.log("Closure Exercise");
console.log("Exercise one");
// Write a counter with private state using closure
function createCounter(){
   let count = 0;

  function increment(){
     return count ++;
  }
  function getCount(){
   return count;
  }

  return {increment, getCount};
  
}
const counter = createCounter();
counter.increment();
counter.increment();
//console.log(counter.getCount());

console.log("Make multiplier function");
function makeMultiplier(multiplier) {
  function multi(x){
    return x * multiplier;
  }
  return multi;
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log("Build a rate limiter function using closures");


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
limiter(() => console.log("called")); // runs
limiter(() => console.log("called")); // runs
limiter(() => console.log("called")); // runs
limiter(() => console.log("called")); // blocked — too many calls




