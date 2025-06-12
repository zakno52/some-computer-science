class Node {
  constructor(data, left = null, right = null) {
    this.head = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.split(arr);
  }

  split(array) {
    if (array.length <= 0) return null;
    if (array.length === 1) return new Node(array[0]);

    let middle = Math.floor(array.length / 2);
    let head = array[middle];
    let left = array.slice(0, middle);
    let right = array.slice(middle + 1);

    let leftNode = this.split(left);
    let rightNode = this.split(right);

    let node = new Node(head, leftNode, rightNode);
    return node;
  }
}

class BuildTree {
  constructor(array) {
    let sorted = array.sort((a, b) => a - b);
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i] === sorted[i + 1]) {
        sorted.splice(i, 1);
        i--;
      }
    }

    this.tree = new Tree(sorted);
  }
}

// Pretty print function
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) return;

  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }

  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.head}`);

  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// Test it
let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let build = new BuildTree(array);
prettyPrint(build.tree.root);
