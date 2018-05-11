!function(a) {
    a(".navToggle").on("click", function(b) {
        b.preventDefault(), a("nav, .navToggle").toggleClass("is-open"), a(".searchToggle, #quicksearch").removeClass("is-open"), a("body").toggleClass("nav-open").removeClass("search-open")
    }), a(".searchToggle").on("click", function(b) {
        b.preventDefault(), a("nav, .navToggle").removeClass("is-open"), a(this).hasClass("is-open") || setTimeout(function() {
            a("#q").focus()
        }, 100), a(".searchToggle, #quicksearch").toggleClass("is-open"), a("body").toggleClass("search-open").removeClass("nav-open")
    })
}(jQuery),
function(a) {
    a(".tabs li").on("click", function(b) {
        b.preventDefault();
        var c = a(this).data("target");
        a(".tabbed-content").addClass("hidden").removeClass("active"), a(".tabbed-content." + c).removeClass("hidden").addClass("active"), a(this).siblings().removeClass("active"), a(this).addClass("active")
    }), a(".expand-collapse-all").on("click", function() {
        $parent = a(this).parents(".collapsible-group"), a(this).hasClass("all-open") ? (a(this).removeClass("all-open"), a(this).find(".expand").removeClass("hidden"), a(this).find(".collapse").addClass("hidden"), $parent.find(".bu_collapsible_container").each(function() {
            a(this).removeClass("bu_collapsible_open").css("overflow", ""), a(this).find(".bu_collapsible_section").hide()
        })) : (a(this).addClass("all-open"), a(this).find(".expand").addClass("hidden"), a(this).find(".collapse").removeClass("hidden"), $parent.find(".bu_collapsible_container").each(function() {
            a(this).addClass("bu_collapsible_open").css("overflow", "hidden"), a(this).find(".bu_collapsible_section").show()
        }))
    }), a(window).scroll(function() {
        a(window).scrollTop() > a(".expanded-menu-container").offset().top && !a(".expanded-menu-container").hasClass("posi") ? a(".expanded-menu-container").addClass("posi") : 0 == a(window).scrollTop() && a(".expanded-menu-container").removeClass("posi")
    }), a(".filter-header a.button").click(function() {
        a(".filter-container").slideToggle("fast", function() {})
    }), a(".on-this-page a").click(function() {
        a("ul.tabs").length && (a("ul.tabs li").removeClass("active"), a('ul.tabs [data-target="main-tab"]').addClass("active"), a(".tabbed-content").addClass("hidden").removeClass("active"), a(".tabbed-content.main-tab").removeClass("hidden").addClass("active"))
    })
}(jQuery);
var research_support = research_support || {};
research_support.form_policy_filtering = research_support.form_policy_filtering || {}, research_support.form_policy_filtering = function(a) {
    var b, c, d = (a(window), a(document)),
        e = a("body");
    return {
        init: function() {
            b = research_support.form_policy_filtering, "undefined" != typeof researchsupport_endpoints && (b.endpoints = researchsupport_endpoints), b.$default_results = a(".type-forms-policies", c), b.$filter_drawer = a(".filter-drawer", e), b.search_type = a(".js-typeahead-filtering").data("form-type"), d.on("ready", b.setup_typeaheads), e.on("click", ".filter-toggle", b.toggle_filters).on("click", ".library-search .typeahead__button button", b.disable_search).on("click", ".form-policy-filter", b.apply_filters)
        },
        disable_search: function(a) {
            a.preventDefault()
        },
        toggle_filters: function(c) {
            c.preventDefault();
            var d = a(this);
            d.parents(".filter-container");
            b.$filter_drawer.slideToggle("fast")
        },
        setup_typeaheads: function() {
            a(this);
            b.$form_list_container = a(".library-list"), b.update_form_list(), a(".js-typeahead-filtering").typeahead({
                debug: !1,
                minLength: 2,
                order: "asc",
                delay: 500,
                resultContainer: ".library-list",
                dynamic: !0,
                href: "{{link}}",
                template: function(a, b) {
                    return '<li class="{{classes}}"><a href="{{link}}"><span class="label bg-darkgray">{{file_type}}</span> <span class="title">{{title.rendered}}</span> <span class="date">Updated {{modified_text}}</span></a></li>'
                },
                emptyTemplate: "No results for {{query}}",
                display: ["title.rendered", "content.rendered", "excerpt", "researchsupport_keywords"],
                source: {
                    forms: {
                        ajax: function(a) {
                            return {
                                type: "GET",
                                url: b.endpoints.forms,
                                display: "title",
                                data: {
                                    search: "{{query}}",
                                    orderby: "relevance",
                                    "filter[form_policy_kind]": b.search_type
                                }
                            }
                        }
                    }
                },
                selector: {
                    list: "rs-result-list",
                    item: "rs-result-item"
                },
                callback: {
                    onCancel: b.cancel_typeahead,
                    onLayoutBuiltAfter: b.onLayoutBuiltAfter
                }
            })
        },
        onLayoutBuiltAfter: function() {
            b.update_form_list(), b.apply_filters()
        },
        update_form_list: function() {
            b.$forms = a(".type-forms-policies", c)
        },
        cancel_typeahead: function(c, d) {
            a(b.$form_list_container).html(""), a.each(b.$default_results, function() {
                b.$form_list_container.append(a(this))
            }), b.update_form_list(), b.apply_filters()
        },
        apply_filters: function() {
            var c = a("input:checked", b.$filter_drawer),
                d = [];
            c.each(function() {
                var b = a(this);
                d.push("." + b.data("taxonomy") + "-" + b.data("term-slug"))
            }), 0 < d.length ? (b.$forms.hide(), a(d.join(","), b.$form_list_container).show()) : b.$forms.show(), b.update_form_list()
        }
    }
}(jQuery), research_support.form_policy_filtering.init();
var research_support = research_support || {};
research_support.post_filtering = research_support.post_filtering || {}, research_support.post_filtering = function(a) {
    var b, c = (a(window), a(document)),
        d = a("body");
    return {
        init: function() {
            b = research_support.post_filtering, b.$filter_containers = a(".rs-post-filter-container", d), b.$posts = a(".content-container .type-post", d), c.on("change", ".rs-post-filter", b.apply_filters)
        },
        apply_filters: function() {
            var c = [];
            if (a(".no-results-text").remove(), a("select.rs-post-filter").each(function() {
                    var b = a(this);
                    b.val() && c.push("." + b.data("taxonomy") + "-" + b.val())
                }), a("input.rs-post-filter:checked").each(function() {
                    var b = a(this);
                    c.push("." + b.data("taxonomy") + "-" + b.val())
                }), 0 >= c.length) return void b.$posts.show();
            if (b.$posts.hide(), a(c.join(",")).show(), 0 === a(".type-post:visible").length) {
                var d = a("<span />").addClass("no-results-text").text("No results found.");
                a(".no-results").append(d)
            } else a(".no-results-text").remove()
        }
    }
}(jQuery), research_support.post_filtering.init();
var media_keywords;
jQuery(document).ready(function(a) {
    var b = function(b) {
        return function(c, d) {
            var e, f;
            e = [], f = new RegExp(c, "i"), a.each(b, function(a, b) {
                f.test(b) && e.push({
                    value: b
                })
            }), d(e)
        }
    };
    void 0 != media_keywords && a(".typeahead").typeahead({
        hint: !0,
        highlight: !0,
        minLength: 1
    }, {
        name: "media_keywords",
        displayKey: "value",
        source: b(media_keywords)
    }).bind("typeahead:selected", function(b, c) {
        for (var d in media_keywords) media_keywords[d] === c.value && (a(".media-list li").hide(), a(".media-group").removeClass("active"), a("." + d).show(), a(".media-group ." + d).parent().parent().addClass("active"));
        "" == c && (a(".media-list li").show(), a(".media-group").addClass("active"))
    }).bind("typeahead:autocompleted", function(a, b) {}), a("a.tooltip").on("click", function() {
        a(this).next().toggleClass("active hide")
    })
});
var research_support = research_support || {};
research_support.search = research_support.search || {}, research_support.search = function(a) {
    var b, c = (a(window), a(document));
    a("body");
    return {
        init: function() {
            b = research_support.search, "undefined" != typeof researchsupport_endpoints && (b.endpoints = researchsupport_endpoints), c.on("ready", b.setup_typeaheads)
        },
        setup_typeaheads: function() {
            a(".js-typeahead").each(function() {
                var c = a(this),
                    d = {};
                c.data("page-id") ? d = {
                    pages: {
                        ajax: function(a) {
                            return {
                                type: "GET",
                                url: b.endpoints.pages,
                                display: "title",
                                data: {
                                    search: "{{query}}",
                                    orderby: "relevance",
                                    rs_section_search: "true",
                                    post_parent: c.data("page-id")
                                }
                            }
                        }
                    }
                } : a.extend(d, {
                    posts: {
                        ajax: function(a) {
                            return {
                                type: "GET",
                                url: b.endpoints.posts,
                                display: "title",
                                data: {
                                    search: "{{query}}",
                                    orderby: "relevance"
                                }
                            }
                        }
                    },
                    pages: {
                        ajax: function(a) {
                            return {
                                type: "GET",
                                url: b.endpoints.pages,
                                display: "title",
                                data: {
                                    search: "{{query}}",
                                    orderby: "relevance"
                                }
                            }
                        }
                    },
                    forms: {
                        ajax: function(a) {
                            return {
                                type: "GET",
                                url: b.endpoints.forms,
                                display: "title",
                                data: {
                                    search: "{{query}}",
                                    orderby: "relevance"
                                }
                            }
                        }
                    }
                }), c.typeahead({
                    debug: !1,
                    minLength: 2,
                    order: "asc",
                    delay: 500,
                    dynamic: !0,
                    href: "{{link}}",
                    template: function(a, b) {
                        return b.excerpt.rendered ? '<span class="result-title">{{title.rendered}}</span><span class="result-excerpt">{{excerpt.rendered}}</span>' : '<span class="result-title">{{title.rendered}}</span><span class="result-excerpt"></span>'
                    },
                    emptyTemplate: "No results for {{query}}",
                    display: ["title.rendered", "content.rendered", "excerpt.rendered", "researchsupport_keywords"],
                    source: d,
                    callback: {
                        onNavigateBefore: function(a, b, c) {
                            ~[38, 40].indexOf(c.keyCode) && (c.preventInputChange = !0)
                        },
                        onClickAfter: function(a, b, c, d) {
                            a.val(c.title.rendered)
                        }
                    }
                })
            })
        }
    }
}(jQuery), research_support.search.init();