function objectToArray(obj) {
    return Object.entries(obj).map(([key, val]) => typeof val === 'object' ? [key, objectToArray(val)] : [key, val])
}

console.log(objectToArray({
    name: 'developer',
    age: 5,
    skills: {
        html: 4,
        css: 5,
        js: 5
    }
}))

// Outputs: [['name', 'developer'], ['age', 5], ['skills', [['html',4], ['css', 5], ['js',5]]]]
