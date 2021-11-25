function arrayToObject(arr) {
    return Object.fromEntries(arr.map(
        ([key, val]) => Array.isArray(val) ? [key, arrayToObject(val)] : [key, val]
    ));
}

const arr = [['name', 'developer'], ['age', 5], ['skills', [['html',4], ['css', 5], ['js',5]]]];

console.log(arrayToObject(arr))