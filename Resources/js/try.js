var Intro = function() {
  this.$title = $('.hero__title');
  this.$subtitle = $('.hero__subtitle');
  this.$button = $('.hero .button');
  this.$logoPartRed = $('.mastercard__part.red');
  
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
        repeat: 4,
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
artOrange = $('.mastercard__part.orange');
  this.$strings = $('.js-letters');
  this.partSize = 25;
  this.$nav = $('.nav');
  this.w = $(window).width();
  


Intro.prototype = {

  init: function() {
    var _this = this;
    TweenMax.set(this.$nav, {opacity: 0});
    TweenMax.set(this.$logoPartRed, {x: this.partSize / 2});
    TweenMax.set(this.$logoPartOrange, {x: - this.partSize / 2});
    TweenMax.set(this.$subtitle, {y: 10, opacity: 0});
    TweenMax.set(this.$button, {y: 10, opacity: 0});
    
    this.logoAnim();
    
    this.$strings.each(function(){
      _this.manageLetters($(this));
    });
  },
  
  logoAnim: function() {
    var logoTween = new TimelineMax({
      repeat: 4,
      yoyo: true,
      onComplete: this.introAnim.bind(this)
    });
    
    logoTween
      .to(this.$logoPartRed, 0.5, {
        x: this.partSize / 6,
        ease: Power1.easeInOut
      })
      .to(this.$logoPartOrange, 0.5, {
        x: -this.partSize / 6,
        ease: Power1.easeInOut
      }, '-=0.5')
    ;
  },
  
  introAnim: function() {
    var introTween = new TimelineMax();
    var $cover = $('.hero__cover');

    introTween
      .staggerTo($(this.$strings[0]).find('.letter'), 0.4, {
        yPercent: -40,
        opacity: 1,
        ease: Back.easeOut
      }, 0.02666)
      .to($cover, 1.8, {
        webkitClipPath:'circle('+ this.coverW +' at 0 0)',  
        ease: Power3.easeOut
      }, '-=0.3')
      .staggerTo($(this.$strings[1]).find('.letter'), 0.5, {
        yPercent: -40,
        opacity: 1,
        ease: Back.easeOut
      }, 0.025, '-=1.2')
      .staggerTo($(this.$strings[2]).find('.letter'), 0.5, {
        yPercent: -40,
        opacity: 1,
        ease: Back.easeOut
      }, 0.025, '-=0.9')
      .staggerTo($(this.$strings[3]).find('.letter'), 0.5, {
        yPercent: -40,
        opacity: 1,
        ease: Back.easeOut
      }, 0.025, '-=0.7')
      .to(this.$subtitle, 0.5, {
        opacity: 1,
        y: 0,
        ease: Back.easeOut
      }, '-=0.4')
      .to(this.$button, 0.5, {
        opacity: 1,
        y: 0,
        ease: Back.easeOut
      }, '-=0.3')
      .to(this.$nav, 1.4, {
        opacity: 1
      }, '-=0.2')
    ;
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
 
  splitString: function(str){
    str = str.trim();
    var length = str.length;
    retArr = [];
    for(var i = 0; i < length; i++){
        if(str[i] === ' '){
           retArr[retArr.length - 1] += '&nbsp;';
           continue;
        }
        retArr.push(str[i]);
    }
    return retArr;                                
  }

}

var intro = new Intro();
