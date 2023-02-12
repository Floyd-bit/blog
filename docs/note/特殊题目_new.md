### 1. 变态跳台阶

### 2.扑克牌中的顺子

思路：统计大小王个数 -> 判断是否重复 -> 排序 -> 验证最大值和最小值(除0外)的差值是否小于5

### 3. 螺旋矩阵

```js
var spiralOrder = function(matrix) {
    let top = 0
        bottom = matrix.length - 1
        left = 0
        right = matrix[0].length - 1;
    const result = [];
    // 从外到内按圈遍历
    while(top < bottom && left < right) {
        for(let i=left; i<right; i++) {
            result.push(matrix[top][i]);
        }
        for(let i=top; i<bottom; i++) {
            result.push(matrix[i][right]);
        }
        for(let i=right; i>left; i--) {
            result.push(matrix[bottom][i]);
        }
        for(let i=bottom; i>top; i--) {
            result.push(matrix[i][left]);
        }
        top++;
        bottom--;
        left++;
        right--;
    }
    // 剩余一行
    if(top === bottom) {
        for(let i=left; i<=right; i++) {
            result.push(matrix[top][i]);
        }
    } else if(left === right) {
        for(let i=top; i<=bottom; i++) {
            result.push(matrix[i][left]);
        }
    }
    return result;
};
```

### 4. 洗牌(shuffle)算法

```js
var Solution = function(nums) {
    this.nums = nums;
    this.original = this.nums.slice();
};

Solution.prototype.reset = function() {
    this.nums = this.original.slice();
    return this.nums;
};
// 用i遍历数组，对于每次遍历从[i, n-1]中随机选取一个元素，并与i交换
Solution.prototype.shuffle = function() {
    for (let i = 0; i < this.nums.length; ++i) {
        const j = Math.floor(Math.random() * (this.nums.length - i)) + i;
        const temp = this.nums[i];
        this.nums[i] = this.nums[j];
        this.nums[j] = temp;
    }
    return this.nums;
};
```

