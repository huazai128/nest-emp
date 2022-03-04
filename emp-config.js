const InlineCodePlugin = require('html-inline-code-plugin');
const { join, resolve } = require('path')

/**
 * @type {import('@efox/emp-cli').EMPConfig}
 */
 module.exports = {
  webpack() {
    return {
      devServer: {
        port: 8083,
        devMiddleware: { // 这里是开启 本地访问不了
          index: true,
          mimeTypes: { phtml: 'text/html' },
          publicPath: './dist/iews',
          serverSideRender: true,
          writeToDisk: true,
        },
      },
    }
  },
    webpackChain(config) {
        config.output.path(join(__dirname, "./dist/client"))
        config.output.publicPath('/')
        config.resolve.alias.set("@src", resolve(__dirname, "./src"));
        config
        .plugin('html') 
            .tap(args => {
            args[0] = {
            ...args[0],
                template: resolve('./views/index.html'),
            filename: resolve('./dist/views/index.html'),
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
            code: `window.INIT_DATA = <%- JSON.stringify(data) %>`
        }))
        config.module
            .rule("scripts")
            .use("babel")
            .tap((o) => {
                o.plugins.unshift([
                    "import",
                    { libraryName: "antd", style: false },
                    "special-antd",
                  ]);
            return o;
        });
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
