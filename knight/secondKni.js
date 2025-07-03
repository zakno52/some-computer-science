// I coudn't make this from scratch, i needed some help i looked it up, it took me time to understand it.
// It's easy to think of but the nodes/linked-lists missled me to thik in a diffrent way.

const moves = [
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, -1],
];

function knightMoves(start, end) {
  if (start[0] === end[0] && start[1] === end[1]) {
    return [start];
  }

  const queue = [{ position: start, path: [start] }];
  const visited = [start.toString()];

  while (queue.length > 0) {
    console.log(queue);
    const current = queue.shift(); // to delete the first item and in the same time to select it
    const position = current.position;
    const path = current.path;

    for (let i = 0; i < moves.length; i++) {
      const dx = moves[i][0]; // the first number of position/move to calculate it after
      const dy = moves[i][1];
      const newPosition = [position[0] + dx, position[1] + dy]; // calculation

      if (newPosition[0] < 0 || newPosition[0] > 7 || newPosition[1] < 0 || newPosition[1] > 7) {
        continue; //skip this stage of the loop - for (let i = 0; i < moves.length; i++) - if the [-,-] cordinates are off the board
      }

      if (visited.includes(newPosition.toString())) {
        continue; // if its already visited we skip, you can use (has) here if we used (add/set) at first but this is more basic/simple
      }
      visited.push(newPosition.toString()); // if we are here it means we did not skip

      const newPath = [...path, newPosition]; // this is where we need that "current = queue.shift().path" to save the path of the parent to the child

      if (newPosition[0] === end[0] && newPosition[1] === end[1]) {
        return newPath; // check if the newPosition(childPosition) if the destination then we return the path we made earlier parent.path + childPosition
      }

      queue.push({ position: newPosition, path: newPath }); // otherwise we push that child to the queue to check its children as well when/if we reach it
    }
  }

  return null;
}

console.log(knightMoves([0, 0], [3, 3]));
