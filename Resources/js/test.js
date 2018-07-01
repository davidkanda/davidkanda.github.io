$(window)
  .scroll(function() {
    // selectors
    var $window = $(window),
      $body = $("body"),
      $panel = $(".panel");

    // Change 33% earlier than scroll position so colour is there when you arrive.
    var scroll = $window.scrollTop() + $window.height() / 3;

    $panel.each(function() {
      var $this = $(this);

      // if position is within range of this panel.
      // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
      // Remember we set the scroll to 33% earlier in scroll var.
      if (
        $this.position().top <= scroll &&
        $this.position().top + $this.height() > scroll
      ) {
        // Remove all classes on body with color-
        $body.removeClass(function(index, css) {
          return (css.match(/(^|\s)color-\S+/g) || []).join(" ");
        });

        // Add class of currently active div
        $body.addClass("color-" + $(this).data("color"));
      }
    });
  })
  .scroll();

  // NAVIGATION
  // STICKY NAVIGATION
class StickyNavigation {
  constructor() {
    this.currentId = null;
    this.currentTab = null;
    this.tabContainerHeight = 70;
    let self = this;
    $(".et-hero-tab").click(function() {
      self.onTabClick(event, $(this));
    });
    $(window).scroll(() => {
      this.onScroll();
    });
    $(window).resize(() => {
      this.onResize();
    });
  }

  onTabClick(event, element) {
    event.preventDefault();
    let scrollTop =
      $(element.attr("href")).offset().top - this.tabContainerHeight + 1;
    $("html, body").animate({ scrollTop: scrollTop }, 300);
  }

  onScroll() {
    this.checkTabContainerPosition();
    this.findCurrentTabSelector();
  }

  onResize() {
    if (this.currentId) {
      this.setSliderCss();
    }
  }

  checkTabContainerPosition() {
    let offset =
      $(".et-hero-tabs").offset().top +
      $(".et-hero-tabs").height() -
      this.tabContainerHeight;
    if ($(window).scrollTop() > offset) {
      $(".et-hero-tabs-container").addClass("et-hero-tabs-container--top");
    } else {
      $(".et-hero-tabs-container").removeClass("et-hero-tabs-container--top");
    }
  }

  findCurrentTabSelector(element) {
    let newCurrentId;
    let newCurrentTab;
    let self = this;
    $(".et-hero-tab").each(function() {
      let id = $(this).attr("href");
      let offsetTop = $(id).offset().top - self.tabContainerHeight;
      let offsetBottom =
        $(id).offset().top + $(id).height() - self.tabContainerHeight;
      if (
        $(window).scrollTop() > offsetTop &&
        $(window).scrollTop() < offsetBottom
      ) {
        newCurrentId = id;
        newCurrentTab = $(this);
      }
    });
    if (this.currentId != newCurrentId || this.currentId === null) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;
      this.setSliderCss();
    }
  }

  setSliderCss() {
    let width = 0;
    let left = 0;
    if (this.currentTab) {
      width = this.currentTab.css("width");
      left = this.currentTab.offset().left;
    }
    $(".et-hero-tab-slider").css("width", width);
    $(".et-hero-tab-slider").css("left", left);
  }
}
new StickyNavigation();


// TEXT EFFECT
var Intro = function() {
  this.$title = $(".hero__title");
  this.$subtitle = $(".hero__subtitle");
  this.$button = $(".hero .button");
  this.$logoPartRed = $(".mastercard__part.red");
  this.$logoPartOrange = $(".mastercard__part.orange");
  this.$strings = $(".js-letters");
  this.partSize = 25;
  this.$nav = $(".nav");
  this.w = $(window).width();
  this.coverW = this.w - this.$title.width();

  this.init();
};

Intro.prototype = {
  init: function() {
    var _this = this;
    TweenMax.set(this.$nav, { opacity: 0 });
    TweenMax.set(this.$logoPartRed, { x: this.partSize / 2 });
    TweenMax.set(this.$logoPartOrange, { x: -this.partSize / 2 });
    TweenMax.set(this.$subtitle, { y: 10, opacity: 0 });
    TweenMax.set(this.$button, { y: 10, opacity: 0 });

    this.logoAnim();

    this.$strings.each(function() {
      _this.manageLetters($(this));
    });
  },

  logoAnim: function() {
    var logoTween = new TimelineMax({
      repeat: 1.5,
      yoyo: true,
      onComplete: this.introAnim.bind(this)
    });

    logoTween
      .to(this.$logoPartRed, 0.5, {
        x: this.partSize / 6,
        ease: Power1.easeInOut
      })
      .to(
        this.$logoPartOrange,
        0.5,
        {
          x: -this.partSize / 6,
          ease: Power1.easeInOut
        },
        "-=0.5"
      );
  },

  introAnim: function() {
    var introTween = new TimelineMax();
    var $cover = $(".hero__cover");

    introTween
      .staggerTo(
        $(this.$strings[0]).find(".letter"),
        0.4,
        {
          yPercent: -40,
          opacity: 1,
          ease: Back.easeOut
        },
        0.02666
      )
      .to(
        $cover,
        1.8,
        {
          webkitClipPath: "circle(" + this.coverW + " at 0 0)",
          ease: Power3.easeOut
        },
        "-=0.3"
      )
      .staggerTo(
        $(this.$strings[1]).find(".letter"),
        0.5,
        {
          yPercent: -40,
          opacity: 1,
          ease: Back.easeOut
        },
        0.025,
        "-=1.2"
      )
      .staggerTo(
        $(this.$strings[2]).find(".letter"),
        0.5,
        {
          yPercent: -40,
          opacity: 1,
          ease: Back.easeOut
        },
        0.025,
        "-=0.9"
      )
      .staggerTo(
        $(this.$strings[3]).find(".letter"),
        0.5,
        {
          yPercent: -40,
          opacity: 1,
          ease: Back.easeOut
        },
        0.025,
        "-=0.7"
      )
      .to(
        this.$subtitle,
        0.5,
        {
          opacity: 1,
          y: 0,
          ease: Back.easeOut
        },
        "-=0.4"
      )
      .to(
        this.$button,
        0.5,
        {
          opacity: 1,
          y: 0,
          ease: Back.easeOut
        },
        "-=0.3"
      )
      .to(
        this.$nav,
        1.4,
        {
          opacity: 1
        },
        "-=0.2"
      );
  },

  manageLetters: function($el) {
    var text = $el.text();
    var letters = this.splitString(text);
    var lettersLength = letters.length;
    var final = "";

    for (var i = 0; i < lettersLength; i++) {
      final += "<span class='letter'>" + letters[i] + "</span>";
    }

    $el.html(final);
  },

  splitString: function(str) {
    str = str.trim();
    var length = str.length;
    retArr = [];
    for (var i = 0; i < length; i++) {
      if (str[i] === " ") {
        retArr[retArr.length - 1] += "&nbsp;";
        continue;
      }
      retArr.push(str[i]);
    }
    return retArr;
  }
};

var intro = new Intro();


// ON SCROLL ANIMATIONS
(function() {
  var Util,
    __bind = function(fn, me) {
      return function() {
        return fn.apply(me, arguments);
      };
    };

  Util = (function() {
    function Util() {}

    Util.prototype.extend = function(custom, defaults) {
      var key, value;
      for (key in custom) {
        value = custom[key];
        if (value != null) {
          defaults[key] = value;
        }
      }
      return defaults;
    };

    Util.prototype.isMobile = function(agent) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        agent
      );
    };

    return Util;
  })();

  this.WOW = (function() {
    WOW.prototype.defaults = {
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true
    };

    function WOW(options) {
      if (options == null) {
        options = {};
      }
      this.scrollCallback = __bind(this.scrollCallback, this);
      this.scrollHandler = __bind(this.scrollHandler, this);
      this.start = __bind(this.start, this);
      this.scrolled = true;
      this.config = this.util().extend(options, this.defaults);
    }

    WOW.prototype.init = function() {
      var _ref;
      this.element = window.document.documentElement;
      if (
        (_ref = document.readyState) === "interactive" ||
        _ref === "complete"
      ) {
        return this.start();
      } else {
        return document.addEventListener("DOMContentLoaded", this.start);
      }
    };

    WOW.prototype.start = function() {
      var box, _i, _len, _ref;
      this.boxes = this.element.getElementsByClassName(this.config.boxClass);
      if (this.boxes.length) {
        if (this.disabled()) {
          return this.resetStyle();
        } else {
          _ref = this.boxes;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            box = _ref[_i];
            this.applyStyle(box, true);
          }
          window.addEventListener("scroll", this.scrollHandler, false);
          window.addEventListener("resize", this.scrollHandler, false);
          return (this.interval = setInterval(this.scrollCallback, 50));
        }
      }
    };

    WOW.prototype.stop = function() {
      window.removeEventListener("scroll", this.scrollHandler, false);
      window.removeEventListener("resize", this.scrollHandler, false);
      if (this.interval != null) {
        return clearInterval(this.interval);
      }
    };

    WOW.prototype.show = function(box) {
      this.applyStyle(box);
      return (box.className =
        "" + box.className + " " + this.config.animateClass);
    };

    WOW.prototype.applyStyle = function(box, hidden) {
      var delay, duration, iteration;
      duration = box.getAttribute("data-wow-duration");
      delay = box.getAttribute("data-wow-delay");
      iteration = box.getAttribute("data-wow-iteration");
      return box.setAttribute(
        "style",
        this.customStyle(hidden, duration, delay, iteration)
      );
    };

    WOW.prototype.resetStyle = function() {
      var box, _i, _len, _ref, _results;
      _ref = this.boxes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        box = _ref[_i];
        _results.push(box.setAttribute("style", "visibility: visible;"));
      }
      return _results;
    };

    WOW.prototype.customStyle = function(hidden, duration, delay, iteration) {
      var style;
      style = hidden
        ? "visibility: hidden; -webkit-animation-name: none; -moz-animation-name: none; animation-name: none;"
        : "visibility: visible;";
      if (duration) {
        style +=
          "-webkit-animation-duration: " +
          duration +
          "; -moz-animation-duration: " +
          duration +
          "; animation-duration: " +
          duration +
          ";";
      }
      if (delay) {
        style +=
          "-webkit-animation-delay: " +
          delay +
          "; -moz-animation-delay: " +
          delay +
          "; animation-delay: " +
          delay +
          ";";
      }
      if (iteration) {
        style +=
          "-webkit-animation-iteration-count: " +
          iteration +
          "; -moz-animation-iteration-count: " +
          iteration +
          "; animation-iteration-count: " +
          iteration +
          ";";
      }
      return style;
    };

    WOW.prototype.scrollHandler = function() {
      return (this.scrolled = true);
    };

    WOW.prototype.scrollCallback = function() {
      var box;
      if (this.scrolled) {
        this.scrolled = false;
        this.boxes = function() {
          var _i, _len, _ref, _results;
          _ref = this.boxes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            box = _ref[_i];
            if (!box) {
              continue;
            }
            if (this.isVisible(box)) {
              this.show(box);
              continue;
            }
            _results.push(box);
          }
          return _results;
        }.call(this);
        if (!this.boxes.length) {
          return this.stop();
        }
      }
    };

    WOW.prototype.offsetTop = function(element) {
      var top;
      top = element.offsetTop;
      while ((element = element.offsetParent)) {
        top += element.offsetTop;
      }
      return top;
    };

    WOW.prototype.isVisible = function(box) {
      var bottom, offset, top, viewBottom, viewTop;
      offset = box.getAttribute("data-wow-offset") || this.config.offset;
      viewTop = window.pageYOffset;
      viewBottom = viewTop + this.element.clientHeight - offset;
      top = this.offsetTop(box);
      bottom = top + box.clientHeight;
      return top <= viewBottom && bottom >= viewTop;
    };

    WOW.prototype.util = function() {
      return this._util || (this._util = new Util());
    };

    WOW.prototype.disabled = function() {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent);
    };

    return WOW;
  })();
}.call(this));

wow = new WOW({
  animateClass: "animated",
  offset: 100
});
wow.init();

// HOW IT WORKS
var isSelected = false;
const myProjects = [
  {
    ID: "-explore",
    category: "Explore",
    bImage: "Resources/img/explore2.jpg",
    copy: `<p>Lorem ipsum dolor sit amet, vehicula ullamco vel nullam, non vulputate purus sit vel est, egestas nec a.</p> <p>Curabitur rutrum, pellentesque ipsum hendrerit. Nulla eu. In ipsum ac ultrices eget pretium, dictum velit a. Arcu aliquam nunc consectetuer. Mauris quisque interdum integer mauris fusce. Quam tellus molestie lobortis at diam, ut ac suscipit ante purus, auctor nec iaculis libero leo i</p><p>Lorem ipsum dolor sit amet, vehicula ullamco vel nullam, non vulputate purus sit vel est, egestas nec a.</p> <p>Curabitur rutrum, pellentesque ipsum hendrerit. Nulla eu. In ipsum ac ultrices eget pretium, dictum velit a. Arcu aliquam nunc consectetuer. Mauris quisque interdum integer mauris fusce. Quam tellus molestie lobortis at diam, ut ac su
    scipit ante purus, auctor nec iaculis libero leo i</p><p>Lorem ipsum dolor sit amet, vehicula ullamco vel nullam, non vulputate purus sit vel est, egestas nec a.</p> <p>Curabitur rutrum, pellentesque ipsum hendrerit. Nulla eu. In ipsum ac ultrices eget pretium, dictum velit a. Arcu aliquam nunc consectetuer. Mauris quisque interdum integer mauris fusce. Quam tellus molestie lobortis at diam, ut ac suscipit ante purus, auctor nec iaculis libero leo i</p><p>Lorem ipsum dolor sit amet, vehicula ullamco vel nullam, non vulputate purus sit vel est, egestas nec a.</p> <p>Curabitur rutrum, pellentesque ipsum hendrerit. Nulla eu. In ipsum ac ultrices eget pretium, dictum velit a. Arcu aliquam nunc consectetuer. Mauris quisque interdum integer mauris fusce. Quam tellus molestie lobortis at diam, ut ac suscipit ante purus, auctor nec iaculis libero leo i</p>`
  },
  {
    ID: "-share",
    category: "Share",
    bImage:"Resources/img/share.jpg",
    copy:
      "<p>Lorem ipsum dolor sit amet, vehicula ullamco vel nullam, non vulputate purus sit vel est, egestas nec a.</p> <p>Curabitur rutrum, pellentesque ipsum hendrerit. Nulla eu. In ipsum ac ultrices eget pretium, dictum velit a. Arcu aliquam nunc consectetuer. Mauris quisque interdum integer mauris fusce. Quam tellus molestie lobortis at diam, ut ac suscipit ante purus, auctor nec iaculis libero leo i</p>"
  }
];

var theHighlightedContent = { ID: "", category: "", bImage: "", copy: "" };
var selectedProject;
var scrollBackTo;

var app = new Vue({
  el: "#projectsApp",
  data() {
    return {
      projects: myProjects,
      highlightedContent: theHighlightedContent
    };
  },
  methods: {
    selectProjects: function(thisId) {
      var self = "#" + thisId;
      if ($(self).hasClass("openedProject")) {
        isSelected = false;

        if ($(self).hasClass("noTransition")) {
          var timeoutA = 0;
          var timeoutB = 0;
          var timeoutC = 0;
        } else {
          var timeoutA = 800;
          var timeoutB = 1200;
          var timeoutC = 1600;
        }

        $(self).addClass("midTransition");
        $(self).removeClass("openedProject");

        setTimeout(function() {
          $(self).removeClass("midTransition");
          $(".selectedArea").removeClass("opened");
        }, timeoutA);

        setTimeout(function() {
          $("#projectsApp .projects").removeClass("hidden");
          $("#projectsApp .projects").removeClass("shrunk");
        }, timeoutB);
        setTimeout(function() {
          // window.scrollTo(0, scrollBackTo);
          $("html, body").animate({ scrollTop: scrollBackTo }, 500);
          $(self).addClass("noTransition");
        }, timeoutC);
      } else {
        isSelected = true;
        scrollBackTo = $(self).offset().top;

        if ($(self).hasClass("noTransition")) {
          $(".selectedArea").addClass("noTransition");
          $(".copyArea.fadeIn").addClass("noTransition");
          var timeoutD = 0;
        } else {
          $(".selectedArea").removeClass("noTransition");
          $(".copyArea.fadeIn").removeClass("noTransition");
          var timeoutD = 800;
        }

        $(self).addClass("midTransition");
        $("#projectsApp .projects").addClass("hidden");
        $(self).removeClass("hidden");

        setTimeout(function() {
          $(".selectedArea").addClass("opened");
          $(self).addClass("openedProject");
          $(self).removeClass("midTransition");
          $("#projectsApp .projects").addClass("shrunk");

          $(self).removeClass("shrunk");

          window.scrollTo(0, 0);
        }, timeoutD);
      }

      for (var i = 0; i < this.projects.length; i++) {
        if (thisId == this.projects[i].ID) {
          this.highlightedContent = this.projects[i];
        }
      }
    }
  }
});

$(document).ready(function() {
  resizeProjectDivs();
  // resizeProjectDivs();
});
var resizeTimer;
$(window).on("resize", function(e) {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    if (isSelected == false) {
      resizeProjectDivs();
    }
  }, 250);
});

function resizeProjectDivs() {
  var midRange = false;
  var smallRange = false;
  var winWidth = $(window).width();
  if (winWidth < 920 && 620 < winWidth) {
    midRange = true;
  }
  if (winWidth < 720) {
    smallRange = true;
  }
  var i = 0;

  $("#projectsApp .projects").each(function() {
    var pWidth = $(this).width();
    var pHeight;
    if (i < 2) {
      pHeight = pWidth;
    } else {
      if (midRange == true) {
        pHeight = pWidth * 0.5;
      } else if (smallRange == true) {
        pHeight = pWidth;
      } else {
        pHeight = pWidth * 1.5;
      }
    }
    $(this).css("height", pHeight + "px");
    i++;
  });
}

// Input Lock
$("textarea").blur(function() {
  $("#hire textarea").each(function() {
    $this = $(this);
    if (this.value != "") {
      $this.addClass("focused");
      $("textarea + label + span").css({ opacity: 1 });
    } else {
      $this.removeClass("focused");
      $("textarea + label + span").css({ opacity: 0 });
    }
  });
});

$("#hire .field:first-child input").blur(function() {
  $("#hire .field:first-child input").each(function() {
    $this = $(this);
    if (this.value != "") {
      $this.addClass("focused");
      $(".field:first-child input + label + span").css({ opacity: 1 });
    } else {
      $this.removeClass("focused");
      $(".field:first-child input + label + span").css({ opacity: 0 });
    }
  });
});

$("#hire .field:nth-child(2) input").blur(function() {
  $("#hire .field:nth-child(2) input").each(function() {
    $this = $(this);
    if (this.value != "") {
      $this.addClass("focused");
      $(".field:nth-child(2) input + label + span").css({ opacity: 1 });
    } else {
      $this.removeClass("focused");
      $(".field:nth-child(2) input + label + span").css({ opacity: 0 });
    }
  });
});