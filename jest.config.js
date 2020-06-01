module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '^@test/(.*)': '<rootDir>/tests/$1'
  }
}
