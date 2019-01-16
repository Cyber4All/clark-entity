module.exports = {
    transform: {
        "\\.(ts|tsx)$": "ts-jest"
    },
    testRegex: "(lib)/.*/.*(spec).(ts|tsx|js)$",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx"
    ]
};