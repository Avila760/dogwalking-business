! function() {
    "use strict";
    var t = function(t) {
            t.preventDefault();
            var e = t.target.href,
                n = "status=1,titlebar=no,width=575,height=520,top=" + (window.innerHeight - 520) / 2 + ",left=" + (window.innerWidth - 575) / 2;
            window.open(e, "share", n)
        },
        e = function() {
            for (var e = document.querySelectorAll(".kt_simple_share_container a:not(.kt_no_pop_window)"), n = 0, o = e.length; n < o; n++) e[n].addEventListener("click", t, !1)
        };
    "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", e) : e()
}();