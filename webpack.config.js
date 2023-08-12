const path = require('path');


module.exports = {
  entry: './src/index.js', // Your app's entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Name of the output AMD bundle
    libraryTarget: 'amd', // Set the library target to AMD
  },
  mode: "production",

  module: {
    rules: [
        {
            test: /\.css$/i,
            include: path.resolve(__dirname, 'src'),
            use: ['style-loader', 'css-loader', 'postcss-loader'],
          },
    
        {
            
            
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel for transpilation
        },
      },
    ],
  },
};
