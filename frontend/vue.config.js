module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
    ]
  },
  outputDir: '../lyrebird_api_coverage/client/static',
  devServer: {
    proxy: 'http://localhost:9090'
  }
}