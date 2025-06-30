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

  //shit

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
        compair(node.left);
      } else if (value > node.head) {
        compair(node.right);
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

          nextNode = null;
        } else {
          if (node.left) {
            node = node.left;
          } else {
            node = node.right;
          }
        }
      }
      return node;
    };

    compair(this.tree.root);
  }

  find(value, silent = false) {
    const compair = (node) => {
      if (node === null) {
        console.log('Error: not found');
        return null;
      }

      if (value < node.head) {
        return compair(node.left);
      } else if (value > node.head) {
        return compair(node.right);
      } else if (value === node.head) {
        if (!silent) console.log('Found node:', node);
        return node;
      }
    };
    return compair(this.tree.root);
  }

  levelOrder(node) {
    if (!node) return console.log('Error: A callback function is required. node tree');

    let array = [node];
    while (array.length > 0) {
      if (array[0].left) {
        array.push(array[0].left);
      }
      if (array[0].right) {
        array.push(array[0].right);
      }

      console.log(array[0].head);
      array.shift();
    }
  }
  preOrder(tree) {
    if (!tree) return console.log('Error: A callback function is required. node tree');
    let array = [];
    const compair = (node) => {
      if (node === null) return null;
      array.push(node.head);
      if (node.left) {
        compair(node.left);
      }
      if (node.right) {
        compair(node.right);
      }
    };

    compair(tree);
    return console.log(array);
  }

  inOrder(tree, silent = false) {
    if (!tree) return console.log('Error: A callback function is required. node tree');
    let array = [];
    const compair = (node) => {
      if (node === null) return null;

      if (node.left) {
        compair(node.left);
      }
      array.push(node.head);

      if (node.right) {
        compair(node.right);
      }
    };

    compair(tree);
    if (!silent) console.log(array);
    return array;
  }

  postOrder(tree) {
    if (!tree) return console.log('Error: A callback function is required. node tree');
    let array = [];
    const compair = (node) => {
      if (node === null) return null;

      if (node.left) {
        compair(node.left);
      }
      if (node.right) {
        compair(node.right);
      }
      array.push(node.head);
    };

    compair(tree);
    return console.log(array);
  }

  //shit

  // height(value) {
  //   let counter = 0;
  //   let tree = this.find(value, true);
  //   const compair = (node) => {
  //     if (node === null) return null;

  //     if (node.left) {
  //       compair(node.left);
  //     }
  //     if (node.right) {
  //       compair(node.right);
  //     }
  //     if ((!node.left && !node.right) || (node.left && node.right)) {
  //       counter--;
  //     }
  //     counter++;
  //   };

  //   compair(tree);
  //   console.log(counter);
  // }

  height(value, silent = false) {
    let tree = this.find(value, true);
    const compair = (node) => {
      if (node === null) return -1;
      const leftHeight = compair(node.left);
      const rightHeight = compair(node.right);

      return Math.max(leftHeight, rightHeight) + 1;
    };
    let results = compair(tree);
    if (!silent) console.log(results);
    return results;
  }

  depth(value) {
    let counter = 0;
    const compair = (node) => {
      if (node === null) return console.log('Error: not found'), null;

      if (value < node.head) {
        counter++;
        compair(node.left);
      } else if (value > node.head) {
        counter++;
        compair(node.right);
      } else if (value === node.head) {
        return console.log(counter);
      }
    };

    compair(this.tree.root);
  }

  isBalanced() {
    let root = this.tree.root;
    let rightNode = root.right;
    let leftNode = root.left;
    let rightHeight = this.height(rightNode.head, true);
    let leftHeight = this.height(leftNode.head, true);
    console.log(leftHeight, rightHeight);
    console.log(rightHeight - leftHeight);

    if (rightHeight - leftHeight <= 1 && rightHeight - leftHeight >= -1) {
      console.log('its balanced');
    } else {
      console.log('not balanced');
    }
  }

  rebalance() {
    let sorted = this.inOrder(this.tree.root);
    this.tree = new Tree(sorted);
    console.log('sorted');
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
