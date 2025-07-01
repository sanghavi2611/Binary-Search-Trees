import { Tree } from './bst';
import { prettyPrint } from './utils';

const randomArray = (size = 15): number[] =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 100));

const logOrder = (title: string, tree: Tree, method: (cb: (node: any) => void) => void) => {
  const result: number[] = [];
  method((node) => result.push(node.data));
  console.log(`${title}:`, result);
};

// Step 1: Build tree from random array
const arr = randomArray();
const tree = new Tree(arr);

console.log("Initial Tree:");
prettyPrint(tree.root);
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
prettyPrint(tree.root);
console.log("Is tree balanced now?", tree.isBalanced());

// Step 3: Rebalance the tree
tree.rebalance();
console.log("\nAfter rebalancing:");
prettyPrint(tree.root);
console.log("Is tree balanced?", tree.isBalanced());

logOrder("Level Order", tree, tree.levelOrder.bind(tree));
logOrder("In Order", tree, tree.inOrder.bind(tree));
logOrder("Pre Order", tree, tree.preOrder.bind(tree));
logOrder("Post Order", tree, tree.postOrder.bind(tree));
