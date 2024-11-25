const path = require('path');

module.exports = {
  entry: './src/index.js', // Ponto de entrada do projeto
  output: {
    filename: 'bundle.js', // Arquivo gerado
    path: path.resolve(__dirname, 'dist'), // Diretório de saída
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/, // Aplicar o loader em arquivos .js
        exclude: /node_modules/, // Ignorar a pasta node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Configuração do Babel
          },
        },
      },
    ],
  },
};
