

// let see how new keyword work internally

function myNew(Constructor, ...args){
    const obj = Object.create(Constructor.prototype);
    const result = Constructor.apply(obj,args);
    return result instanceof Object ? result : obj;
}

function Person(name){
    this.name = name; 
}

const hello =  myNew(Person , "Shahruk");
console.log(hello.name);// Shahruk
// new = object create + prototype linking + constructor call + return override logic

    