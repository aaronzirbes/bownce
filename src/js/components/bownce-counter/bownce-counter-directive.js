var fs = require("fs");

(function() {
	"use strict";

	var module = angular.module("bownce.directives.bownceCounter", []);

	module.directive("bownceCounter", function() {
		return {
			restrict: "AE",
			/*eslint "no-path-concat": 0 */
			template: fs.readFileSync(__dirname + "/bownce-counter-directive.html", "utf8")
		};
	});
})();