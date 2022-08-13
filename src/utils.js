export function randomize(inputArray) {
    return inputArray.sort(() => .5 - Math.random());
}