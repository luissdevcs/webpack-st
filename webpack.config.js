// require: es una manera de node para cargar archivos de otros paquetes

const HtmlWebPackPlugin              = require('html-webpack-plugin'); 
const MiniCssExtractPlugin           = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin              = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    optimization: {
        minimizer: [ new OptimizeCssAssetsWebpackPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // Aquí indico que no aplique la regla a este archivo, ya que tiene la suya
                exclude: /style\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /style\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                // test: es la condición que webpack va ha realizar cuando este evaluando archivo por archivo. Aquí usa una expresión regular
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        // minimize: permite eliminar comentarios y minificar el html
                        options: { minimize: false }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            // Con template le dicemos a webpack que archivo quiero tomar
            template: './src/index.html',
            //filename : Hacia donde quiero colocarlo
            filename: './index.html'       
        }),
        new MiniCssExtractPlugin({
            // nombre que se le quiera dar al archivo, si quiero que el navegador no almacene en el cache hago lo siguiente en caso de producción
            // filename: '[name].[contentHash].css',
            filename: '[name].css',
            // Esto es para que no lance warnings
            ignoreOrder: false
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/assets', to: 'assets/'}
            ]
        }),
    ]

}