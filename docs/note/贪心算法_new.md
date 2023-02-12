> 贪心算法：总是选择在当前看来最好的做法

### 1. 分发饼干

题目：每个孩子都有一个胃口值gi，这是能满足孩子们胃口的饼干的最小尺寸；每块饼干j，都有一个尺寸sj. 如果sj >= gi，我们可以将这个饼干j分配给孩子i，这个孩子会得到满足。输出能满足的最大孩子数量。

思路：优先用最小的饼干满足胃口最小的孩子

```js
function divide(children, cookie) {
    let ch = children.sort((a,b) => a-b);
    let co = cookie.sort((a,b) => a-b);
    let i=0, j=0, count=0;
    while(ch[i]&&co[j]) {
        if(ch[i] <= co[j]) {
            count++;
            i++;
            j++;
        } else {
             j++;   
        }
    }
    return count;
}
```

### 2. 零钱兑换

```js
var count = 0;
var coinChange = function(coins, amount) {
    if(amount === 0) return 0;
    let sortedCoins = coins.sort((a,b)=>b-a);
    fn(sortedCoins, amount);
    return count;
}; 

function fn(coins, amount) {
    if(amount === 0) return;
    if(amount < coins[coins.length -1]){
        count = -1;
        return;
    }
    let i = 0;
    while(amount < coins[i] && i<coins.length) {
        i++;
    }
    amount -= coins[i];
    count++;
    fn(coins, amount);
}
```

### 3. 买卖股票的最大值II (多次交易)

题目：给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。

在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。

返回 你能获得的 最大 利润 

![image-20220510160630123](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041453507.png)

```js
var maxProfit = function(prices) {
    // 贪心算法, 用tem[i]-tem[i-1]表示连着的两天买卖股票的盈利
    // 若tem值为正，则加入总利润profit
    const length = prices.length;
    let profit = 0;
    for(let i=0; i<length-1; i++) {
        let tem = prices[i+1] - prices[i];
        if(tem > 0) {
            profit += tem;
        }
    }
    return profit;
};
```

