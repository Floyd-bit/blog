二叉树用来模拟树状结构性质的数据集合，每个节点具有左右子树，完全二叉树、排序二叉树、平衡二叉树

```js
function TreeNode(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
}
```

### 1. 二叉树遍历

前序遍历、中序遍历、后序遍历

- 递归遍历

- 非递归遍历

- 二叉树重建
  
  输入某二叉树的前序遍历和中序遍历的结果，重建出该二叉树
  
  ```js
  function rebuild(pre, vin) {
      if(!vin.length) return null;
      if(vin.length === 1) return new TrrNode(pre[0], null, null);
      let root = new TreeNode(pre[0], null, null);
      let index = vin.indexOf(root.data);
      let vinleftArr = vin.slice(0,index);
      let vinrightArr = vin.slice(index+1, vin.length);
      /*
      let preleftArr = pre.filter(item => vinleftArr.indexOf(item) !== -1);
      let prerightArr = pre.filter(item => vinrightArr.indexOf(item) !== -1);
      */
      let preleftArr = pre.slice(1, index+1);
      let prerightArr = pre.slice(index+1);
      root.left = rebuild(preleftArr,vinleftArr);
      root.right = rebuile(prerightArr, vinrightArr);
      return root;
  }
  ```

### 2. 二叉树的对称性

- 判断二叉树是否对称
  
  思路：递归比较左子树的左和右子树的右，左子树的右和右子树的左
  
  ```js
  function isLegal(root) {
      if(!(root.left||root.right)) return true;
      return compare(root.left, root.right);
  }    
  function compare(leftNode, rightNode) {
      if(leftNode.val !== rightNode.val) {
          return false;
      }
      let flag1 = compare(leftNode.left, rightNode.right);
      let flag2 = compare(leftNode.right, rightNode.left);
      if(!flag1 || !flag2) return false;
      return true;
  }
  ```

- 二叉树的镜像(翻转二叉树)
  
  ```js
  function reverseTree(root) {
      if(root.left || root.right) {
          let temp = root.left;
           root.left = root.right;
           root.right = temp;
           root.left && reverseTree(root.left);
           root.right && reverseTree(root.right);
      }
  }
  ```

### 3. 二叉搜索树

任意节点左子树上的节点值小于根节点的值，任意节点的右子树上的节点值大于根节点的值

> 性质：二叉搜素树的中序遍历是递增数组

- 二叉搜索树的第k个节点
  
  思路：中序遍历二叉树，取数组第k个元素

- 判断数组是否为二叉搜索树的后序遍历结果
  
  利用二叉搜索树的性质
  
  ### 4. 二叉树的深度

> 递归层级数代表了当前深度

- 二叉树的最大深度
  
  ```js
  function maxDepth(root) {
      if(!root) return 0;
      var count = [];
      function leafDepth(root, depth) {
           let dep = depth + 1;
           root.left && leafDepth(root.left, dep);
           root.right && leafDepth(root.right, dep);
           if(root.left === null && root.right === null) count.push(dep);
      }
      leafDepth(root);
      return Math.max(count);
  }
  ```

- 二叉树的最小深度
  
  ```js
  function minDepth(root) {
      if(!root) return 0;
      function leafDepth(root, depth) {
           let dep = depth + 1;
           root.left && leafDepth(root.left, dep);
           root.right && leafDepth(root.right, dep);
           if(root.left === null && root.right === null)
               return dep;
      }
      return leafDepth(root);
  }
  ```

- 平衡二叉树
  
  > 左右子树的高度之差不超过1
  
  ```js
  function IsBalance(root) {
      return balanced(root) != -1;
  }
  function balanced(node) {
      if(!node) {
          return 0;
      }
      const left = balanced(node.left);
      const right = balanced(node.right);
      if(left == -1 || right == -1 || Math.abs(left, right) > 1) {
          return -1;
      }
      return Math.max(left, right) + 1;
  }
  ```