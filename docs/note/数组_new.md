### 1. 双指针

- 使数组中奇数位于偶数前面
  
  思路：参考快速排序
  
  ```js
  function resort(arr) {
      let i = 0;
      let j = arr.length -1;
      while(i < j) {
          while(arr[i]%2 === 1) {
              i++;
          }
          [arr[i], arr[j]] = [arr[j], arr[i]];
          while(arr[j]%2 === 0) {
              j--;
          }
          [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
  }
  ```

- 递增数组和为s的两个数字
  
  ```js
  function findTwoNumber(arr, s) {
      let i = 0;
      let j = arr.length - 1;
      while(i<j){
          if(arr[i]+arr[j] === s) {
              return [arr[i], arr[j]];
          } else if(arr[i] + arr[j] < s) {
              i++;
          } else {
              j--;
          }
      }
      return [];
  }
  ```

- 和为s的**连续正整数序列**
  
  思路：类似滑动窗口
  
  ```js
  function findList(s) {
      let list = [1,2];
      let head = 2;
      let trail = 1;
      let sum = 3;
      while() {
  
      }
  }
  ```

### 2. N数之和问题

1. 两数之和
   
   思路：方法1. 排序后双指针
   
   ​           **方法2. map记录，key存储数字，value存储索引**
   
   ```js
   function findTwoNumbers(arr, s) {
       let first = arr[0];
       let map = {first: 0};
       for(let i=1; i<arr.length; i++) {
           let key = s - arr[i];
           if(map.key) {
               return [map.key, i];
           }
           map.arr[i] = i;
       }
       return [];
   }
   ```

2. ***三数之和***
   
   题目：给定一个整数数组nums, 判断nums中是否存在三个元素a,b,c使得a+b+c=0, 找出所有满足条件且不重复的三元组
   思路：先对数组进行排序，然后进行遍历，如果当前元素大于0则跳出循环，在每次迭代中如果当前元素与前一个元素相同则跳过(避免重复)；对当前迭代元素后面的数组采用双指针的方式寻找剩余两个元素，如果找到需要在避免重复的清空下继续寻找
   
   ```javascript
   var threeSum = function(nums) {
       let length = nums.length;
       let result = [];
       let sortedNums = nums.sort((a, b) => a-b);
       for(let i=0; i<length; i++) {
           if(sortedNums[i] > 0) {
               break;
           }
           if(sortedNums[i] === sortedNums[i-1]) {
               continue;
           }
           let end = sortedNums.length - 1;
           let start = i+1;
           while(start < end) {
               if(sortedNums[start] + sortedNums[end] === -sortedNums[i]) {
                   result.push([nums[i], sortedNums[start], sortedNums[end]]);
                   while(sortedNums[start + 1] === sortedNums[start]) {
                       start++;
                   }
                   while(sortedNums[end - 1] === sortedNums[end]) {
                       end++;
                   }
                   start++;
                   end--;
               }
               if(sortedNums[start] + sortedNums[end] < -sortedNums[i]) {
                   start++;
               } else if(sortedNums[start] + sortedNums[end] > -sortedNums[i]) {
                   end--;
               }
           }
       }
       return result;
   };
   ```

3. ***四数之和***

### 3. 二维数组

- 构建乘积数组

- ***顺时针打印矩阵（螺旋矩阵）***: 用变量记录四个边界点(top、bottom、left、right)，由最外层向内层按层次遍历

- **旋转矩阵(顺时针旋转90°)**

  思路：先将矩阵沿对角线进行镜像对称，然后反转每行的元素

  ![img](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202207111537141.jpeg)

  ![img](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202207111538762.jpeg)

  ```java
  // 将二维矩阵原地顺时针旋转 90 度
  public void rotate(int[][] matrix) {
      int n = matrix.length;
      // 先沿对角线镜像对称二维矩阵
      for (int i = 0; i < n; i++) {
          for (int j = i; j < n; j++) {
              // swap(matrix[i][j], matrix[j][i]);
              int temp = matrix[i][j];
              matrix[i][j] = matrix[j][i];
              matrix[j][i] = temp;
          }
      }
      // 然后反转二维矩阵的每一行
      for (int[] row : matrix) {
          reverse(row);
      }
  }
  
  // 反转一维数组
  void reverse(int[] arr) {
      int i = 0, j = arr.length - 1;
      while (j > i) {
          // swap(arr[i], arr[j]);
          int temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          i++;
          j--;
      }
  }
  ```

### 4. 数据统计

- 数组中出现次数超过数组长度一半的数字
  
  思路：摩尔投票法

- ***连续子数组的最大和***

- 扑克牌顺子

- 第一个只出现一次的字符
  
  思路：方法1. map存储每个字符出现的次数
  
  ​           方法2. 比较 IndexOf 和 lastIndexOf

### 5. 数组原地算法

> 快慢指针

- 删除有序数组中的重复项

  ![img](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202207091632469.gif)

  ```java
  int removeDuplicates(int[] nums) {
      if (nums.length == 0) {
          return 0;
      }
      int slow = 0, fast = 0;
      while (fast < nums.length) {
          if (nums[fast] != nums[slow]) {
              slow++;
              // 维护 nums[0..slow] 无重复
              nums[slow] = nums[fast];
          }
          fast++;
      }
      // 数组长度为索引 + 1
      return slow + 1;
  }
  ```

-  删除排序链表中的重复元素

  ```java
  ListNode deleteDuplicates(ListNode head) {
      if (head == null) return null;
      ListNode slow = head, fast = head;
      while (fast != null) {
          if (fast.val != slow.val) {
              // nums[slow] = nums[fast];
              slow.next = fast;
              // slow++;
              slow = slow.next;
          }
          // fast++
          fast = fast.next;
      }
      // 断开与后面重复元素的连接
      slow.next = null;
      return head;
  }
  ```

  

