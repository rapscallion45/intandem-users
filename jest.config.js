module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  moduleNameMapper: {
    /* Handle CSS imports (with CSS modules) */
    '^.+\\.module\\.(css|less|sass|scss)$': 'identity-obj-proxy',

    /* Handle CSS imports (without CSS modules) */
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    /* Handle image imports */
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': `<rootDir>/__mocks__/fileMock.js`,

    /* Handle module aliases */
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset */
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  setupFiles: ['<rootDir>/enzyme.config.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/__mocks__/browserMocks.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  coveragePathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/coverage/',
    '<rootDir>/.eslintrc.js',
    '<rootDir>/jest.config.js',
    '<rootDir>/next.config.js',
    '<rootDir>/pages/_app.js',
    '<rootDir>/pages/_document.js',
  ],
  globals: {
    API_URL: 'https://reqres.in/api',
  },
};
