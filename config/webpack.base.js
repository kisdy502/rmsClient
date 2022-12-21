// 存在开发环境和生产环境的公共配置

const path = require('path');                                       // 引入path模块
const glob = require("glob");

const HtmlWebpackPlugin = require('html-webpack-plugin');           // 引入自动生成 html 的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');     // 引入分享 css 的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');      // 引入打包时清除 dist 目录的插件,引入时需要用对象{}包裹起来
// const extractTextPlugin = require("extract-text-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");       //静态资源输出
const SvgSpriteLoader = require('svg-sprite-loader/plugin')


// const { VueLoaderPlugin } = require('vue-loader')     //vue
// const  VueLoaderPlugin  = require('vue-loader/lib/plugin'); //vue old
const webpack = require('webpack');
const { options } = require('less');

const devMode = process.env.NODE_ENV !== 'production'

//读取所有.js文件,动态设置多入口
function getEntry() {

    console.log("__dirname:" + __dirname);
    var entry = {};
    //读取src目录下page下的所有.js文件
    glob.sync('./src/views/**/*.js')
        .forEach(function (name) {
            console.log("forEach:" + name);
            let start = name.indexOf('src/') + 10,
                end = name.length - 3;
            let n = name.slice(start, end);
            let key = n.slice(0, n.lastIndexOf('/')); //保存各个组件的入口

            //如果key已经有了，对应的index.js入口文件也有了，不要再重新设置入口
            if (entry.hasOwnProperty(key)) {
                if (entry[key].indexOf("index.js") > -1) {
                    return
                }
            }
            console.log("key:" + key);
            console.log("name:" + name);
            entry[key] = name;
        });
    if (!entry.hasOwnProperty("/")) {
        entry["/"] = "./src/views/home/index.js";
    }
    return entry;
};

// 配置webpack的配置文件，需要将配置的对象导出，给webpack使用
module.exports = {
    // 1. 打包入口，从哪个文件开始打包
    entry: getEntry(),
    // 2. 打包的文件放在哪
    output: {
        // 打包的文件输出的目录（输出的目录必须是一个绝对路径）
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        // 打包后的文件名叫 bundle.js,在 dist 下面的 js 文件夹下面。
        filename: 'resources/js/[name].[fullhash].js'
    },

    // resolve: {
    //     extensions: ['.js', '.vue', '.json'],
    //     alias: {
    //         'vue$': 'vue/dist/vue.esm.js',
    //         '@': resolve('src'),
    //     }
    // },

    // 4. 配置module模块加载规则
    // 默认，webpack只认识JSON,javascript，不认识其他文件，如果希望打包处理其他文件，需要配置对应的loader
    module: {

        rules: [
            // (1): 配置 .css 文件解析
            {
                // 正则： 匹配所有以 .css 结尾的文件
                test: /\.css$/,
                // 实际处理顺序：从右往左
                // css-loader: 让webpack能够识别解析 .css 文件
                // style-loader: 通过动态的创建 style 标签的方式（在打包好的bundle.js中），让解析后的 css 内容，能够作用到页面中
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            //publicPath: '../'
                        }
                    },
                    'css-loader'
                ]
            },
            // (2): 配置 .less 文件解析
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            //publicPath: '../'
                        }
                    },
                    'css-loader',
                    'less-loader'
                ]
            },

            // {
            //     test: /\.(css|scss|sass)$/,
            //     use: extractTextPlugin.extract({
            //         fallback: "style-loader",// 将 JS 字符串生成为 style 节点，不打包成单独文件
            //         use: [
            //             "css-loader", // 将CSS 转化成 CommonJS 模块
            //             "sass-loader", // 将 Sass 编译成 CSS
            //             "postcss-loader"], //autoprefixer postcss处理浏览器兼容
            //         // publicPath: "/"  // css中的基础路径,默认使用输出配置中的路径
            //     })
            // },
            // (3): 配置 图片 文件解析
            {
                test: /\.svg$/,
                exclude: /^node_modules$/,
                include: [path.resolve(__dirname, '../src/resources/svg')],
                use: [{
                    //loader: 'raw-loader',
                    loader: 'svg-sprite-loader',
                 
                    options: {
                        symbolId: 'icon-[name]',
                        extract: true,
                        outputPath: "resources/svg/",
                        publicPath: "resources/svg/",
                        spriteFilename: "svg-sprite.svg",
                    }
                }, {
                    loader: 'svgo-loader',
                    options: {
                        plugins: [{
                            name: 'removeAttrs', // 必须指定name！
                            params: { attrs: 'fill' }
                        }]
                    }
                }]
            },
            {
                // 【i】表示忽视图片格式大小写 例如 .PNG
                test: /\.(jpg|jpeg|png|gif)$/i,
                type: 'javascript/auto',
                use: [
                    {
                        loader: 'url-loader',
                        // 如果图片太大再转成base64, 会让图片的体积增大 30% ，得不偿失。
                        options: {
                            // 图片超过 10k ,就不转成 base 文件，当图片小于 10k ，就转成 base 文件。
                            limit: 10 * 1024,
                            // 配置图片打包后在dist中的文件名, name: '[name].[ext]' 我们希望打包后的图片文件名和没打包前的图片名是一样的。
                            name: '[name].[hash:9].[ext]',
                            // 配置静态资源的引用路径。publicPath是打包后的 css 引用打包后的 图片的路径。意思是说css引用的的图片需要先回到上级，然后在 images 下寻找图片
                            //publicPath: "../resources/images/",
                            // 配置打包后的图片 dist 下的 images 文件夹下面。
                            outputPath: "resources/images/",
                            esModule: false,
                        },

                    },

                ]
            },

            // (4): 配置高版本的 js 的兼容性，例如 让 ES6 的语法能被浏览器识别
            {
                test: /\m?.js$/,
                // 不包含node_modules 下的 js，node_modules 下的 js 不用被 label-loader 进行转换
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // vue file
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: "views/"
                    }
                }
            },
            //html loader
            {
                test: /\.html$/,
                use: {
                    loader: 'html-withimg-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: "views/"
                    }
                }
            },

        ]
    },
    externals: {
        jquery: 'window.jQuery'
    },
    // 5. 插件配置
    plugins: [
        //拷贝不进行打包的第三方库
        new copyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, "../src/resources/lib"),
                to: './resources/lib',
            }]
        }),
        new SvgSpriteLoader(),
        // 打包并分离出来的css叫什么名字，并在dist中的路径及路径名
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? 'resources/css/[name].css' : 'resources/css/[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        // 打包时，把 dist 目录下的文件内容先清除
        new CleanWebpackPlugin(),
        //vue plugin
        // new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': require('./dev.env'),
        }),
    ],

    // 提取公共代码
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial', // 拆分模块的范围
                    name: 'vendor',  // 打包后的文件名，任意命名    
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                utils: { // 抽离自己写的公共代码，common这个名字可以随意起
                    chunks: 'initial',
                    name: 'common',  // 任意命名
                    minSize: 0,    // 只要超出0字节就生成一个新包
                    minChunks: 2   //
                }
            }
        }
    },

}


// 设置html-webpack-plugin参数，返回参数对象
let getHtmlConfig = function (name, chunks) {
    console.log("name:" + name);
    console.log("chunks:" + chunks);
    var _template = `./src/views/${name}/index.html`;
    var _filename = `${name}/index.html`;
    //home单独处理
    if (name === "/") {
        _filename = `index.html`;
        _template = `./src/views/home/index.html`;
    }
    let config = {
        template: _template,
        filename: _filename,
        // favicon: './favicon.ico',
        // title: title,
        showErrors: true,
        inject: true, //设置为true插入的元素放入body元素的底部
        hash: true, //开启hash  ?[hash]
        chunks: chunks,
        minify: process.env.NODE_ENV === "development" ? false : {
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //折叠空白区域 也就是压缩代码
            removeAttributeQuotes: true, //去除属性引用
        }
    };
    return config;
};


//插入htmlWebpackPlugin
(function () {
    //取得配置的入口key
    const entryObj = getEntry();
    //存储路径和chunks
    const htmlArray = [];
    for (let key in entryObj) {
        htmlArray.push({
            html: key,
            chunks: ['vendor', 'common', key]
        })
    }

    //自动生成html模板
    htmlArray.forEach((element) => {
        console.log("element.html:" + element.html);
        console.log("element.chunks:" + element.chunks);
        module.exports.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element.html, element.chunks)));
    });
})();