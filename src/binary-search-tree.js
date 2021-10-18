const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {

  constructor() {
    this.rootNode = null
  }
  root() {
    return this.rootNode
  }
  has(data) {
    return searchWithin(this.rootNode, data)

    function searchWithin(node, data) {
      if (!node) {
        return false
      }

      if (node.data === data) {
        return true
      }

      return data < node.data ? searchWithin(node.left, data) : searchWithin(node.right, data)
    }
  }
  find(data) {
    return findNode(this.rootNode, data)

    function findNode(node, data) {
      if (node === null) {
        return null
      }

      if (node.data === data) {
        return node
      }

      return data < node.data ? findNode(node.left, data) : findNode(node.right, data)
    }
  }
  remove(data) {
    this.rootNode = removeNode(this.rootNode, data)

    function removeNode(node, data) {
      if (!node) {
        return null
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data)
        return node
      }
      else if (data > node.data) {
        node.right = removeNode(node.right, data)
        return node
      }
      else {
        if (!node.left && !node.right) {
          return null
        }

        if (!node.left) {
          node = node.right
          return node
        }

        if (!node.right) {
          node = node.left
          return node
        }

        let minFromRight = node.right
        while (minFromRight.left) {
          minFromRight = minFromRight.left
        }
        node.data = minFromRight.left

        node.right = removeNode(node.right, minFromRight.data)
        return node
      }
    }
  }
  min() {
    let node = this.rootNode
    if (!node) {
      return
    }

    while (node.left) {
      node = node.left
    }
    return node.data
  }
  max() {
    let node = this.rootNode
    if (!node) {
      return
    }

    while (node.right) {
      node = node.right
    }
    return node.data
  }
  add(data) {
    this.rootNode = addWithin(this.rootNode, data)

    function addWithin(node, data) {
      if (!node) {
        return new Node(data)
      }

      if (node.data === data) {
        return node
      }

      if (data < node.data) {
        node.left = addWithin(node.left, data)
      }
      else {
        node.right = addWithin(node.right, data)
      }
      return node
    }
  }

}