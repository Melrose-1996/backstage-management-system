module.exports = {
    moduleFileExtensions: ['js', 'vue'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1' // 配置components路径
    },
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest', // 用 `babel-jest` 处理 js
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest' // 用 `vue-jest` 处理 `*.vue` 文件
    },
    testMatch: ['<rootDir>/tests/unit/**/*.spec.(js|jsx|ts|tsx)']
}