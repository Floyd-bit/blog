/*
 * @Description: 
 * @version: 1.0
 * @Author: 赵卓轩
 * @Date: 2022-05-28 16:36:20
 * @LastEditors: 赵卓轩
 * @LastEditTime: 2022-06-05 00:05:04
 */
module.exports = {
    base: '/blog/',
    title: 'Floyd的博客',
    description: '前端学习笔记',
    theme: 'reco',
    themeConfig: {
        lastUpdated: '上次更新',
        subSidebar: 'auto',
        nav: [
            {text: '首页', link: '/'},
            {
                text: '收藏文章',
                items: [
                    { text: '冴羽博客', link: 'https://github.com/mqyqingfeng' }
                ]
            }
        ],
        sidebar: [
            {
                title: '面试题',
                path: '/note/HTML',
                collapsable: false,
                children: [
                    { title: 'HTML', path: '/note/HTML' }
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