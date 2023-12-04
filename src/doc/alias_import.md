===========================================================================================
// thay các đường dẫn tương đối bằng đường dẫn dạng @ thì đầu tiên cài thư viện:
//1.  yarn add --dev babel-plugin-module-resolver

//2.  sau đó sửa file: tsconfig.json(nằm ở root thư mục) để cấu hình cho vscode(đây là toàn bộ nội dung file ví dụ)
	{
			"extends": "@tsconfig/react-native/tsconfig.json",
			"compilerOptions": { // là phần: compilerOptions này
				"paths": {
				"@/*": ["./src/*"],
				"@bottoms/*": ["./src/bottoms/*"],
				"@assets/*": ["./src/assets/*"],
				"@config/*": ["./src/config/*"],
				"@hooks/*": ["./src/hooks/*"],
				"@screens/*": ["./src/screens/*"],
				"@utils/*": ["./src/utils/*"],
				}
			}
		} 
	

//3. sau đó sửa file: babel.config.js(cũng nằm ở root) để cho thư viện trên hoạt động(đây là toàn bộ nội dung file ví dụ):
	module.exports = {
			presets: ['module:metro-react-native-babel-preset'],
			plugins: [

				["react-native-reanimated/plugin"],

				[ // là trong phần này:
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
						'@hooks': './src/hooks',
						'@screens': './src/screens',
						'@utils': './src/utils',
						'@bottoms': './src/bottoms',
						// '@redux': './src/redux',
						// '@services': './src/services',
						// '@styles': './src/styles',
						// '@types': './src/types',
						},
					},
				],

			]
		}; 
	
======================================================================================