### 1. 打家劫舍

题目：给定一个非负整数数组代表每个房屋存放的金额，如果两间相邻的房屋在同一晚上被小偷闯入系统会报警，计算在不触动报警装置的情况下能够偷窃到的最高金额。

思路：计f(k)表示能从前k个房屋中抢劫到的最大数额，Ai表示第i个房屋的金额。则f(k) = max( f(k-1), f(k-2)+Ak ). f(1) = A1, f(2) = max(A1, A2)

```js
// 递归写法
function robMoney(arr) {
    if(!arr.length) return;
    arr.length === 1 && return arr[0];
    arr.length === 2 && return Math.max(arr[0], arr[1]);
    return Math.max(robMoney(arr.slice(0, arr.length-1)), arr.slice(0, arr.length-2)+arr[arr.length-1]);
}
// 循环写法, 保存f(k-1), f(k-2)
function robMoney(arr) {
    if(arr.length <= 2) {
        switch(arr.length) {
            case 0: return 0;
            case 1: return arr[0];
            case 2: return Math.max(arr[0], arr[1]);
        }
    }
    let cache = [arr[0], Math.max(arr[0], arr[1])];
    for(let i=2, i<arr.length; i++) {
        let cur = Math.max(cache[1], cache[0]+arr[i]);
        cache = [cache[1], cur];
    }
    return cache[1];
}
```

### 2. 最小路径和

题目：给定一个包含非负整数的m×n网网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和最小，每次只能向下或向右移动一步

思路：要到达(i,j)点，f(i, j) = min(f(i-1, j), f(i, j-1)) + (i, j), 若i或j为0则只有一条路径

```js
// 递归写法
function minPath(arr) {
   return pointMinPath(arr, arr[0].length, arr.length)
}

function pointMinPath(arr, i, j) {
    if(i === 0) {
        let result = 0;
        for(let k=0; k<=j; k++) {
            result += arr[0][k]; 
        }
        return result;
    }
     if(j === 0) {
        let result = 0;
        for(let k=0; k<=i; k++) {
            result += arr[k][0]; 
        }
        return result;
    }
    return Math.min(pointMinPath(arr, i-1, j), pointMinPath(arr, i, j-1)) + arr[i][j];
}

// 循环写法，保存一个存储最小路径的二维数组
function minPath(arr) {
    let map = arr.slice();
    for(let j=0; j<arr.length; j++) {
        for(let i=0; i<arr[0].length; i++) {
            if(j===0 && i!==0) {
                map[i][j] += map[i-1][j]; 
            }
            if(i===0 && j!==0) {
                map[i][j] += map[i][j-1];
            }
            if(i!==0 && j!== 0) {
                map[i][j] += Math.min(map[i-1][j], map[i][j-1]);
            }
        }
    }
    return map[map[0].length-1][map.length-1];
}
```

### 3. 买卖股票的最佳时机

题目：给定一个数组存储了股票第i天的价格，计算完成一笔交易(买入和卖出)的最大利润

思路：设前i-1天股票最大利润为dp[i-1], 则前i天股票最大利润为 max(dp[i-1], price[i] - minprice)

```js
function maxProfit(arr) {
    let minprice = arr[0];
    let profit = 0;
    for(let i=0; i<arr.length; i++) {
        if(arr[i] < minprice) minprice = arr[i];
        profit = Math.max(profit, arr[i]-minprice); 
    }
    return profit;
}
```

### 4. 回文子串

### 5. 连续子数组的最大和

思路：设f(n)为截至到第N项连续子数组的最大和，则f(n) = Math.max(f(n-1)+nums[n], nums[n])

### 6. 零钱兑换

```javascript
var coinChange = function(coins, amount) {
    // 动态规划 f(i)表示对于总金额i的最小硬币个数
    // 递推公式: f(i) = Min(f(i-coin[0]), f(i-coin[1], ...))+1
    // 边界条件：f(0) = 0 
    const max = amount + 1;
    // 初始化
    const arr1 = new Array(amount+1);
    const arr =  arr1.fill(max);
    arr[0] = 0;
    for(let i=1; i<amount+1; i++) {
        for(let j=0; j<coins.length; j++) {
            if(coins[j] <= i) {
                arr[i] = Math.min(arr[i], arr[i-coins[j]]+1);
            }
        }
    }
    // console.log(arr);
    return arr[amount] > amount ? -1 : arr[amount];
};
```

### 7. 最长上升子序列

```js
var lengthOfLIS = function(nums) {
    // 动态规划 f(n)表示以nums[n]结尾的最长上升子序列的长度
    // 状态转移方程：f(n) = max(f(i)) + 1, 其中i<n且nums[i] < nums[n]
    const dp = [1];
    for(let i=1; i<nums.length; i++) {
        let max = 0;
        for(let j=0; j<i; j++) {
            if(nums[j] < nums[i] && dp[j] > max) {
                max = dp[j];
            }
        }
        dp[i] = max + 1;
    }
    return Math.max(...dp);
};
```

### 8. 最长重复子数组

```js
var findLength = function(nums1, nums2) {
    // 暴力解法中，需要在nums1[i]和nums2[j]开头的子数组中寻找最长公共前缀，导致重复比较太多，时间复杂度为O(n^3)
    // 动态规划，dp[i][j]表示以nums1[i]和nums2[j]开始的最大公共前缀的长度
    // 需要从dp[length-1][length-1]开始
    const length1 = nums1.length;
    const length2 = nums2.length;
    const dp = [];
    let max = 0;
    for(let i=0; i<length1+1; i++) {
        let arr = new Array(length2+1);
        arr.fill(0);
        dp.push(arr);
    }
    for(let i=length1-1; i>=0; i--) {
        for(let j=length2-1; j>=0; j--) {
            dp[i][j] = nums1[i] === nums2[j] ? dp[i+1][j+1] + 1 : 0;
            dp[i][j] > max && (max = dp[i][j]);
        }
    }
    return max;
};
```

### 9. 0-1背包问题

若五项物品的价值数组和重量数组分别为v[]={0,1,6,18,22,28}和w[]={0,1,2,5,6,7}，背包容量为T=11，则获得的最大价值为____ .

思路：用二维数组存储最大价值，一维表示容量，一维表示可以选择的物品。dp\[i][j]表示从下标为0到i的物品中选择若干件物品放入容量为j的背包中能存储的最大价值。

![image-20220702145152255](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202207021452004.png)

```js
const package = (value, weight, size) => {
	const dp = new Array(value.length).map(arr => new Array(size+1).fill(0));
    // 初始化dp数组
    for(let i=weight[0]; i<=weight; i++) {
        dp[0][i] = value[0];
    }
    // dp填表
    for(let i=1; i<dp.length; i++) {
        for(let j=0; j<weight; j++) {
            if(j < weight[i]) {
                dp[i][j] = dp[i-1][j];
            } else {
                // 选 or 不选第i件物品
                dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-weight[i]] + value[i]);
            }
        }
    }
    return dp[value.length-1][size];
}
```

### 10. 编辑距离

给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。

你可以对一个单词进行如下三种操作：

- 插入一个字符
- 删除一个字符
- 替换一个字符

思路：dp\[i\][j]表示以下标i-1结尾的字符串word1，和以下标j-1结尾的字符串word2的最小编辑距离（之所以表示i-1结尾是因为方便初始化，dp\[i]\[0]表示以下标i-1结尾的字符串与空字符串的最小编辑距离，即为i）

```js
const minDistance = (word1, word2) => {
    const dp = new Array(word1.length+1).map(arr => new Array(word2.length+1).fill(0));
    // 初始化dp数组
    for(let i=0; i<=word1.length; i++) {
		dp[i][0] = i;
    }
    for(let j=0; j<word2.length; j++) {
        dp[0][i] = j;
    }
    // 填表
    for(let i=1; i<=word1.length; i++) {
		for(let j=1; j<word2.length; j++) {
			if(word1[i-1][j-1] === word2[i-1][j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                // 可能有三种情况：新增、删除、替换
                dp[i][j] = Math.min(
                	dp[i-1][j],
                    dp[i][j-1],
                    dp[i-1][j-1]
                ) + 1;
            }
        }
    }
    return dp[word1.length-1][word2.length-1];
}
```