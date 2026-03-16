
console.log("start");

setTimeout(() => {
  console.log("timeout 1");
  Promise.resolve().then(() => console.log("micro inside timeout"));
}, 0);

Promise.resolve()
  .then(() => {
    console.log("micro 1");
    setTimeout(() => console.log("timeout 2"), 0);
  })
  .then(() => console.log("micro 2"));

console.log("end");
// start,end,  micr 1, micro2, time1, micro inside,  time 2