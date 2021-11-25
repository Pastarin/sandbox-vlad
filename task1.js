function deepEqual(obj1, obj2) {
    function isPrimitive(obj) {
        return (obj !== Object(obj));
    }

    if (isPrimitive(obj1) && isPrimitive(obj2))
        return obj1 == obj2;

    if (Object.keys(obj1).length !== Object.keys(obj2).length)
        return false;

    for (let key in obj1) {
        if (!(key in obj2)) return false;
        if (!deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
}

console.log(deepEqual({name: 'test'}, {name: 'test'})) // output true
console.log(deepEqual({name: 'test'}, {name: 'test1'})) // output false
console.log(deepEqual({name: 'test'}, {name: 'test', age: 10})) // false