class Node {
   constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
   }
}

class Tree {
   constructor(array) {
      // Sort array during construction and remove duplicates using Set
      let sortedArray = Array.from(new Set(array));
      sortedArray.sort((a, b) => a - b);
      this.array = sortedArray;
      this.root = this.buildTree(sortedArray);
   }

   buildTree(sortedArray, start = 0, end = sortedArray.length - 1) {
      // Base case
      if (start > end) {
         return null;
      }

      // Get mid and use to make node
      let mid = parseInt((start + end) / 2);
      let node = new Node(sortedArray[mid]);
      node.left = this.buildTree(sortedArray, start, mid - 1);
      node.right = this.buildTree(sortedArray, mid + 1, end);

      return node;
   }

   // Node should be root on first call
   insert(node, value) {
      // Base case if node is empty
      if (node === null) {
         return new Node(value);
      }

      // Base case if there already is a node with this value
      if (node.value === value) {
         return node;
      }

      // Recursion
      if (value < node.value) {
         node.left = this.insert(node.left, value);
      } else {
         node.right = this.insert(node.right, value);
      }

      return node;
   }

   // Gets the smallest child node in the right right side of the node's subtree
   getSuccessor(node) {
      node = node.right;
      while (node !== null && node.left !== null) {
         node = node.left;
      }
      return node;
   }

   // Node should be root on first call
   delete(node, value) {
      // Base case you got to the node
      if (node === null) {
         return node;
      }

      // Traverse tree
      if (node.value > value) {
         node.left = this.delete(node.left, value);
      } else if (node.value < value) {
         node.right = this.delete(node.right, value);
      }

      // If node.key === value (arrived at node)
      else {
         // Node has 0 children nodes or only right child node
         if (node.left === null) {
            return node.right;
         }

         // Node has only left child note
         if (node.right === null) {
            return node.left;
         }

         // Node has 2 child nodes
         let successor = this.getSuccessor(node);
         // Replace successor with current node
         node.value = successor.value;
         // Delete successor in it's previous position to avoid duplicates
         node.right = this.delete(node.right, successor.value);
      }

      return node;
   }

   find(node, value) {
      // Base case
      if (node === null || node.value === value) {
         return node;
      }

      // Traverse tree to find node
      if (node.value > value) {
         return this.find(node.left, value);
      } else {
         return this.find(node.right, value);
      }
   }

   levelOrder(callback) {
      let queue = [];
      let node;
      queue.push(this.root);
      while(queue.length !== 0) {
         node = queue.shift();
         callback(node);
         if (node.left !== null) {
            queue.push(node.left);
         }
         if (node.right !== null) {
            queue.push(node.right);
         }
      }
   }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
   if (node === null) {
      return;
   }
   if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
   }
   console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
   if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
   }
};

// Sample Tree Construction
const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

// Function to collect the level order traversal result
let result = [];
tree.levelOrder(node => result.push(node.value));

// Print the result to verify correct level order traversal
console.log(result); // Expected output: [4, 2, 6, 1, 3, 5, 7]

// Pretty print the tree
prettyPrint(tree.root);
