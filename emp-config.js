const { join, resolve } = require('path')

/**
 * @type {import('@efox/emp-cli').EMPConfig}
 */
 module.exports = {
  webpack() {
    return {
      devServer: {
        port: 8080,
        devMiddleware: {
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
            files: {
            }
          },
        }
        return args
      })
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
