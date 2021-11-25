function firstUnique(arr) {
    return arr.find(item => arr.indexOf(item) === arr.lastIndexOf(item))
}

console.log(firstUnique([1,2,3,2,1,3,4,5,5]));