// complete , reject
export class MyPromises {
    constructor(executor) {
        this.status = "pending";
        this.value = undefined;
        const complete = (value) => {
            this.status = "fulfilled";
            this.value = value;
            if (this.onFulfilled)
                this.onFulfilled(value);
        };
        const reject = (reason) => {
            this.status = "rejected";
            this.value = reason;
        };
        executor(complete, reject);
    }
    then(OnFulfiled) {
        if (this.status === "fulfilled" && this.value !== undefined) {
            OnFulfiled(this.value);
        }
        else if (this.status === "pending") {
            this.onFulfilled = OnFulfiled;
        }
        if (this.status === "rejected") {
            return this;
        }
        return undefined;
    }
    catch(OnRejected) {
        if (this.status === "rejected") {
            OnRejected(this.value);
        }
    }
}
//# sourceMappingURL=myPromise.js.map