let array = [3, 2, 1, 13, 8, 5, 0, 1];
// console.log(secondHalf);
function mergeSort(arr) {
  // Base case: array with 0 or 1 element is already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // Split the array into two halves
  const middle = Math.floor(arr.length / 2);
  const leftArray = arr.slice(0, middle);
  const rightArray = arr.slice(middle);

  // Recursively sort both halves
  const sortedLeft = mergeSort(leftArray);
  const sortedRight = mergeSort(rightArray);

  // Merge the sorted halves and return the result
  return merge(sortedLeft, sortedRight);
}

function merge(leftArray, rightArray) {
  let finalArray = [];
  while (leftArray.length && rightArray.length) {
    if (leftArray[0] <= rightArray[0]) {
      finalArray.push(leftArray.shift());
    } else {
      finalArray.push(rightArray.shift());
    }
  }

  return [...finalArray, ...leftArray, ...rightArray];
}

console.log(mergeSort(array));
