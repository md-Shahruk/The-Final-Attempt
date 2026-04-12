
// complete , reject

export class MyPromises<T>{
    private status: string;
    private value: T | undefined;
    private onFulfilled?: (value: T) => void;

    constructor(executor:(complete:(value:T)=> void, reject:(reason:any)=> void) => void){
        this.status = "pending";
        this.value = undefined;

        const complete = (value:T): void =>{
            this.status = "fulfilled";
            this.value = value;
            if (this.onFulfilled) this.onFulfilled(value);
        };

        const reject = (reason:any):void =>{
            this.status = "rejected";
            this.value = reason;
        }

        executor(complete, reject);
    }

    then(OnFulfiled:(value:T) => void): MyPromises<T> | undefined{
        if(this.status === "fulfilled" && this.value !== undefined){
            OnFulfiled(this.value);
        }else if (this.status === "pending") {
        this.onFulfilled = OnFulfiled; 
       }
        if(this.status === "rejected"){
            return this;
        }

        return undefined;
    }

    catch(OnRejected:(reason:any )=>void):void{
        if(this.status === "rejected"){
            OnRejected(this.value);
        }
    }
}


