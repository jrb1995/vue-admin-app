const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  // css: {
  //   loaderOptions: {
  //     less: {
  //       javascriptEnabled: true
  //     }
  //   }
  // },
  // 打包时不生成.map文件
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      return {
        plugins: [
          // 移除控制台语句
          new UglifyJsPlugin({
            uglifyOptions: {
              warnings: false,
              compress: {
                drop_debugger: true,
                drop_console: true
              }
            }
          }),
          // 开启gzip压缩生成gz后缀的文件，服务端开启gzip支持后默认取gz文件输出
          new CompressionWebpackPlugin({
            test: /\.(js|css|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false
          })
        ]
      }
    } else {
      // 为开发环境修改配置...
      return {}
    }
  }
}