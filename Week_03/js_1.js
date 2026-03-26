
// implement reduce from scratch
function myMap(arr, fnn, initalVa){
  let accumalator  = initalVa;
  for (let i = 0; i < arr.length; i++){
    accumalator = fnn(accumalator, arr[i], i, arr);
  }
  return accumalator;
}

function red(acc, n){
  return acc + n;
}
const numbers = [1,2,3,4];
const doubled =  myMap(numbers, red, 0 );
console.log(doubled);
