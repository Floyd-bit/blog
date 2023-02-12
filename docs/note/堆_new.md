### 1. 堆的构建

![image-20220206160826028](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041453935.png)

大根堆——用数组存储

- 从最后一个非叶子节点开始，和孩子节点的最大值比较
- 若大于最大值，不需要下沉
- 若小于最大值，则交换位置，继续和下一层孩子节点比较

```js
// 对单个节点进行处理
function ajustMaxHeap(array, index, length) {
    // 该节点与孩子节点的最大值比较, 孩子节点index = i*2 + 1
    for(let i = 2*index + 1; i<length; i= 2*i + 1) {
        // 孩子节点最大值
        if(i+1 < length && array[i+1] > array[i]) {
            i++;
        }
        if(array[index] >= array[i]) {
            break;
        } else {
            // 交换节点
            [array[index], array[i]] = [array[i], array[index]];
            // 继续和下一层孩子节点比较
            index = i;
        }
    }
}
// 构建大根堆
function creatMaxHeap(arr, length) {
    // 从最后一个非叶子节点开始处理
    for(let i = Math.floor(length/2) - 1; i>=0; i--) {
        adjustMaxHeap(arr, i, length);
    }
    return arr;
}
```

### 2. 最小的k个数

- 思路1：先排序，取最小k个数，时间复杂度O(nlogn)
- 思路2：先把前k个数构建一个大根堆，从第k个数开始和大根堆的最大值进行比较，若比最大值小则交换两个数的位置重新构建大根堆，时间复杂度O(nlogk)

```js
function adjustNode(arr, index, length) {
    for(let i = index*2 + 1; i<length; i = i*2 + 1) {
        if(i+1 < length && arr[i] < arr[i+1]) {
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
function creatMaxHeap(arr, length) {
    for(let i= Math.floor(length/2) - 1; i>=0; i--) {
        adjustNode(arr, i, length);
    }
    return arr;
}
function findMinK(arr, k) {
    let arrk = arr.slice(0, k);
    // 前k个数构建大根堆
    let heap = createMaxHeap(arrk, k);
    for(let i=k; i<arr.length; i++) {
        // 若后面的数小于大根堆的最大值则交换后调整
        if(arr[i] < heap[0]) {
            heap[0] = arr[i];
            adjustNode(heap, 0, k);
        }
    }
    return heap;
}
```
