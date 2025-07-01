export class Node {
  data: number;
  left: Node | null = null;
  right: Node | null = null;

  constructor(data: number) {
    this.data = data;
  }
}

export class Tree {
  root: Node | null;

  constructor(array: number[]) {
    const uniqueSorted = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(uniqueSorted);
  }

  private buildTree(array: number[]): Node | null {
    if (array.length === 0) return null;
    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1));
    return node;
  }

  insert(value: number, root: Node | null = this.root): Node {
    if (!root) return new Node(value);
    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }
    return root;
  }

  deleteItem(value: number, root: Node | null = this.root): Node | null {
    if (!root) return null;
    if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    } else if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    } else {
      if (!root.left) return root.right;
      if (!root.right) return root.left;

      let min = root.right;
      while (min.left) min = min.left;
      root.data = min.data;
      root.right = this.deleteItem(min.data, root.right);
    }
    return root;
  }

  find(value: number, root: Node | null = this.root): Node | null {
    if (!root) return null;
    if (value < root.data) return this.find(value, root.left);
    if (value > root.data) return this.find(value, root.right);
    return root;
  }

  levelOrder(callback: (node: Node) => void): void {
    if (!callback) throw new Error("Callback is required");
    const queue: (Node | null)[] = [this.root];
    while (queue.length) {
      const node = queue.shift();
      if (node) {
        callback(node);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
  }

  inOrder(callback: (node: Node) => void, node: Node | null = this.root): void {
    if (!callback) throw new Error("Callback is required");
    if (!node) return;
    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  preOrder(callback: (node: Node) => void, node: Node | null = this.root): void {
    if (!callback) throw new Error("Callback is required");
    if (!node) return;
    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  postOrder(callback: (node: Node) => void, node: Node | null = this.root): void {
    if (!callback) throw new Error("Callback is required");
    if (!node) return;
    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  height(node: Node | null): number {
    if (!node) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(value: number, root: Node | null = this.root, currentDepth = 0): number | null {
    if (!root) return null;
    if (value < root.data) return this.depth(value, root.left, currentDepth + 1);
    if (value > root.data) return this.depth(value, root.right, currentDepth + 1);
    return currentDepth;
  }

  isBalanced(node: Node | null = this.root): boolean {
    if (!node) return true;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance(): void {
    const values: number[] = [];
    this.inOrder((node) => values.push(node.data));
    this.root = this.buildTree(values);
  }
}

