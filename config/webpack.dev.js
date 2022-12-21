// 开发环境的配置（不需要压缩）

// 引入公共的环境的配置
const base = require('./webpack.base.js')
// 引入merge模块方法，merge方法可以把多个对象合并成一个对象，后面的对象覆盖前面的对象
let { merge } = require('webpack-merge');

// 把开发环境的配置进行导出
module.exports = merge(base, {
    // 1. 打包的模式： production 生产模式（打包后的文件或压缩） development(开发模式，不压缩)
    mode: 'development',
    // 2. 配置开发服务器，代码变化，自动刷新
    devServer: {
        // 浏览器网址上显示的端口号
        port: 8666,
        // 是否自动打开浏览器 
        open: true,
        
    },

})