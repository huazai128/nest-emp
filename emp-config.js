const { join, resolve } = require('path')
const InlineCodePlugin = require('html-inline-code-plugin');

/**
 * @type {import('@efox/emp-cli').EMPConfig}
 */
 module.exports = {
  webpack() {
    return {
      devServer: {
        port: 8083,
        devMiddleware: { // 这里是开启，就本地访问不了
          index: true,
          mimeTypes: { phtml: 'text/html' },
          publicPath: './dist/client',
          serverSideRender: true,
          writeToDisk: true,
        },
      },
    }
  },
  webpackChain(config) {
    config.output.path(join(__dirname, "./dist/client"))
    config
      .plugin('html') 
        .tap(args => {
        args[0] = {
          ...args[0],
          template: resolve('./views/index.html'),
          ...{
            title: '马克水印相机管理后台',
            files: {}
          },
        }
        return args
        })
      config.plugin('InlineCodePlugin').use(new InlineCodePlugin({
        begin: false,
        tag: 'script',
        inject: 'body',
        code: `window.INIT_DATA = '<%= data %>'`
      }))
  },
  moduleFederation: {
    name: 'empReact',
    filename: 'emp.js',
    remotes: {},
    exposes: {
      './App': 'src/App',
    },
    shared: {
      react: {eager: true, singleton: true, requiredVersion: '^17.0.1'},
      'react-dom': {eager: true, singleton: true, requiredVersion: '^17.0.1'},
      'react-router-dom': {requiredVersion: '^5.1.2'},
    },
  },
}
