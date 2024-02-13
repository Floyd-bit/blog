> 稳定性: 两个相等元素初始顺序与排序后顺序一致则是稳定的

### 各排序算法的稳定性，时间复杂度，空间复杂度

![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/31/17268ebaae4e7c11~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

稳定性：稳定性的意思就是对于相同值来说，相对顺序不能改变。通俗的讲有两个相同的数 A 和 B，在排序之前 A 在 B 的前面， 而经过排序之后，B 跑到了 A 的前面，对于这种情况的发生，我们管他叫做排序的不稳定性。

稳定性有什么意义？个人理解对于前端来说，比如我们熟知框架中的虚拟 DOM 的比较，我们对一个列表进行渲染， 当数据改变后需要比较变化时，不稳定排序或操作将会使本身不需要变化的东西变化，导致重新渲染，带来性能的损耗。

- **数据库**: 在数据库查询中，稳定的排序算法能确保当你按多个字段排序时，每一级的排序都不会影响其他级别的排序结果。（如先对商品数据按照销量排序，再按照价格排序，如果算法不稳定将会使得排序结果出错）
- **搜索引擎**: 稳定性在搜索结果排序中也很重要，以便维持其他相关因素（如页面权重）的原有顺序。

### JS数组排序方法实现

 在Chrome浏览器中，JS数组长度大于 10 会采用快排，否则使用插入排序。选择插入排序是因为虽然时间复杂度很差，但是在数据量很小的情况下和 O(N * logN) 相差无几，然而插入排序需要的常数时间很小，所以相对别的排序来说更快。

### 1. 冒泡排序

时间复杂度 O(n^2)     空间复杂度 O(1)    稳定

```js
function bubbleSort(arr) {
    for(let i=0; i<arr.length; i++) {
        for(let j=0; j<arr.length-i-1; j++) {
            if(arr[j] > arr[j+1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}
```

### 2. 插入排序

左侧看作有序序列，每次从右侧数组中取一个数字从有序序列最右侧开始比较

时间复杂度O(n^2)   空间复杂度O(1)   稳定

```js
function insertSort(arr) {
    for(let i=1; i<arr.length; i++) {
        let target = i;
        for(let j=i-1; j>=0; j--) {
            if(arr[targrt] < arr[j]) {
                [arr[target], arr[j]] = [arr[j], arr[target]];
                target = j;
            }
        }
    }
    return arr;
}
```

### 3. 归并排序

采用`分治法`，分割：将数组从中间分为左右两个，递归分割，归并：合并两个有序数组

时间复杂度O(nlogn) 稳定

```js
// 归并排序，得到一个有序数组
function mergeSort(arr) {
    if(arr.length < 2) return arr;
    let mid = Math.floor(arr.length/2);
    let front = arr.slice(0, mid);
    let end = arr.slice(mid);
    return merge(mergeSort(front), mergeSort(end));
}
// 合并两个有序数组
function merge(front, end) {
    let temp = [];
    while(front.length && end.length) {
        if(front[0] < end[0]) {
            temp.push(front[0]);
        } else {
            temp.push(end[0]);
        }
    }
    front.length && temp.concat(front);
    end.length && temp.concat(end);
    return temp;
}
```

### 4. 选择排序

每次循环选取一个最小的数字放到前面的有序序列中

时间复杂度O(n^2)    空间复杂度O(1)   不稳定

```js
function selectionSort(arr) {
    for(let i=0; i<arr.length; i++) {
        let min = i;
        for(let j=i+1; j<arr.length; j++) {
            if(arr[j] < arr[min]) {
                min = j;
            }
        }
        [arr[i], arr[min]] = [arr[min], arr[i]];
    }
    return arr;
}
```

### 5. 快速排序

时间复杂度O(n*logn)   空间复杂度O(logn)   不稳定

```js
// 写法1，消耗空间
function quickSort(arr) {
    let leftArr = [];
    let rightArr = [];
    // 递归终止条件
    if(arr.length === 1 || arr.length === 0) return arr;
    for(let i=1; i<arr.length; i++) {
        arr[i]<=arr[0] && leftArr.push(arr[i]);
        arr[i]>arr[0] && rightArr.push(arr[i]);
    }
    // 递归
    return quickSort(leftArr).concat([target], quickSort(rightArr));
}
// 写法2
function quickSort(arr, start, end) {
    // 递归终止条件
    if(end - start < 1) {
        return;
    }
    // 基准点
    const target = arr[start];
    let s = start;
    let e = end; 
    while(s < e) {
        while(s < e && arr[r] >= target) {
            e--;
        }
        arr[s] = arr[e];
        while(s < e && arr[s] < target) {
            s++;
        }
        arr[e] = arr[s];
    }
    // 基准点归位
    arr[s] = target;
    quickSort(arr, start, l-1);
    quickSort(arr, l+1, end);
    return arr;
}
```

### 6. 堆排序

创建一个大根堆，从最后一个元素开始与堆顶元素交换, 调整顺序

时间复杂度 O(nlogn)  空间复杂度O(1)  不稳定

```js
function adjustNode(arr, index, length) {
    for(let i = index * 2 + 1; i < length; i = i*2 +1) {
        if(i+1 < length && arr[i+1] > arr[i]) {
            i++;
        }
        if(arr[index] >= arr[i]) {
            break;
        } else {
            [arr[index], arr[i]] = [arr[i], arr[index]];
            index = i;
        }
    }
}
function createMaxHeap(arr, length) {
    for(let i= Math.floor(length/2) -1; i>=0; i--) {
        adjustNode(arr, i, length);
    }
    return arr;
}
function heapSort(arr) {
    // 创建大根堆
    let heap = createMaxHeap(arr, arr.length);
    // 交换堆顶元素和最后一个元素，重新调整
    for(let i=heap.length - 1; i>0; i--) {
        [heap[0], heap[i]] = [heap[i], heap[0]];
        adjust(heap, 0, heap.length);
    }
    return heap;
}
```

### 7. 基数排序

将整数按位数切割成不同的数字，然后按每个位数分别比较

![img](https://www.runoob.com/wp-content/uploads/2019/03/radixSort.gif)

```javascript
//LSD Radix Sort
var counter = [];
function radixSort(arr, maxDigit) {
    var mod = 10;
    var dev = 1;
    for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for(var j = 0; j < arr.length; j++) {
            var bucket = parseInt((arr[j] % mod) / dev);
            if(counter[bucket]==null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        var pos = 0;
        for(var j = 0; j < counter.length; j++) {
            var value = null;
            if(counter[j]!=null) {
                while ((value = counter[j].shift()) != null) {
                      arr[pos++] = value;
                }
          }
        }
    }
    return arr;
}
```

### 8. 计数排序

### 9. 桶排序

### 10. 希尔排序

![img](https://pic1.zhimg.com/80/v2-7ef755d2b04f11cb013acb47f10928cc_720w.webp)

### 7. 数组中的第K个最大元素

利用快速排序的方法找到位置在第k个的元素，并可以根据基准元素的位置缩小快速排序的区间。