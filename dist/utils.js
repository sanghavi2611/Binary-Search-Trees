"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettyPrint = void 0;
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null)
        return;
    if (node.right !== null) {
        (0, exports.prettyPrint)(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        (0, exports.prettyPrint)(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};
exports.prettyPrint = prettyPrint;
