### 1. 子集

题目描述：返回一个整数数组所有可能的子集

思路：数组中每个元素都有两种情况，选中(1), 未选中(0), 所以一共有2的n次方种情况，我们用mask来表示当前情况(如101, mask=5)。对于每种情况, 判断在二进制表示中当前数组下标所在二进制位是否为1(mask & (1 << i))，从而得到子集

时间复杂度: O(2^n * n3)

```javascript
@var subsets = function(nums) {
    const ans = [];
    for(let mask = 0; mask < (1 << nums.length); mask++) {
        for(let i=0; i<mask.length; i++) {
            if(mask & (1 << i)) {
                ans.push(nums[i])                
            }
        }
    }
    return ans;
}
```

### 2. 有效括号生成

```js
var generateParenthesis = function(n) {
    const arr = [];
    for(let i=0; i<2**(2*n); i++) {
        let bin = i.toString(2).padStart(2*n, '0');
        if(isLegal(bin)) {
            arr.push(numToChar(bin));
        }
    }
    return arr;
};

function isLegal(str) {
    let arr = Array.from(str);
    let length = arr.length;
    let count0 = 0
        count1 = 0;
    arr.forEach((item) => {
        item === '0' && count0++;
        item === '1' && count1++;
    })
    if(count0 !== count1) return false;
    let stack = [];
    for(let i=0; i<length; i++) {
        if(arr[i] === '0') {
            stack.push(arr[i]);
        } else {
            if(stack.pop() !== '0') {
                return false;
            }
        }
    }
    return true;
}

function numToChar(str) {
    let res = '';
    for(let i=0; i<str.length; i++) {
        if(str[i] === '0') {
            res += '(';
        } else {
            res += ')';
        }
    }
    return res;
}
```

