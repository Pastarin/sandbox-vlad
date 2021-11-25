function chunkArray(arr, len) {
    const chunks = [];

    let i = 0
    while (i < arr.length) {
        chunks.push(arr.slice(i, i += len));
    }

    return chunks;
}

const result = chunkArray([1,2,3,4,5,6,7,8], 3);

console.log(result)