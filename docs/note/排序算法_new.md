> 稳定性: 两个相等元素初始顺序与排序后顺序一致则是稳定的

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

### 7. 数组中的第K个最大元素
