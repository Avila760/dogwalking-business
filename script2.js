! function() {
    "use strict";
    var e = {
        checkImage: function(e) {
            return /(png|jpg|jpeg|gif|tiff|bmp|webp|avif)$/.test(e.getAttribute("href").toLowerCase().split("?")[0].split("#")[0])
        },
        findImages: function() {
            var t = document.querySelectorAll("a[href]:not(.kt-no-lightbox):not(.custom-link):not(.kb-gallery-item-link):not(.kt-core-gallery-lightbox)");
            if (t.length && t)
                for (let l = 0; l < t.length; l++) e.checkImage(t[l]) && (t[l].classList.add("kt-lightbox"), new SimpleLightbox({
                    elements: [t[l]]
                }))
        },
        findGalleries: function() {
            var t = document.querySelectorAll(".wp-block-gallery");
            if (t.length && t)
                for (let i = 0; i < t.length; i++) {
                    var l = t[i].querySelectorAll(".blocks-gallery-item a");
                    if (!l.length) return;
                    if (l)
                        for (let t = 0; t < l.length; t++) e.checkImage(l[t]) && l[t].classList.add("kt-core-gallery-lightbox");
                    t[i] && new SimpleLightbox({
                        elements: t[i].querySelectorAll(".blocks-gallery-item a")
                    })
                }
        },
        initAll: function() {
            e.findGalleries(), e.findImages()
        },
        init: function() {
            if ("function" == typeof SimpleLightbox) e.initAll();
            else var t = setInterval((function() {
                "function" == typeof SimpleLightbox && (e.initAll(), clearInterval(t))
            }), 200)
        }
    };
    "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", e.init) : e.init()
}();