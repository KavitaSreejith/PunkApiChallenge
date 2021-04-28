const jestConfig = {
    moduleNameMapper: {
        '\\.(css|less)$' : 'identity-obj-proxy',
    },
    setupFilesAfterEnv: [ 
        "<rootDir>/test/setup.js"
    ]
}

module.exports = jestConfig;