### 1. 基本应用

单链表定义:

```js
function ListNode(x) {
    this.val = x;
    this.next = null;
}
```

- 从尾到头打印链表
  
  ```js
  function printList(head) {
      let stack = [];
      while(head.next) {
          stack.push(head.val);
          head = head.next;
      }
      for(let i=0; i<stack.length; i++) {
          console.log(stack.pop());
      }
  }
  ```

- 删除链表中的节点（分情况）
  
  ```js
  // 给定头节点和要删除的节点
  function deleteNode(head, node) {
      if(node == head) {
          head = null;
      } else {
          while(head.next) {
              if(head.next == node) {
                  if(head.next.next) {
                      head.next = head.next.next;
                  } else {
                      head.next = null;
                  }
              }
          }
      }
      return node;
  }
  ```

- 删除链表中重复的节点
  
  思路: 方法1. 用map记录每个节点出现的次数
  
  ​         方法2. 删除出现次数大于1的节点

- 反转链表
  
  ```js
  function reverseList(head) {
      let h = head;
      while(h.next) {
          if(h.next.next) {
              let node = h.next;
              h.next = h.next.next;
              node.next = head;
          } else {
              h.next.next = head;
              h.next = null;
          }
          h = h.next;
      }
      return head;
  }
  ```

- **复杂链表的复制**

### 2. 环类题目

- 环形链表的判断(快慢指针、哈希表)
  
  快指针每次移动两个，慢指针每次移动一个，若相遇则说明链表内有环
  
  ```js
  function isCircle(head) {
      if(!head.next) return false;
      let fastPointer = head.next;
      let slowPointer = head.next.next;
      while(fastPointer) {
          if(fastPointer == slowPointer)
              return true;
          slowPointer = slowPointer.next;
          fastPointer = fastPointer.next.next;
      }
      return false;
  }
  ```

- 环形链表的入口节点
  
  快慢指针判断是否为环形链表，然后将一指针移到头结点，一指针移到初次相遇位置，再同时向后移动，相遇位置即是入口节点
  
  ```js
  function isCircle(head) {
      let flag = false;
      if(!head.next) return false;
      let fastPointer = head.next;
      let slowPointer = head.next.next;
      while(fastPointer) {
          if(fastPointer == slowPointer) {
              // 初次相遇位置
              flag = true;
               break;   
          }
          slowPointer = slowPointer.next;
          fastPointer = fastPointer.next.next;
      }
      if(flag) {
          while(head) {
              if(head == slowPointer) {
                  return slowPointer;
              }
              head = head.next;
              slowPointer = slowPointer.next;
          }
      }
      return null;
  }
  ```

### 3. 双指针

- 两个链表的第一个公共节点
  
  思路：先遍历两个链表记下length，将两链表尾部对齐，从较短的链表开始向后比较，直到找到公共节点

- 链表倒数第k个节点
  
  思路：双指针，指针a先移k位，然后两个指针同时移动直到a移到最后一个节点，此时指针b指向倒数第k个节点