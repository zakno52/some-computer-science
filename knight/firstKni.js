// I made this code first its messy but its working, its very basic yes.
// It's BFS with recursion

class Node {
  constructor(parent = null, value, nextSpot = null) {
    this.parent = parent;
    this.value = value;
    this.nextSpot = nextSpot;
  }
}

class knightMoves {
  constructor(start, end) {
    this.moves = [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
    ];
    this.start = new Node(null, start, null);
    this.end = end;
    this.visited = [start.toString()];
    this.initiat = this.init();
  }

  init() {
    if (this.start.value[0] < 0 || this.start.value[1] < 0) {
      console.log('invalid spot');
      return;
    }
    if (this.start.value[0] === this.end[0] && this.start.value[1] === this.end[1]) {
      console.log('stay put');
      return;
    }
    this.generate([this.start]);
  }

  generate(arrayOfNextSpots) {
    let results = [];
    for (let index = 0; index < arrayOfNextSpots.length; index++) {
      for (let y = 0; y < this.moves.length; y++) {
        let spotCordinats = this.moves[y];
        let currentSpot = arrayOfNextSpots[index].value;
        let nextSpot = [currentSpot[0] + spotCordinats[0], currentSpot[1] + spotCordinats[1]];
        if (!this.visited.includes(nextSpot.toString())) {
          if (nextSpot[0] >= 0 && nextSpot[0] <= 7 && nextSpot[1] >= 0 && nextSpot[1] <= 7) {
            let newSpotNode = new Node(arrayOfNextSpots[index], nextSpot);
            this.visited.push(newSpotNode.value.toString());
            arrayOfNextSpots[index].nextSpot = arrayOfNextSpots[index].nextSpot || [];
            arrayOfNextSpots[index].nextSpot.push(newSpotNode);

            results.push(newSpotNode);
            if (this.end[0] === newSpotNode.value[0] && this.end[1] === newSpotNode.value[1]) {
              return this.showSteps(newSpotNode);
            } else {
              let par = newSpotNode.parent;
              console.log(this.end, newSpotNode.value, '=> parent:', par.value); // debuging
            }
          }
        }
      }
    }
    console.log('start again');
    this.generate(results);
  }

  showSteps(destinationNode) {
    let counter = -1;
    let current = destinationNode;
    let steps = [];
    while (current) {
      steps.push(current.value);
      current = current.parent;
      counter++;
    }

    return console.log('you have', counter, 'steps', steps.reverse());
  }
}

let test = new knightMoves([3, 3], [4, 3]);
