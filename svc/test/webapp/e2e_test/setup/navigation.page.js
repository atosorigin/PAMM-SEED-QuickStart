"use strict";

module.exports = (function () {
    function Navigation() {

        this.suplierLink = element(by.css('[data-ng-click="u.navigateToSuppliers()"]'));

    }

    Navigation.prototype.toSuppliers = function () {
        browser.sleep(20000);
        return this.suplierLink.click();
    };

    return Navigation;
})();
