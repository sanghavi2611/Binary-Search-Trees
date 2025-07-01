"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bst_1 = require("./bst");
const utils_1 = require("./utils");
const randomArray = (size = 15) => Array.from({ length: size }, () => Math.floor(Math.random() * 100));
const logOrder = (title, tree, method) => {
    const result = [];
    method((node) => result.push(node.data));
    console.log(`${title}:`, result);
};
// Step 1: Build tree from random array
const arr = randomArray();
const tree = new bst_1.Tree(arr);
console.log("Initial Tree:");
(0, utils_1.prettyPrint)(tree.root);
console.log("Is tree balanced?", tree.isBalanced());
logOrder("Level Order", tree, tree.levelOrder.bind(tree));
logOrder("In Order", tree, tree.inOrder.bind(tree));
logOrder("Pre Order", tree, tree.preOrder.bind(tree));
logOrder("Post Order", tree, tree.postOrder.bind(tree));
// Step 2: Unbalance the tree
tree.insert(110);
tree.insert(120);
tree.insert(130);
tree.insert(140);
console.log("\nAfter unbalancing:");
(0, utils_1.prettyPrint)(tree.root);
console.log("Is tree balanced now?", tree.isBalanced());
// Step 3: Rebalance the tree
tree.rebalance();
console.log("\nAfter rebalancing:");
(0, utils_1.prettyPrint)(tree.root);
console.log("Is tree balanced?", tree.isBalanced());
logOrder("Level Order", tree, tree.levelOrder.bind(tree));
logOrder("In Order", tree, tree.inOrder.bind(tree));
logOrder("Pre Order", tree, tree.preOrder.bind(tree));
logOrder("Post Order", tree, tree.postOrder.bind(tree));
