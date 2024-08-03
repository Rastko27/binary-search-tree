import { Node, Tree, prettyPrint } from './binarySearchTree.mjs';

// Helper function to generate an array of random numbers < 100
function generateRandomArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

// Callback function to print node values
function printNode(node) {
    process.stdout.write(node.value + " ");
}

// Main driver script
function main() {
    // Step 1: Create a binary search tree from an array of random numbers < 100
    const randomArray = generateRandomArray(15);
    const tree = new Tree(randomArray);

    // Step 2: Confirm that the tree is balanced by calling isBalanced
    console.log("Is the tree balanced? " + tree.isBalanced());

    // Step 3: Print out all elements in level, pre, post, and in order
    console.log("Level order:");
    tree.levelOrder(printNode);
    console.log("\nIn order:");
    tree.inOrder(printNode, tree.root);
    console.log("\nPre order:");
    tree.preOrder(printNode, tree.root);
    console.log("\nPost order:");
    tree.postOrder(printNode, tree.root);
    console.log("\n");

    // Step 4: Unbalance the tree by adding several numbers > 100
    [150, 200, 250, 300].forEach(value => tree.insert(tree.root, value));

    // Step 5: Confirm that the tree is unbalanced by calling isBalanced
    console.log("Is the tree unbalanced? " + !tree.isBalanced());

    // Step 6: Balance the tree by calling rebalance
    tree.rebalance();

    // Step 7: Confirm that the tree is balanced by calling isBalanced
    console.log("Is the tree balanced again? " + tree.isBalanced());

    // Step 8: Print out all elements in level, pre, post, and in order
    console.log("Level order:");
    tree.levelOrder(printNode);
    console.log("\nIn order:");
    tree.inOrder(printNode, tree.root);
    console.log("\nPre order:");
    tree.preOrder(printNode, tree.root);
    console.log("\nPost order:");
    tree.postOrder(printNode, tree.root);
    console.log("\n");

    // Optional: Pretty print the tree structure
    console.log("Tree structure:");
    prettyPrint(tree.root);
}

main();
