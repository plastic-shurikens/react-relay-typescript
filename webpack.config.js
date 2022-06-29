const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dotenv = require('dotenv')
// .config({ path: __dirname + '/.env' })

// const Dotenvs = require('dotenv-webpack');

// console.log(process.env.H)

// const process = require('process');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const utils = require('./shared/webpack');

dotenv.config();

console.log(process.env.DEV)
module.exports = 

//  const mode = arg.mode || 'production';
//  return 
 [
	{
		devtool: false,
		mode: process.env.DEV || 'production',
		entry: './src/index.js',
		devServer: {
			hot: true,
			port: 9000,
			static: './dist',
		},
		output: {
			filename: '[name].js',
			path: __dirname + '/dist',
		},
		resolve:{
			fallback:{
				fs: false,
				module: false,
				os: false,
				stream: false,
				crypto: false,
				buffer: false,
				// process: false,
				path: false,
				util: false,
			},
			// alias: {
			// 	src: path.resolve(__dirname, 'src/'),
			// },
			extensions: ['.js', '.ts', '.tsx', '.mjs'],
			
		},
		module:{
			rules: [
				// utils.babelRule,
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
					// .concat(
					// 	MiniCssExtractPlugin.loader,
					// 	utils.useSassToCss({
					// 		prependData: "$IS_BUILDER:true;",
					// 		includePaths:[path.resolve('assets/sass')],
					// 		mode
					// 	})
					// )
				},
	      {
	        test: /\.(txt|html)$/,
	        use: 'raw-loader'
	      },
				{
	        test: /\.mjs$/,
	        include: /node_modules/,
	        type: 'javascript/auto'
	      },
				// utils.filesRule()
				
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
		// devServer: {
		// 	static: './dist',
		// },
		optimization: {
			runtimeChunk: 'single',
		},
		plugins:[
				// new Dotenvs(),
				new HtmlWebpackPlugin({
					template: __dirname + '/public/index.html',
					filename: 'index.html',
					inject: 'body'
				}),
				new webpack.DefinePlugin({
					process: {env: {}},
					// path: 'path-browserify',
					// 'process.env': JSON.stringify(process.env),
					// 'process.type': JSON.stringify(process.type),
   			  // 'process.version': JSON.stringify(process.version),
				}),
				new webpack.EnvironmentPlugin({
					PATH_MODERN: 'dist/modern/domready.min.js',
					PATH_LEGACY: 'dist/legacy/domready.min.js',
					DEBUG: false
				}),
			// mode === 'development' ?
			// 	new DotenvWebpack({path: './.env'}) : null
			// 	new webpack.EnvironmentPlugin([
			// 		// "NODE_ENV", "DEBUG",
			// ]),
		],
	}
]

