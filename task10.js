String.prototype.removeDuplicate = function() {
    return Array.from(new Set(this.split(' '))).join(' ');
}

let x = "Int32 Int32 Int32 Int32 Int32 Int32 Int32 Int32 Int32 Double Double Double"
console.log(x.removeDuplicate());