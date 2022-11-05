module.exports = {
    preset: 'jest-puppeteer',
    testRegex: './*\\.test\\.js$',
    //testMatch: ['integration/**/*.js'],
    setupFilesAfterEnv: ['./setupTests.js']
};