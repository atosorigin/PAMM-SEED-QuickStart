"use strict";

module.exports = (function () {
    var request = require('request');
    var fs = require('fs');
    var executeSql = function (script, pathUrl) {
        var deferred = protractor.promise.defer();

        fs.readFile(script, "utf-8", function (err, data) {
            request({
                url: pathUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: data
            }, function (error, response, body) {
                if (error) {
                    deferred.reject(error);
                } else {
                    deferred.fulfill(body);
                }
            });
        });

        return deferred;
    };

    function SetupServiceCaller() {
    }

    SetupServiceCaller.prototype.update = function (script) {
        var pathUrl = "http://localhost:9001/update";
        return executeSql(script, pathUrl);
    };

    SetupServiceCaller.prototype.query = function (script) {
        var pathUrl = "http://localhost:9001/query";
        return executeSql(script, pathUrl);
    };

    return SetupServiceCaller;
})();
