### 1.  二分查找

### 2. 寻找旋转排序数组中的最小值

题目：给你一个元素值 **互不相同** 的数组 `nums` ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 **最小元素** 。例如数组 `nums = [0,1,2,4,5,6,7]` 在变化后可能得到：若旋转 `4` 次，则可以得到 `[4,5,6,7,0,1,2]`

思路：二分查找，比较nums[middle]和nums[end]， 如果nums[middle] < nums[end]， 则最小值在区间 [start, middle]中； 如果nums[middle] > nums[end], 则最小值在区间 [middle+1, end]中

![fig1](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041453198.png)

```js
var findMin = function(nums) {
    let low = 0;
    let high = nums.length - 1;
    while (low < high) {
        const pivot = low + Math.floor((high - low) / 2);
        if (nums[pivot] < nums[high]) {
            high = pivot;
        } else {
            low = pivot + 1;
        }
    }
    return nums[low];
};
```

