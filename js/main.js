! function(t, e, i) {
  function s(t, e) {
    return "function" == typeof t ? t.call(e) : t
  }

  function o(t) {
    for (; t = t.parentNode;)
      if (t == document) return !0;
    return !1
  }

  function n(t) {
    return "object" == typeof HTMLElement ? t instanceof HTMLElement : t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName
  }

  function l() {
    return "tipsyuid" + h++
  }

  function a(e, i) {
    this.$element = t(e), this.options = i, this.enabled = !0, this.fixTitle()
  }
  var h = 0;
  a.prototype = {
    show: function() {
      if (o(this.$element[0]) && (!n(this.$element) || this.$element.is(":visible"))) {
        var e;
        if (this.enabled && (e = this.getTitle())) {
          var i = this.tip();
          i.find(".tipsy-inner" + this.options.theme)[this.options.html ? "html" : "text"](e), i[0].className = "tipsy" + this.options.theme, this.options.className && i.addClass(s(this.options.className, this.$element[0])), i.remove().css({
            top: 0,
            left: 0,
            visibility: "hidden",
            display: "block"
          }).prependTo(document.body);
          var a = t.extend({}, this.$element.offset());
          a = this.$element.parents("svg").size() > 0 ? t.extend(a, this.$element[0].getBBox()) : t.extend(a, {
            width: this.$element[0].offsetWidth || 0,
            height: this.$element[0].offsetHeight || 0
          });
          var h, f = i[0].offsetWidth,
            r = i[0].offsetHeight,
            p = s(this.options.gravity, this.$element[0]);
          switch (p.charAt(0)) {
            case "n":
              h = {
                top: a.top + a.height + this.options.offset,
                left: a.left + a.width / 2 - f / 2
              };
              break;
            case "s":
              h = {
                top: a.top - r - this.options.offset,
                left: a.left + a.width / 2 - f / 2
              };
              break;
            case "e":
              h = {
                top: a.top + a.height / 2 - r / 2,
                left: a.left - f - this.options.offset
              };
              break;
            case "w":
              h = {
                top: a.top + a.height / 2 - r / 2,
                left: a.left + a.width + this.options.offset
              }
          }
          if (2 == p.length && ("w" == p.charAt(1) ? h.left = a.left + a.width / 2 - 15 : h.left = a.left + a.width / 2 - f + 15), i.css(h).addClass("tipsy-" + p + this.options.theme), i.find(".tipsy-arrow" + this.options.theme)[0].className = "tipsy-arrow" + this.options.theme + " tipsy-arrow-" + p.charAt(0) + this.options.theme, this.options.fade ? (this.options.shadow && t(".tipsy-inner").css({
              "box-shadow": "0px 0px " + this.options.shadowBlur + "px " + this.options.shadowSpread + "px rgba(0, 0, 0, " + this.options.shadowOpacity + ")",
              "-webkit-box-shadow": "0px 0px " + this.options.shadowBlur + "px " + this.options.shadowSpread + "px rgba(0, 0, 0, " + this.options.shadowOpacity + ")"
            }), i.stop().css({
              opacity: 0,
              display: "block",
              visibility: "visible"
            }).animate({
              opacity: this.options.opacity
            }, this.options.fadeInTime)) : i.css({
              visibility: "visible",
              opacity: this.options.opacity
            }), this.options.aria) {
            var d = l();
            i.attr("id", d), this.$element.attr("aria-describedby", d)
          }
        }
      }
    },
    hide: function() {
      this.options.fade ? this.tip().stop().fadeOut(this.options.fadeOutTime, function() {
        t(this).remove()
      }) : this.tip().remove(), this.options.aria && this.$element.removeAttr("aria-describedby")
    },
    fixTitle: function() {
      var t = this.$element,
        e = s(this.options.id, this.$element[0]);
      (t.prop("title") || "string" != typeof t.prop("original-title")) && (t.prop("original-title", t.prop("title") || "").removeAttr("title"), t.attr("aria-describedby", e), t.attr("tabindex") === i && t.attr("tabindex", 0))
    },
    getTitle: function() {
      var t, e = this.$element,
        i = this.options;
      return this.fixTitle(), "string" == typeof i.title ? t = e.prop("title" == i.title ? "original-title" : i.title) : "function" == typeof i.title && (t = i.title.call(e[0])), t = ("" + t).replace(/(^\s*|\s*$)/, ""), t || i.fallback
    },
    tip: function() {
      var e = s(this.options.id, this.$element[0]);
      return this.$tip || (this.$tip = t('<div class="tipsy' + this.options.theme + '" id="' + e + '" role="tooltip"></div>').html('<div class="tipsy-arrow' + this.options.theme + '"></div><div class="tipsy-inner' + this.options.theme + '"></div>').attr("role", "tooltip"), this.$tip.data("tipsy-pointee", this.$element[0])), this.$tip
    },
    validate: function() {
      this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    },
    enable: function() {
      this.enabled = !0
    },
    disable: function() {
      this.enabled = !1
    },
    toggleEnabled: function() {
      this.enabled = !this.enabled
    }
  }, t.fn.tipsy = function(e) {
    function i(i) {
      var s = t.data(i, "tipsy");
      return s || (s = new a(i, t.fn.tipsy.elementOptions(i, e)), t.data(i, "tipsy", s)), s
    }

    function s() {
      if (t.fn.tipsy.enabled === !0) {
        var s = i(this);
        s.hoverState = "in", 0 === e.delayIn ? s.show() : (s.fixTitle(), setTimeout(function() {
          "in" == s.hoverState && o(s.$element) && s.show()
        }, e.delayIn))
      }
    }

    function n() {
      var t = i(this);
      t.hoverState = "out", 0 === e.delayOut ? t.hide() : setTimeout(function() {
        "out" != t.hoverState && t.$element && t.$element.is(":visible") || t.hide()
      }, e.delayOut)
    }
    if (t.fn.tipsy.enable(), e === !0) return this.data("tipsy");
    if ("string" == typeof e) {
      var l = this.data("tipsy");
      return l && l[e](), this
    }
    if (e = t.extend({}, t.fn.tipsy.defaults, e), e.theme = e.theme && "" !== e.theme ? "-" + e.theme : "", e.live || this.each(function() {
        i(this)
      }), "manual" != e.trigger)
      if (e.live && e.live !== !0) "focus" != e.trigger && (t(this).on("mouseenter", e.live, s), t(this).on("mouseleave", e.live, n)), "blur" != e.trigger && (t(this).on("focus", e.live, s), t(this).on("blur", e.live, n));
      else {
        if (e.live && !t.live) throw "Since jQuery 1.9, pass selector as live argument. eg. $(document).tipsy({live: 'a.live'});";
        var h = e.live ? "live" : "bind";
        "focus" != e.trigger && this[h]("mouseenter", s)[h]("mouseleave", n), "blur" != e.trigger && this[h]("focus", s)[h]("blur", n)
      } return this
  }, t.fn.tipsy.defaults = {
    aria: !1,
    className: null,
    id: "tipsy",
    delayIn: 0,
    delayOut: 0,
    fade: !1,
    fadeInTime: 400,
    fadeOutTime: 400,
    shadow: !1,
    shadowBlur: 8,
    shadowOpacity: 1,
    shadowSpread: 0,
    fallback: "",
    gravity: "n",
    html: !1,
    live: !1,
    offset: 0,
    opacity: .8,
    title: "title",
    trigger: "interactive",
    theme: ""
  }, t.fn.tipsy.revalidate = function() {
    t(".tipsy").each(function() {
      var e = t.data(this, "tipsy-pointee");
      e && o(e) || t(this).remove()
    })
  }, t.fn.tipsy.enable = function() {
    t.fn.tipsy.enabled = !0
  }, t.fn.tipsy.disable = function() {
    t.fn.tipsy.enabled = !1
  }, t.fn.tipsy.elementOptions = function(e, i) {
    return t.metadata ? t.extend({}, i, t(e).metadata()) : i
  }, t.fn.tipsy.autoNS = function() {
    return t(this).offset().top > t(document).scrollTop() + t(e).height() / 2 ? "s" : "n"
  }, t.fn.tipsy.autoWE = function() {
    return t(this).offset().left > t(document).scrollLeft() + t(e).width() / 2 ? "e" : "w"
  }, t.fn.tipsy.autoNWNE = function() {
    return t(this).offset().left > t(document).scrollLeft() + t(e).width() / 2 ? "ne" : "nw"
  }, t.fn.tipsy.autoSWSE = function() {
    return t(this).offset().left > t(document).scrollLeft() + t(e).width() / 2 ? "se" : "sw"
  }, t.fn.tipsy.autoBounds = function(i, s, o) {
    return function() {
      var n = {
          ns: o[0],
          ew: o.length > 1 ? o[1] : !1
        },
        l = t(document).scrollTop() + i,
        a = t(document).scrollLeft() + s,
        h = t(this);
      return h.offset().top < l && (n.ns = "n"), h.offset().left < a && (n.ew = "w"), t(e).width() + t(document).scrollLeft() - h.offset().left < s && (n.ew = "e"), t(e).height() + t(document).scrollTop() - h.offset().top < i && (n.ns = "s"), n.ns + (n.ew ? n.ew : "")
    }
  }, t.fn.tipsy.autoBounds2 = function(i, s) {
    return function() {
      var o = {},
        n = t(document).scrollTop() + i,
        l = t(document).scrollLeft() + i,
        a = t(this);
      return s.length > 1 ? (o.ns = s[0], o.ew = s[1]) : "e" == s[0] || "w" == s[0] ? o.ew = s[0] : o.ns = s[0], a.offset().top < n && (o.ns = "n"), a.offset().left < l && (o.ew = "w"), t(e).width() + t(document).scrollLeft() - (a.offset().left + a.width()) < i && (o.ew = "e"), t(e).height() + t(document).scrollTop() - (a.offset().top + a.height()) < i && (o.ns = "s"), o.ns ? o.ns + (o.ew ? o.ew : "") : o.ew
    }
  }
}(jQuery, window);
! function(e) {
  e(["jquery"], function(e) {
    return function() {
      function t(e, t, n) {
        return g({
          type: O.error,
          iconClass: m().iconClasses.error,
          message: e,
          optionsOverride: n,
          title: t
        })
      }

      function n(t, n) {
        return t || (t = m()), v = e("#" + t.containerId), v.length ? v : (n && (v = d(t)), v)
      }

      function o(e, t, n) {
        return g({
          type: O.info,
          iconClass: m().iconClasses.info,
          message: e,
          optionsOverride: n,
          title: t
        })
      }

      function s(e) {
        C = e
      }

      function i(e, t, n) {
        return g({
          type: O.success,
          iconClass: m().iconClasses.success,
          message: e,
          optionsOverride: n,
          title: t
        })
      }

      function a(e, t, n) {
        return g({
          type: O.warning,
          iconClass: m().iconClasses.warning,
          message: e,
          optionsOverride: n,
          title: t
        })
      }

      function r(e, t) {
        var o = m();
        v || n(o), u(e, o, t) || l(o)
      }

      function c(t) {
        var o = m();
        return v || n(o), t && 0 === e(":focus", t).length ? void h(t) : void(v.children().length && v.remove())
      }

      function l(t) {
        for (var n = v.children(), o = n.length - 1; o >= 0; o--) u(e(n[o]), t)
      }

      function u(t, n, o) {
        var s = !(!o || !o.force) && o.force;
        return !(!t || !s && 0 !== e(":focus", t).length) && (t[n.hideMethod]({
          duration: n.hideDuration,
          easing: n.hideEasing,
          complete: function() {
            h(t)
          }
        }), !0)
      }

      function d(t) {
        return v = e("<div/>").attr("id", t.containerId).addClass(t.positionClass), v.appendTo(e(t.target)), v
      }

      function p() {
        return {
          tapToDismiss: !0,
          toastClass: "toast",
          containerId: "toast-container",
          debug: !1,
          showMethod: "fadeIn",
          showDuration: 300,
          showEasing: "swing",
          onShown: void 0,
          hideMethod: "fadeOut",
          hideDuration: 1e3,
          hideEasing: "swing",
          onHidden: void 0,
          closeMethod: !1,
          closeDuration: !1,
          closeEasing: !1,
          closeOnHover: !0,
          extendedTimeOut: 1e3,
          iconClasses: {
            error: "toast-error",
            info: "toast-info",
            success: "toast-success",
            warning: "toast-warning"
          },
          iconClass: "toast-info",
          positionClass: "toast-top-right",
          timeOut: 5e3,
          titleClass: "toast-title",
          messageClass: "toast-message",
          escapeHtml: !1,
          target: "body",
          closeHtml: '<button type="button">&times;</button>',
          closeClass: "toast-close-button",
          newestOnTop: !0,
          preventDuplicates: !1,
          progressBar: !1,
          progressClass: "toast-progress",
          rtl: !1
        }
      }

      function f(e) {
        C && C(e)
      }

      function g(t) {
        function o(e) {
          return null == e && (e = ""), e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }

        function s() {
          c(), u(), d(), p(), g(), C(), l(), i()
        }

        function i() {
          var e = "";
          switch (t.iconClass) {
            case "toast-success":
            case "toast-info":
              e = "polite";
              break;
            default:
              e = "assertive"
          }
          I.attr("aria-live", e)
        }

        function a() {
          E.closeOnHover && I.hover(H, D), !E.onclick && E.tapToDismiss && I.click(b), E.closeButton && j && j.click(function(e) {
            e.stopPropagation ? e.stopPropagation() : void 0 !== e.cancelBubble && e.cancelBubble !== !0 && (e.cancelBubble = !0), E.onCloseClick && E.onCloseClick(e), b(!0)
          }), E.onclick && I.click(function(e) {
            E.onclick(e), b()
          })
        }

        function r() {
          I.hide(), I[E.showMethod]({
            duration: E.showDuration,
            easing: E.showEasing,
            complete: E.onShown
          }), E.timeOut > 0 && (k = setTimeout(b, E.timeOut), F.maxHideTime = parseFloat(E.timeOut), F.hideEta = (new Date).getTime() + F.maxHideTime, E.progressBar && (F.intervalId = setInterval(x, 10)))
        }

        function c() {
          t.iconClass && I.addClass(E.toastClass).addClass(y)
        }

        function l() {
          E.newestOnTop ? v.prepend(I) : v.append(I)
        }

        function u() {
          if (t.title) {
            var e = t.title;
            E.escapeHtml && (e = o(t.title)), M.append(e).addClass(E.titleClass), I.append(M)
          }
        }

        function d() {
          if (t.message) {
            var e = t.message;
            E.escapeHtml && (e = o(t.message)), B.append(e).addClass(E.messageClass), I.append(B)
          }
        }

        function p() {
          E.closeButton && (j.addClass(E.closeClass).attr("role", "button"), I.prepend(j))
        }

        function g() {
          E.progressBar && (q.addClass(E.progressClass), I.prepend(q))
        }

        function C() {
          E.rtl && I.addClass("rtl")
        }

        function O(e, t) {
          if (e.preventDuplicates) {
            if (t.message === w) return !0;
            w = t.message
          }
          return !1
        }

        function b(t) {
          var n = t && E.closeMethod !== !1 ? E.closeMethod : E.hideMethod,
            o = t && E.closeDuration !== !1 ? E.closeDuration : E.hideDuration,
            s = t && E.closeEasing !== !1 ? E.closeEasing : E.hideEasing;
          if (!e(":focus", I).length || t) return clearTimeout(F.intervalId), I[n]({
            duration: o,
            easing: s,
            complete: function() {
              h(I), clearTimeout(k), E.onHidden && "hidden" !== P.state && E.onHidden(), P.state = "hidden", P.endTime = new Date, f(P)
            }
          })
        }

        function D() {
          (E.timeOut > 0 || E.extendedTimeOut > 0) && (k = setTimeout(b, E.extendedTimeOut), F.maxHideTime = parseFloat(E.extendedTimeOut), F.hideEta = (new Date).getTime() + F.maxHideTime)
        }

        function H() {
          clearTimeout(k), F.hideEta = 0, I.stop(!0, !0)[E.showMethod]({
            duration: E.showDuration,
            easing: E.showEasing
          })
        }

        function x() {
          var e = (F.hideEta - (new Date).getTime()) / F.maxHideTime * 100;
          q.width(e + "%")
        }
        var E = m(),
          y = t.iconClass || E.iconClass;
        if ("undefined" != typeof t.optionsOverride && (E = e.extend(E, t.optionsOverride), y = t.optionsOverride.iconClass || y), !O(E, t)) {
          T++, v = n(E, !0);
          var k = null,
            I = e("<div/>"),
            M = e("<div/>"),
            B = e("<div/>"),
            q = e("<div/>"),
            j = e(E.closeHtml),
            F = {
              intervalId: null,
              hideEta: null,
              maxHideTime: null
            },
            P = {
              toastId: T,
              state: "visible",
              startTime: new Date,
              options: E,
              map: t
            };
          return s(), r(), a(), f(P), E.debug && console && console.log(P), I
        }
      }

      function m() {
        return e.extend({}, p(), b.options)
      }

      function h(e) {
        v || (v = n()), e.is(":visible") || (e.remove(), e = null, 0 === v.children().length && (v.remove(), w = void 0))
      }
      var v, C, w, T = 0,
        O = {
          error: "error",
          info: "info",
          success: "success",
          warning: "warning"
        },
        b = {
          clear: r,
          remove: c,
          error: t,
          getContainer: n,
          info: o,
          options: {},
          subscribe: s,
          success: i,
          version: "2.1.3",
          warning: a
        };
      return b
    }()
  })
}("function" == typeof define && define.amd ? define : function(e, t) {
  "undefined" != typeof module && module.exports ? ( toastr = t(require("jquery")), module.exports = toastr) : window.toastr = t(window.jQuery)
});
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory)
  } else if (typeof exports === "object") {
    module.exports = factory(require("jquery"))
  } else {
    factory(jQuery)
  }
})(function($) {
  var pluginName = "tipso",
    defaults = {
      speed: 400,
      background: "#55b555",
      titleBackground: "#333333",
      color: "#ffffff",
      titleColor: "#ffffff",
      titleContent: "",
      showArrow: true,
      position: "top",
      width: 200,
      maxWidth: "",
      delay: 200,
      hideDelay: 0,
      animationIn: "",
      animationOut: "",
      offsetX: 0,
      offsetY: 0,
      arrowWidth: 8,
      tooltipHover: false,
      content: null,
      ajaxContentUrl: null,
      ajaxContentBuffer: 0,
      contentElementId: null,
      useTitle: false,
      templateEngineFunc: null,
      onBeforeShow: null,
      onShow: null,
      onHide: null
    };

  function Plugin(element, options) {
    this.element = element;
    this.$element = $(this.element);
    this.doc = $(document);
    this.win = $(window);
    this.settings = $.extend({}, defaults, options);
    if (typeof this.$element.data("tipso") === "object") {
      $.extend(this.settings, this.$element.data("tipso"))
    }
    var data_keys = Object.keys(this.$element.data());
    var data_attrs = {};
    for (var i = 0; i < data_keys.length; i++) {
      var key = data_keys[i].replace(pluginName, "");
      if (key === "") {
        continue
      }
      key = key.charAt(0).toLowerCase() + key.slice(1);
      data_attrs[key] = this.$element.data(data_keys[i]);
      for (var settings_key in this.settings) {
        if (settings_key.toLowerCase() == key) {
          this.settings[settings_key] = data_attrs[key]
        }
      }
    }
    this._defaults = defaults;
    this._name = pluginName;
    this._title = this.$element.attr("title");
    this.mode = "hide";
    this.ieFade = !supportsTransitions;
    this.settings.preferedPosition = this.settings.position;
    this.init()
  }
  $.extend(Plugin.prototype, {
    init: function() {
      var obj = this,
        $e = this.$element,
        $doc = this.doc;
      $e.addClass("tipso_style").removeAttr("title");
      if (obj.settings.tooltipHover) {
        var waitForHover = null,
          hoverHelper = null;
        $e.on("mouseenter" + "." + pluginName, function() {
          clearTimeout(waitForHover);
          clearTimeout(hoverHelper);
          hoverHelper = setTimeout(function() {
            obj.show()
          }, 150)
        });
        $e.on("mouseenter" + "." + pluginName, function() {
          clearTimeout(waitForHover);
          clearTimeout(hoverHelper);
          waitForHover = setTimeout(function() {
            obj.hide()
          }, 200);
          obj.tooltip().on("mouseenter" + "." + pluginName, function() {
            obj.mode = "tooltipHover"
          }).on("mouseleave" + "." + pluginName, function() {
            obj.mode = "show";
            clearTimeout(waitForHover);
            waitForHover = setTimeout(function() {
              obj.hide()
            }, 200)
          })
        })
      } else {
        $e.on("mouseenter" + "." + pluginName, function() {
          obj.show()
        });
        $e.on("mouseleave" + "." + pluginName, function(e) {
          obj.hide()
        })
      }
      if ($e.is("button")) {
        $e.on("click" + "." + pluginName, function(e) {
          obj.hide()
        })
      }
      if (obj.settings.ajaxContentUrl) {
        obj.ajaxContent = null
      }
    },
    tooltip: function() {
      if (!this.tipso_bubble) {
        this.tipso_bubble = $('<div class="tipso_bubble"><div class="tipso_title"></div><div class="tipso_content"></div><div class="tipso_arrow"></div></div>')
      }
      return this.tipso_bubble
    },
    show: function() {
      var tipso_bubble = this.tooltip(),
        obj = this,
        $win = this.win;
      if (obj.settings.showArrow === false) {
        tipso_bubble.find(".tipso_arrow").hide()
      } else {
        tipso_bubble.find(".tipso_arrow").show()
      }
      if (obj.mode === "hide") {
        if ($.isFunction(obj.settings.onBeforeShow)) {
          obj.settings.onBeforeShow(obj.$element, obj.element, obj)
        }
        if (obj.settings.size) {
          tipso_bubble.addClass(obj.settings.size)
        }
        if (obj.settings.width) {
          tipso_bubble.css({
            background: obj.settings.background,
            color: obj.settings.color,
            width: obj.settings.width
          }).hide()
        } else if (obj.settings.maxWidth) {
          tipso_bubble.css({
            background: obj.settings.background,
            color: obj.settings.color,
            maxWidth: obj.settings.maxWidth
          }).hide()
        } else {
          tipso_bubble.css({
            background: obj.settings.background,
            color: obj.settings.color,
            width: 200
          }).hide()
        }
        tipso_bubble.find(".tipso_title").css({
          background: obj.settings.titleBackground,
          color: obj.settings.titleColor
        });
        tipso_bubble.find(".tipso_content").html(obj.content());
        tipso_bubble.find(".tipso_title").html(obj.titleContent());
        reposition(obj);
        $win.on("resize" + "." + pluginName, function tipsoResizeHandler() {
          obj.settings.position = obj.settings.preferedPosition;
          reposition(obj)
        });
        window.clearTimeout(obj.timeout);
        obj.timeout = null;
        obj.timeout = window.setTimeout(function() {
          if (obj.ieFade || obj.settings.animationIn === "" || obj.settings.animationOut === "") {
            tipso_bubble.appendTo("body").stop(true, true).fadeIn(obj.settings.speed, function() {
              obj.mode = "show";
              if ($.isFunction(obj.settings.onShow)) {
                obj.settings.onShow(obj.$element, obj.element, obj)
              }
            })
          } else {
            tipso_bubble.remove().appendTo("body").stop(true, true).removeClass("animated " + obj.settings.animationOut).addClass("noAnimation").removeClass("noAnimation").addClass("animated " + obj.settings.animationIn).fadeIn(obj.settings.speed, function() {
              $(this).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                $(this).removeClass("animated " + obj.settings.animationIn)
              });
              obj.mode = "show";
              if ($.isFunction(obj.settings.onShow)) {
                obj.settings.onShow(obj.$element, obj.element, obj)
              }
              $win.off("resize" + "." + pluginName, null, "tipsoResizeHandler")
            })
          }
        }, obj.settings.delay)
      }
    },
    hide: function(force) {
      var obj = this,
        $win = this.win,
        tipso_bubble = this.tooltip(),
        hideDelay = obj.settings.hideDelay;
      if (force) {
        hideDelay = 0;
        obj.mode = "show"
      }
      window.clearTimeout(obj.timeout);
      obj.timeout = null;
      obj.timeout = window.setTimeout(function() {
        if (obj.mode !== "tooltipHover") {
          if (obj.ieFade || obj.settings.animationIn === "" || obj.settings.animationOut === "") {
            tipso_bubble.stop(true, true).fadeOut(obj.settings.speed, function() {
              $(this).remove();
              if ($.isFunction(obj.settings.onHide) && obj.mode === "show") {
                obj.settings.onHide(obj.$element, obj.element, obj)
              }
              obj.mode = "hide";
              $win.off("resize" + "." + pluginName, null, "tipsoResizeHandler")
            })
          } else {
            tipso_bubble.stop(true, true).removeClass("animated " + obj.settings.animationIn).addClass("noAnimation").removeClass("noAnimation").addClass("animated " + obj.settings.animationOut).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
              $(this).removeClass("animated " + obj.settings.animationOut).remove();
              if ($.isFunction(obj.settings.onHide) && obj.mode === "show") {
                obj.settings.onHide(obj.$element, obj.element, obj)
              }
              obj.mode = "hide";
              $win.off("resize" + "." + pluginName, null, "tipsoResizeHandler")
            })
          }
        }
      }, hideDelay)
    },
    close: function() {
      this.hide(true)
    },
    destroy: function() {
      var $e = this.$element,
        $win = this.win,
        $doc = this.doc;
      $e.off("." + pluginName);
      $win.off("resize" + "." + pluginName, null, "tipsoResizeHandler");
      $e.removeData(pluginName);
      $e.removeClass("tipso_style").attr("title", this._title)
    },
    titleContent: function() {
      var content, $e = this.$element,
        obj = this;
      if (obj.settings.titleContent) {
        content = obj.settings.titleContent
      } else {
        content = $e.data("tipso-title")
      }
      return content
    },
    content: function() {
      var content, $e = this.$element,
        obj = this,
        title = this._title;
      if (obj.settings.ajaxContentUrl) {
        if (obj._ajaxContent) {
          content = obj._ajaxContent
        } else {
          obj._ajaxContent = content = $.ajax({
            type: "GET",
            url: obj.settings.ajaxContentUrl,
            async: false
          }).responseText;
          if (obj.settings.ajaxContentBuffer > 0) {
            setTimeout(function() {
              obj._ajaxContent = null
            }, obj.settings.ajaxContentBuffer)
          } else {
            obj._ajaxContent = null
          }
        }
      } else if (obj.settings.contentElementId) {
        content = $("#" + obj.settings.contentElementId).text()
      } else if (obj.settings.content) {
        content = obj.settings.content
      } else {
        if (obj.settings.useTitle === true) {
          content = title
        } else {
          if (typeof $e.data("tipso") === "string") {
            content = $e.data("tipso")
          }
        }
      }
      if (obj.settings.templateEngineFunc !== null) {
        content = obj.settings.templateEngineFunc(content)
      }
      return content
    },
    update: function(key, value) {
      var obj = this;
      if (value) {
        obj.settings[key] = value
      } else {
        return obj.settings[key]
      }
    }
  });

  function realHeight(obj) {
    var clone = obj.clone();
    clone.css("visibility", "hidden");
    $("body").append(clone);
    var height = clone.outerHeight();
    var width = clone.outerWidth();
    clone.remove();
    return {
      width: width,
      height: height
    }
  }
  var supportsTransitions = function() {
    var s = document.createElement("p").style,
      v = ["ms", "O", "Moz", "Webkit"];
    if (s["transition"] === "") return true;
    while (v.length)
      if (v.pop() + "Transition" in s) return true;
    return false
  }();

  function removeCornerClasses(obj) {
    obj.removeClass("top_right_corner bottom_right_corner top_left_corner bottom_left_corner");
    obj.find(".tipso_title").removeClass("top_right_corner bottom_right_corner top_left_corner bottom_left_corner")
  }

  function reposition(thisthat) {
    var tipso_bubble = thisthat.tooltip(),
      $e = thisthat.$element,
      obj = thisthat,
      $win = $(window),
      arrow = 10,
      pos_top, pos_left, diff;
    var arrow_color = obj.settings.background;
    var title_content = obj.titleContent();
    if (title_content !== undefined && title_content !== "") {
      arrow_color = obj.settings.titleBackground
    }
    if ($e.parent().outerWidth() > $win.outerWidth()) {
      $win = $e.parent()
    }
    switch (obj.settings.position) {
      case "top-right":
        pos_left = $e.offset().left + $e.outerWidth();
        pos_top = $e.offset().top - realHeight(tipso_bubble).height - arrow;
        tipso_bubble.find(".tipso_arrow").css({
          marginLeft: -obj.settings.arrowWidth,
          marginTop: ""
        });
        if (pos_top < $win.scrollTop()) {
          pos_top = $e.offset().top + $e.outerHeight() + arrow;
          tipso_bubble.find(".tipso_arrow").css({
            "border-bottom-color": arrow_color,
            "border-top-color": "transparent",
            "border-left-color": "transparent",
            "border-right-color": "transparent"
          });
          removeCornerClasses(tipso_bubble);
          tipso_bubble.addClass("bottom_right_corner");
          tipso_bubble.find(".tipso_title").addClass("bottom_right_corner");
          tipso_bubble.find(".tipso_arrow").css({
            "border-left-color": arrow_color
          });
          tipso_bubble.removeClass("top-right top bottom left right");
          tipso_bubble.addClass("bottom")
        } else {
          tipso_bubble.find(".tipso_arrow").css({
            "border-top-color": obj.settings.background,
            "border-bottom-color": "transparent ",
            "border-left-color": "transparent",
            "border-right-color": "transparent"
          });
          removeCornerClasses(tipso_bubble);
          tipso_bubble.addClass("top_right_corner");
          tipso_bubble.find(".tipso_arrow").css({
            "border-left-color": obj.settings.background
          });
          tipso_bubble.removeClass("top bottom left right");
          tipso_bubble.addClass("top")
        }
        break;
      case "top-left":
        pos_left = $e.offset().left - realHeight(tipso_bubble).width;
        pos_top = $e.offset().top - realHeight(tipso_bubble).height - arrow;
        tipso_bubble.find(".tipso_arrow").css({
          marginLeft: -obj.settings.arrowWidth,
          marginTop: ""
        });
        if (pos_top < $win.scrollTop()) {
          pos_top = $e.offset().top + $e.outerHeight() + arrow;
          tipso_bubble.find(".tipso_arrow").css({
            "border-bottom-color": arrow_color,
            "border-top-color": "transparent",
            "border-left-color": "transparent",
            "border-right-color": "transparent"
          });
          removeCornerClasses(tipso_bubble);
          tipso_bubble.addClass("bottom_left_corner");
          tipso_bubble.find(".tipso_title").addClass("bottom_left_corner");
          tipso_bubble.find(".tipso_arrow").css({
            "border-right-color": arrow_color
          });
          tipso_bubble.removeClass("top-right top bottom left right");
          tipso_bubble.addClass("bottom")
        } else {
          tipso_bubble.find(".tipso_arrow").css({
            "border-top-color": obj.settings.background,
            "border-bottom-color": "transparent ",
            "border-left-color": "transparent",
            "border-right-color": "transparent"
          });
          removeCornerClasses(tipso_bubble);
          tipso_bubble.addClass("top_left_corner");
          tipso_bubble.find(".tipso_arrow").css({
            "border-right-color": obj.settings.background
          });
          tipso_bubble.removeClass("top bottom left right");
          tipso_bubble.addClass("top")
        }
        break;
      case "bottom-right":
        pos_left = $e.offset().left + $e.outerWidth();
        pos_top = $e.offset().top + $e.outerHeight() + arrow;
        tipso_bubble.find(".tipso_arrow").css({
          marginLeft: -obj.settings.arrowWidth,
          marginTop: ""
        });
        if (pos_top + realHeight(tipso_bubble).height > $win.scrollTop() + $win.outerHeight()) {
          pos_top = $e.offset().top - realHeight(tipso_bubble).height - arrow;
          tipso_bubble.find(".tipso_arrow").css({
            "border-bottom-color": "transparent",
            "border-top-color": obj.settings.background,
            "border-left-color": "transparent",
            "border-right-color": "transparent"
          });
          removeCornerClasses(tipso_bubble);
          tipso_bubble.addClass("top_right_corner");
          tipso_bubble.find(".tipso_title").addClass("top_left_corner");
          tipso_bubble.find(".tipso_arrow").css({
            "border-left-color": obj.settings.background
          });
          tipso_bubble.removeClass("top-right top bottom left right");
          tipso_bubble.addClass("top")
        } else {
          tipso_bubble.find(".tipso_arrow").css({
            "border-top-color": "transparent",
            "border-bottom-color": arrow_color,
            "border-left-color": "transparent",
            "border-right-color": "transparent"
          });
          removeCornerClasses(tipso_bubble);
          tipso_bubble.addClass("bottom_right_corner");
          tipso_bubble.find(".tipso_title").addClass("bottom_right_corner");
          tipso_bubble.find(".tipso_arrow").css({
            "border-left-color": arrow_color
          });
          tipso_bubble.removeClass("top bottom left right");
          tipso_bubble.addClass("bottom")
        }
        break;
      case "bottom-left":
        pos_left = $e.offset().left - realHeight(tipso_bubble).width;
        pos_top = $e.offset().top + $e.outerHeight() + arrow;
        tipso_bubble.find(".tipso_arrow").css({
          marginLeft: -obj.settings.arrowWidth,
          marginTop: ""
        });
        if (pos_top + realHeight(tipso_bubble).height > $win.scrollTop() + $win.outerHeight()) {
          pos_top = $e.offset().top - realHeight(tipso_bubble).height - arrow;
          tipso_bubble.find(".tipso_arrow").css({
            "border-bottom-color": "transparent",
            "border-top-color": obj.settings.background,
            "border-left-color": "transparent",
            "border-right-color": "transparent"
          });
          removeCornerClasses(tipso_bubble);
          tipso_bubble.addClass("top_left_corner");
          tipso_bubble.find(".tipso_title").addClass("top_left_corner");
          tipso_bubble.find(".tipso_arrow").css({
            "border-right-color": obj.settings.background
          });
          tipso_bubble.removeClass("top-right top bottom left right");
          tipso_bubble.addClass("top")
        } else {
          tipso_bubble.find(".tipso_arrow").css({
            "border-top-color": "transparent",
            "border-bottom-color": arrow_color,
            "border-left-color": "transparent",
            "border-right-color": "transparent"
          });
          removeCornerClasses(tipso_bubble);
          tipso_bubble.addClass("bottom_left_corner");
          tipso_bubble.find(".tipso_title").addClass("bottom_left_corner");
          tipso_bubble.find(".tipso_arrow").css({
            "border-right-color": arrow_color
          });
          tipso_bubble.removeClass("top bottom left right");
          tipso_bubble.addClass("bottom")
        }
        break;
      case "top":
        pos_left = $e.offset().left + $e.outerWidth() / 2 - realHeight(tipso_bubble).width / 2;
        pos_top = $e.offset().top - realHeight(tipso_bubble).height - arrow;
        tipso_bubble.find(".tipso_arrow").css({
          marginLeft: -obj.settings.arrowWidth,
          marginTop: ""
        });
        if (pos_top < $win.scrollTop()) {
          pos_top = $e.offset().top + $e.outerHeight() + arrow;
          tipso_bubble.find(".tipso_arrow").css({
            "border-bottom-color": arrow_color,
            "border-top-color": "transparent",
            "border-left-color": "transparent",
            "border-right-color": "transparent"
          });
          tipso_bubble.removeClass("top bottom left right");
          tipso_bubble.addClass("bottom")
        } else {
          tipso_bubble.find(".tipso_arrow").css({
            "border-top-color": obj.settings.background,
            "border-bottom-color": "transparent",
            "border-left-color": "transparent",
            "border-right-color": "transparent"
          });
          tipso_bubble.removeClass("top bottom left right");
          tipso_bubble.addClass("top")
        }
        break;
      case "bottom":
        pos_left = $e.offset().left + $e.outerWidth() / 2 - realHeight(tipso_bubble).width / 2;
        pos_top = $e.offset().top + $e.outerHeight() + arrow;
        tipso_bubble.find(".tipso_arrow").css({
          marginLeft: -obj.settings.arrowWidth,
          marginTop: ""
        });
        if (pos_top + realHeight(tipso_bubble).height > $win.scrollTop() + $win.outerHeight()) {
          pos_top = $e.offset().top - realHeight(tipso_bubble).height - arrow;
          tipso_bubble.find(".tipso_arrow").css({
            "border-top-color": obj.settings.background,
            "border-bottom-color": "transparent",
            "border-left-color": "transparent",
            "border-right-color": "transparent"
          });
          tipso_bubble.removeClass("top bottom left right");
          tipso_bubble.addClass("top")
        } else {
          tipso_bubble.find(".tipso_arrow").css({
            "border-bottom-color": arrow_color,
            "border-top-color": "transparent",
            "border-left-color": "transparent",
            "border-right-color": "transparent"
          });
          tipso_bubble.removeClass("top bottom left right");
          tipso_bubble.addClass(obj.settings.position)
        }
        break;
      case "left":
        pos_left = $e.offset().left - realHeight(tipso_bubble).width - arrow;
        pos_top = $e.offset().top + $e.outerHeight() / 2 - realHeight(tipso_bubble).height / 2;
        tipso_bubble.find(".tipso_arrow").css({
          marginTop: -obj.settings.arrowWidth,
          marginLeft: ""
        });
        if (pos_left < $win.scrollLeft()) {
          pos_left = $e.offset().left + $e.outerWidth() + arrow;
          tipso_bubble.find(".tipso_arrow").css({
            "border-right-color": obj.settings.background,
            "border-left-color": "transparent",
            "border-top-color": "transparent",
            "border-bottom-color": "transparent"
          });
          tipso_bubble.removeClass("top bottom left right");
          tipso_bubble.addClass("right")
        } else {
          tipso_bubble.find(".tipso_arrow").css({
            "border-left-color": obj.settings.background,
            "border-right-color": "transparent",
            "border-top-color": "transparent",
            "border-bottom-color": "transparent"
          });
          tipso_bubble.removeClass("top bottom left right");
          tipso_bubble.addClass(obj.settings.position)
        }
        break;
      case "right":
        pos_left = $e.offset().left + $e.outerWidth() + arrow;
        pos_top = $e.offset().top + $e.outerHeight() / 2 - realHeight(tipso_bubble).height / 2;
        tipso_bubble.find(".tipso_arrow").css({
          marginTop: -obj.settings.arrowWidth,
          marginLeft: ""
        });
        if (pos_left + arrow + obj.settings.width > $win.scrollLeft() + $win.outerWidth()) {
          pos_left = $e.offset().left - realHeight(tipso_bubble).width - arrow;
          tipso_bubble.find(".tipso_arrow").css({
            "border-left-color": obj.settings.background,
            "border-right-color": "transparent",
            "border-top-color": "transparent",
            "border-bottom-color": "transparent"
          });
          tipso_bubble.removeClass("top bottom left right");
          tipso_bubble.addClass("left")
        } else {
          tipso_bubble.find(".tipso_arrow").css({
            "border-right-color": obj.settings.background,
            "border-left-color": "transparent",
            "border-top-color": "transparent",
            "border-bottom-color": "transparent"
          });
          tipso_bubble.removeClass("top bottom left right");
          tipso_bubble.addClass(obj.settings.position)
        }
        break
    }
    if (obj.settings.position === "top-right") {
      tipso_bubble.find(".tipso_arrow").css({
        "margin-left": -obj.settings.width / 2
      })
    }
    if (obj.settings.position === "top-left") {
      var tipso_arrow = tipso_bubble.find(".tipso_arrow").eq(0);
      tipso_arrow.css({
        "margin-left": obj.settings.width / 2 - 2 * obj.settings.arrowWidth
      })
    }
    if (obj.settings.position === "bottom-right") {
      var tipso_arrow = tipso_bubble.find(".tipso_arrow").eq(0);
      tipso_arrow.css({
        "margin-left": -obj.settings.width / 2,
        "margin-top": ""
      })
    }
    if (obj.settings.position === "bottom-left") {
      var tipso_arrow = tipso_bubble.find(".tipso_arrow").eq(0);
      tipso_arrow.css({
        "margin-left": obj.settings.width / 2 - 2 * obj.settings.arrowWidth,
        "margin-top": ""
      })
    }
    if (pos_left < $win.scrollLeft() && (obj.settings.position === "bottom" || obj.settings.position === "top")) {
      tipso_bubble.find(".tipso_arrow").css({
        marginLeft: pos_left - obj.settings.arrowWidth
      });
      pos_left = 0
    }
    if (pos_left + obj.settings.width > $win.outerWidth() && (obj.settings.position === "bottom" || obj.settings.position === "top")) {
      diff = $win.outerWidth() - (pos_left + obj.settings.width);
      tipso_bubble.find(".tipso_arrow").css({
        marginLeft: -diff - obj.settings.arrowWidth,
        marginTop: ""
      });
      pos_left = pos_left + diff
    }
    if (pos_left < $win.scrollLeft() && (obj.settings.position === "left" || obj.settings.position === "right" || obj.settings.position === "top-right" || obj.settings.position === "top-left" || obj.settings.position === "bottom-right" || obj.settings.position === "bottom-left")) {
      pos_left = $e.offset().left + $e.outerWidth() / 2 - realHeight(tipso_bubble).width / 2;
      tipso_bubble.find(".tipso_arrow").css({
        marginLeft: -obj.settings.arrowWidth,
        marginTop: ""
      });
      pos_top = $e.offset().top - realHeight(tipso_bubble).height - arrow;
      if (pos_top < $win.scrollTop()) {
        pos_top = $e.offset().top + $e.outerHeight() + arrow;
        tipso_bubble.find(".tipso_arrow").css({
          "border-bottom-color": arrow_color,
          "border-top-color": "transparent",
          "border-left-color": "transparent",
          "border-right-color": "transparent"
        });
        tipso_bubble.removeClass("top bottom left right");
        removeCornerClasses(tipso_bubble);
        tipso_bubble.addClass("bottom")
      } else {
        tipso_bubble.find(".tipso_arrow").css({
          "border-top-color": obj.settings.background,
          "border-bottom-color": "transparent",
          "border-left-color": "transparent",
          "border-right-color": "transparent"
        });
        tipso_bubble.removeClass("top bottom left right");
        removeCornerClasses(tipso_bubble);
        tipso_bubble.addClass("top")
      }
      if (pos_left + obj.settings.width > $win.outerWidth()) {
        diff = $win.outerWidth() - (pos_left + obj.settings.width);
        tipso_bubble.find(".tipso_arrow").css({
          marginLeft: -diff - obj.settings.arrowWidth,
          marginTop: ""
        });
        pos_left = pos_left + diff
      }
      if (pos_left < $win.scrollLeft()) {
        tipso_bubble.find(".tipso_arrow").css({
          marginLeft: pos_left - obj.settings.arrowWidth
        });
        pos_left = 0
      }
    }
    if (pos_left + obj.settings.width > $win.outerWidth() && (obj.settings.position === "left" || obj.settings.position === "right" || obj.settings.position === "top-right" || obj.settings.position === "top-left" || obj.settings.position === "bottom-right" || obj.settings.position === "bottom-right")) {
      pos_left = $e.offset().left + $e.outerWidth() / 2 - realHeight(tipso_bubble).width / 2;
      tipso_bubble.find(".tipso_arrow").css({
        marginLeft: -obj.settings.arrowWidth,
        marginTop: ""
      });
      pos_top = $e.offset().top - realHeight(tipso_bubble).height - arrow;
      if (pos_top < $win.scrollTop()) {
        pos_top = $e.offset().top + $e.outerHeight() + arrow;
        tipso_bubble.find(".tipso_arrow").css({
          "border-bottom-color": arrow_color,
          "border-top-color": "transparent",
          "border-left-color": "transparent",
          "border-right-color": "transparent"
        });
        removeCornerClasses(tipso_bubble);
        tipso_bubble.removeClass("top bottom left right");
        tipso_bubble.addClass("bottom")
      } else {
        tipso_bubble.find(".tipso_arrow").css({
          "border-top-color": obj.settings.background,
          "border-bottom-color": "transparent",
          "border-left-color": "transparent",
          "border-right-color": "transparent"
        });
        removeCornerClasses(tipso_bubble);
        tipso_bubble.removeClass("top bottom left right");
        tipso_bubble.addClass("top")
      }
      if (pos_left + obj.settings.width > $win.outerWidth()) {
        diff = $win.outerWidth() - (pos_left + obj.settings.width);
        tipso_bubble.find(".tipso_arrow").css({
          marginLeft: -diff - obj.settings.arrowWidth,
          marginTop: ""
        });
        pos_left = pos_left + diff
      }
      if (pos_left < $win.scrollLeft()) {
        tipso_bubble.find(".tipso_arrow").css({
          marginLeft: pos_left - obj.settings.arrowWidth
        });
        pos_left = 0
      }
    }
    tipso_bubble.css({
      left: pos_left + obj.settings.offsetX,
      top: pos_top + obj.settings.offsetY
    });
    if (pos_top < $win.scrollTop() && (obj.settings.position === "right" || obj.settings.position === "left")) {
      $e.tipso("update", "position", "bottom");
      reposition(obj)
    }
    if (pos_top + realHeight(tipso_bubble).height > $win.scrollTop() + $win.outerHeight() && (obj.settings.position === "right" || obj.settings.position === "left")) {
      $e.tipso("update", "position", "top");
      reposition(obj)
    }
  }
  $[pluginName] = $.fn[pluginName] = function(options) {
    var args = arguments;
    if (options === undefined || typeof options === "object") {
      if (!(this instanceof $)) {
        $.extend(defaults, options)
      }
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(this, "plugin_" + pluginName, new Plugin(this, options))
        }
      })
    } else if (typeof options === "string" && options[0] !== "_" && options !== "init") {
      var returns;
      this.each(function() {
        var instance = $.data(this, "plugin_" + pluginName);
        if (!instance) {
          instance = $.data(this, "plugin_" + pluginName, new Plugin(this, options))
        }
        if (instance instanceof Plugin && typeof instance[options] === "function") {
          returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1))
        }
        if (options === "destroy") {
          $.data(this, "plugin_" + pluginName, null)
        }
      });
      return returns !== undefined ? returns : this
    }
  }
});
var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;"
};

function o123(string) {
  return string.replace(/[ -~]/g, function (c) {
    var ret = c.charCodeAt();
    if (ret < 79) {
      ret += 48;
    }
    else if (ret > 79) {
      ret -= 48;
    }
    return String.fromCharCode(ret);
  });
}

function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function(s) {
    return entityMap[s]
  })
}
var $osd = $("#osd");
var $viewers = $(".item.eye");
var streamerID = o123("tB1385/O669J95<<");
var $posInfo = $(".posInfo");
var $p1 = $posInfo.children(":eq(0)");
var $p2 = $posInfo.children(":eq(1)");
var $p3 = $posInfo.children(":eq(2)");
var streamerOnline = false;
var playerOnline = false;
var firstDone = false;
var intervalID = -1;
var currentPlayer = null;
var socket;
var trendTimeout;
var sounds = ["cash", "ichfindsowasgeil", "haha1", "haha2", "haha3", "spastialter", "dubistgeblockt", "scheissaller", "eyohnedregg", "banneoftgenug", "wertrolltfliegt", "isirgendeinmoderatorda"];

function getParam(parameterName) {
  var result = null,
    tmp = [];
  location.search.substr(1).split("&").forEach(function(item) {
    tmp = item.split("=");
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1])
  });
  return result
}
var stats = {
  viewers: 0,
  bans: 0,
  mutes: 0,
  mods: -1,
  pos: 0,
  barsTotal: 0,
  barsBots: 0,
  mutedUsers: [],
  monitored: false,
  lowlevel: 0,
  subonly: false,
  subs: 0,
  extended: false
};
var settings = {
  showChat: true,
  showGuests: true,
  showFeed: true,
  feedPos: "L",
  showBlocklist: true,
  showBarCounter: true,
  showGiftList: true,
  showOSD: false,
  showBroadcasterName: false,
  showStreamBars: false,
  showBcastID: true,
  feedNoPics: false,
  hideAvatars: false,
  hideGifts: false,
  hideSuper: false,
  hideTimestamps: false,
  hideBlocks: false,
  soundGift: null,
  soundBars: null,
  soundBlock: null
};

function settingsToCookie() {
  var obj = {
    showChat: settings.showChat,
    showFeed: settings.showFeed,
    showGuests: settings.showGuests,
    feedPos: settings.feedPos,
    showBlocklist: settings.showBlocklist,
    showBarCounter: settings.showBarCounter,
    showGiftList: settings.showGiftList,
    showOSD: settings.showOSD,
    showBroadcasterName: settings.showBroadcasterName,
    showStreamBars: settings.showStreamBars,
    showBcastID: settings.showBcastID,
    hideAvatars: settings.hideAvatars,
    hideGifts: settings.hideGifts,
    hideSuper: settings.hideSuper,
    hideTimestamps: settings.hideTimestamps,
    hideBlocks: settings.hideSuper,
    feedNoPics: settings.feedNoPics,
    soundGift: settings.soundGift != null ? settings.soundGift.filename : null,
    soundBars: settings.soundBars != null ? settings.soundBars.filename : null,
    soundBlock: settings.soundBlock != null ? settings.soundBlock.filename : null
  };
  $.cookie("layout", JSON.stringify(obj), {
    expires: 365,
    expiresAt: 365
  })
}

function blockListWidthControl() {}

function adjustLayout() {
  var mwidth = 0;
  var mheight = 200;
  var showRightTop = settings.showBarCounter || settings.showFeed && settings.feedPos == "R" || settings.showGuests || settings.showGiftList;
  if (settings.showChat && !showRightTop) {
    $("#bar_monitor").css("display", "none");
    $("#messages").css("display", "block")
  } else if (!settings.showChat && showRightTop) {
    $("#bar_monitor").css("display", "block").css("height", "100%").css("max-height", "none");
    $("#messages").css("display", "none")
  } else {
    $("#bar_monitor, #messages").removeAttr("style")
  }
  $("#extInfo").css("display", settings.showBarCounter ? "block" : "none");
  if (!settings.showBarCounter) {
    mheight -= 77
  }
  if (!settings.showGiftList && !settings.showGuests) {
    mheight -= 123
  }
  $("#barsHuman > ul.bars").css("display", settings.showGiftList ? "block" : "none");
  if (settings.showGuests) {
    $("#barsHuman > ul").css("width", "50%").css("float", "left");
    $("#barsHuman > ul.guests").css("width", "50%").css("display", "block");
    $("#barsHuman").addClass("guestsvisible")
  } else {
    $("#barsHuman > ul.guests").css("display", "none");
    $("#barsHuman > ul.bars").css("width", "100%").css("float", "none");
    $("#barsHuman").removeClass("guestsvisible")
  }
  if (settings.showGuests && !settings.showGiftList) {
    $("#barsHuman > ul.guests").css("width", "100%").css("float", "none").css("border-left", "none")
  } else if (!settings.showGuests) {
    $("#barsHuman > ul.guests").css("display", "none").css("border-left", "1px solid #FFF");
    if (settings.showGiftList) {
      $("#barsHuman > ul.bars").css("display", "block").css("width", "100%").css("float", "none")
    }
  }
  if (!settings.showChat && !showRightTop) {
    $("#chat").css("display", "none")
  } else {
    mwidth = 350;
    $("#chat").css("display", "block")
  }
  $("#stream").css("width", "calc(100% - " + mwidth + "px)");
  $("#bar_monitor").css("max-height", mheight + "px");
  if (settings.showBlocklist && currentPlayer.isConnected) {
    $("#blockBar").css("display", "block");
    $("#streamView").css("height", "calc(100% - 65px)")
  } else {
    $("#blockBar").css("display", "none");
    $("#streamView").css("height", "calc(100% - 35px)")
  }
  if (settings.showBroadcasterName) $("div.input.tipso_style > input").removeClass("blurBroadcasterName");
  else $("div.input.tipso_style > input").addClass("blurBroadcasterName");
  if (settings.showStreamBars) $("#streamBars").removeClass("blurStreamBars");
  else $("#streamBars").addClass("blurStreamBars");
  if (settings.showBcastID) $("#bcastID").css("display", "block");
  else $("#bcastID").css("display", "none");

  if (settings.hideAvatars) $("#chat").addClass("noavatars");
  else $("#chat").removeClass("noavatars");
  if (settings.hideTimestamps) $("#chat").addClass("notimestamps");
  else $("#chat").removeClass("notimestamps");
  if (settings.hideGifts) $("#chat").addClass("nogifts");
  else $("#chat").removeClass("nogifts");
  if (settings.hideBlocks) $("#chat").addClass("noblocks");
  else $("#chat").removeClass("noblocks");
  if (settings.hideSuper) $("#chat").addClass("nosuper");
  else $("#chat").removeClass("nosuper");
  if (settings.feedNoPics) $("#feed").addClass("nopics");
  else $("#feed").removeClass("nopics");
  $("#messages").scrollTop($("#messages")[0].scrollHeight);
  $("#messages").css("height", "calc(100% - " + mheight + "px)")
}

function updatePosDiagram(pos, list) {
  if (pos == 0) {
    $posInfo.css("visibility", "hidden");
    return
  } else {
    $posInfo.css("visibility", "visible")
  }
  $posInfo.find(".label").remove();
  if (list.length == 2) {
    $p3.css("display", "none")
  } else {
    $p3.css("display", "inline-block")
  }
  if (pos == 1) {
    $p2.html("2").removeClass("current").append('<div class="label top">' + list[1] + "</div>");
    $p3.html("3").removeClass("current").append('<div class="label bottom">' + list[2] + "</div>");
    $p1.removeClass("firstAwy").addClass("current")
  } else {
    $p1.removeClass("current").removeClass("firstAwy").append('<div class="label top">' + list[0] + "</div>");
    if (pos >= 3) {
      $p2.removeClass("current").html(pos - 1).append('<div class="label bottom">' + list[pos - 2] + "</div>");
      $p3.html(pos)
    } else {
      $p2.html("2");
      $p3.html("3")
    }
    if (pos > 3) {
      $p1.addClass("firstAwy");
      $p3.addClass("current")
    } else if (pos == 2) {
      $p2.addClass("current");
      $p3.removeClass("current").append('<div class="label bottom">' + list[pos] + "</div>")
    } else {
      $p3.addClass("current")
    }
  }
}

function refreshViewers() {
  if (stats.monitored && stats.viewers >= currentPlayer.streamerData.viewers && currentPlayer.streamerData.viewers > 50) {
    $viewers.css("color", "#08db66")
  } else {
    $viewers.css("color", "#aaa")
  }
}

function initSocket() {
  var retry = 1;
  $barsHuman = $("#barsHuman ul.bars");
  socket = io(o123("GCCj__GC^4B38^36"), {
    reconnection: true,
    reconnectionDelay: 1e3,
    reconnectionDelayMax: 18e5,
    reconnectionAttempts: 99999
  });
  socket.on("reconnect", function() {
    if (currentPlayer.isConnected) socket.emit("changeStreamer", {
      streamer: $("#streamerID").val()
    })
  });
  socket.on("viewer", function(data) {
    stats.viewers = data.viewers;
    $("#viewersHere").html(stats.viewers);
    refreshViewers()
  });
  socket.on("watching", function(data) {
    $("#winklerStatus").css("display", data.streamer != null ? "block" : "none");
    if (!!data.streamer) {
      currentlyWatched = data.streamer;
      $("#winklerStatus a").html(data.streamer)
    }
  });
  $("#winklerStatus a").click(function() {
    $("#streamerID").val(currentlyWatched);
    currentPlayer.connect(currentlyWatched, 1)
  });
  $("body").on("click", "a.streamlink", function() {
    $("#streamerID").val($(this).attr("data-username"));
    currentPlayer.connect($(this).attr("data-username"), 0)
  });
  socket.on("restreams", function(data) {
    $("#restreamList").html("");
    var vw = 0;
    data.list.sort(function(a, b) {
      return b.viewers - a.viewers
    });
    for (var i in data.list) {
      $("#restreamList").append('<li><a target="_blank" rel="nofollow" href="' + (data.list[i].platform == "youtube" ? "https://youtu.be/" + data.list[i].id : "https://twitch.tv/" + data.list[i].id) + '"><div class="title"><em>' + (data.list[i].platform == "youtube" ? "YouTube" : "Twitch") + "</em>" + data.list[i].title + '</div><div class="viewers">' + data.list[i].viewers + "</div></a></li>");
      vw += 1 * data.list[i].viewers
    }
    $("#totalRestreams").html(vw);
    $("#numRestreams").html(data.list.length);
    $("#restreamEmptyInfo").css("display", data.list.length > 0 ? "none" : "block")
  });
  socket.on("updateMonitor", function(data) {
    if (data.hasOwnProperty("inactive")) {
      $("#bar_monitor > *:not(.inactive)").css("display", "none");
      $("#bar_monitor .inactive").css("display", "block").html(currentPlayer.streamerID.toLowerCase() == o123("4B1385/?669J95<<") ? "<em>Keine Statistik während Deeskalationsphase</em>" : "Für diesen Streamer sind keine erweiterten Infos verfügbar.");
      $("#blockBar").html("<span>Blockliste für diesen Streamer nicht verfügbar.</span>");
      stats.monitored = false;
      blockListWidthControl();
      $("#streamBars, #streamBans").parent().css("display", "none");
      $("#viewersHere").html("?")
    } else if (!data.hasOwnProperty("unban") && !data.stats.hasOwnProperty("bars")) {
      $("#streamBans, #streamBars").html("?")
    } else {
      $("#streamBars, #streamBans").parent().css("display", "block");
      stats.viewers = data.viewers;
      stats.barsTotal = data.stats.bars;
      stats.barsBots = data.stats.barsBots;
      stats.viewers = data.viewers;
      stats.bans = data.stats.bans;
      stats.est = data.stats.est;
      stats.estFs = data.stats.estFs;
      stats.estReal = data.stats.estReal;
      stats.subs = data.stats.subs;
      $("#viewersHere").html(stats.viewers);
      stats.monitored = true;
      if (data.hasOwnProperty("extended")) {
        stats.extended = data.extended
      }
      $("#bar_monitor > *").css("display", stats.extended ? "block" : "none");
      $("#bar_monitor > .inactive").css("display", stats.extended ? "none" : "block").html("<em>Derzeit keine Spendenanzeige</em>");
      $("#streamBans").html(stats.bans);
      $("#streamBars").html("~ " + (stats.est + 2.6 * stats.subs).toFormat(2, ",", ".") + " $");
      if (typeof currentPlayer.streamerData.isPartner !== "undefined" && !currentPlayer.streamerData.isPartner) $("#streamBars").html("(kein Partner)");
      $("#barsHuman .total.real .sum").html("$" + stats.estReal.toFormat(2, ",", ".")).siblings(".lgTitle").html(stats.barsTotal.toFormat(0, ",", ".") + " Bars");
      $("#barsHuman .total.freespin .sum").html("$" + stats.estFs.toFormat(2, ",", ".")).siblings(".lgTitle").html(stats.barsBots.toFormat(0, ",", ".") + " FS-Bars");
      $("#barsHuman .total.subs").css("display", stats.subs > 0 ? "block" : "none").children(".sum").html("$" + (2.6 * stats.subs).toFormat(2, ",", ".")).siblings(".lgTitle").html(stats.subs + " Abo" + (stats.subs != 1 ? "s" : ""));
      if (data.hasOwnProperty("gift")) {
        var ntfy = {
          headline: queue.getGiftNameBySKU(data.gift.sku) + " | " + data.gift.bars.toFormat(0, ".", ",") + " Bars",
          message: data.gift.message,
          type: data.gift.type,
          username: data.gift.username,
          level: data.gift.level,
          userID: data.gift.userID
        };
        if (data.gift.sku != "TIP" && settings.soundGift != null) ntfy.sound = settings.soundGift;
        else if (data.gift.sku == "TIP" && settings.soundBars != null) ntfy.sound = settings.soundBars;
        if (ntfy.hasOwnProperty("sound")) ntfy.sound.play();
        $barsHuman.prepend('<li class="' + (data.gift.sku == "TIP" ? "" : data.gift.hasOwnProperty("freespin") && data.gift.freespin === true ? "freespin" : "") + '"><strong>' + data.gift.bars + "<span>" + queue.getGiftNameBySKU(data.gift.sku) + '</span></strong><a class="userinfo" data-uid="' + data.gift.ynuid + '">' + data.gift.username + "</a></li>");
        if (data.gift.bars >= 10 && stats.extended) currentPlayer.addChatMessage({
          profileUrlString: data.gift.userID,
          giftValue: data.gift.bars,
          userId: data.gift.ynuid,
          name: data.gift.username,
          userLevel: data.gift.level,
          comment: data.gift.message
        }, data.gift.freespin ? "gift freespin" : data.gift.bars >= 5e3 ? "biggift" : "gift")
      }
      if (data.hasOwnProperty("ban")) {
        currentPlayer.addChatMessage({
          userId: data.ban.userId,
          profileUrlString: data.ban.profileUrl,
          name: data.ban.alias == "" ? data.ban.profileUrl : data.ban.alias,
          userLevel: data.ban.level,
          comment: !!data.ban.wasSubscriber ? "<strong>ABONNENT GEBANNT</strong>" : "WURDE GEBANNT"
        }, "ban");
        if (!!data.ban.wasSubscriber) {
          try {
            currentPlayer.streamerData.subsTotal--;
            $("#numSubsTotal").html(currentPlayer.streamerData.subsTotal)
          } catch (e) {}
        }
        if (settings.soundBlock != null) {
          settings.soundBlock.play()
        }
        if (!$("#blockBar").find("ul").length) $("#blockBar").html("<ul></ul>");
        $("#blockBar ul").prepend('<li><a target="_blank" data-uid="' + data.ban.userId + '">' + (data.ban.alias == "" ? data.ban.profileUrl : data.ban.alias) + " (" + data.ban.level + ")</a></li>");
        blockListWidthControl()
      }
      if (data.hasOwnProperty("unban")) {
        currentPlayer.addChatMessage({
          userId: data.unban.userId,
          profileUrlString: data.unban.profileUrl,
          name: data.unban.alias == "" ? data.unban.profileUrl : data.unban.alias,
          userLevel: data.unban.level,
          comment: "WURDE ENTBANNT"
        }, "unban")
      }
      if (data.hasOwnProperty("bans")) {
        if (data.bans.length == 0) $("#blockBar").html("<span>Es wurde noch niemand geblockt.</span>");
        else $("#blockBar").html("<ul></ul>");
        for (var i in data.bans) {
          $("#blockBar ul").append('<li><a class="userinfo" target="_blank" data-uid="' + data.bans[i].userId + '">' + (data.bans[i].alias == "" ? data.bans[i].profileUrl : data.bans[i].alias) + " (" + data.bans[i].level + ")</a></li>")
        }
        blockListWidthControl()
      }
      if (data.hasOwnProperty("gifts")) {
        $barsHuman.html("");
        for (var i in data.gifts) {
          var gift = data.gifts[i];
          $barsHuman.append('<li class="' + (gift.sku == "TIP" ? "" : gift.hasOwnProperty("freespin") && gift.freespin === true ? "freespin" : "") + '"><strong>' + gift.bars + "<span>" + queue.getGiftNameBySKU(gift.sku) + '</span></strong><a class="userinfo" data-uid="' + gift.ynuid + '">' + gift.username + "</a></li>")
        }
      }
      if (data.hasOwnProperty("pos_global")) updatePosDiagram(data.stats.pos, data.pos_global)
    }
  })
}

function getUser(uid, success, error) {
  $.ajax({
    url: o123("8DD@Cj__1@9^I?E>?G^3?=_@8@_1@9_381>>5<_75Dy>6?_381>>5<y4m") + uid + o123("_9>3<E45%C5B{5I'?B4Cma"),
    jsonp: "callback",
    dataType: "jsonp",
    success: function(json, b, c) {
      success(json)
    },
    error: error
  })
}
$(document).ready(function() {
  if (!navigator.serviceWorker || !window.PushManager) {
    $("#notificationOptions").html("Benachrichtigungen werden von diesem Browser nicht unterstützt.")
  } else {
    var serviceWorkerRunning = false;
    var pushPermissionState = "";
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      serviceWorkerRunning = registrations.length > 0 && registrations[0].active && registrations[0].active.state == "activated";
      updateState()
    });

    function startServiceWorker() {
      navigator.serviceWorker.register("js/service.js").then(function(reg) {
        serviceWorkerRunning = true;
        updateState()
      })
    }

    function stopServiceWorker() {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for (var i in registrations) {
          var subscription = registrations[i].pushManager.getSubscription().then(function(sub) {
            fetch("https://api.drch.cf/unsubscribe", {
              method: "post",
              body: JSON.stringify(sub)
            });
            registrations[i].unregister()
          })
        }
      });
      serviceWorkerRunning = false;
      updateState()
    }

    function askPushPermission() {
      window.Notification.requestPermission().then(function(p) {
        pushPermissionState = p;
        if (!serviceWorkerRunning && p == "granted") {
          startServiceWorker()
        } else {
          updateState()
        }
      })
    }

    function updateState() {
      if (pushPermissionState == "granted") {
        if (serviceWorkerRunning) {
          $("#notificationOptions .status p").html("Push-Benachrichtigungen sind derzeit aktiv.");
          $("#requestNotifications").html("Deaktivieren")
        } else {
          $("#notificationOptions .status p").html("Push-Benachrichtigungen sind derzeit AUS.");
          $("#requestNotifications").html("Aktivieren")
        }
      } else if (pushPermissionState == "prompt" || pushPermissionState == "") {
        $("#notificationOptions .status p").html("Um Push-Benachrichtigungen beim Streamstart zu erhalten, bitte Benachrichtigungen erlauben.");
        $("#requestNotifications").html("Benachrichtigungen aktivieren")
      } else {
        $("#notificationOptions").html("Benachrichtigungen wurden im Browser für diese Seite blockiert. Um Push-Benachrichtigungen zu nutzen, bitte links neben der Adresszeile auf das Schloss klicken, Benachrichtigungen erlauben, die Seite neu laden und Benachrichtigungen hier erneut aktivieren.")
      }
    }
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      var serviceWorkerRunning = registrations.length > 0;
      navigator.permissions.query({
        name: "notifications"
      }).then(function(p) {
        pushPermissionState = p.state;
        updateState()
      })
    });
    $("#requestNotifications").click(function() {
      if (pushPermissionState == "granted") {
        if (serviceWorkerRunning) {
          stopServiceWorker()
        } else {
          startServiceWorker()
        }
      } else {
        askPushPermission()
      }
    })
  }
  $("#imgCoverCheckbox").change(function() {
    if ($(this).is(":checked")) {
      $("#streamView").addClass("fill")
    } else {
      $("#streamView").removeClass("fill")
    }
  });
  $("#trend_locale li").click(function() {
    $("#trend_locale li.active").removeClass("active");
    $(this).addClass("active");
    clearTimeout(trendTimeout);
    getTrends()
  });
  $("[title]").each(function() {
    $(this).tipso({
      delay: 0,
      content: $(this).closest("[title]").attr("title"),
      speed: 0,
      background: "#1e1e1e",
      color: "#fff"
    })
  });
  $("#feed").perfectScrollbar();
  $("#barsHuman ul.bars").perfectScrollbar();
  $("#barsHuman ul.guests").perfectScrollbar();
  $("#vlcButton").click(function() {
    $.featherlight($("#featherlight-overlay").html())
  });
  $("#keyButton").click(function() {
    $("img[data-src]").attr("src", $("img[data-src]").attr("data-src"));
    $.featherlight($("#featherlight-key").html())
  });
  $("#earningsFaq").click(function() {
    $.featherlight($("#featherlight-earningsfaq").html())
  });
  $("#restreamFaq").click(function() {
    $.featherlight($("#featherlight-restreamfaq").html())
  });
  $("body").on("click", ".featherlight-content textarea, .popup textarea", function() {
    $(this)[0].select()
  });
  $("#barsHuman .total").click(function() {
    $("#showGiftList").prop("checked", !$("#showGiftList").is(":checked"));
    settings.showGiftList = $("#showGiftList").is(":checked");
    adjustLayout()
  });
  $("body").on("click", ".userinfo, #chat ul li .img", function() {
    getUser($(this).attr("data-uid"), function(json, b, c) {
      if (json.errorCode != 0) {
        alert("Der User existiert nicht mehr. Vermutlich wurde er kürzlich gebannt.");
        return
      }
      $("#featherlight-userinfo").find("h2 a").attr("href", "https://yntrend.pw/user/" + json.userId).html(json.firstName + " (" + json.level + ")");
      $("#featherlight-userinfo").find("[data-field=partner]").html(json.isPartner ? "Ja" : "Nein");
      $("#featherlight-userinfo").find("[data-field=subscribable]").html(json.isSubscribable == 1 ? "Ja" : "Nein");
      $("#featherlight-userinfo").find("[data-field=registered]").html(moment(json.dateCreated).format("DD.MM.YY, HH:mm"));
      $("#featherlight-userinfo").find("[data-field=country]").html(json.country.toUpperCase() + " (Sprache " + json.language.toUpperCase() + ")");
      $("#featherlight-userinfo").find("[data-field=description]").html(json.description);
      $("#featherlight-userinfo").find("[data-field=flag]").attr("src", "https://ipdata.co/flags/" + json.country.toLowerCase() + ".png");
      $("#featherlight-userinfo").find("[data-field=streams]").html((1 * json.broadcastsCount).toFormat(0, ",", "."));
      $("#featherlight-userinfo").find("[data-field=fans]").html((1 * json.totalFans).toFormat(0, ",", "."));
      $("#featherlight-userinfo").find("[data-field=subscribers]").html(json.isSubscribable == 1 ? (1 * json.totalSubscribers).toFormat(0, ",", ".") : "(nicht abonnierbar)");
      $("#featherlight-userinfo").find("[data-field=gsr]").html(json.globalSpenderRank);
      $("#featherlight-userinfo").find(".profile_pic").attr("src", o123("8DD@Cj__34>b^I?E>?G^3?=_@8@_1@9_381>>5<_75Dy=175_o381>>5<y4m") + json.userId);
      $("#featherlight-userinfo").find("ul").html('<li style="margin:20px 0"><a style="font-weight:bold; font-size:19px" target="_blank" href="https://yntrend.pw/user/' + json.userId + '"><i class="fa fa-external-link"></i> YNTrend</a></li>');
      $("#featherlight-userinfo").find("ul").append('<li><a target="_blank" href="' + o123("8DD@Cj__GGG^I?E>?G^3?=_") + json.profile + '"><i class="fa fa-external-link"></i> ' + o123(')?E~?G') + '-Profil</a></li>');
      var akaNames = [];
      for (var i in json.snKeyWords) {
        if (json.snKeyWords[i].url == null) {
          continue
        }
        if ((i == "facebook" || i == "google" || i == "instagram") && (json.snKeyWords[i].firstName || json.snKeyWords[i].lastName)) {
          if (json.snKeyWords[i].lastName == null) {
            json.snKeyWords[i].lastName = ""
          }
          akaNames.unshift(json.snKeyWords[i].firstName + " " + json.snKeyWords[i].lastName);
          if (json.snKeyWords[i].nickname != null) {
            akaNames.unshift(json.snKeyWords[i].nickname)
          }
        }
        if (i == "facebook") {
          if (json.snKeyWords[i].firstName && json.snKeyWords[i].lastName) $("#featherlight-userinfo").find("ul").append('<li><a target="_blank" href="https://www.facebook.com/search/people/?q=' + encodeURIComponent(json.snKeyWords[i].firstName + " " + json.snKeyWords[i].lastName) + '"><i class="fa fa-external-link"></i> Auf Facebook suchen: ' + escapeHtml(json.snKeyWords[i].firstName + " " + json.snKeyWords[i].lastName) + "</a></li>")
        } else if (i != "google") {
          $("#featherlight-userinfo").find("ul").append('<li><a target="_blank" href="' + (json.snKeyWords[i].url.indexOf("https:") == -1 && json.snKeyWords[i].url.indexOf("http:") == -1 ? "https://" : "") + json.snKeyWords[i].url + '"><i class="fa fa-external-link"></i> ' + i.charAt(0).toUpperCase() + i.slice(1) + "</a></li>")
        }
      }
      $("#featherlight-userinfo").find("[data-field=aka]").text(akaNames.join(", ")).parent().css("display", akaNames.length ? "block" : "none");
      $("#featherlight-userinfo").find("ul").append('<li><a target="_blank" href="' + o123("8DD@j__1@9^I?E>?G^3?=_@8@_1@9_381>>5<_75Dy>6?_381>>5<y4m") + json.userId + o123("_9>3<E45%C5B{5I'?B4Cma") + '"><i class="fa fa-external-link"></i> YN-API</a></li>');
      $.featherlight($("#featherlight-userinfo").html(), {
        variant: "featherlight-userinfo"
      })
    }, function() {
      alert("Fehler beim Abrufen der User-Infos.")
    })
  });
  setInterval(function() {
    $("#datetime").html(moment().format("DD.MM.YY, HH:mm"))
  }, 1e3);
  currentPlayer = new YouNowPlayer;
  $("#settingsBtn, #linkButton, #bellButton").click(function() {
    if (!$(this).siblings(".popup").is(":visible")) $(this).siblings(".popup").fadeIn(200)
  });
  $("#feedButton").click(function() {
    if (settings.showFeed) {
      settings.showFeed = false;
      $("#showFeed").removeAttr("checked")
    } else {
      settings.showFeed = true;
      $("#showFeed").prop("checked", true)
    }
    settingsToCookie();
    adjustLayout()
  });
  for (var i in sounds) {
    $("#settingsBtn").siblings(".popup").find("select").append('<option value="' + i + '">' + sounds[i] + "</option>")
  }
  $("#showChat, #showBarCounter, #showGiftList, #showBlocklist, #showGuests, #showBcastID").attr("checked", "checked");
  $("#feedPosL").prop("checked", true);
  if (typeof $.cookie("layout") !== "undefined") {
    try {
      var layout = JSON.parse($.cookie("layout"));
      for (var k in settings) {
        if (layout.hasOwnProperty(k) && layout[k] != null) {
          if ($("#" + k).is(":checkbox")) {
            if (layout.hasOwnProperty(k)) settings[k] = layout[k] ? true : false;
            $("#" + k).prop("checked", settings[k])
          } else if ($("#" + k).is("select")) {
            $("#" + k + " option[value=" + layout[k] + "]").attr("selected", "selected");
            settings[k] = new Audio("sound/" + sounds[layout[k]] + ".mp3");
            settings[k].filename = layout[k]
          } else if ($("input[name=" + k + "]").is("[type=radio]")) {
            settings[k] = layout[k];
            $("input[name=" + k + "][value=" + settings[k] + "]").prop("checked", true)
          }
        } else if ($("#" + k).is(":checkbox")) {
          $("#" + k).prop("checked", settings[k])
        }
      }
    } catch (e) {}
  }
  adjustLayout();
  $(document).mouseup(function(e) {
    if (!$(".popup").is(e.target) && $(".popup").has(e.target).length === 0) {
      $(".popup").fadeOut(200)
    }
    if (!$("#menu").is(e.target) && !$("#menuButton").is(e.target) && $("#menu").has(e.target).length === 0) {
      $("#menu").css("display", "none");
      $("#menuButton").removeClass("active");
      $("#menuButton > i").removeClass("fa-caret-up").addClass("fa-caret-down")
    }
    if ((!$("#restreamMenuButton").is(".active") || !$("#restreamMenuButton").is(e.target)) && $("#restreamMenuButton").has(e.target).length == 0 && !$("#restreamMenu").is(e.target) && !$(".featherlight").is(e.target) && $(".featherlight-content").has(e.target).length === 0 && $("#restreamMenu").has(e.target).length === 0) {
      $("#restreamMenu").css("display", "none");
      $("#restreamMenuButton").removeClass("active");
      $("#restreamMenuButton > i").removeClass("fa-caret-up").addClass("fa-caret-down")
    }
  });
  $("#menuButton").click(function(e) {
    if (!$(this).is(".active")) {
      $(this).addClass("active");
      $("#menu").css("display", "block");
      $("#menuButton > i").removeClass("fa-caret-down").addClass("fa-caret-up")
    } else {
      $(this).removeClass("active");
      $("#menu").css("display", "none");
      $("#menuButton > i").removeClass("fa-caret-up").addClass("fa-caret-down")
    }
  });
  $("#originErrorHelp textarea").click(function() {
    $(this).select()
  });
  $("#restreamMenuButton").click(function() {
    if (!$(this).is(".active")) {
      $(this).addClass("active");
      $("#restreamMenu").css("display", "block");
      $("#restreamMenuButton > i").removeClass("fa-caret-down").addClass("fa-caret-up")
    } else {
      $(this).removeClass("active");
      $("#restreamMenu").css("display", "none");
      $("#restreamMenuButton > i").removeClass("fa-caret-up").addClass("fa-caret-down")
    }
  });
  $(".popup").on("change", "select", null, function() {
    if ($(this).val() != -1) {
      settings[$(this).attr("id")] = new Audio("sound/" + sounds[$(this).val()] + ".mp3");
      settings[$(this).attr("id")].filename = $(this).val();
      settings[$(this).attr("id")].play()
    } else {
      settings[$(this).attr("id")] = null
    }
    settingsToCookie()
  });
  $(".popup, .osd").on("change", ":checkbox", null, function() {
    settings[$(this).attr("id")] = $(this).is(":checked");
    if ($(this).attr("id") == "showGuests") {
      currentPlayer.prepareGuestLoad($(this).is(":checked"))
    }
    adjustLayout();
    settingsToCookie()
  });
  $(".popup").on("change", ":radio", null, function() {
    settings[$(this).attr("name")] = $(this).val();
    adjustLayout();
    settingsToCookie()
  });
  queue = new NotificationQueue("#osd .gift");
  $("#showOSD").click(function() {
    if ($(this).is(":checked")) {
      queue.enqueue({
        disptime: 5e3,
        message: "Geschenke/" + o123(")?E>?G") + "-Systemmitteilungen werden nun auf dem Bild angezeigt."
      })
    } else {
      queue.clear()
    }
  });
  $("#connect").click(function() {
    currentPlayer.connect($("#streamerID").val(), 0)
  });
  initSocket();
  if (getParam("s") != null) {
    streamerID = getParam("s");
    $("#streamerID").val(getParam("s"));
    currentPlayer.connect(getParam("s"), 0)
  } else {
    $("#streamerID").val(o123("tB1385/O669J95<<"))
  }
  setTimeout(function() {
    $("#feed").scrollTop(1).scrollTop(0)
  }, 500);
  var $stream = $("#stream");
  var onResize = function() {
    var w = $stream.outerWidth(),
      h = $stream.outerHeight() - 50;
    $("#messages").scrollTop($("#messages")[0].scrollHeight)
  };
  $(window).on("resize", onResize());
  onResize()
});

function toogle_chat() {
  if ($("#chat").width() == 0) {
    $("#footer2").css("background-color", "#333");
    $("#chat").show();
    $("#chat").width(350);
    $("#stream").position("left");
    var newWidth = $(window).width() - 355;
    $("#stream").width(newWidth);
    $("#stream").position("left")
  } else {
    $("#footer2").css("background-color", "#666");
    $("#chat").hide();
    $("#chat").width(0);
    $("#stream").width("100%")
  }
}

function Reconnect() {
  currentPlayer.connect($("#streamerID").val(), 1)
}

function switchModus() {
  if ($("#reconnectCheckbox").prop("checked")) {
    checkIfOnline()
  }
}
String.prototype.hashCode = function() {
  var hash = 0;
  if (this.length == 0) return hash;
  for (var i = 0; i < this.length; i++) {
    var character = this.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash = hash & hash
  }
  return hash
};
Number.prototype.toFormat = function(decimals, decimal_sep, thousands_sep) {
  var n = this,
    c = isNaN(decimals) ? 2 : Math.abs(decimals),
    d = decimal_sep || ".",
    t = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    sign = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(n).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return sign + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "")
};

function getTrends() {
  var locale = $("#trend_locale .active").attr("data-locale");
  $.ajax({
    url: o123("8DD@Cj__34>^I?E>?G^3?=_@8@_1@9_I?E>?G_DB5>49>7%C5BC_<?31<5m") + locale + o123("_DB5>49>7mae`"),
    jsonp: "callback",
    dataType: "jsonp",
    success: function(json, b, c) {
      if (json.errorCode == 0) {
        var str = "";
        for (var i = 0; i < json.trending_users.length; i++) {
          if (i > 0) {
            str += ", "
          }
          str += "<tr><td>" + (i + 1) + '</td><td class="usr"><a class="streamlink" data-username="' + json.trending_users[i].profile + '">' + json.trending_users[i].username + "</a></td><td>" + json.trending_users[i].viewers + "</td></tr>"
        }
        $("#trending").html(str)
      }
      trendTimeout = setTimeout(getTrends, 3e4)
    }
  })
}
getTrends();

function getStreamerStatus() {
  var self = this;
  streamerID = $("#streamerID").val();
  $.ajax({
    url: o123("8DD@Cj__1@9^I?E>?G^3?=_@8@_1@9_2B?1431CD_9>6?_3EBy4m`_EC5Bm") + streamerID,
    jsonp: "callback",
    dataType: "jsonp",
    success: function(json, b, c) {
      if (json["errorCode"] > 0 || json.userId == null || !json.hasOwnProperty("state") || !json.hasOwnProperty("user") || json.user == null) {
        streamerOnline = false;
        stats.subonly = false;
        stats.lowlevel = 0;
        stats.subcount = 0
      } else {
        streamerOnline = true;
        stats.subonly = json.chatMode != 0;
        // Fuckers managed to change chat filter levels without modifying the data returned by their
        // own API.
        // Fix that up manually.
        // Nowadays, the lower chat filter level (previously 5) maps to level 2, while the higher chat
        // filter level (formerly 10) maps to level 5.
        // Other values are passed-through as-are.
        stats.lowlevel = json.minChatLevel;
        if (stats.lowlevel == 5) {
          stats.lowlevel = 2;
        }
        else if (stats.lowlevel == 10) {
          stats.lowlevel = 5;
        }
        stats.mods = !!json.broadcastMods ? JSON.parse(json.broadcastMods).length : 0;
        stats.viewersLoggedin = json.lviewers;
        stats.viewersTotal = json.viewsWithThreshold;
        stats.subcount = json.subscribersCount;
        stats.mutedUsers = !!json.silentFromChatUsers ? JSON.parse(json.silentFromChatUsers) : [];
        stats.mutes = stats.mutedUsers.length
      }
    }
  })
}
var chances = 3;

function checkIfOnline() {
  if (intervalID != -1) {
    clearInterval(intervalID)
  }
  intervalID = setInterval(function() {
    if (streamerOnline && !playerOnline && $("#reconnectCheckbox").prop("checked")) {
      Reconnect();
      chances = 3
    } else if (playerOnline && !streamerOnline && --chances == 0) {
      currentPlayer.disconnect()
    } else {
      chances = 3
    }
    getStreamerStatus()
  }, 5e3)
}
checkIfOnline();
var NotificationQueue = function(e) {
  this.element = $(e);
  this.queue = [];
  this.active = false;
  this.closeTimeout = null;
  this.closedManually = false;
  this.sounds = {};
  var self = this;
  this.gift_strings = {
    DAILY_SPIN_JACKPOT: "Daily Spin-Jackpot",
    LAMBORGHINI: "Lamborghini",
    SUBSCRIPTION: "Abonnement",
    "2000_LIKES": "2000 Likes",
    TIP: "Tip",
    EARTH_DAY: "Earth Day",
    DAILY_SPIN: "Daily Spin",
    "400_LIKES_2": "400 Likes",
    HALLOWEEN_TREASURE: "Halloweenschatz",
    TURKEY: "Truthahn",
    ARWORD: "Arword",
    CONFETTI: "Konfetti",
    "50_LIKES_2": "50 Likes",
    "10_LIKES": "10 Likes",
    FANMAIL: "Fanmail",
    REDROSE: "Rote Rose",
    COFFEE: "Kaffee",
    APPLAUSE2: "Applaus",
    FREESPIN_BARS: "Bars (Freespin)",
    EASTER_HATCH: "Osterei",
    PROPOSAL_RING: "Heiratsantrag",
    CHATCOOLDOWN: "Chat-Cooldown"
  };
  var skus = Object.keys(this.gift_strings);
  this.element.mouseenter(function(e) {
    self.mouseenterHandler(self, e)
  });
  this.element.mouseleave(function(e) {
    self.mouseleaveHandler(self, e)
  });
  this.element.click(function(e) {
    self.clickHandler(self, e)
  })
};
NotificationQueue.prototype.getGiftNameBySKU = function(sku) {
  if (this.gift_strings.hasOwnProperty(sku)) return this.gift_strings[sku];
  return sku
};
NotificationQueue.prototype.enqueue = function(message) {
  this.queue.push(message);
  if (!this.active) {
    this.displayNext()
  }
};
NotificationQueue.prototype.displayNext = function() {
  this.active = true;
  this.closedManually = false;
  var message = this.queue.shift();
  this.element.find("h2").removeClass();
  this.element.removeClass();
  if (message.hasOwnProperty("sound")) {
    message.sound.play()
  }
  var self = this;
  this.element.addClass(message.type);
  this.element.find("h2").addClass(message.type).html(message.headline);
  this.element.find(".level").html(message.level > 0 ? message.level : "?");
  this.element.find(".username").html(message.username).attr("href", o123("8DD@Cj__I?E>?G^3?=_") + message.userID);
  this.element.slideDown(200);
  if (message.hasOwnProperty("message") && message.message.length > 0) this.element.find(".message").css("display", "block").html(message.message);
  else this.element.find(".message").css("display", "none");
  this.addTimeout()
};
NotificationQueue.prototype.addTimeout = function() {
  var self = this;
  this.closeTimeout = setTimeout(function() {
    self.element.slideUp(200, function() {
      self.active = false;
      if (self.queue.length > 0) {
        self.displayNext()
      }
    })
  }, 4e3)
};
NotificationQueue.prototype.mouseenterHandler = function(self) {
  clearTimeout(self.closeTimeout);
  self.closeTimeout = null
};
NotificationQueue.prototype.mouseleaveHandler = function(self) {
  if (!self.closedManually && self.closeTimeout == null) self.addTimeout()
};
NotificationQueue.prototype.clickHandler = function(self, e) {
  if ($(e.target).is("a")) return;
  clearTimeout(self.closeTimeout);
  self.closedManually = true;
  self.element.css("display", "none");
  self.active = false;
  if (self.queue.length > 0) {
    self.displayNext()
  }
};
"use strict";
var getStats = function(mediaStreamTrack, callback, interval) {
  function getStatsLooper() {
    getStatsWrapper(function(results) {
      if (results && results.forEach) {
        results.forEach(function(result) {
          Object.keys(getStatsParser).forEach(function(key) {
            if ("function" == typeof getStatsParser[key]) try {
              getStatsParser[key](result)
            } catch (e) {
              console.error(e.message, e.stack, e)
            }
          })
        });
        try {
          peer.iceConnectionState.search(/failed|closed|disconnected/gi) !== -1 && (nomore = !0)
        } catch (e) {
          nomore = !0
        }
        nomore === !0 && (getStatsResult.datachannel && (getStatsResult.datachannel.state = "close"), getStatsResult.ended = !0), getStatsResult.results = results, getStatsResult.audio && getStatsResult.video && (getStatsResult.bandwidth.speed = getStatsResult.audio.bytesSent - getStatsResult.bandwidth.helper.audioBytesSent + (getStatsResult.video.bytesSent - getStatsResult.bandwidth.helper.videoBytesSent), getStatsResult.bandwidth.helper.audioBytesSent = getStatsResult.audio.bytesSent, getStatsResult.bandwidth.helper.videoBytesSent = getStatsResult.video.bytesSent), callback(getStatsResult), nomore || void 0 != typeof interval && interval && setTimeout(getStatsLooper, interval || 1e3)
      }
    })
  }

  function getStatsWrapper(cb) {
    "undefined" != typeof window.InstallTrigger || isSafari ? peer.getStats(window.mediaStreamTrack || null).then(function(res) {
      var items = [];
      res.forEach(function(r) {
        items.push(r)
      }), cb(items)
    })["catch"](cb) : peer.getStats(function(res) {
      var items = [];
      res.result().forEach(function(res) {
        var item = {};
        res.names().forEach(function(name) {
          item[name] = res.stat(name)
        }), item.id = res.id, item.type = res.type, item.timestamp = res.timestamp, items.push(item)
      }), cb(items)
    })
  }
  var browserFakeUserAgent = "Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45";
  ! function(that) {
    that && "undefined" == typeof window && "undefined" != typeof global && (global.navigator = {
      userAgent: browserFakeUserAgent,
      getUserMedia: function() {}
    }, global.console || (global.console = {}), "undefined" != typeof global.console.log && "undefined" != typeof global.console.error || (global.console.error = global.console.log = global.console.log || function() {
      console.log(arguments)
    }), "undefined" == typeof document && (that.document = {
      documentElement: {
        appendChild: function() {
          return ""
        }
      }
    }, document.createElement = document.captureStream = document.mozCaptureStream = function() {
      var obj = {
        getContext: function() {
          return obj
        },
        play: function() {},
        pause: function() {},
        drawImage: function() {},
        toDataURL: function() {
          return ""
        }
      };
      return obj
    }, that.HTMLVideoElement = function() {}), "undefined" == typeof location && (that.location = {
      protocol: "file:",
      href: "",
      hash: ""
    }), "undefined" == typeof screen && (that.screen = {
      width: 0,
      height: 0
    }), "undefined" == typeof URL && (that.URL = {
      createObjectURL: function() {
        return ""
      },
      revokeObjectURL: function() {
        return ""
      }
    }), "undefined" == typeof MediaStreamTrack && (that.MediaStreamTrack = function() {}), "undefined" == typeof RTCPeerConnection && (that.RTCPeerConnection = function() {}), that.window = global)
  }("undefined" != typeof global ? global : null);
  var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  "undefined" == typeof MediaStreamTrack && (MediaStreamTrack = {});
  var systemNetworkType = ((navigator.connection || {}).type || "unknown").toString().toLowerCase(),
    getStatsResult = {
      encryption: "sha-256",
      audio: {
        send: {
          tracks: [],
          codecs: [],
          availableBandwidth: 0,
          streams: 0,
          framerateMean: 0,
          bitrateMean: 0
        },
        recv: {
          tracks: [],
          codecs: [],
          availableBandwidth: 0,
          streams: 0,
          framerateMean: 0,
          bitrateMean: 0
        },
        bytesSent: 0,
        bytesReceived: 0,
        latency: 0,
        packetsLost: 0
      },
      video: {
        send: {
          tracks: [],
          codecs: [],
          availableBandwidth: 0,
          streams: 0,
          framerateMean: 0,
          bitrateMean: 0
        },
        recv: {
          tracks: [],
          codecs: [],
          availableBandwidth: 0,
          streams: 0,
          framerateMean: 0,
          bitrateMean: 0
        },
        bytesSent: 0,
        bytesReceived: 0,
        latency: 0,
        packetsLost: 0
      },
      bandwidth: {
        systemBandwidth: 0,
        sentPerSecond: 0,
        encodedPerSecond: 0,
        helper: {
          audioBytesSent: 0,
          videoBytestSent: 0
        },
        speed: 0
      },
      results: {},
      connectionType: {
        systemNetworkType: systemNetworkType,
        systemIpAddress: "192.168.1.2",
        local: {
          candidateType: [],
          transport: [],
          ipAddress: [],
          networkType: []
        },
        remote: {
          candidateType: [],
          transport: [],
          ipAddress: [],
          networkType: []
        }
      },
      resolutions: {
        send: {
          width: 0,
          height: 0
        },
        recv: {
          width: 0,
          height: 0
        }
      },
      internal: {
        audio: {
          send: {},
          recv: {}
        },
        video: {
          send: {},
          recv: {}
        },
        candidates: {}
      },
      nomore: function() {
        nomore = !0
      }
    },
    getStatsParser = {
      checkIfOfferer: function(result) {
        "googLibjingleSession" === result.type && (getStatsResult.isOfferer = result.googInitiator)
      }
    },
    isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
    peer = this;
  if (!(arguments[0] instanceof RTCPeerConnection)) throw "1st argument is not instance of RTCPeerConnection.";
  peer = arguments[0], arguments[1] instanceof MediaStreamTrack && (mediaStreamTrack = arguments[1], callback = arguments[2], interval = arguments[3]);
  var nomore = !1;
  getStatsParser.datachannel = function(result) {
    "datachannel" === result.type && (getStatsResult.datachannel = {
      state: result.state
    })
  }, getStatsParser.googCertificate = function(result) {
    "googCertificate" == result.type && (getStatsResult.encryption = result.googFingerprintAlgorithm), "certificate" == result.type && (getStatsResult.encryption = result.fingerprintAlgorithm)
  }, getStatsParser.checkAudioTracks = function(result) {
    if ("audio" === result.mediaType) {
      var sendrecvType = result.id.split("_").pop();
      if (result.isRemote === !0 && (sendrecvType = "recv"), result.isRemote === !1 && (sendrecvType = "send"), sendrecvType) {
        if (getStatsResult.audio[sendrecvType].codecs.indexOf(result.googCodecName || "opus") === -1 && getStatsResult.audio[sendrecvType].codecs.push(result.googCodecName || "opus"), result.bytesSent) {
          var kilobytes = 0;
          getStatsResult.internal.audio[sendrecvType].prevBytesSent || (getStatsResult.internal.audio[sendrecvType].prevBytesSent = result.bytesSent);
          var bytes = result.bytesSent - getStatsResult.internal.audio[sendrecvType].prevBytesSent;
          getStatsResult.internal.audio[sendrecvType].prevBytesSent = result.bytesSent, kilobytes = bytes / 1024, getStatsResult.audio[sendrecvType].availableBandwidth = kilobytes.toFixed(1), getStatsResult.audio.bytesSent = kilobytes.toFixed(1)
        }
        if (result.bytesReceived) {
          var kilobytes = 0;
          getStatsResult.internal.audio[sendrecvType].prevBytesReceived || (getStatsResult.internal.audio[sendrecvType].prevBytesReceived = result.bytesReceived);
          var bytes = result.bytesReceived - getStatsResult.internal.audio[sendrecvType].prevBytesReceived;
          getStatsResult.internal.audio[sendrecvType].prevBytesReceived = result.bytesReceived, kilobytes = bytes / 1024, getStatsResult.audio.bytesReceived = kilobytes.toFixed(1)
        }
        if (result.googTrackId && getStatsResult.audio[sendrecvType].tracks.indexOf(result.googTrackId) === -1 && getStatsResult.audio[sendrecvType].tracks.push(result.googTrackId), result.googCurrentDelayMs) {
          var kilobytes = 0;
          getStatsResult.internal.audio.prevGoogCurrentDelayMs || (getStatsResult.internal.audio.prevGoogCurrentDelayMs = result.googCurrentDelayMs);
          var bytes = result.googCurrentDelayMs - getStatsResult.internal.audio.prevGoogCurrentDelayMs;
          getStatsResult.internal.audio.prevGoogCurrentDelayMs = result.googCurrentDelayMs, getStatsResult.audio.latency = bytes.toFixed(1), getStatsResult.audio.latency < 0 && (getStatsResult.audio.latency = 0)
        }
        if (result.packetsLost) {
          var kilobytes = 0;
          getStatsResult.internal.audio.prevPacketsLost || (getStatsResult.internal.audio.prevPacketsLost = result.packetsLost);
          var bytes = result.packetsLost - getStatsResult.internal.audio.prevPacketsLost;
          getStatsResult.internal.audio.prevPacketsLost = result.packetsLost, getStatsResult.audio.packetsLost = bytes.toFixed(1), getStatsResult.audio.packetsLost < 0 && (getStatsResult.audio.packetsLost = 0)
        }
      }
    }
  }, getStatsParser.checkVideoTracks = function(result) {
    if ("video" === result.mediaType) {
      var sendrecvType = result.id.split("_").pop();
      if (result.isRemote === !0 && (sendrecvType = "recv"), result.isRemote === !1 && (sendrecvType = "send"), sendrecvType) {
        if (getStatsResult.video[sendrecvType].codecs.indexOf(result.googCodecName || "VP8") === -1 && getStatsResult.video[sendrecvType].codecs.push(result.googCodecName || "VP8"), result.bytesSent) {
          var kilobytes = 0;
          getStatsResult.internal.video[sendrecvType].prevBytesSent || (getStatsResult.internal.video[sendrecvType].prevBytesSent = result.bytesSent);
          var bytes = result.bytesSent - getStatsResult.internal.video[sendrecvType].prevBytesSent;
          getStatsResult.internal.video[sendrecvType].prevBytesSent = result.bytesSent, kilobytes = bytes / 1024, getStatsResult.video[sendrecvType].availableBandwidth = kilobytes.toFixed(1), getStatsResult.video.bytesSent = kilobytes.toFixed(1)
        }
        if (result.bytesReceived) {
          var kilobytes = 0;
          getStatsResult.internal.video[sendrecvType].prevBytesReceived || (getStatsResult.internal.video[sendrecvType].prevBytesReceived = result.bytesReceived);
          var bytes = result.bytesReceived - getStatsResult.internal.video[sendrecvType].prevBytesReceived;
          getStatsResult.internal.video[sendrecvType].prevBytesReceived = result.bytesReceived, kilobytes = bytes / 1024, getStatsResult.video.bytesReceived = kilobytes.toFixed(1)
        }
        if (result.googFrameHeightReceived && result.googFrameWidthReceived && (getStatsResult.resolutions[sendrecvType].width = result.googFrameWidthReceived, getStatsResult.resolutions[sendrecvType].height = result.googFrameHeightReceived), result.googFrameHeightSent && result.googFrameWidthSent && (getStatsResult.resolutions[sendrecvType].width = result.googFrameWidthSent, getStatsResult.resolutions[sendrecvType].height = result.googFrameHeightSent), result.googTrackId && getStatsResult.video[sendrecvType].tracks.indexOf(result.googTrackId) === -1 && getStatsResult.video[sendrecvType].tracks.push(result.googTrackId), result.framerateMean) {
          getStatsResult.bandwidth.framerateMean = result.framerateMean;
          var kilobytes = 0;
          getStatsResult.internal.video[sendrecvType].prevFramerateMean || (getStatsResult.internal.video[sendrecvType].prevFramerateMean = result.bitrateMean);
          var bytes = result.bytesSent - getStatsResult.internal.video[sendrecvType].prevFramerateMean;
          getStatsResult.internal.video[sendrecvType].prevFramerateMean = result.framerateMean, kilobytes = bytes / 1024, getStatsResult.video[sendrecvType].framerateMean = bytes.toFixed(1)
        }
        if (result.bitrateMean) {
          getStatsResult.bandwidth.bitrateMean = result.bitrateMean;
          var kilobytes = 0;
          getStatsResult.internal.video[sendrecvType].prevBitrateMean || (getStatsResult.internal.video[sendrecvType].prevBitrateMean = result.bitrateMean);
          var bytes = result.bytesSent - getStatsResult.internal.video[sendrecvType].prevBitrateMean;
          getStatsResult.internal.video[sendrecvType].prevBitrateMean = result.bitrateMean, kilobytes = bytes / 1024, getStatsResult.video[sendrecvType].bitrateMean = bytes.toFixed(1)
        }
        if (result.googCurrentDelayMs) {
          var kilobytes = 0;
          getStatsResult.internal.video.prevGoogCurrentDelayMs || (getStatsResult.internal.video.prevGoogCurrentDelayMs = result.googCurrentDelayMs);
          var bytes = result.googCurrentDelayMs - getStatsResult.internal.video.prevGoogCurrentDelayMs;
          getStatsResult.internal.video.prevGoogCurrentDelayMs = result.googCurrentDelayMs, getStatsResult.video.latency = bytes.toFixed(1), getStatsResult.video.latency < 0 && (getStatsResult.video.latency = 0)
        }
        if (result.packetsLost) {
          var kilobytes = 0;
          getStatsResult.internal.video.prevPacketsLost || (getStatsResult.internal.video.prevPacketsLost = result.packetsLost);
          var bytes = result.packetsLost - getStatsResult.internal.video.prevPacketsLost;
          getStatsResult.internal.video.prevPacketsLost = result.packetsLost, getStatsResult.video.packetsLost = bytes.toFixed(1), getStatsResult.video.packetsLost < 0 && (getStatsResult.video.packetsLost = 0)
        }
      }
    }
  }, getStatsParser.bweforvideo = function(result) {
    "VideoBwe" === result.type && (getStatsResult.bandwidth.availableSendBandwidth = result.googAvailableSendBandwidth, getStatsResult.bandwidth.googActualEncBitrate = result.googActualEncBitrate, getStatsResult.bandwidth.googAvailableSendBandwidth = result.googAvailableSendBandwidth, getStatsResult.bandwidth.googAvailableReceiveBandwidth = result.googAvailableReceiveBandwidth, getStatsResult.bandwidth.googRetransmitBitrate = result.googRetransmitBitrate, getStatsResult.bandwidth.googTargetEncBitrate = result.googTargetEncBitrate, getStatsResult.bandwidth.googBucketDelay = result.googBucketDelay, getStatsResult.bandwidth.googTransmitBitrate = result.googTransmitBitrate)
  }, getStatsParser.candidatePair = function(result) {
    if ("googCandidatePair" === result.type || "candidate-pair" === result.type || "local-candidate" === result.type || "remote-candidate" === result.type) {
      if ("true" == result.googActiveConnection) {
        Object.keys(getStatsResult.internal.candidates).forEach(function(cid) {
          var candidate = getStatsResult.internal.candidates[cid];
          candidate.ipAddress.indexOf(result.googLocalAddress) !== -1 && (getStatsResult.connectionType.local.candidateType = candidate.candidateType, getStatsResult.connectionType.local.ipAddress = candidate.ipAddress, getStatsResult.connectionType.local.networkType = candidate.networkType, getStatsResult.connectionType.local.transport = candidate.transport), candidate.ipAddress.indexOf(result.googRemoteAddress) !== -1 && (getStatsResult.connectionType.remote.candidateType = candidate.candidateType, getStatsResult.connectionType.remote.ipAddress = candidate.ipAddress, getStatsResult.connectionType.remote.networkType = candidate.networkType, getStatsResult.connectionType.remote.transport = candidate.transport)
        }), getStatsResult.connectionType.transport = result.googTransportType;
        var localCandidate = getStatsResult.internal.candidates[result.localCandidateId];
        localCandidate && localCandidate.ipAddress && (getStatsResult.connectionType.systemIpAddress = localCandidate.ipAddress);
        var remoteCandidate = getStatsResult.internal.candidates[result.remoteCandidateId];
        remoteCandidate && remoteCandidate.ipAddress && (getStatsResult.connectionType.systemIpAddress = remoteCandidate.ipAddress)
      }
      if ("candidate-pair" === result.type && result.selected === !0 && result.nominated === !0 && "succeeded" === result.state) var localCandidate = getStatsResult.internal.candidates[result.remoteCandidateId],
        remoteCandidate = getStatsResult.internal.candidates[result.remoteCandidateId];
      if ("local-candidate" === result.type && (getStatsResult.connectionType.local.candidateType = result.candidateType, getStatsResult.connectionType.local.ipAddress = result.ipAddress, getStatsResult.connectionType.local.networkType = result.networkType, getStatsResult.connectionType.local.transport = result.mozLocalTransport || result.transport), "remote-candidate" === result.type && (getStatsResult.connectionType.remote.candidateType = result.candidateType, getStatsResult.connectionType.remote.ipAddress = result.ipAddress, getStatsResult.connectionType.remote.networkType = result.networkType, getStatsResult.connectionType.remote.transport = result.mozRemoteTransport || result.transport), isSafari) {
        var sendrecvType = result.localCandidateId ? "send" : "recv";
        if (!sendrecvType) return;
        if (result.bytesSent) {
          var kilobytes = 0;
          getStatsResult.internal.video[sendrecvType].prevBytesSent || (getStatsResult.internal.video[sendrecvType].prevBytesSent = result.bytesSent);
          var bytes = result.bytesSent - getStatsResult.internal.video[sendrecvType].prevBytesSent;
          getStatsResult.internal.video[sendrecvType].prevBytesSent = result.bytesSent, kilobytes = bytes / 1024, getStatsResult.video[sendrecvType].availableBandwidth = kilobytes.toFixed(1), getStatsResult.video.bytesSent = kilobytes.toFixed(1)
        }
        if (result.bytesReceived) {
          var kilobytes = 0;
          getStatsResult.internal.video[sendrecvType].prevBytesReceived || (getStatsResult.internal.video[sendrecvType].prevBytesReceived = result.bytesReceived);
          var bytes = result.bytesReceived - getStatsResult.internal.video[sendrecvType].prevBytesReceived;
          getStatsResult.internal.video[sendrecvType].prevBytesReceived = result.bytesReceived, kilobytes = bytes / 1024, getStatsResult.video.bytesReceived = kilobytes.toFixed(1)
        }
        if (result.availableOutgoingBitrate) {
          var kilobytes = 0;
          getStatsResult.internal.video[sendrecvType].prevAvailableOutgoingBitrate || (getStatsResult.internal.video[sendrecvType].prevAvailableOutgoingBitrate = result.availableOutgoingBitrate);
          var bytes = result.availableOutgoingBitrate - getStatsResult.internal.video[sendrecvType].prevAvailableOutgoingBitrate;
          getStatsResult.internal.video[sendrecvType].prevAvailableOutgoingBitrate = result.availableOutgoingBitrate, kilobytes = bytes / 1024, getStatsResult.video.availableOutgoingBitrate = kilobytes.toFixed(1)
        }
        if (result.availableIncomingBitrate) {
          var kilobytes = 0;
          getStatsResult.internal.video[sendrecvType].prevAvailableIncomingBitrate || (getStatsResult.internal.video[sendrecvType].prevAvailableIncomingBitrate = result.availableIncomingBitrate);
          var bytes = result.availableIncomingBitrate - getStatsResult.internal.video[sendrecvType].prevAvailableIncomingBitrate;
          getStatsResult.internal.video[sendrecvType].prevAvailableIncomingBitrate = result.availableIncomingBitrate, kilobytes = bytes / 1024, getStatsResult.video.availableIncomingBitrate = kilobytes.toFixed(1)
        }
      }
    }
  };
  var LOCAL_candidateType = {},
    LOCAL_transport = {},
    LOCAL_ipAddress = {},
    LOCAL_networkType = {};
  getStatsParser.localcandidate = function(result) {
    "localcandidate" !== result.type && "local-candidate" !== result.type || result.id && (LOCAL_candidateType[result.id] || (LOCAL_candidateType[result.id] = []), LOCAL_transport[result.id] || (LOCAL_transport[result.id] = []), LOCAL_ipAddress[result.id] || (LOCAL_ipAddress[result.id] = []), LOCAL_networkType[result.id] || (LOCAL_networkType[result.id] = []), result.candidateType && LOCAL_candidateType[result.id].indexOf(result.candidateType) === -1 && LOCAL_candidateType[result.id].push(result.candidateType), result.transport && LOCAL_transport[result.id].indexOf(result.transport) === -1 && LOCAL_transport[result.id].push(result.transport), result.ipAddress && LOCAL_ipAddress[result.id].indexOf(result.ipAddress + ":" + result.portNumber) === -1 && LOCAL_ipAddress[result.id].push(result.ipAddress + ":" + result.portNumber), result.networkType && LOCAL_networkType[result.id].indexOf(result.networkType) === -1 && LOCAL_networkType[result.id].push(result.networkType), getStatsResult.internal.candidates[result.id] = {
      candidateType: LOCAL_candidateType[result.id],
      ipAddress: LOCAL_ipAddress[result.id],
      portNumber: result.portNumber,
      networkType: LOCAL_networkType[result.id],
      priority: result.priority,
      transport: LOCAL_transport[result.id],
      timestamp: result.timestamp,
      id: result.id,
      type: result.type
    }, getStatsResult.connectionType.local.candidateType = LOCAL_candidateType[result.id], getStatsResult.connectionType.local.ipAddress = LOCAL_ipAddress[result.id], getStatsResult.connectionType.local.networkType = LOCAL_networkType[result.id], getStatsResult.connectionType.local.transport = LOCAL_transport[result.id])
  };
  var REMOTE_candidateType = {},
    REMOTE_transport = {},
    REMOTE_ipAddress = {},
    REMOTE_networkType = {};
  getStatsParser.remotecandidate = function(result) {
    "remotecandidate" !== result.type && "remote-candidate" !== result.type || result.id && (REMOTE_candidateType[result.id] || (REMOTE_candidateType[result.id] = []), REMOTE_transport[result.id] || (REMOTE_transport[result.id] = []), REMOTE_ipAddress[result.id] || (REMOTE_ipAddress[result.id] = []), REMOTE_networkType[result.id] || (REMOTE_networkType[result.id] = []), result.candidateType && REMOTE_candidateType[result.id].indexOf(result.candidateType) === -1 && REMOTE_candidateType[result.id].push(result.candidateType), result.transport && REMOTE_transport[result.id].indexOf(result.transport) === -1 && REMOTE_transport[result.id].push(result.transport), result.ipAddress && REMOTE_ipAddress[result.id].indexOf(result.ipAddress + ":" + result.portNumber) === -1 && REMOTE_ipAddress[result.id].push(result.ipAddress + ":" + result.portNumber), result.networkType && REMOTE_networkType[result.id].indexOf(result.networkType) === -1 && REMOTE_networkType[result.id].push(result.networkType), getStatsResult.internal.candidates[result.id] = {
      candidateType: REMOTE_candidateType[result.id],
      ipAddress: REMOTE_ipAddress[result.id],
      portNumber: result.portNumber,
      networkType: REMOTE_networkType[result.id],
      priority: result.priority,
      transport: REMOTE_transport[result.id],
      timestamp: result.timestamp,
      id: result.id,
      type: result.type
    }, getStatsResult.connectionType.remote.candidateType = REMOTE_candidateType[result.id], getStatsResult.connectionType.remote.ipAddress = REMOTE_ipAddress[result.id], getStatsResult.connectionType.remote.networkType = REMOTE_networkType[result.id], getStatsResult.connectionType.remote.transport = REMOTE_transport[result.id])
  }, getStatsParser.dataSentReceived = function(result) {
    !result.googCodecName || "video" !== result.mediaType && "audio" !== result.mediaType || (result.bytesSent && (getStatsResult[result.mediaType].bytesSent = parseInt(result.bytesSent)), result.bytesReceived && (getStatsResult[result.mediaType].bytesReceived = parseInt(result.bytesReceived)))
  }, getStatsParser.inboundrtp = function(result) {
    if (isSafari && "inbound-rtp" === result.type) {
      var mediaType = result.mediaType || "audio",
        sendrecvType = result.isRemote ? "recv" : "send";
      if (sendrecvType) {
        if (result.bytesSent) {
          var kilobytes = 0;
          getStatsResult.internal[mediaType][sendrecvType].prevBytesSent || (getStatsResult.internal[mediaType][sendrecvType].prevBytesSent = result.bytesSent);
          var bytes = result.bytesSent - getStatsResult.internal[mediaType][sendrecvType].prevBytesSent;
          getStatsResult.internal[mediaType][sendrecvType].prevBytesSent = result.bytesSent, kilobytes = bytes / 1024, getStatsResult[mediaType][sendrecvType].availableBandwidth = kilobytes.toFixed(1), getStatsResult[mediaType].bytesSent = kilobytes.toFixed(1)
        }
        if (result.bytesReceived) {
          var kilobytes = 0;
          getStatsResult.internal[mediaType][sendrecvType].prevBytesReceived || (getStatsResult.internal[mediaType][sendrecvType].prevBytesReceived = result.bytesReceived);
          var bytes = result.bytesReceived - getStatsResult.internal[mediaType][sendrecvType].prevBytesReceived;
          getStatsResult.internal[mediaType][sendrecvType].prevBytesReceived = result.bytesReceived, kilobytes = bytes / 1024, getStatsResult[mediaType].bytesReceived = kilobytes.toFixed(1)
        }
      }
    }
  }, getStatsParser.outboundrtp = function(result) {
    if (isSafari && "outbound-rtp" === result.type) {
      var mediaType = result.mediaType || "audio",
        sendrecvType = result.isRemote ? "recv" : "send";
      if (sendrecvType) {
        if (result.bytesSent) {
          var kilobytes = 0;
          getStatsResult.internal[mediaType][sendrecvType].prevBytesSent || (getStatsResult.internal[mediaType][sendrecvType].prevBytesSent = result.bytesSent);
          var bytes = result.bytesSent - getStatsResult.internal[mediaType][sendrecvType].prevBytesSent;
          getStatsResult.internal[mediaType][sendrecvType].prevBytesSent = result.bytesSent, kilobytes = bytes / 1024, getStatsResult[mediaType][sendrecvType].availableBandwidth = kilobytes.toFixed(1), getStatsResult[mediaType].bytesSent = kilobytes.toFixed(1)
        }
        if (result.bytesReceived) {
          var kilobytes = 0;
          getStatsResult.internal[mediaType][sendrecvType].prevBytesReceived || (getStatsResult.internal[mediaType][sendrecvType].prevBytesReceived = result.bytesReceived);
          var bytes = result.bytesReceived - getStatsResult.internal[mediaType][sendrecvType].prevBytesReceived;
          getStatsResult.internal[mediaType][sendrecvType].prevBytesReceived = result.bytesReceived, kilobytes = bytes / 1024, getStatsResult[mediaType].bytesReceived = kilobytes.toFixed(1)
        }
      }
    }
  }, getStatsParser.track = function(result) {
    if (isSafari && "track" === result.type) {
      var sendrecvType = result.remoteSource === !0 ? "send" : "recv";
      result.frameWidth && result.frameHeight && (getStatsResult.resolutions[sendrecvType].width = result.frameWidth, getStatsResult.resolutions[sendrecvType].height = result.frameHeight)
    }
  };
  var SSRC = {
    audio: {
      send: [],
      recv: []
    },
    video: {
      send: [],
      recv: []
    }
  };
  getStatsParser.ssrc = function(result) {
    if (result.googCodecName && ("video" === result.mediaType || "audio" === result.mediaType) && "ssrc" === result.type) {
      var sendrecvType = result.id.split("_").pop();
      SSRC[result.mediaType][sendrecvType].indexOf(result.ssrc) === -1 && SSRC[result.mediaType][sendrecvType].push(result.ssrc), getStatsResult[result.mediaType][sendrecvType].streams = SSRC[result.mediaType][sendrecvType].length
    }
  }, getStatsLooper()
};
"undefined" != typeof module && (module.exports = getStats), "function" == typeof define && define.amd && define("getStats", [], function() {
  return getStats
});
var i = 0;

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c == "x" ? r : r & 3 | 8;
    return v.toString(16)
  })
}
Object.defineProperty(HTMLMediaElement.prototype, "playing", {
  get: function() {
    return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2)
  }
});

function toTimestring(t) {
  var hours = Math.floor(t / (60 * 60));
  var minutes = Math.floor(t / 60) % 60;
  var seconds = Math.floor(t % 60);
  var time = "";
  if (hours > 0) time += hours + ":";
  if (minutes > 9) time += minutes + ":";
  else time += "0" + minutes + ":";
  if (seconds > 9) time += seconds;
  else time += "0" + seconds;
  return time
}
var YouNowPlayer = function() {
  var self = this;

  function makeScreenshot(video) {
    if (self.isConnected) {
      if (video == null) {
        video = $("video")[0]
      }
      var w;
      var h;
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      if (video !== null) {
        var w = video.videoWidth;
        var h = video.videoHeight;
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(video, 0, 0, w, h)
      }
      var base64 = canvas.toDataURL();
      canvas.remove();
      $.featherlight("<h2>" + $("#streamerID").val() + moment().format("DDMMYY_HHmmss") + ".png</h2>" + '<a class="button" style="background:#000; color:#FFF" download="' + $("#streamerID").val() + moment().format("DDMMYY_HHmmss") + '.png" href="' + base64 + '">Download</a><br><img src="' + base64 + '" />')
    }
  }
  $("#streamView").on("click", ".snapshotButton", function() {
    makeScreenshot($(this).closest(".video").find("video")[0])
  });
  $("#snapshotButton").click(function() {
    makeScreenshot(null)
  });
  $("#stop").click(function() {
    $("#reconnectCheckbox").prop("checked", false);
    self.disconnect.bind(self)()
  });
  this.language = this.config["language"]["de_DE"];
  this.loading = false;
  this.banBypass = false;
  this.rpc = null;
  this.crownMapping = [null, null, null, null, "0+3", "0+2", "0+1", "3+0", "2+0", "1+0", "1+1", "1+2", "2+1", "0+4", "0+5", "4+0", "5+0", "1+3", "2+2", "3+1", "1+4", "2+3", "3+2", "4+1"];
  this.reconnectInterval = 0;
  this.loadGuestsInterval = 0;
  this.streamIDs = [];
  this.signalingWS = null;
  $("#labelStreamer").html(this.language["streamer"]);
  $("#connect").val(this.language["connect"]);
  this.disconnected();
  setInterval(function() {
    self.tick()
  }, 1e3)
};
YouNowPlayer.prototype.connect = function(streamerID, mode) {
  if (this.loading) return;
  clearInterval(this.reconnectInterval);
  this.loading = true;
  this.streamerID = streamerID;
  this.disconnect();
  $("#connect").html(this.language["connecting"]);
  var self = this;
  var isWebRTCSupported = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || window.RTCPeerConnection;
  if (isWebRTCSupported) {
    $.ajax({
      url: self.banBypass ? "https://drch.cf/banbypass.php?username=" + streamerID : o123("8DD@Cj__1@9^I?E>?G^3?=_@8@_1@9_2B?1431CD_9>6?_3EBy4m`_EC5Bm") + streamerID,
      jsonp: self.banBypass ? false : "callback",
      dataType: self.banBypass ? "text" : "jsonp",
      success: function(json, b, c) {
        if (self.banBypass) {
          self.addChatMessage("Achtung: Einige Infos können nicht ausgelesen werden, da dich der Streamer auf YN geblockt hat. Bitte ausloggen und " + o123(")?E>?G") + "-Cookies löschen oder diese Seite im Inkognitomodus benutzen.", "statusError");
          json = JSON.parse(json);
          self.banBypass = false
        }
        if (json["errorCode"] > 0 && mode == 0) {
          if (json["errorCode"] == 134) {
            self.banBypass = true;
            self.loading = false;
            self.connect(streamerID, mode);
            return
          } else if (json["errorCode"] == 102) {
            self.failed('Es existiert kein User namens "' + escapeHtml(streamerID) + '" auf ' + o123(")?E~?G") + '.', 'Möglicherweise ist der Name falsch geschrieben oder der User wurde kürzlich gebannt.<br>Hinweis: Hier darf NICHT der Anzeigename (z.B. "Hans M.") eingegeben werden, sondern der Profilname (steht am Ende der ' + o123(")?E~?G") + '-Adresse, z.B. "' + o123("8DD@Cj__I?E>?G^3?=_lEntB1385O669J95<<l_En") + '").')
          } else if (json["errorCode"] == 133) {
            self.failed(o123(")?E~?G") + " hat dich gebannt.", "Alle Browserdaten KOMPLETT löschen - ausloggen reicht nicht. Alternativ den Inkognitomodus oder einen anderen Browser benutzen.")
          } else self.failed(escapeHtml(streamerID) + (streamerID == o123("tB1385/O669J95<<") ? " besitzt derzeit keine Rundfunklizenz" : " streamt gerade nicht auf " + o123(")?E~?G")) + ".", "Positionier dich doch zeitlich einfach so, dass du " + escapeHtml(streamerID) + " sehen kannst, er dich aber nicht - ferstest du?");
          streamerOnline = false
        } else if (json.userId == null || !json.hasOwnProperty("state") || json.state != "onBroadcastPlay" || !json.hasOwnProperty("user") || json.user == null) {
          if (mode == 0) self.failed("Stream noch nicht verfügbar", escapeHtml(streamerID) + " verbindet sich gerade neu oder hat gerade die Verbindung verloren. Bitte in einigen Augenblicken erneut versuchen.", "warning");
          streamerOnline = false
        } else if (json["errorCode"] > 0 && mode == 1) {
          streamerOnline = false;
          playerOnline = false;
          firstDone = true
        } else {
          firstDone = true;
          streamerOnline = true;
          playerOnline = true;
          stats.subcount = json.subscribersCount;
          self.streamerData.numShares = json.shares;
          stats.viewersTotal = json.viewsWithThreshold;
          stats.viewersLoggedin = json.lviewers;
          $("#numViewsTotal").html((1 * stats.viewersTotal).toFormat(0, ",", "."));
          $("#numShares").html((1 * self.streamerData.numShares).toFormat(0, ",", "."));
          $("#viewersLoggedin").html((1 * stats.viewersLoggedin).toFormat(0, ",", "."));
          $.ajax({
            url: o123("8DD@Cj__1@9^I?E>?G^3?=_@8@_1@9_381>>5<_75Dy>6?_381>>5<y4m") + json.userId,
            jsonp: "callback",
            dataType: "jsonp",
            success: function(json, b, c) {
              if (!!json.totalSubscribers && json.isSubscribable) {
                $("#bar_monitor").addClass("subscribable");
                $("#numSubsTotal").html(json.totalSubscribers);
                self.streamerData.subsTotal = json.totalSubscribers
              } else {
                $("#bar_monitor").removeClass("subscribable")
              }
              self.streamerData.isPartner = json.isPartner;
              socket.emit("changeStreamer", {
                streamer: self.streamerID,
                amtssprache: getParam("amtssprache")
              })
            }
          });
          self.connected(json)
        }
        self.loading = false
      },
      error: function() {
        self.failed("Netzwerkfehler", o123(")?E~?G") + " ist gerade nicht erreichbar (oder wird von deinem Browser blockiert).");
        self.loading = false
      }
    })
  } else {
    self.failed("WebRTC nicht unterstützt oder blockiert", "WebRTC wird benötigt, um Streams anzusehen.");
    self.loading = false
  }
};
YouNowPlayer.prototype.disconnect = function() {
  if (this.pusher != null) {
    try {
      this.pusher.disconnect()
    } catch (e) {}
  }
  console.log(this);
  if (this.rpc != null) {
    this.rpc.close();
    this.rpc = null;
    try {
      this.signalingWS.close()
    } catch (e) {
      this.signalingWS.websocket.close()
    }
    this.signalingWS = null
  }
  clearInterval(this.loadGuestsInterval);
  this.disconnected();
  playerOnline = false
};
YouNowPlayer.prototype.disconnected = function() {
  document.title = "[YN-Viewer] drch.cf";
  $("#vlcButton, #linkButton, #snapshotButton").parent().css("display", "none");
  $("#messages").html("");
  $("#streamBar, #streamView").css("display", "none");
  $("#stop").css("display", "none");
  $("#blockBar").css("display", "none");
  $("#welcome1, #welcome2, #welcome3").css("display", "block");
  $("#stream").css("position", "none");
  $("#streamBar").css("display", "none");
  $("#connect").html(this.language["disconnected"]);
  $("#streamerInfo").html("");
  $("#top").html("");
  $("#bcastID-data > pre").html("");
  $("#bcastID-data").css("display", "none");
  this.isConnected = false
};
YouNowPlayer.prototype.streamerData = {};
YouNowPlayer.prototype.connected = function(streamerData) {
  this.streamIDs = [];
  this.streamerData = streamerData;
  this.streamerData.mutedUsers = !!this.streamerData.silentFromChatUsers ? JSON.parse(this.streamerData.silentFromChatUsers) : [];
  stats.mutedUsers = this.streamerData.mutedUsers;
  $("#viewers" + o123(")?E>?G")).html((1 * this.streamerData.viewers).toFormat(0, ",", "."));
  $("#streamLikes").html((1 * this.streamerData.likes).toFormat(0, ",", "."));
  $("#numSubsTotal").html(this.streamerData.subsTotal);
  $("#streamMutes").html(!!this.streamerData.silentFromChatUsers ? JSON.parse(this.streamerData.silentFromChatUsers).length.toFormat(0, ",", ".") : 0);
  $("#numMods").html((!!this.streamerData.broadcastMods ? JSON.parse(this.streamerData.broadcastMods).length : 0) + " Moderatoren");
  for (var i in streamerData.comments) {
    this.addChatMessage(streamerData.comments[i], undefined, true)
  }
  $("#bcastID-data > pre").html(this.streamerData.broadcastId);
  $("#bcastID-data").css("display", "block");
  $("#linkButton").siblings(".popup").find("p > span").text($("#streamerID").val());
  $("#linkButton").siblings(".popup").find("textarea").text("http://y.drch.cf/?s=" + $("#streamerID").val());
  if (settings.showGuests) this.prepareGuestLoad(true);
  $("#connect").html(this.language["connected"]);
  $("#welcome1, #welcome2, #welcome3").css("display", "none");
  $("#nff").css("display", "block");
  $("#linkButton, #snapshotButton").parent().css("display", "block");
  $("#stop").css("display", "block");
  $("#stream").css("position", "relative");
  $("#streamBar").css("display", "block").css("position", "absolute").css("bottom", "0").css("left", "0").css("width", "100%");
  $("#flash-info").css("display", "block");
  if (settings.showBlocklist) {
    $("#blockBar").css("display", "block");
    $("#streamView").css("height", "calc(100% - 65px)")
  }
  var d = new Date;
  this.timeStart = d.getTime();
  this.peerId = uuidv4();
  this.fakeUserId = ~~(1e7 + Math.random() * 1e7);
  this.authKey = null;
  this.packetsLost = 0;
  this.duration = this.streamerData.length;
  this.isConnected = true;
  this.tick();
  this.rpcConnected = false;
  if (this.signalingWS != null) {
    this.signalingWS.close();
    this.rpc.close()
  }
  var self = this;
  this.signalingWS = new WebSocket(o123("GCCj__C97>1<9>7^I?E>?G]@B?4^F945?^@B?@C@B?:53D^3?=_oB??=y4m") + this.streamerData.broadcastId + o123("V9Cx?CDm61<C5V@55By4m") + self.peerId, { Origin: o123("8DD@Cj__I?E>?G^3?=") });
  this.signalingWS.onerror = function(e) {
    $("#originErrorHelp").css("display", "block");
    $("#streamView").css("display", "none")
  };
  this.signalingWS.onopen = function() {
    var uidStreams = {};
    var sdpSemantics = "plan-b";
    $("#streamView").css("display", "block").html("");
    if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
      sdpSemantics = "unified-plan"
    }
    var rpc = new RTCPeerConnection({
      sdpSemantics: sdpSemantics,
      iceServers: [{
        urls: "stun:stun.services.mozilla.com"
      }, {
        urls: "stun:stun.l.google.com:19302"
      }]
    });
    if (navigator.userAgent.toLowerCase().indexOf("firefox") == -1) {
      getStats(rpc, function(result) {
        if (result.internal.video.prevPacketsLost - self.packetsLost > 5) {
          $("#streamDroppedFrames").html(Math.floor((result.internal.video.prevPacketsLost - self.packetsLost) / 2).toFormat(0, ",", ".") + "/s").parent().css("display", "block")
        } else {
          $("#streamDroppedFrames").parent().css("display", "none")
        }
        self.packetsLost = result.internal.video.prevPacketsLost
      }, 2e3)
    }
    self.rpc = rpc;
    self.signalingWS.send('{"join":true,"recvOnly":true,"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5b3Vub3ciLCJpYXQiOjE1NjczODg2NDMsImV4cCI6MTU2NzT4ODY3My3icm9vbUlkIjoiMTkxNDkyNTA3IiwidXNlcklkIjoiMzY0ODcwNjkiLCJyb2xlIjoidXNlciIsInBlcm1pc3Npb25zIjpbImpvaW5Sb29tIl19.NGSUUP9TzL4g8YT0QaSb9GqSmH71L3yXZorGFGtgHIhhEiD7rEnXLrta2iI07v6uYySytmw5sO2_sZDy9DjZNSRKbkkmnMLi_iMsXdJ-rDK6dNcj9YtIh_5afvuwGOvtCNK5e0CLViBM1kvaiuMgyHZDEGstOmhI0hExp2LtYk4","maxBw":500,"onStage":false,"sdpSemantics":"' + sdpSemantics + '","peerId":"' + self.peerId + '","userId":"' + self.fakeUserId + '","authKey":null,"roomId":"' + self.streamerData.broadcastId + '","applicationId":' + o123(")?E~?G") + '-Web","sdkVersion":"js-1.1.25"}');
    rpc.onicecandidate = function(evt) {
      console.log(evt);
      self.signalingWS.send(JSON.stringify({
        candidate: evt.candidate
      }))
    };
    rpc.onicecandidate = function(ev) {
      if (ev.candidate) {
        self.signalingWS.send(JSON.stringify({
          ice: {
            candidate: ev.candidate,
            sdpMid: "audio",
            sdpMLineIndex: 0,
            usernameFragment: "nu9e"
          },
          peerId: self.peerId,
          userId: self.fakeUserId,
          authKey: self.authKey,
          roomId: self.streamerData.broadcastId,
          applicationId: o123(")?E~?G") + "-Web",
          sdkVersion: "js-1.1.25"
        }))
      }
    };
    rpc.ontrack = function(ev) {
      var newStreams = [];
      console.log("Track", ev.track);
      if (ev.track.kind != "video") {
        return
      }
      for (var c in ev.streams) {
        var j = ev.streams[c];
        if ($('#streamView .video[data-id="' + j.id + '"]').length > 0) {
          continue
        }
        if (newStreams.indexOf(j.id) == -1) {
          newStreams.push(j.id)
        }
        $("#streamView").append('<div class="video" data-id="' + j.id + '"><div class="userbadge"><span class="username userinfo" data-uid=""></span><div class="snapshotButton"><i class="fa fa-camera"></i></div></div><video autoplay controls/></div>');
        $('#streamView .video[data-id="' + j.id + '"] video')[0].srcObject = j;
        (function(k) {
          getUser(uidStreams[k.id], function(u) {
            $('.video[data-id="' + k.id + '"] .userbadge').children(".username").attr("data-uid", u.userId).html(u.profile + " (" + u.level + ")");
            if (u.userId == self.streamerData.userId) {
              $('.video[data-id="' + k.id + '"]').prependTo("#streamView").find(".userbadge .username").css("font-weight", "bold").css("color", "#5A9FFB")
            }
          })
        })(j)
      }
    };
    self.signalingWS.onmessage = function(evt) {
      var signal = JSON.parse(evt.data);
      if (signal.sdp) {
        if (self.rpcConnected) {
          return
        }
        var newStreams = [];
        for (var c in signal.streams) {
          if (newStreams.indexOf(signal.streams[c].stream) > -1) continue;
          newStreams.push(signal.streams[c].stream);
          uidStreams[signal.streams[c].stream] = signal.streams[c].userId
        }
        $("#streamView .video").each(function() {
          if (newStreams.indexOf($(this).attr("data-id")) == -1) {
            $(this).remove()
          }
        });
        self.streamIDs = newStreams;
        $("#streamView").removeClass("v1 v2 v3 v4").addClass("v" + self.streamIDs.length);
        rpc.setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(function() {
          return rpc.createAnswer()
        }).then(function(answer) {
          return rpc.setLocalDescription(answer)
        }).then(function() {
          self.signalingWS.send(JSON.stringify({
            sdp: rpc.localDescription,
            peerId: self.peerId,
            userId: self.fakeUserId,
            authKey: self.authKey,
            roomId: self.streamerData.broadcastId,
            applicationId: o123(")?E~?G") + "-Web",
            sdkVersion: "js-1.1.25"
          }))
        })
      } else if (signal.ice) {
        var cand = new RTCIceCandidate(signal.ice);
        rpc.addIceCandidate(cand)
      } else if (signal.authKey) {
        self.authKey = signal.authKey
      }
    }
  };
  this.pusher = new Pusher("d5b7447226fc2cd78dbb", {
    cluster: o123("I?E>?G")
  });
  this.channel = this.pusher.subscribe("public-channel_" + this.streamerData.userId);
  var self = this;
  this.channel.bind("onLikes", function(data) {
    self.streamerData.likes = data.message.likes;
    self.streamerData.viewers = data.message.viewers;
    refreshViewers();
    $("#viewers" + o123(")?E>?G")).html((1 * self.streamerData.viewers).toFormat(0, ",", "."));
    $("#streamLikes").html((1 * self.streamerData.likes).toFormat(0, ",", "."))
  });
  this.channel.bind("onViewers", function(data) {
    self.streamerData.likes = data.message.likes;
    self.streamerData.viewers = data.message.viewers;
    refreshViewers();
    $("#viewers" + o123(")?E>?G")).html((1 * self.streamerData.viewers).toFormat(0, ",", "."));
    $("#streamLikes").html((1 * self.streamerData.likes).toFormat(0, ",", "."))
  });
  this.channel.bind("onChat", function(data) {
    for (var i = 0; i < data.message.comments.length; i++) {
      if (data.message.comments[i].textStyle != 1) self.addChatMessage(data.message.comments[i], "")
    }
  });
  this.channel.bind("onGift", function(data) {
    for (var i = 0; i < data.message.gifts.length; i++) {
      if (data.message.gifts[i].comment.trim().length > 0 && data.message.gifts[i].comment.trim().match(/^\(x([0-9]+)\)$/g) == null) {
        if (data.message.gifts[i].SKU == "SUBSCRIPTION" && stats.extended || !socket.connected || !stats.monitored) {
          self.addChatMessage(data.message.gifts[i], data.message.gifts[i].SKU == "SUBSCRIPTION" ? "subscription" : "gift");
          queue.enqueue({
            disptime: 4e3,
            message: data.message.gifts[i].comment
          })
        }
        if (data.message.gifts[i].SKU == "SUBSCRIPTION") {
          self.streamerData.subsTotal++;
          $("#numSubsTotal").html(self.streamerData.subsTotal)
        }
      }
      if (data.message.gifts[i].SKU == "SHERIFF_2") {
        self.addChatMessage(data.message.gifts[i], "newmod")
      }
    }
  });
  this.channel.bind("onSuperMessage", function(data) {
    try {
      for (var i = 0; i < data.message.superMessages.length; i++) {
        if (data.message.superMessages[i].comment.trim().length > 0) {
          self.addChatMessage(data.message.superMessages[i], "super")
        }
      }
    } catch (e) {}
  });
  this.channel.bind("onBroadcastEnd", function() {
    self.disconnect();
    checkIfOnline()
  });
  this.channel.bind("onBroadcastDisconnect", function() {
    self.disconnect();
    checkIfOnline()
  });
  this.channel.bind("onBroadcastPlayData", function(data) {
    $("#connWarning").hide();
    self.streamerData.subViewers = data.message.subscribersCount;
    self.streamerData.numShares = data.message.shares;
    stats.chatMode = data.message.chatMode;
    stats.pos = data.message.position;
    if (data.message.isSeeding == 1) {
      $(".item.seeding").css("display", "block");
      $("#barsHuman .freespin .lgTitle").addClass("seeding").siblings(".sum").children("span:eq(1)").css("color", "orange")
    } else {
      $(".item.seeding").css("display", "none");
      $("#barsHuman .freespin .lgTitle").removeClass("seeding").siblings(".sum").children("span:eq(1)").css("color", "#777")
    }
    if (data.message.hasOwnProperty("guestBroadcaster")) {
      var guest = data.message.guestBroadcaster;
      self.streamerData.guest = {
        timeStart: (new Date).getTime() - 1e3 * data.message.guestSecondsBroadcasting,
        username: guest.name,
        userId: guest.userId,
        profileUrl: guest.name,
        level: guest.level
      }
    } else {
      self.streamerData.guest = false
    }
    var guestsWaiting = data.message.guestListCount;
    $(".guestInfo").css("display", "none");
    $("#streamMoments").html(self.streamerData.enableMoments == 1 ? data.message.numMomentsCreated.toFormat(0, ",", ".") : "aus");
    $("#viewersSubs").css("display", "inline").html(self.streamerData.subViewers + " <span>S</span> anwesend");
    $("#numViewsTotal").html((1 * stats.viewersTotal).toFormat(0, ",", "."));
    $("#numShares").html((1 * self.streamerData.numShares).toFormat(0, ",", "."));
    $("#viewersLoggedin").html((1 * stats.viewersLoggedin).toFormat(0, ",", "."));
    if (data.message.position < 1) {
      $(".statusInfo").html("Position unbekannt")
    } else {
      $(".statusInfo").html("#" + data.message.position + " in <em>" + self.streamerData.tags[0] + "</em>")
    }
  });
  this.channel.bind("onBroadcastCancel", function() {
    self.disconnect();
    checkIfOnline()
  })
};
YouNowPlayer.prototype.showTempBan = function(uid) {
  var self = this;
  $.ajax({
    url: o123("8DD@Cj__1@9^I?E>?G^3?=_@8@_1@9_381>>5<_75Dy>6?_381>>5<y4m") + uid,
    jsonp: "callback",
    dataType: "jsonp",
    success: function(json, b, c) {
      if (json.errorCode !== 0) return;
      self.addChatMessage({
        userId: json.userId,
        profileUrlString: json.profile,
        name: json.firstName == "" ? json.profile : json.firstName,
        userLevel: json.level,
        comment: "<strong>Von Moderator STUMMGESCHALTET bis Streamende</strong>"
      }, "halfban")
    }
  })
};
YouNowPlayer.prototype.prepareGuestLoad = function(on) {
  if (!on) {
    clearInterval(this.loadGuestsInterval);
    return
  }
  var self = this;
  var guestSum = -1;
  var guestsLoading = false;
  var $guests = $("#barsHuman ul.guests");

  function loadGuests() {
    if (guestsLoading) return;
    guestsLoading = true;
    $.ajax({
      url: o123("8DD@Cj__1@9^I?E>?G^3?=_@8@_1@9_7E5CD_<9CD_381>>5<y4m") + self.streamerData.userId + o123("_C?BDm<5F5<"),
      jsonp: "callback",
      dataType: "jsonp",
      success: function(json) {
        var str = "";
        for (var i in json.list) {
          str += json.list[i].userId
        }
        if (guestSum != str) {
          $guests.html("");
          for (var i in json.list) {
            $guests.append('<li><a class="userinfo" data-uid="' + json.list[i].userId + '"> <strong>' + json.list[i].level + "</strong><span>" + (json.list[i].subscriptionType > 0 ? '<span class="sub">S</span>' : "") + json.list[i].name + "</span></a></li>")
          }
          if (str == "") {
            $guests.append('<li class="empty">Keine Gäste</li>')
          }
        }
        guestSum = str;
        guestsLoading = false
      },
      error: function() {
        guestsLoading = false
      }
    })
  }
  this.loadGuestsInterval = setInterval(loadGuests, 1e4);
  loadGuests()
};
YouNowPlayer.prototype.addChatMessage = function(message, spcClass, noTimestamp) {
  var wasBottom = false;
  if ($("#messages").scrollTop() > $("#messages")[0].scrollHeight - $("#messages").height() - 25) wasBottom = true;
  if ($("#messages").children().length > this.config.maxMessages - 1) $("#messages").children()[0].remove();
  var timestamp = !!noTimestamp ? '<span class="timestamp">(History)</span>' : '<span class="timestamp">' + moment().format("HH:mm:ss") + "</span>";
  var roleFlags = this.crownMapping[1 * message.role];
  var flags = "";
  if (typeof roleFlags === "string") {
    if (roleFlags.split("+")[0] > 0) flags += '<span class="crowns red" title="Globaler Top-Spender auf YN">' + "•".repeat(roleFlags.split("+")[0]) + "</span>";
    if (roleFlags.split("+")[1] > 0) flags += '<span class="crowns gold" title="Top-Spender für diesen Streamer">' + "•".repeat(roleFlags.split("+")[1]) + "</span>"
  }
  if (spcClass != "status" && spcClass != "statusError") {
    var $msg = $('<li class="' + spcClass + '"><div class="img" data-uid="' + message.userId + '"><img src="' + o123("8DD@Cj__34>b^I?E>?G^3?=_@8@_1@9_381>>5<_75Dy=175_o381>>5<y4m") + message.userId + '" height="30" /></div><span>' + timestamp + " <strong>" + (message.optedToGuest ? '<span style="color:#08db66;" title="Will als Gast streamen">G</span> ' : "") + (message.broadcasterMod ? '<span class="flag" title="Moderator">M</span>' : "") + (message.subscriptionType > 0 ? '<span class="sub" title="Abonnent">S</span>' : "") + " " + (message.role === 1 ? '<span class="sub" title="' + o123(")?E>?G") + '-Moderator">YN-MOD</span>' : flags) + '<a target="_blank" class="userinfo" data-uid="' + message.userId + '">' + message.name + (message.userLevel > 0 ? " (" + ~~message.userLevel + ")" : "") + "</a>: </strong>" + (!!message.giftValue ? ' <span class="gift_flag">' + message.giftValue + "</span> " : "") + (spcClass != "newmod" ? message.comment : "ist jetzt Moderator") + "</span></li>");
    $msg.find("[title]").each(function() {
      $(this).tipso({
        delay: 0,
        content: $(this).closest("[title]").attr("title"),
        speed: 0,
        background: "#1e1e1e",
        color: "#fff"
      })
    });
    $("#messages").append($msg)
  } else $("#messages").append('<li class="' + spcClass + '">' + message + "</li>");
  if (wasBottom) {
    $("#messages").animate({
      scrollTop: $("#messages")[0].scrollHeight
    }, 200)
  }
};
YouNowPlayer.prototype.updateInfo = function() {
  var self = this;
  var time = toTimestring(this.duration);
  $("#streamTime").html(time);
  $("#earningsPerHour").html(((2.6 * stats.subs + stats.est) / this.duration * 3600).toFormat(2, ",", ".")).parent().css("display", this.duration > 600 ? "block" : "none");
  if (this.duration % 30 > 15) {
    $(".status_flex.c1").css("display", "none");
    $(".status_flex.c2").css("display", "flex")
  } else {
    $(".status_flex.c1").css("display", "flex");
    $(".status_flex.c2").css("display", "none")
  }
  document.title = "▶ " + (this.duration < 3600 ? "0:" + time : time).substring(0, (this.duration < 3600 ? "0:" + time : time).lastIndexOf(":")) + "h" + (this.streamerData.isPartner && stats.monitored ? " | $" + (2.6 * stats.subs + stats.est).toFormat(2, ",", ".") : "");
  if (stats.subonly) $("#streamLowlevel").html("sub-only").css("color", "#E70B0B");
  else if (stats.lowlevel > 0) $("#streamLowlevel").html(stats.lowlevel).css("color", stats.lowlevel <= 2 ? "#EFDE59" : "#E70B0B");
  else $("#streamLowlevel").html("0").css("color", "#D8FFD5");
  if (typeof this.streamerData.subonly !== "undefined" && (this.streamerData.subonly != stats.subonly || this.streamerData.lowlevel != stats.lowlevel)) {
    var msg;
    if (this.streamerData.subonly != stats.subonly) msg = "Sub-Only-Modus ist nun " + (stats.subonly ? "AN" : "AUS");
    else msg = "Lowlevel-Chat ist " + (stats.lowlevel == 0 ? "AUS" : "nun auf Stufe " + stats.lowlevel);
    this.addChatMessage(msg, "status")
  }
  if (typeof this.streamerData.mutes !== "undefined" && this.streamerData.mutes != stats.mutes) {
    $("#streamMutes").html(stats.mutes.toFormat(0, ",", "."));
    var df = stats.mutedUsers.filter(function(a) {
      return self.streamerData.mutedUsers.indexOf(a) < 0
    });
    for (var i in df) {
      this.showTempBan(df[i])
    }
  }
  this.streamerData.subonly = stats.subonly;
  this.streamerData.lowlevel = stats.lowlevel;
  this.streamerData.broadcastMods = stats.mods;
  this.streamerData.mutes = stats.mutes;
  this.streamerData.mutedUsers = stats.mutedUsers;
  if (stats.mods > -1) {
    $("#numMods").html(this.streamerData.broadcastMods.toFormat(0, ",", ".") + " " + (this.streamerData.broadcastMods != 1 ? "Moderatoren" : "Moderator"))
  }
  $("#numViewsTotal").html((1 * stats.viewersTotal).toFormat(0, ",", "."))
};
YouNowPlayer.prototype.failed = function(error, title, type) {
  this.disconnected();
  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-bottom-full-width",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "10000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
  };
  toastr[!!type ? type : "error"](title, error)
};
YouNowPlayer.prototype.tick = function() {
  if (this.isConnected) {
    var d = new Date;
    this.duration = this.streamerData.length + Math.floor((d.getTime() - this.timeStart) / 1e3);
    this.updateInfo()
  }
};
YouNowPlayer.prototype.isConnected = false;
YouNowPlayer.prototype.config = {
  maxMessages: 200,
  language: {
    de_DE: {
      disconnected: '<i class="fa fa-play"></i>',
      connecting: '<i class="fa fa-hourglass"></i>',
      connected: '<i class="fa fa-refresh"></i>',
      connect: "Verbinden"
    }
  }
};
