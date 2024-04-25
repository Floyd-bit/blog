/*
 * @Description: 
 * @version: 1.0
 * @Author: 赵卓轩
 * @Date: 2022-05-28 16:36:20
 * @LastEditors: 赵卓轩
 * @LastEditTime: 2024-04-25 17:00:15
 */
module.exports = {
    base: '/blog/',
    title: 'Floyd的博客',
    description: '个人技术分享文章、学习笔记，包括前端、后端、大数据等技术领域',
    theme: 'reco',
    locales: {
        '/': {
          lang: 'zh-CN'
        }
    },
    themeConfig: {
        lastUpdated: '上次更新',
        subSidebar: 'auto',
        nav: [
            {text: '首页', link: '/'},
            {
                text: '收藏文章',
                items: [
                    { text: '冴羽博客', link: 'https://github.com/mqyqingfeng/Blog' },
                    { text: 'null博客', link: 'https://github.com/yinguangyao/blog' },
                    { text: '前端面试之道', link: 'http://caibaojian.com/interview-map/frontend/' },
                    { text: '前端面试复习笔记', link: 'https://github.com/CavsZhouyou/Front-End-Interview-Notebook' },
                    { text: '吴师兄学算法', link: 'https://blog.algomooc.com/' },
                    { text: '代码随想录', link: 'https://www.programmercarl.com/' },
                    { text: 'CodeTop', link: 'https://codetop.cc/' },
                    { text: '小林coding', link: 'https://xiaolincoding.com/' }
                ]
            }
        ],
        sidebar: [
            {
                title: '技术博客',
                path: '/note/前端框架概况',
                children: [
                    { title: '技术分享-前端框架概况', path: '/note/前端框架概况' },
                    { title: '技术分享-前端工程化概述', path: '/note/前端工程化概述' },
                    { title: '技术分享-一次图片性能优化实战', path: '/note/一次图片性能优化实战' },
                    { title: '技术分享-浅析OpenTiny源码', path: '/note/浅析OpenTiny源码' },
                    { title: '技术分享-跨端技术调研和实践', path: '/note/跨端技术调研和实践' },
                    { title: '技术分享-基于Nest.js开发的开放地球引擎OGE相关实践', path: '/note/基于Nest.js开发的开放地球引擎OGE相关实践' },
                    { title: '技术分享-node后端服务开发实践', path: '/note/node后端服务开发实践' }
                ]
            },
            {
                title: '面经',
                path: '/note/面经/微信小游戏_一面',
                children: [
                    { title: '微信小游戏_一面', path: '/note/面经/微信小游戏_一面' },
                    { title: '微信小游戏_二面', path: '/note/面经/微信小游戏_二面' },
                    { title: '腾讯安全_一面', path: '/note/面经/腾讯安全_一面' },
                    { title: '腾讯安全_二面', path: '/note/面经/腾讯安全_二面' },
                    { title: '美团一面', path: '/note/面经/美团一面' },
                    { title: '美团二面', path: '/note/面经/美团二面' },
                    { title: '京东一面', path: '/note/面经/京东一面' }
                ]
            },
            {
                title: '面试题',
                path: '/note/HTML',
                collapsable: true,
                children: [
                    { title: 'HTML', path: '/note/HTML' },
                    { title: 'CSS', path: '/note/CSS' },
                    { title: 'Vue', path: '/note/Vue' },
                    { title: "TS", path: '/note/TS面试题_new' },
                    { title: '手写代码', path: '/note/手写代码_new' },
                    { title: '代码输出结果', path: '/note/代码输出结果' },
                    { title: '场景题', path: '/note/场景问题' }
                ]
            },
            {
                title: 'JavaScript/TypeScript',
                path: '/note/js学习-一_new',
                collapsable: true,
                children: [
                    { title: '数据类型', path: '/note/js学习-一_new' },
                    { title: 'DOM/BOM', path: '/note/DOM和BOM_new' },
                    { title: '面向对象', path: '/note/面向对象_new' },
                    { title: 'ES6', path: '/note/ES6_new' },
                    { title: 'Ajax/Fetch', path: '/note/Ajax_new' },
                    { title: '闭包/上下文/作用域/this', path: '/note/闭包和上下文_new' },
                    { title: '异步编程', path: '/note/Promise_new' },
                    { title: 'TS基础', path: '/note/TS基础' }
                ]
            },
            {
                title: '数据结构',
                path: '/note/字符串_new',
                collapsable: true,
                children: [
                    { title: '字符串', path: '/note/字符串_new' },
                    { title: '数组', path: '/note/数组_new' },
                    { title: '链表', path: '/note/链表_new' },
                    { title: '栈和队列', path: '/note/栈和队列_new' },
                    { title: '哈希表', path: '/note/哈希表_new' },
                    { title: '二叉树', path: '/note/二叉树_new' },
                    { title: '堆', path: '/note/堆_new' }
                ]
            },
            {
                title: '算法',
                path: '/note/二分_new',
                collapsable: true,
                children: [
                    { title: '二分', path: '/note/二分_new' },
                    { title: '递归', path: '/note/递归_new' },
                    { title: '滑动窗口', path: '/note/滑动窗口_new' },
                    { title: '排序算法', path: '/note/排序算法_new' },
                    { title: '回溯算法', path: '/note/回溯_new' },
                    { title: '贪心算法', path: '/note/贪心算法_new' },
                    { title: '位运算', path: '/note/位运算_new' },
                    { title: 'DFS深度优先搜索', path: '/note/DFS_new' },
                    { title: 'BFS广度优先搜索', path: '/note/BFS_new' },
                    { title: '特殊题目', path: '/note/特殊题目_new' },
                    { title: '动态规划', path: '/note/动态规划_new' }
                ]
            },
            {
                title: '计算机网络',
                path: '/note/传输层_new',
                collapsable: true,
                children: [
                    { title: '传输层协议', path: '/note/传输层_new' },
                    { title: 'DNS', path: '/note/DNS_new' },
                    { title: 'HTTP', path: '/note/HTTP_new' },
                    { title: 'HTTPS', path: '/note/HTTPS_new' },
                    { title: 'RPC', path: '/note/RPC' },
                    { title: 'Websocket', path: '/note/websocket_new' }
                ]
            },
            {
                title: '前端框架',
                path: '/note/vue2学习_new',
                collapsable: true,
                children: [
                    { title: 'Vue2', path: '/note/vue2学习_new' },
                    { title: 'Vue原理', path: '/note/vue原理_new' },
                    { title: 'Vuex', path: '/note/Vuex学习_new' },
                    { title: 'React', path: '/note/react学习_new' },
                    { title: 'React原理', path: '/note/react原理_new' },
                    { title: 'Redux', path: '/note/Redux学习_new' },
                    { title: 'react-router', path: '/note/react-router_new' },
                    { title: 'React脚手架', path: '/note/umi' }
                ]
            },
            {
                title: '前端工程化',
                path: '/note/模块化编程_new',
                collapsable: true,
                children: [
                    { title: '前端模块化', path: '/note/模块化编程_new' },
                    { title: 'Webpack', path: '/note/webpack_new' },
                    { title: 'Babel', path: '/note/babel_new' },
                    { title: '包管理工具', path: '/note/npm' },
                    { title: '脚手架', path: '/note/umi' }
                ]
            },
            {
                title: '浏览器原理',
                path: '/note/跨域_new',
                collapsable: true,
                children: [
                    { title: '跨域问题', path: '/note/跨域_new' },
                    { title: 'WebStorage和Cookie', path: '/note/本地存储和网络请求_new' },
                    { title: '垃圾回收', path: '/note/垃圾清除_new' },
                    { title: 'Event Loop', path: '/note/事件循环_new' },
                    { title: 'Web安全', path: '/note/安全_new' },
                    { title: '浏览器内核', path: '/note/浏览器内核_new' },
                    { title: '浏览器渲染原理', path: '/note/浏览器渲染_new' }
                ]
            },
            {
                title: '前端杂谈',
                path: '/note/函数式编程_new',
                collapsable: true,
                children: [
                    { title: '函数式编程', path: '/note/函数式编程_new' },
                    { title: '加密', path: '/note/加密_new' },
                    { title: 'Git', path: '/note/git_new' },
                    { title: '设计模式', path: '/note/设计模式_new' },
                    { title: '前端路由', path: '/note/前端路由原理_new' }
                ]
            },
            {
                title: 'Java/Spring',
                path: '/note/JAVA基础_new',
                collapsable: true,
                children: [
                    { title: 'Java基础', path: '/note/JAVA基础_new' },
                    { title: 'Spring', path: '/note/Spring思想' },
                    { title: 'SpringBoot', path: '/note/springboot-入门_new' },
                    { title: 'Mybatis', path: '/note/mybatis' },
                    { title: '响应式编程', path: '/note/响应式编程' },
                    { title: 'MySQL', path: '/note/Mysql' }
                ]
            },
            {
                title: '代码规范',
                path: '/note/HTML编码规范',
                collapsable: true,
                children: [
                    { title: 'HTML编码规范', path: '/note/HTML编码规范' },
                    { title: 'CSS编码规范', path: '/note/CSS编码规范' },
                    { title: 'JS编码规范', path: '/note/JS编码规范' },
                    { title: 'TS编码规范', path: '/note/TS编码规范' },
                    { title: 'React编码规范', path: '/note/React编码规范' }
                ]
            }
        ]
    },
    plugins: [
        ["vuepress-plugin-nuggets-style-copy", {
            copyText: "复制代码",
            tip: {
                content: "复制成功"
            }
        }],
        ['cursor-effects', {
            size: 2, // size of the particle, default: 2
            shape: 'star', // ['star' | 'circle'], // shape of the particle, default: 'star'
            zIndex: 999999999, // z-index property of the canvas, default: 999999999
        }] 
    ]
}