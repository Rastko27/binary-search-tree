export class Node {
   constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
   }
}

export class Tree {
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
      if (callback === undefined || callback === null) {
         throw new Error("Callback function required");
      }

      let queue = [];
      let node;
      queue.push(this.root);
      while (queue.length !== 0) {
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

   // Initial node call should be root
   inOrder(callback, node) {
      if (callback === undefined || callback === null) {
         throw new Error("Callback function required");
      }

      if (node === null) {
         return;
      }
      this.inOrder(callback, node.left);
      callback(node);
      this.inOrder(callback, node.right);
   }

   // Initial node call should be root
   preOrder(callback, node) {
      if (callback === undefined || callback === null) {
         throw new Error("Callback function required");
      }

      if (node === null) {
         return;
      }
      callback(node);
      this.preOrder(callback, node.left);
      this.preOrder(callback, node.right);
   }

   // Initial node call should be root
   postOrder(callback, node) {
      if (callback === undefined || callback === null) {
         throw new Error("Callback function required");
      }

      if (node === null) {
         return;
      }
      this.postOrder(callback, node.left);
      this.postOrder(callback, node.right);
      callback(node);
   }

   height(node) {
      if (node === null) {
         return 0;
      }
      let leftHeight = this.height(node.left);
      let rightHeight = this.height(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
   }

   // First call node should be root
   depth(node, value, depthValue = 0) {
      if (node === null) {
         return "Node not found";
      }
      if (node.value === value) {
         return depthValue;
      }
      if (value < node.value) {
         return this.depth(node.left, value, depthValue + 1);
      }
      if (value > node.value) {
         return this.depth(node.right, value, depthValue + 1);
      }
   }

   isBalanced() {
      let leftHeight = this.height(this.root.left);
      let rightHeight = this.height(this.root.right);
      if (leftHeight > rightHeight + 1 || rightHeight > leftHeight + 1) {
         return false;
      } else {
         return true;
      }
   }

   rebalance() {
      let array = [];
      this.inOrder((node) => array.push(node.value), this.root);
      this.root = this.buildTree(array);
   }
}

export const prettyPrint = (node, prefix = "", isLeft = true) => {
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