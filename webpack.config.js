const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenvs = require('dotenv-webpack');

console.log(process.env.DEV)
module.exports = [
	{
		devtool: 'inline-source-map', // change it to false for debugging purposes, cuz it increases bundle size
		mode: process.env.DEV || 'production',
		entry: './src/index.js',
		devServer: {
			hot: true,
			port: 9000,
			static: './dist',
			compress: true,
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
						"style-loader",
						// Translates CSS into CommonJS
						"css-loader",
						// Compiles Sass to CSS
						"sass-loader",
					]
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
			new Dotenvs(),
			new HtmlWebpackPlugin({
				template: __dirname + '/public/index.html',
				filename: 'index.html',
				inject: 'body'
			}),
			new webpack.DefinePlugin({
				// process: {env: {}},
				// path: 'path-browserify',
			}),
		],
	}
]

