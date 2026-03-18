// Build a custom Promise implementation from scratch
/*
 Promise:
     1. Pending
     2. fulfiled
     3. Rejected
 Step1: 
     first we need to make callback function (complete, reject)
     complete = call when things go right
     reject = call when things go wrong
 Step2:
    Now addding .then() and pass function OnFulfilled
      - if the status is fulfiled, run the function with the value
    And adding .catch() and pass function OnRejected
      - if the status is rejected , run the function with value
 Step3: 
    Now making errors travel down means skip .then() land to .catch()
      -  return this means "I am rejected, skip me and pass the error forward"
*/

class MyPromise{
    constructor(executor){
        this.status = "pending";
        this.value = undefined;

        const complete = (value)=>{
            this.status = "fulfiled";
            this.value = value;
        };

        const reject = (reason)=>{
            this.status = "rejected";
            this.value = reason;
        };

        executor(complete, reject);

    }

    then(OnFulfilled){
        if(this.status === "fulfiled"){
            OnFulfilled(this.value);
        }

        if(this.status === "rejected"){
            return this;
        }
    };

    catch(OnRejected){
        if(this.status === "rejected"){
            OnRejected(this.value);
        }
    };
}

const p = new MyPromise((complete, reject)=>{
    complete("Worked");
})
p.then(messg =>{
    console.log(messg);
    
})

const p2 = new MyPromise((complete, reject)=>{
    reject("Rejected");
})
p2.then(success =>{
    console.log(success);
    
})
.catch(err=>{
    console.log(err);
    
})

