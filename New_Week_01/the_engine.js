
function replace(obj) {
  obj = { x: 99 }; // creates a NEW object in the heap
}

let thing = { x: 1 };
replace(thing);
console.log(thing.x); // still 1