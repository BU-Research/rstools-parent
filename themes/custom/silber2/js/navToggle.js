! function(a) {
    a(".navToggle").on("click", function(b) {
        b.preventDefault(), a("nav, .navToggle").toggleClass("is-open"), a(".searchToggle, #quicksearch").removeClass("is-open"), a("body").toggleClass("nav-open").removeClass("search-open")
    }), a(".searchToggle").on("click", function(b) {
        b.preventDefault(), a("nav, .navToggle").removeClass("is-open"), a(this).hasClass("is-open") || setTimeout(function() {
            a("#q").focus()
        }, 100), a(".searchToggle, #quicksearch").toggleClass("is-open"), a("body").toggleClass("search-open").removeClass("nav-open")
    }
    )
}(jQuery);
