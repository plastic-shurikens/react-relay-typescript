const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

// replace accordingly './.env' with the path of your .env file 
require('dotenv').config({ path: './.env' }); 

console.log(process.env.DEV)
module.exports = [
	{
		devtool: false, // change it to 'inline-source-map' only for debugging purposes, cuz it increases bundle size
		mode: process.env.DEV || 'production',
		entry: './src/index.js',
		devServer: {
			hot: true,
			port: 9000,
			static: './dist',
			compress: true,
			historyApiFallback: true,
		},
		output: {
			filename: '[name].js',
			path: __dirname + '/dist',
		},
		performance: {
			hints: false,
			maxEntrypointSize: 512000,
			maxAssetSize: 512000
		},
		resolve:{
			fallback:{
				fs: false,
				module: false,
				os: false,
				stream: false,
				crypto: false,
				buffer: false,
				path: false,
				util: false,
			},
			extensions: ['.js', '.ts', '.tsx'],
		},
		module:{
			rules: [
				{
					test: /\.(scss|css)$/,
					use: [
						// Creates `style` nodes from JS strings
						MiniCssExtractPlugin.loader,
						// "style-loader",
						// Translates CSS into CommonJS
						{
							loader: "css-loader",
							options: {
								importLoaders: 5,
								modules:{
									localIdentName: process.env.DEV !== 'development' ? '[hash:base64:5]' : '[name]__[local]--[hash:base64:5]',
									mode: "global"
								}
		 					}
						},
						{
							loader: "postcss-loader",
							options: {
								postcssOptions:{
									parser: 'postcss-scss',
									plugins: () => {
										return [
											autoprefixer({ browsers: 'last 2 versions' }),
										]
									}
								}
							}
						},
						// Compiles Sass to CSS
						{
							loader: "sass-loader",
						},
					]
				},
				{
					test: /\.(png|svg|webp|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.(txt|html)$/,
					use: 'raw-loader'
				},
				{
					test: /\.(ts|tsx|jsx|js)$/,
					exclude: /node_modules/,
					loader: "babel-loader",
					options:{
						"presets": [
							"@babel/preset-react",
							"@babel/preset-env",
							"@babel/preset-typescript"
						],
						"plugins": [
							"relay",
							// "@babel/plugin-proposal-optional-chaining",
							// "@babel/plugin-syntax-dynamic-import",
							// "@babel/plugin-proposal-class-properties",
							// "@babel/plugin-transform-runtime",
							// "@babel/plugin-proposal-export-default-from",
						]
					}
				},
			]
		},
		optimization: {
			runtimeChunk: 'single',
		},
		plugins:[
			new webpack.DefinePlugin({
				"process.env": JSON.stringify(process.env)
			}),
			new HtmlWebpackPlugin({
				template: __dirname + '/public/index.html',
				filename: 'index.html',
				inject: 'body'
			}),
			new MiniCssExtractPlugin(),
			new webpack.DefinePlugin({
				// process: {env: {}},
				// path: 'path-browserify',
			}),
		],
	}
]

