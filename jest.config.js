module.exports = {
  testMatch:["**/tests/*.spec.js"], // 配置测试路径
  moduleFileExtensions: ['js', 'jsx','ts','tsx'],  // 处理文件扩展名
  transform: {
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',  // 处理静态资源
    '^.+\\.jsx?$': 'babel-jest' // 处理jsx
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // 处理文件别名
    '^@com/(.*)$':'<rootDir>/src/components/$1',
  },
  collectCoverage:true,  // 搜集测试覆盖率,
  verbose:true  // 打印正在测试的文件
}
