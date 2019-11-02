module.exports = {
    moduleFileExtensions: ['js', 'jsx'],
    testEnvironment: "node",
    transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/']
};
