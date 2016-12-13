require("./setup/conf.js");

config.cucumberOpts.require = [
    "feature/**/*.step.js"
];

config.suites = {
    user: "feature/user/**/*.feature",
    admin: "feature/admin/**/*.feature"

};

config.resultJsonOutputFile = config.params.reportPath + "all-tests.json";

exports.config = config;
