### 框架

**本质是在一幅「图」中找到从起点 `start` 到终点 `target` 的最近距离**

```javascript
// 计算从起点到终点的最近距离 
function BFS(start, target) {
	// 队列保存需要搜索的节点
    const queue = [];
    // 记录已经搜索过的节点
    const visited = [];
    // 记录扩散的步数
    let step = 0;
    
    queue.push(start);
    visited.push(start);
    
    while(!queue.length) {
        // 搜索周围一圈节点
        let length = queue.length;
        for(let i=0; i<length; i++) {
            let cur = queue.shift();
            // 终止条件
            if(cur === target) {
				return step;
            }
            // 搜索当前节点相邻的节点并加入队列
            cur.around.forEach(node => {
                if(visited.indexOf(node) === -1) {
                    queue.push(node);
                    visited.push(node);
                }
            });
        }
        // 更新步数
        step++;
    }
}
```

> 广度优先搜索，用队列实现

### 1. 从上到下打印二叉树

```js
function printFromTopToBottom(root) {
    let queue = [];
    while(root) {
        print(root.val);
        root.left && queue.push(root.left);
        root.right && queue.push(root.right);
        root = queue.shift();
    }
}
```

### 2. 把二叉树打印成多行(层次遍历)

```js
function printByRows(root) {
    let result = [];
    let queue = [];
    let count = 0;
    let temp = 0;
    if(root) {
        result.push([root.val]);
        root.left && queue.push(root.left) && count++;
        root.right && queue.push(root.right) && count++;
    }
    let row = [];
    while(queue.length) {
        for(let i=0; i<count; i++) {
            let cur = queue.shift();
            row.push(cur.val);
            cur.left && queue.push(cur.left) && temp++;
            cur.right && queue.push(cur.right) && temp++;
        }
        result.push(row);
        row = [];
        count = temp;
        temp = 0;
    }
    return result;
}
```

### 3. 之字形打印二叉树

思路：用两个栈存储子节点，分奇数行和偶数行

### 4. 二叉树的最小深度