"use strict";
module.exports = function loginTest() {
    var LoginPage = require("./login.page.js");
    var testData = require("./login-data.json");
    var SetupServiceCaller = require("../setup/setup-service-caller.js");
    var db = new SetupServiceCaller();
    var login = new LoginPage;
    var test = this;

    test.setDefaultTimeout(60000);

    test.Given("The user is registered",
        function (next) {
            db.update(testData.setupSQL).then(function () {
                next();
            }, function () {
            });
        });


    test.Given(/I am on the login view at the start/, function (next) {
        login.visitPage();
        next();
    });


    test.Then("There are no error messages on the page", function (next) {
        expect(login.invalidLoginError.isDisplayed()).to.eventually.be.false;
        expect(login.usernameRequiredError.isPresent()).to.eventually.be.false;
        expect(login.passwordRequiredError.isPresent()).to.eventually.be.false;
        next();
    });


    test.Given("I try to login without entering any credentials", function (next) {
        login.login();
        next()
    });


    test.Then("I stay at the login view and I see an error for missing credentials", function (next) {
        expect(login.currentURL()).to.eventually.equal(browser.baseUrl + testData.loginURL);
        next();
    });
    test.Given("I login with invalid credentials", function (next) {
        login.fillInDetails(testData.userName, testData.incorrectPassword);
        login.login().then(function () {
            next();
        });
    });
    test.Then("I stay at the login view and I see an error for invalid credentials", function (next) {
        expect(login.invalidLoginError.isDisplayed()).to.eventually.be.true;
        next();
    });
    test.Given("I login with valid credentials", function (next) {
        login.fillInDetails(testData.userName, testData.password);
        login.login().then(function () {
            next();
        });
    });
    test.Then("I see the home page", function (next) {
        expect(login.currentURL()).to.eventually.equal(browser.baseUrl + testData.homeURL);
        next();
    });
};