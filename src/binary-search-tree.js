const { NotImplementedError } = require('../extensions/index.js')

const { Node } = require('../extensions/list-tree.js')

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null
  }

  root() {
    return this._root
  }

  add(data) {
    this._root = this._addNode(this._root, data)
  }

  _addNode(node, data) {
    if (!node) {
      return new Node(data)
    }

    if (data < node.data) {
      node.left = this._addNode(node.left, data)
    } else if (data > node.data) {
      node.right = this._addNode(node.right, data)
    }

    return node
  }

  has(data) {
    return this._hasNode(this._root, data)
  }

  _hasNode(node, data) {
    if (!node) {
      return false
    }

    if (data === node.data) {
      return true
    } else if (data < node.data) {
      return this._hasNode(node.left, data)
    } else {
      return this._hasNode(node.right, data)
    }
  }

  find(data) {
    return this._findNode(this._root, data)
  }

  _findNode(node, data) {
    if (!node) {
      return null
    }

    if (data === node.data) {
      return node
    } else if (data < node.data) {
      return this._findNode(node.left, data)
    } else {
      return this._findNode(node.right, data)
    }
  }

  remove(data) {
    this._root = this._removeNode(this._root, data)
  }

  _removeNode(node, data) {
    if (!node) {
      return null
    }

    if (data === node.data) {
      if (!node.left && !node.right) {
        return null
      } else if (!node.left) {
        return node.right
      } else if (!node.right) {
        return node.left
      } else {
        const minRight = this._findMin(node.right)
        node.data = minRight.data
        node.right = this._removeNode(node.right, minRight.data)
        return node
      }
    } else if (data < node.data) {
      node.left = this._removeNode(node.left, data)
    } else {
      node.right = this._removeNode(node.right, data)
    }

    return node
  }

  _findMin(node) {
    while (node.left) {
      node = node.left
    }
    return node
  }

  min() {
    const minNode = this._findMin(this._root)
    return minNode ? minNode.data : null
  }

  max() {
    const maxNode = this._findMax(this._root)
    return maxNode ? maxNode.data : null
  }

  _findMax(node) {
    while (node.right) {
      node = node.right
    }
    return node
  }
}

module.exports = {
  BinarySearchTree,
}
