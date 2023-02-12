### 框架

本质上与回溯问题相同

> 深度优先搜索，用栈实现

### 1. 岛屿数量

题目：给你一个由 `'1'`（陆地）和 `'0'`（水）组成的的二维网格，请你计算网格中岛屿的数量。

思路：遍历二维数组，当找到为'1'的坐标时开始DFS搜索，将上下左右为1的坐标置为'0'，同时计数加1，直到二维数组全为'0'

```js
var numIslands = function(grid) {
    let count = 0;
    for(let j=0; j<grid[0].length; j++) {
        for(let i=0; i<grid.length; i++) {
            if(grid[i][j] === '1') {
                count++;
                dfs(grid, i, j);
            }
        }
    }
    return count;
};

function dfs(grid, i ,j) {
    if(grid[i][j] === '1') {
        grid[i][j] = '0';
        j>0 && dfs(grid, i, j-1);
        j<grid[0].length-1 && dfs(grid, i, j+1);
        i>0 && dfs(grid, i-1, j);
        i<grid.length-1 && dfs(grid, i+1, j);
    }
}
```

### 2. 非递归中序遍历二叉树

### 3. 二叉树路径总和

```js
var hasPathSum = function(root, targetSum) {
    if(!root) return false;
    let flag1 = false;
    let flag2 = false;
    let target = targetSum - root.val;
    if(!root.left && !root.right && target===0) return true;
    if(root.left) {
        flag1 = hasPathSum(root.left, target);
    }
    if(root.right) {
        flag2 = hasPathSum(root.right, target);
    }
    return flag1 || flag2;
};
```
