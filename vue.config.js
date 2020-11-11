const path = require('path');
// gizp压缩插件
const CompressionPlugin = require('compression-webpack-plugin')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
    // 输出文件目录
    outputDir: 'manage',
    assetsDir: 'static',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 生产环境 sourceMap
    productionSourceMap: false,
    // 代理相关
    devServer: {
        open: true,
        port: 9211,
        overlay: { // 错误提示强制
            warnings: true,
            error: true
        },
        proxy: { // 设置代理 在这里
		  '/webmicroservice': {
				target: 'http://fyop.sit.wkong66.top', // sit1
                // target: 'http://fyop.sit2.wkong66.top:81', // sit2
                // target: 'http://100.119.192.19:8116', // sit2
				changeOrigin: true
			}
		}
    },
    // 别名设置
    configureWebpack: config => {
        config.resolve = {
           extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
                'assets': resolve('src/assets')
            }
        }
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(
                new CompressionPlugin({ // 开启gizp压缩
                    test: /\.(js|css)(\?.*)?$/i, //需要压缩的文件正则
                    deleteOriginalAssets: false //压缩后保留原文件
                })
            )
            //关闭生产的console
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
    },
    // css相关
    css: {
        extract: false // 不分开打包
    }
}