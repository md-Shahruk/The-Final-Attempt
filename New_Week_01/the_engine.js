
let a = "outer";

function shadow() {
  console.log(a); // What happens?
  let a = "inner";
  console.log(a); // What happens?
}

shadow();
console.log(a);   // What happens?