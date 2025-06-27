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
    this.height = 0;
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

    this.height++;
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

  // insert(value) {
  //   if (this.tree.root === null) {
  //     this.tree.root = new Node(value);
  //     return;
  //   }

  //   let current = this.tree.root;
  //   let previous = null;

  //   while (current !== null) {
  //     previous = current;
  //     if (value === current.head) {
  //       return; // Value already exists, do nothing
  //     } else if (value < current.head) {
  //       current = current.left;
  //     } else {
  //       current = current.right;
  //     }
  //   }

  //   if (value < previous.head) {
  //     previous.left = new Node(value);
  //   } else {
  //     previous.right = new Node(value);
  //   }
  // }

  insert(value) {
    const compair = (node) => {
      if (node === null) return new Node(value);

      if (value < node.head) {
        node.left = compair(node.left);
      } else if (value > node.head) {
        node.right = compair(node.right);
      }
      return node;
    };

    compair(this.tree.root);
  }

  deleteItem(value) {
    const compair = (node) => {
      if (node === null) return null;

      if (value < node.head) {
        node.left = compair(node.left);
      } else if (value > node.head) {
        node.right = compair(node.right);
      } else if (value === node.head) {
        if (node.left && node.right) {
          let previous;
          let nextNode = node.right;
          while (nextNode.left) {
            previous = nextNode;
            nextNode = nextNode.left;
          }
          node.head = nextNode.head;
          if (nextNode.right) {
            previous.left = nextNode.right;
          } else {
            previous.left = null;
          }

          nextNode = null; // call the same function with that value
        } else {
          if (node.left) {
            node = node.left;
          } else {
            node = node.right;
          }
        }
        // delete current
        // node = null;
        // return 'done';
      }
      return node;
    };

    compair(this.tree.root);
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

build.insert(10);
prettyPrint(build.tree.root);
