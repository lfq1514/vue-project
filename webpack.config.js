let path=require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let VueLoaderPlugin = require('vue-loader/lib/plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let { CleanWebpackPlugin } = require('clean-webpack-plugin')
// let CopyWebpackPlugin= require('copy-webpack-plugin')
let webpack=require('webpack')
module.exports={
    mode:'development',
    //多入口
    entry:{
        index:'./src/main.js',
    },
    output:{
        //[name] 相当于上面两个入口的名字home和other
        filename:'[name].js',
        path:path.resolve(__dirname,'dist'),
        // publicPath:'http://www.baidu.com'//在所有引用的资源前添加路径
    },

    module: {//模块

        //loader特点 功能专一，一个loader负责一个功能职责
        //loader用法  如果只有一个loader 以字符串形式写即可；如果是多个loader，使用[]
        //多个loader的使用顺序， 默认是从右向左，从下到上
        //loader还可以写成对象方式
        //css-loader 解析@import这种语法
        //style-loader 把css插入到head标签中
        rules: [//规则
            //配置代码校验(需要在eslint官网配置好配置项，然后下载生成的文件.eslintrc.json,放在项目中)
            // {
            //     test:/\.js$/,
            //     use:{
            //         loader:'eslint-loader',
            //         options:{
            //             enforce:'pre' //前置loader(强制最先执行)
            //         }
            //     },

            // },
            //html-withimg-loader  解析html，
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            //url-loader   可以限制图片的输出，当图片小于设定的限制，会输出base64，否则输入原文件（输出源文件会请求http）
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 2 * 1024,
                        outputPath:'/img/',//将图片资源打包分类放在img目录下
                        // publicPath:'http://www.baidu.com'//资源前添加路径
                    }

                }
            },
            {
                test: /\.(ttf|svg|eot|woff|woff2)$/,
                use: {
                    loader: 'url-loader'
                }
            },
            //多线程打包（js，css等）
            // {
            //     test: /\.js$/,
            //     use: 'Happypack/loader?id=js',
            //     include: path.resolve(__dirname, 'src'),//包含src目录下的js
            //     exclude: /node_modules/ //排除node_modules文件下的js
            // },

            //处理js文件
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',//语法转化
                    options: {
                        presets: [//包含babel转化需要的模块
                            "@babel/preset-env" //js语法转化(如es6转es5)
                        ],
                        plugins: [
                            // '@babel/plugin-proposal-class-properties',//转化class类的语法
                            // '@babel/plugin-transform-runtime'//
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),//包含src目录下的js
                exclude: /node_modules/ //排除node_modules文件下的js
            },
            //处理css文件
            {
                test: /\.css$/,
                use: [
                    {
                        loader:'style-loader',
                        options:{
                            insert:'top'//css插入的位置
                        }
                    },
                    MiniCssExtractPlugin.loader,//将css样式抽离出来，通过link再引入进来
                    "css-loader",
                    "postcss-loader",//样式属性自动添加浏览器前缀(需要使用autoprefixer插件,注意:使用9.xx版本的不会生效,改成7.xx版本的就生效了)
                ]
            },
            //处理less文件 sass stylus
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,//将css样式抽离出来，通过link再引入进来
                    "css-loader",//解析@import这类语法，解析路径
                    "postcss-loader",//样式属性自动添加浏览器前缀
                    "sass-loader"//把less转化为css
                ]
            },
            {
                test: /\.vue$/,
                loader:'vue-loader'
            }
            //expose-loader  暴露全局的loader 暴露给window全局对象上（内联loader）
            // {
            //     test: require.resolve('jquery'),
            //     use: 'expose-loader?$'
            // },

        ]
    },

    watch:true,//监控代码，代码变动就会实时打包
    watchOptions:{//监控的选项
        poll:1000,//每秒问我1000次，是否需要更新(目前1000比较合理)
        aggregateTimeout:1000,//监控防抖处理，（1000ms内如果再次输入不执行打包）
        ignored:/node_modules/ //不需要进行监控的文件
    },
    resolve:{//解析
        // modules:[path.resolve('node_modules')],//指定解析第三方模块的位置,(commonjs规范会先从当前目录下找，找不到再从上级目录下找)
        extensions:['.js','.css','.vue','jpg','.json'],//解析文件时,(优先解析文件的css文件，找不到再找js，依次解析)
        alias:{//别名
            '@': path.resolve(__dirname, './src'),
            '@a': path.resolve(__dirname, './src/assets'),
            '@c': path.resolve(__dirname, './src/components'),
            '@v': path.resolve(__dirname, './src/views'),
            '@h': path.resolve(__dirname, './src/http'),
            '@r': path.resolve(__dirname, './src/router'),
            '@s': path.resolve(__dirname, './src/store')
        }

    },
    devServer: {
        hot:true,//启用热更新
        // port:3008,
        open:true,//开启服务以后自动打开浏览器

        contentBase:'./dist',
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            // changeOrigin: true,
            pathRewrite: {'/api' : ''}
          }
        }
      },
    plugins:[
        new VueLoaderPlugin(),//打印更新的模块路径
        // new webpack.NamedModulesPlugin(),//打印更新的模块路径
        // new webpack.HotModuleReplacementPlugin(),//热更新插件
        //指定要忽略打包的模块
        // new webpack.IgnorePlugin(/\.\/locale/,/moment/),
        // new webpack.DefinePlugin({//定义环境变量（webpack内置的插件）
        //     DEV:JSON.stringify('dev'),//这里需要使用stringify来进行字符串化，直接使用DEV:"dev"会把dev认为是一个变量
        // }),

         /**
          * 配置打包的模板，如果是多页应用，需要chu通过chunk属性来配置指定的入口文件
          * 多个页面需要通过new HtmlWebpackPlugin来配置多次
             * chunk 代码块，(多页应用的时候，需要在这里指定要引入的对应的入口文件，也可以指定多个入口文件)
             *
             */
        new HtmlWebpackPlugin({
            template: './public/index.html',//指定打包的模板
            filename: 'index.html',//指定打包后的名字

            chunks:['index'],
            minify: {//设置模板的最小化操作
                removeAttributeQuotes: true,//删除属性的双引号
                collapseWhitespace: false,//折叠空行(一行显示)
            },
            hash: true,//在引用的时候加上哈西戳(解决缓存的问题)

        }),
         //将css样式抽离出来
         new MiniCssExtractPlugin({
            filename: 'css/style.css' //抽离出来样式的文件名(css/是自定义的资源目录)
        }),
         new CleanWebpackPlugin({
            //这个参数配置要删除那些文件，和不要删除那些文件，不要删除的文件前面加个逻辑运算符非 ! ，*号可以通过站位符来处理，表示什么开头，什么结尾啥的
            // cleanOnceBeforeBuildPatterns:''
        }),
        //在打包生成的文件中添加一些说明(如版权声明，文件说明等等)
        new webpack.BannerPlugin('make 2020 by lfq')
    ],
     externals: {//配置不打包的模块（如已经通过cdn的方式引入，又在文件中通过import方式引入，可以在这里配置，防止被打包进入）（通过cdn引入后就不要再打包相关的依赖包了）
        moment: 'moment'
    },
}