"use strict";

module.exports = (function () {
    function Navigation() {
        this.engagementLink =   $('[data-ng-click="u.navigateToEngagements()"]');
        this.searchLink =       $('[data-ng-click="u.navigateToSearch()"]');

        this.engagementInList = element.all(by.css('.panel-heading.heading')).last();
        this.lessonsLink =  this.engagementInList.element(by.css('[data-ng-click="e.showLessons(engagement)"]'));
    }

    Navigation.prototype.toEngagement = function () {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.presenceOf(this.engagementLink), 5000);
        return this.engagementLink.click();
    };

    Navigation.prototype.toLessons = function () {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.presenceOf(this.lessonsLink), 5000);
        return this.lessonsLink.click();
    };

    Navigation.prototype.toSearch = function () {
        console.log("Going to the search page");
      return this.searchLink.click();
    };

    return Navigation;
})();
