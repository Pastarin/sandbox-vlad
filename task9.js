String.prototype.toTitleCase = function() {
    return this.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

let x = 'test task'
console.log(x.toTitleCase())