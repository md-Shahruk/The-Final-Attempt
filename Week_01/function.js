
// ---------------------------------------- Higher Order Functions -------------------------------

// function thats take another function as an argument
function calculate(a, b, operation){
   return operation(a,b);
}

function add(a, b){
    return a+b;
}

function multiply(c, d){
    return c*d;
}

//console.log(calculate (5, 10, add));
//console.log(calculate(5, 10, multiply));


//-----------------Implement custom function map(), reduce(), filter() using function experssion --------------


const numbers = [2,6,5,8,9];

// custom map()
// function expression
const myMap = function(arr, mapfun){
    result = [];
    for (let i = 0; i < arr.length; i++){
       result.push( mapfun(arr[i], i, arr));
    }
  return result;
}

function doubled(x){
 return x * 2;
}

const doubledExpression = myMap(numbers, doubled);
console.log(doubledExpression);

// custom filter()
const myFilter = function(arr, filterfun){
    result = [];
    for(let i = 0; i < arr.length; i++){
        if(filterfun(arr[i], i, arr)){
            result.push(arr[i]);
        }
    }
    return result;
}

function isEven(num){
    return num % 2 === 0;
}

const myFilterExpression = myFilter(numbers, isEven);
console.log(myFilterExpression);

// custom reduce()

const myReduce = (arr, reducefun, initialvalue)=>{
     let previous = initialvalue;
     let startIndex = 0;
     
     if (previous === undefined){
        previous = arr[0];
        startIndex = 1;
     }
     for(let i = startIndex; i < arr.length; i++){
        previous = reducefun(previous, arr[i], i, arr);
     }

     return previous;
}

function sum(previous, next){
  return previous + next;
}

const reduceExpression= myReduce(numbers, sum, 0);
console.log(reduceExpression);