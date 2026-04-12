export declare class MyPromises<T> {
    private status;
    private value;
    private onFulfilled?;
    constructor(executor: (complete: (value: T) => void, reject: (reason: any) => void) => void);
    then(OnFulfiled: (value: T) => void): MyPromises<T> | undefined;
    catch(OnRejected: (reason: any) => void): void;
}
//# sourceMappingURL=myPromise.d.ts.map