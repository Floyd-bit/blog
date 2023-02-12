> 回溯总在递归后，边界条件判断->递归调用->回溯

### 框架

模板例题为**全排列**

回溯框架时间复杂度都不可能低于 O(N!)，因为穷举整棵决策树是无法避免的

![img](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206101758517.jpeg)

```python
result = []
def backtrace(路径, 选择列表):
    if 满足结束条件:
        result.add(路径)
        return
    
    for 选择 in 选择列表:
        做选择
        backtrace(路径, 选择列表)
        撤销选择
```

### 1. 二叉树中和为某一值的路径

```js
function findPath(root, val) {
    const result = [];
    let stack = [];
    fundPathCore(root, val, stack, result);
    return result;
}
function findPathCore(root, val, stack, result) {
    stack.push(root);
    val -= root.val;
    // 当前为叶子节点且满足条件
    if(!root.left && !root.right && val === 0) {
        result.push(stack.slice());
    }
    root.left && findPathCore(root.left, val, stack, result);
    root.right && findPathCore(root.right, val, stack, result);
    // 回溯
    stack.pop();
}
```

### 2. 字符串的排列

```js
function composeString(str) {
    const arr = Array.from(str);
    let result = [];
    // used数组用来记录每个字符是否被使用过
    let used = [], path = [];
    dfs()
    return result;
}
function dfs(arr, len, depth, path, used, result) {
    // 终止条件
    if(depth === len) {
        result.push(path.slice());
        return;
    }
    for(let i=0; i<len; i++) {
        if(!used[i]) {
            path.push(arr[i]);
            used[i] = true;
            dfs(arr, len, depth+1, path, used, result);
            // 回溯
            used[i] = false;
            path.pop();
        }
    }
}
```

### 3 矩阵中的路径

题目：判断在一个矩阵中是否存在一条包含某字符串所有字符的路径

思路：DFS+回溯

```js
function isPathExist(matrix, str) {
    let cache = matrrix.slice().fill(true);
    for(let i=0; i<matrix.length; i++) {
        for(let j=0; j<matrix[0].length; j++) {
            if(dfs(martrix, str, 0, cache, i, j))
                return true;
        }
    }
    return false;
}

function dfs(matrix, str, count, cache, i, j) {
    // 不符合条件
    if(i>matrix.length-1 || i<0 || j>matrix[0].length-1 || j<0 || !cache[i][j] || matrix[i][j] !== str[count]) {
        return false;
    }
    cache[i][j] = false;
    // 匹配完成
    if(count === str.length-1) {
        return true;
    }
    // dfs
    if (dfs(matrix, str, count+1, cache, i+1, j) || dfs(matrix, str, count+1, cache, i-1, j) || dfs(matrix, str, count+1, cache, i, j+1) || dfs(matrix, str, count+1, cache, i, j-1)) {
        return true;
    };
    // 回溯
    cache[i][j] = true;
    return false;
}
```

### 4. 机器人的运动范围

```js
var count = 0; 
var movingCount = function(m, n, k) {
    let map = createMap(m, n);
    let cache = createCache(m, n);
    console.log(cache);
    dfs(0,0,k,map,cache);
    return count;
};

function dfs(m, n, k, map, cache) {
    if(m<0 || m>map.length-1 || n<0 || n>map[0].length-1 || !cache[m][n] || map[m][n] > k){
        return;
    }
    count++;
    cache[m][n] = false;
    console.log(m,n);
    dfs(m+1, n, k, map, cache);
    dfs(m-1, n, k, map, cache);
    dfs(m, n+1, k, map, cache);
    dfs(m, n-1, k, map, cache);
}

function createMap(m, n) {
    let map = [];
    for(let i=0; i<m; i++) {
        let arr = [];
        for(let j=0; j<n; j++) {
            arr.push(addNum(i)+addNum(j));
        }
        map.push(arr);
    }
    console.log(map);
    return map;
}

function createCache(m, n) {
    let cache = [];
    for(let i=0; i<m; i++) {
        let arr = [];
        for(let j=0; j<n; j++) {
            arr.push(true);
        }    
        cache.push(arr);
    }
    return cache;
}

function addNum(m) {
    let arr = m.toString().split('');
    let sum = 0;
    arr.forEach(item => sum+=parseInt(item));
    return sum;
}
```

### 5. n皇后问题
