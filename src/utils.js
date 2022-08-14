export function randomize(inputArray) {
    return inputArray.sort(() => .5 - Math.random());
}

export function isEmptyArray(array){ return array.length === 0 }