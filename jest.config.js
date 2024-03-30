module.exports = {
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules'],

  // testRegex: ['.*-test.js'],
  // testRegex: ['columnWidths-test.js'],
  testRegex: ['FixedDataTableRoot-test.js'],

  testEnvironment: 'jsdom',

  setupFiles: ['<rootDir>/jest.setup.js'],
};
