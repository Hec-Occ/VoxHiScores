module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/VoxHiScores/'
    : '/',
  configureWebpack: {
    devtool: 'source-map'
  }
}
