module.exports = options => ({
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/rest': 'http://localhost:8080',
      '/graphql': 'http://localhost:8080',
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_mdules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
});
