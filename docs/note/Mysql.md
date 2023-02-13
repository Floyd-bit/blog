### 1. Mqsql基于InnoDB存储 引擎

### 2. Mysql表的逻辑结构

![image-20221127115247816](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202211271152966.png)

- TableSpace即表的逻辑存储结构，分为Leaf node segment、Non-Leaf node segment、Rollback segement三个`段`来存储。Leaf node segment存储`记录`、Non-Lead node segment存储`索引`，Rollback sement存储`回滚事务`
- 每一个Segment中有若干个Extent、Page， Extent可以理解为`区`；当数据库要增加存储空间时，就会增加Extent(1MB)；每个Extent由64个Page(16KB)组成; 在Segment中间插入了一些零碎的Page, 用来存储小数据量。



![image-20221127120617549](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202211271206606.png)

- Page中的主键按顺序存储，并且按照记录的插入循序排列成一个单链表
- Page Directory中存储主键到数据地址的映射，在查询时通过二分法查询

### 3. InnoDB的索引

![image-20221127121759663](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202211271217727.png)

- 索引采用B+树实现，是一颗平衡的n叉树
- B+树的根节点对应TableSpace中的Non-Leaf node segment, 叶子节点层对应Leaf node segment。n个子节点每个对应一个Page。
- 顺序插入是最高效的方式，在中间页插入记录可能导致叶子节点的分裂
- 删除数据可能会造成树结构的改变（叶子节点合并、非叶子节点改变），所以一般逻辑删除而非物理删除

### 4. InnoDB的事务

#### 4.1 事务的ACID

![image-20221127142935522](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202211271429627.png)

#### 4.2 事务的隔离级别

![image-20221127143640845](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202211271436895.png)

MySQL默认采用REPEATABLE READ级别，通过加锁的方式实现（读时采用共享锁，写时采用排他锁）。在REPEATABLE READ中：

- 在同一个事务中，同样的查询结果是不变的。Mysql通过`快照`的方式实现。
- 如果两个事务同时对同一条记录操作，如果其中一个事务进行写操作，那么另一个事务再执行写操作会被阻塞。

#### 4.3 Rollback segment

![image-20221127144755837](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202211271447892.png)

DB_TRX_ID为事务ID， DB_ROLL_PTR指向修改的事务