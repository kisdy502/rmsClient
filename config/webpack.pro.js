// 生产环境的配置（需要进行压缩）

// 引入公共环境
// 引入公共的环境的配置
const base = require('./webpack.base.js')
// 引入merge模块方法，merge方法可以把多个对象合并成一个对象，后面的对象覆盖前面的对象
let { merge } = require('webpack-merge');

// 把生产环境的配置进行导出
module.exports = merge(base, {
    // 1. 打包的模式： production 生产模式（打包后的文件或压缩） development(开发模式，不压缩)
    mode: 'production',
    devServer: {
        // 浏览器网址上显示的端口号
        port: 9333,
        // 是否自动打开浏览器 
        open: false,
    },
    
})