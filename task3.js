async function toPromise(func, args) {
    return await new Promise((resolve) => {
        func(...args, resolve);
    })
}


function asyncPlus(x, y, cb){
    setTimeout(() => cb(x + y), 1000)
}

toPromise(asyncPlus, [1,2]).then(console.log)