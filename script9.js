(function() {
    "use strict";
    window.kadenceBlocksMasonry = {
        trigger_animation_class(a) {
            a.classList.add("kt-masonry-trigger-animation")
        },
        init() {
            const a = document.querySelectorAll(".kb-masonry-init");
            if (a.length)
                for (let c = 0; c < a.length; c++) {
                    const d = a[c].getAttribute("data-item-selector");
                    let e = !0;
                    document.body.classList.contains("rtl") && (e = !1);
                    var b = new Masonry(a[c], {
                        itemSelector: d,
                        isOriginLeft: e
                    });
                    b.layout(), b.once("layoutComplete", function() {
                        const b = new CustomEvent("layoutComplete");
                        a[c].dispatchEvent(b)
                    })
                }
        }
    }, "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", window.kadenceBlocksMasonry.init) : window.kadenceBlocksMasonry.init()
})();