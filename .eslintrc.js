// https://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint'
	},
	env: {
		browser: true
	},
	globals: {
		common: true
	},
	extends: [
		// https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
		// consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
		'plugin:vue/essential',
		// https://github.com/standard/standard/blob/master/docs/RULES-en.md
		'standard'
	],
	// required to lint *.vue files
	plugins: ['vue'],
	// add your custom rules here
	rules: {
		// allow async-await
		'generator-star-spacing': 'off',
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

		// 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
		// 关闭语句强制分号结尾
		semi: [0],
		'no-tabs': 0,
		// 不允许空格和 tab 混合缩进
		'no-mixed-spaces-and-tabs': 2,
		//强制使用一致的缩进 第二个参数为 "tab" 时，会使用tab，
		// if while function 后面的{必须与if在同一行，java风格。
		//强制使用一致的缩进 第二个参数为 "tab" 时，会使用tab，
		// if while function 后面的{必须与if在同一行，java风格。
		'brace-style': [2, '1tbs', {
			allowSingleLine: true
		}],
		indent: [
			0,
			'tab',
			{
				SwitchCase: 2
			}
		],
		'space-before-function-paren': [0, 'always'],
		'eol-last': 0,
		'eqeqeq': 0,
		"no-var": 2,
		"no-mixed-spaces-and-tabs": 0,
		"padded-blocks": 0,
		"no-eval": ["error", {"allowIndirect": true}]
	}
}
