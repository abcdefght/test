let flag: boolean = false
type resolveType = (value: any) => void
type rejectType = (value: any) => void

class MyPromise {
    value: any
    status: 'pending' | 'fulfilled' | 'rejected'

    constructor(executor: (resolve: resolveType, reject: rejectType) => void) {
        this.status = 'pending'
        executor(this.resolve, this.reject)
    }

    resolve = (value: any) => {
        if (this.status === 'pending') {
            this.value = value
            this.status = 'fulfilled'
        }
    }

    reject = (value: any) => {
        if (this.status === 'pending') {
            this.value = value
            this.status = 'rejected'
        }
    }

    then = (onFulfilled?: (value: any) => void) => {
        if (this.status === 'fulfilled') {
            onFulfilled(this.value)
        }
        return this
    }

    catch = (onRejected?: (value: any) => void) => {
        if (this.status === 'rejected') {
            onRejected(this.value)
        }
        return this
    }
}

const my = new MyPromise((resolve, reject) => {
    if (flag) {
        resolve('ok')
    } else {
        reject('bad')
    }
})

my.then(res => {
    console.log(res);
}).catch(error=>{
    console.log(error);
})
