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
  add(data) {
    this.rootNode = addNode(this.rootNode, data)

    function addNode(node, data) {
      if (!node) {
        return new Node(data)
      }

      if (node.data === data) {
        return node
      }

      if (data < node.data) {
        node.left = addNode(node.left, data)
      }
      else {
        node.right = addNode(node.right, data)
      }
      return node
    }
  }
  has(data) {

    function searchNode(node, data) {
      if (!node) {
        return false
      }

      if (node.data === data) {
        return true
      }

      return data < node.data ? searchNode(node.left, data) : searchNode(node.right, data)
    }
    return searchNode(this.rootNode, data)
  }
  find(data) {

    function findNode(node, data) {
      if (!node) {
        return null
      }

      if (node.data === data) {
        return node
      }

      return data < node.data ? findNode(node.left, data) : findNode(node.right, data)
    }
    return findNode(this.rootNode, data)
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

        let minRight = node.right
        while (minRight.left) {
          minRight = minRight.left
        }
        node.data = minRight.data

        node.right = removeNode(node.right, minRight.data)
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

}