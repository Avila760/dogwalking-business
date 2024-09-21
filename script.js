! function(t, e) {
    "function" == typeof define && define.amd ? define([], e) : "object" == typeof module && module.exports ? module.exports = e() : t.SimpleLightbox = e()
}(this, (function() {
    function t(t) {
        for (var e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            if (i)
                for (var n in i) i.hasOwnProperty(n) && (t[n] = i[n])
        }
        return t
    }

    function e(t, e) {
        t && e && (t.className += " " + e)
    }

    function i(t, e) {
        t && e && (t.className = t.className.replace(new RegExp("(\\s|^)" + e + "(\\s|$)"), " ").trim())
    }

    function n(t) {
        var e = document.createElement("div");
        return e.innerHTML = t.trim(), e.childNodes[0]
    }

    function s(t, e) {
        return (t.matches || t.matchesSelector || t.msMatchesSelector).call(t, e)
    }

    function o(t) {
        this.init.apply(this, arguments)
    }
    return o.defaults = {
        elementClass: "",
        elementLoadingClass: "slbLoading",
        htmlClass: "slbActive",
        closeBtnClass: "",
        nextBtnClass: "",
        prevBtnClass: "",
        loadingTextClass: "",
        closeBtnCaption: "Close",
        nextBtnCaption: "Next",
        prevBtnCaption: "Previous",
        loadingCaption: "Loading...",
        bindToItems: !0,
        closeOnOverlayClick: !0,
        closeOnEscapeKey: !0,
        nextOnImageClick: !0,
        showCaptions: !0,
        captionAttribute: "title",
        urlAttribute: "href",
        startAt: 0,
        loadingTimeout: 100,
        appendTarget: "body",
        beforeSetContent: null,
        beforeClose: null,
        afterClose: null,
        beforeDestroy: null,
        afterDestroy: null,
        videoRegex: new RegExp(/youtube.com|youtu.be|vimeo.com/)
    }, t(o.prototype, {
        init: function(e) {
            e = this.options = t({}, o.defaults, e);
            var i, n = this;
            e.$items && (i = e.$items.get()), e.elements && (i = [].slice.call("string" == typeof e.elements ? document.querySelectorAll(e.elements) : e.elements)), this.eventRegistry = {
                lightbox: [],
                thumbnails: []
            }, this.items = [], this.captions = [], i && i.forEach((function(t, i) {
                n.items.push(t.getAttribute(e.urlAttribute)), n.captions.push(t.getAttribute(e.captionAttribute)), e.bindToItems && n.addEvent(t, "click", (function(t) {
                    t.preventDefault(), n.showPosition(i)
                }), "thumbnails")
            })), e.items && (this.items = e.items), e.captions && (this.captions = e.captions)
        },
        addEvent: function(t, e, i, n) {
            return this.eventRegistry[n || "lightbox"].push({
                element: t,
                eventName: e,
                callback: i
            }), t.addEventListener(e, i), this
        },
        removeEvents: function(t) {
            return this.eventRegistry[t].forEach((function(t) {
                t.element.removeEventListener(t.eventName, t.callback)
            })), this.eventRegistry[t] = [], this
        },
        next: function() {
            return this.showPosition(this.currentPosition + 1)
        },
        prev: function() {
            return this.showPosition(this.currentPosition - 1)
        },
        normalizePosition: function(t) {
            return t >= this.items.length ? t = 0 : t < 0 && (t = this.items.length - 1), t
        },
        showPosition: function(t) {
            var e = this.normalizePosition(t);
            return void 0 !== this.currentPosition && (this.direction = e > this.currentPosition ? "next" : "prev"), this.currentPosition = e, this.setupLightboxHtml().prepareItem(this.currentPosition, this.setContent).show()
        },
        loading: function(t) {
            var n = this,
                s = this.options;
            t ? this.loadingTimeout = setTimeout((function() {
                e(n.$el, s.elementLoadingClass), n.$content.innerHTML = '<p class="slbLoadingText ' + s.loadingTextClass + '">' + s.loadingCaption + "</p>", n.show()
            }), s.loadingTimeout) : (i(this.$el, s.elementLoadingClass), clearTimeout(this.loadingTimeout))
        },
        getVideoURL: function(t) {
            for (var e = "//_URL_", i = [{
                    rx: /^(?:https?:)?\/\/(?:www\.)?vimeo\.com\/([^\?&"]+).*$/g,
                    tmpl: e.replace("_URL_", "player.vimeo.com/video/$1")
                }, {
                    rx: /^.*(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|user\/.+\/)?([^\?&"]+).*$/g,
                    tmpl: e.replace("_URL_", "www.youtube.com/embed/$1")
                }, {
                    rx: /^.*(?:https?:\/\/)?(?:www\.)?(?:youtube-nocookie\.com)\/(?:watch\?v=|embed\/|v\/|user\/.+\/)?([^\?&"]+).*$/g,
                    tmpl: e.replace("_URL_", "www.youtube-nocookie.com/embed/$1")
                }], n = 0; n < i.length; n++)
                if (i[n].rx.test(t)) return t.replace(i[n].rx, i[n].tmpl);
            return t
        },
        prepareItem: function(t, e) {
            var i = this,
                s = this.items[t];
            if (this.loading(!0), this.options.videoRegex.test(s)) {
                var o = this.getVideoURL(s);
                e.call(i, n('<div class="slbIframeCont"><iframe class="slbIframe" frameborder="0" allowfullscreen src="' + o + '"></iframe></div>'))
            } else {
                var r = n('<div class="slbImageWrap"><img class="slbImage" src="' + s + '" /></div>');
                this.$currentImage = r.querySelector(".slbImage"), this.options.showCaptions && this.captions[t] && r.appendChild(n('<div class="slbCaption">' + this.captions[t] + "</div>")), this.loadImage(s, (function() {
                    i.setImageDimensions(), e.call(i, r), i.loadImage(i.items[i.normalizePosition(i.currentPosition + 1)])
                }))
            }
            return this
        },
        loadImage: function(t, e) {
            if (!this.options.videoRegex.test(t)) {
                var i = new Image;
                e && (i.onload = e), i.src = t
            }
        },
        setupLightboxHtml: function() {
            var t = this.options;
            return this.$el || (this.$el = n('<div class="slbElement ' + t.elementClass + '"><div class="slbOverlay"></div><div class="slbWrapOuter"><div class="slbWrap"><div class="slbContentOuter"><div class="slbContent"></div><button type="button" title="' + t.closeBtnCaption + '" class="slbCloseBtn ' + t.closeBtnClass + '">Ã—</button>' + (this.items.length > 1 ? '<div class="slbArrows"><button type="button" title="' + t.prevBtnCaption + '" class="prev slbArrow' + t.prevBtnClass + '">' + t.prevBtnCaption + '</button><button type="button" title="' + t.nextBtnCaption + '" class="next slbArrow' + t.nextBtnClass + '">' + t.nextBtnCaption + "</button></div>" : "") + "</div></div></div></div>"), this.$content = this.$el.querySelector(".slbContent")), this.$content.innerHTML = "", this
        },
        show: function() {
            return this.modalInDom || (document.querySelector(this.options.appendTarget).appendChild(this.$el), e(document.documentElement, this.options.htmlClass), this.setupLightboxEvents(), this.modalInDom = !0), this
        },
        setContent: function(t) {
            var s = "string" == typeof t ? n(t) : t;
            return this.loading(!1), this.setupLightboxHtml(), i(this.$content, "slbDirectionNext"), i(this.$content, "slbDirectionPrev"), this.direction && e(this.$content, "next" === this.direction ? "slbDirectionNext" : "slbDirectionPrev"), this.options.beforeSetContent && this.options.beforeSetContent(s, this), this.$content.appendChild(s), this
        },
        setImageDimensions: function() {
            this.$currentImage && (this.$currentImage.style.maxHeight = ("innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight) + "px")
        },
        setupLightboxEvents: function() {
            var t = this;
            return this.eventRegistry.lightbox.length ? this : (this.addEvent(this.$el, "click", (function(e) {
                var i = e.target;
                s(i, ".slbCloseBtn") || t.options.closeOnOverlayClick && s(i, ".slbWrap") ? t.close() : s(i, ".slbArrow") ? s(i, ".next") ? t.next() : t.prev() : t.options.nextOnImageClick && t.items.length > 1 && s(i, ".slbImage") && t.next()
            })).addEvent(document, "keyup", (function(e) {
                t.options.closeOnEscapeKey && 27 === e.keyCode && t.close(), t.items.length > 1 && ((39 === e.keyCode || 68 === e.keyCode) && t.next(), (37 === e.keyCode || 65 === e.keyCode) && t.prev())
            })).addEvent(window, "resize", (function() {
                t.setImageDimensions()
            })), this)
        },
        close: function() {
            this.modalInDom && (this.runHook("beforeClose"), this.removeEvents("lightbox"), this.$el && this.$el.parentNode.removeChild(this.$el), i(document.documentElement, this.options.htmlClass), this.modalInDom = !1, this.runHook("afterClose")), this.direction = void 0, this.currentPosition = this.options.startAt
        },
        destroy: function() {
            this.close(), this.runHook("beforeDestroy"), this.removeEvents("thumbnails"), this.runHook("afterDestroy")
        },
        runHook: function(t) {
            this.options[t] && this.options[t](this)
        }
    }), o.open = function(t) {
        var e = new o(t);
        return t.content ? e.setContent(t.content).show() : e.showPosition(e.options.startAt)
    }, o.registerAsJqueryPlugin = function(t) {
        t.fn.simpleLightbox = function(e) {
            var i, n = this;
            return this.each((function() {
                t.data(this, "simpleLightbox") || (i = i || new o(t.extend({}, e, {
                    $items: n
                })), t.data(this, "simpleLightbox", i))
            }))
        }, t.SimpleLightbox = o
    }, "undefined" != typeof window && window.jQuery && o.registerAsJqueryPlugin(window.jQuery), o
}));