![image-20220302001714675](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041453399.png)

### 1. git仓库组成部分

- **工作区**(working directory): 代码目录
- **暂存区**(stage)：临时区域
- **历史记录区**(History)：git commit后的记录区

### 2. git reset、git revert、git checkout的区别

![img](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041453402.webp)

- git reset将文件从历史记录区移到暂存区(会删除commit记录, 不要在公共分支操作)
- git checkout将文件从历史记录区移到工作区，不影响暂存区的内容
- git revert和git reset目的相同，但会创建新的commit来撤销commit,这样可以保留之前的commit历史，git revert不涉及文件层面的操作

### 3. GitFlow基本流程

- master：主分支
- develop：开发分支
- feature：新功能分支
- release：发布分支(测试发现bug在此分支修复)
- hotfix：紧急修复bug使用

![img](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041453403.webp)

### 4. PR和MR

- PR: pull request
  
  ![img](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041453404.webp)

- MR: merge request
  
  ![img](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041453405.webp)

### 5. git merge和git rebase

![img](https://picture-1305610595.cos.ap-guangzhou.myqcloud.com/202206041453406.jpg)

- git merge命令会保留所有历史commit
- git rebase变基后会变到目前最新的分支上，会覆盖掉分支的提交记录

### 6. git stash(暂存)

当本地有未提交代码时，需要切换分支，那么就要先将本地的更改暂存起来，之后再取消暂存进行commit
