const path = require('path')
const assetsPath = function (_path) {
  const assetsSubDirectory = 'static'

  return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        // style 태그 안에서 @import '~assets/css/lp_main' 과 같이 사용하기 위해.
        assets: path.resolve(__dirname, 'src/assets'),
        'jquery': 'jquery/dist/jquery.js'
      }
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
  },
  chainWebpack: config => {
    config.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options = options || {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
        return options
      })
  }
}
