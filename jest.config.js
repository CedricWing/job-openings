module.exports = {
  testRegex: '(.*\\.test\\.(tsx?|jsx?))$',
  testPathIgnorePatterns: ['.*/build/.*'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
