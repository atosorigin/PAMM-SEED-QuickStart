"use strict";
module.exports = function loginTest() {
    var db = new DBServiceCaller();
    var LoginPage = require("./login.page.js");
    var login = new LoginPage;
    var testData = require("./login.data.json");
    var test = this;

    test.setDefaultTimeout(60000);

    test.Given("the user is registered",
        function (next) {
            db.query(__dirname + "/check-test-user-exist.sql").then(function (result) {
                if (result === "SUCCESS") {
                    db.update(__dirname + "/setup-test-user.sql").then(function () {
                        next();
                    });
                } else {
                    db.update(__dirname + "/create-test-user.sql").then(function () {
                        next();
                    });
                }
            });
        });

    test.Given("the user is on the login view at the start", function (next) {
        login.visitPage().then(function () {
            next();
        });
    });

    test.Then("there are no error messages on the user login page", function (next) {
        expect(login.invalidLoginError.isDisplayed()).to.eventually.be.false;
        expect(login.usernameRequiredError.isDisplayed()).to.eventually.be.false;
        expect(login.passwordRequiredError.isDisplayed()).to.eventually.be.false.and.notify(next);
    });


    test.Given("the user tries to login without entering any credentials", function (next) {
        login.login().then(function () {
            next();
        });
    });

    test.Then("the user stays at the login view and see an error for missing credentials", function (next) {
        expect(login.currentURL()).to.eventually.equal(browser.baseUrl + testData.loginURL).and.notify(next);
    });

    test.Given("the user login with invalid credentials", function (next) {
        login.fillInDetails(testData.userName, testData.incorrectPassword);
        login.login().then(function () {
            next();
        });
    });

    test.Then("the user stays at the login view and see an error for invalid credentials", function (next) {
        expect(login.invalidLoginError.isDisplayed()).to.eventually.be.true.and.notify(next);
    });

    test.Given("the user login with valid credentials", function (next) {
        login.fillInDetails(testData.userName, testData.password);
        login.login().then(function () {
            next();
        });
    });

    test.Then("the user sees the home page", function (next) {
        expect(login.currentURL()).to.eventually.equal(browser.baseUrl + testData.homeURL).and.notify(next);
    });
};