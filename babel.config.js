module.exports = {
			presets: ['module:metro-react-native-babel-preset'],
			plugins: [
				'react-native-reanimated/plugin',
				[
					require.resolve('babel-plugin-module-resolver'),
					{
						root: ['./src'],
						extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
						alias: {
						'ios': './ios/',
						'android': './android/',
						'@assets': './src/assets',
						'@config': './src/config',
						'@hooks': './src/hooks',
						'@screens': './src/screens',
						'@utils': './src/utils',
						'@bottoms': './src/bottoms',
						'@redux': './src/redux',
						 '@services': './src/services',
						// '@styles': './src/styles',
						// '@types': './src/types',
						},
					},
				],

			]
		}; 
