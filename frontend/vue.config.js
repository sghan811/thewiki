const { defineConfig } = require('@vue/cli-service')
var astore = require('./src/vuex/store')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true
      }
    },
    allowedHosts: "all",
  },
})
