// Spinny
// Copyright (c) 2013 Corey Martin
// Licensed under Creative Commons BY http://creativecommons.org/licenses/by/4.0/
// http://spinny.github.com/

// Get function from string, with or without scopes (by Nicolas Gauthier)
window.getFunctionFromString = function(string)
{
    var scope = window;
    var scopeSplit = string.split('.');
    for (i = 0; i < scopeSplit.length - 1; i++)
    {
        scope = scope[scopeSplit[i]];

        if (scope == undefined) return;
    }

    return scope[scopeSplit[scopeSplit.length - 1]];
}

$(document).ready(function () {
$(".spinny-ajax").on("ajax:beforeSend", function() {
	$(this).addClass("spinny-now");

});

$(".spinny-ajax").on("ajax:success", function() {
	$(this).removeClass("spinny-now");
	$(this).addClass("spinny-ajax-success");
	if ( $(this).data("callback") ) {
		getFunctionFromString($(this).data("callback"))();
	}
});

$(".spinny-ajax").on("ajax:error", function() {
	$(this).removeClass("spinny-now");
	$(this).addClass("spinny-ajax-error");

});

$(".spinny-submit").on("submit", function () {
	$(this).addClass("spinny-now");
	spinnyTimeout = window.setTimeout(function () { $(this).removeClass("spinny-now"); $(this).addClass("spinny-submit-error"); }, 90000);
	if ( $(this).data("during") ) {
		getFunctionFromString($(this).data("during"))();
	}
});


});
